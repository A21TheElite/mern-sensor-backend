import { SENSOR_CONFIG, STATUS_BADGE } from '../sensorConfig'

export default function SensorCard({ field, value }) {
  const cfg = SENSOR_CONFIG[field]
  if (!cfg) return null

  const status = cfg.getStatus(value)
  const badge  = STATUS_BADGE[status]
  const barW   = cfg.barPercent(value)

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
      <div className="h-1 rounded-full bg-slate-700/50 overflow-hidden mb-3">
        <div
          className={`h-full rounded-full bar-fill ${cfg.accentColor}`}
          style={{ width: `${barW}%` }}
        />
      </div>
      <p className="text-[11px] text-slate-500 leading-relaxed">{cfg.getDesc(value)}</p>
    </div>
  )
}
