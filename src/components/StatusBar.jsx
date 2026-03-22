const STATUS_CONFIG = {
  idle:    { dot: 'bg-slate-500',               msg: 'Ready — press Load Data' },
  loading: { dot: 'bg-amber-400 animate-pulse', msg: 'Fetching from sensor API...' },
  ok:      { dot: 'bg-teal-400',                msg: 'Live data loaded' },
  err:     { dot: 'bg-red-400',                 msg: null },
}

export default function StatusBar({ status, error, lastFetchTime }) {
  const cfg = STATUS_CONFIG[status]
  const msg = status === 'err' ? `Error: ${error}` : cfg.msg

  return (
    <div className="flex items-center gap-3 bg-slate-800/50 border border-slate-700/60 rounded-xl px-4 py-2.5 mb-5 font-mono text-xs">
      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
      <span className="text-slate-400">{msg}</span>
      {lastFetchTime && (
        <span className="ml-auto text-slate-600">Last fetch: {lastFetchTime}</span>
      )}
    </div>
  )
}
