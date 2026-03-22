function highlight(json) {
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let cls = 'text-amber-400'
      if (/^"/.test(match))
        cls = /:$/.test(match) ? 'text-sky-400' : 'text-teal-400'
      else if (/true|false/.test(match)) cls = 'text-red-400'
      else if (/null/.test(match))       cls = 'text-slate-500'
      return `<span class="${cls}">${match}</span>`
    }
  )
}

export default function RawJSON({ data, open, onToggle }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-700/30 transition-colors"
      >
        <span className="text-xs font-medium text-slate-400 flex items-center gap-2">
          <span className="font-mono text-slate-500">{'{}'}</span>
          Raw JSON Response
        </span>
        <span className={`text-slate-600 text-xs transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {open && (
        <div className="border-t border-slate-700/60 p-4 overflow-x-auto">
          <pre
            className="font-mono text-xs leading-relaxed text-slate-400"
            dangerouslySetInnerHTML={{ __html: highlight(JSON.stringify(data, null, 2)) }}
          />
        </div>
      )}
    </div>
  )
}
