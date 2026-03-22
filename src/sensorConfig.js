export const SENSOR_CONFIG = {
  temperature: {
    label: 'Temperature',
    unit: '°C',
    icon: '🌡',
    accentColor: 'bg-red-400',
    valueColor: 'text-red-400',
    barPercent: (v) => Math.min(Math.max((v / 60) * 100, 0), 100),
    getStatus: (v) => (v > 40 ? 'crit' : v > 30 ? 'warn' : 'ok'),
    getDesc: (v) =>
      v > 40 ? 'High temp — check cooling system'
      : v > 30 ? 'Slightly elevated — monitor closely'
      : 'Normal operating range',
  },
  gas: {
    label: 'Gas Level',
    unit: 'ppm',
    icon: '🫧',
    accentColor: 'bg-purple-400',
    valueColor: 'text-purple-400',
    barPercent: (v) => Math.min(Math.max((v / 500) * 100, 0), 100),
    getStatus: (v) => (v > 300 ? 'crit' : v > 150 ? 'warn' : 'ok'),
    getDesc: (v) =>
      v > 300 ? 'Dangerous — ventilate immediately'
      : v > 150 ? 'Elevated — increase ventilation'
      : 'Safe air quality',
  },
  humidity: {
    label: 'Humidity',
    unit: '%',
    icon: '💧',
    accentColor: 'bg-teal-400',
    valueColor: 'text-teal-400',
    barPercent: (v) => Math.min(Math.max(v, 0), 100),
    getStatus: (v) => (v > 80 ? 'warn' : v < 20 ? 'warn' : 'ok'),
    getDesc: (v) =>
      v > 80 ? 'High humidity — condensation risk'
      : v < 20 ? 'Too dry — may affect components'
      : 'Comfortable range',
  },
}

export const STATUS_BADGE = {
  ok:   { label: 'NORMAL',   classes: 'bg-teal-500/10 text-teal-400 border border-teal-500/25' },
  warn: { label: 'ELEVATED', classes: 'bg-amber-500/10 text-amber-400 border border-amber-500/25' },
  crit: { label: 'CRITICAL', classes: 'bg-red-500/10 text-red-400 border border-red-500/25' },
}
