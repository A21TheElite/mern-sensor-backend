import { useState, useCallback, useEffect } from 'react'
import SensorCard from './components/SensorCard'
import StatusBar  from './components/StatusBar'
import RawJSON    from './components/RawJSON'
import { SENSOR_CONFIG } from './sensorConfig'

const API_URL = 'https://sensor-api-wu3s.onrender.com/sensor'

export default function App() {
  const [theme,         setTheme]        = useState('dark')
  const [data,          setData]         = useState(null)
  const [status,        setStatus]       = useState('idle')
  const [error,         setError]        = useState(null)
  const [lastFetchTime, setLastFetchTime]= useState(null)
  const [loading,       setLoading]      = useState(false)
  const [rawOpen,       setRawOpen]      = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const fetchData = useCallback(async () => {
    setLoading(true)
    setStatus('loading')
    setError(null)
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      setData(Array.isArray(json) ? json[0] : json)
      setStatus('ok')
      setLastFetchTime(new Date().toLocaleTimeString())
    } catch (err) {
      setStatus('err')
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const sensorFields = data
    ? Object.keys(SENSOR_CONFIG).filter(k => k in data)
    : []

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-5 py-7">

        <div className="flex items-start justify-between mb-7">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse-dot flex-shrink-0" />
              <h1 className="text-lg font-semibold tracking-tight">Sensor Dashboard</h1>
            </div>
            <p className="font-mono text-[11px] text-slate-600 pl-[18px]">
              sensor-api-wu3s.onrender.com
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 transition-colors text-base"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium transition-all active:scale-95"
            >
              {loading ? '⏳ Loading...' : '⬇ Load Data'}
            </button>
          </div>
        </div>

        <StatusBar status={status} error={error} lastFetchTime={lastFetchTime} />

        {sensorFields.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              {sensorFields.map(field => (
                <SensorCard key={field} field={field} value={data[field]} />
              ))}
            </div>
            <RawJSON data={data} open={rawOpen} onToggle={() => setRawOpen(o => !o)} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-600">
            <div className="text-5xl mb-4 opacity-30">📡</div>
            <p className="text-sm">No data yet — press Load Data to fetch from your API</p>
          </div>
        )}

      </div>
    </div>
  )
}
