import {
  LineChart, Line, ResponsiveContainer,
  Tooltip, XAxis, YAxis
} from 'recharts'
import { SENSOR_CONFIG, STATUS_BADGE } from '../sensorConfig'

function generateHistory(value, count = 10) {
  const variation = value * 0.08
  return Array.from({ length: count }, (_, i) => ({
    time: `${count - i}m ago`,
    value: i === count - 1
      ? value
      : parseFloat((value + (Math.random() - 0.5) * 2 * variation).toFixed(1))
  }))
}

function CustomTooltip({ active, payload, unit }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono">
      <span className="text-slate-300">{payload[0].value}</span>
      <span className="text-slate-500 ml-1">{unit}</span>
    </div>
  )
}

export default function SensorCard({ field, value }) {
  const cfg = SENSOR_CONFIG[field]
  if (!cfg) return null

  const status  = cfg.getStatus(value)
  const badge   = STATUS_BADGE[status]
  const history = generateHistory(value)

  const lineColor = {
    'bg-red-400':    '#f87171',
    'bg-purple-400': '#c084fc',
    'bg-teal-400':   '#2dd4bf',
  }[cfg.accentColor] ?? '#4f8ef7'

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/50 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-slate-600">
      <div className={`absolute top-0 left-0 right-0 h-[3px] ${cfg.accentColor}`} />
      <div className="flex items-center justify-between mb-3 mt-1">
        <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">
          {cfg.icon} {cfg.label}
        </span>
        <span className={`text-[10px] font-mono font-medium px-2 py-[3px] rounded-full ${badge.classes}`}>
          {badge.label}
        </span>
      </div>
      <div className={`font-mono text-4xl font-semibold leading-none mb-1 ${cfg.valueColor}`}>
        {value}
      </div>
      <div className="font-mono text-xs text-slate-500 mb-4">{cfg.unit}</div>
      <div className="mb-3 -mx-2">
        <ResponsiveContainer width="100%" height={60}>
          <LineChart data={history}>
            <XAxis dataKey="time" hide />
            <YAxis
              hide
              domain={[
                (min) => parseFloat((min * 0.95).toFixed(1)),
                (max) => parseFloat((max * 1.05).toFixed(1))
              ]}
            />
            <Tooltip
              content={<CustomTooltip unit={cfg.unit} />}
              cursor={{ stroke: lineColor, strokeWidth: 1, strokeDasharray: '3 3' }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={lineColor}
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 3, fill: lineColor, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-[11px] text-slate-500 leading-relaxed">{cfg.getDesc(value)}</p>
    </div>
  )
}
