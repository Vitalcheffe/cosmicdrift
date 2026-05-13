'use client'

import { useEffect, useRef, useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from 'recharts'
import { Radio, AlertTriangle, Database, Zap } from 'lucide-react'

// Simulated real-time data
const generateTimeData = () => {
  const data = []
  const now = Date.now()
  for (let i = 30; i >= 0; i--) {
    data.push({
      time: new Date(now - i * 2000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      temperature: 22 + Math.sin(i * 0.3) * 4 + Math.random() * 2,
      humidity: 65 + Math.cos(i * 0.2) * 10 + Math.random() * 5,
      soil: 40 + Math.sin(i * 0.15) * 8 + Math.random() * 3,
    })
  }
  return data
}

const cropData = [
  { name: 'Wheat', value: 85 },
  { name: 'Maize', value: 72 },
  { name: 'Tomatoes', value: 91 },
  { name: 'Onions', value: 68 },
]

const carbonData = [
  { month: 'Jan', sequestered: 120, traded: 45 },
  { month: 'Feb', sequestered: 145, traded: 52 },
  { month: 'Mar', sequestered: 168, traded: 61 },
  { month: 'Apr', sequestered: 190, traded: 78 },
  { month: 'May', sequestered: 210, traded: 85 },
  { month: 'Jun', sequestered: 235, traded: 95 },
]

const statIcons = [Radio, AlertTriangle, Database, Zap]

export default function IoTDashboard() {
  const [timeData, setTimeData] = useState(generateTimeData)
  const [activeMetrics, setActiveMetrics] = useState({
    temperature: true,
    humidity: true,
    soil: true,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeData(prev => {
        const newData = [...prev.slice(1)]
        const lastEntry = prev[prev.length - 1]
        newData.push({
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          temperature: Math.max(15, Math.min(35, lastEntry.temperature + (Math.random() - 0.5) * 2)),
          humidity: Math.max(30, Math.min(95, lastEntry.humidity + (Math.random() - 0.5) * 3)),
          soil: Math.max(20, Math.min(70, lastEntry.soil + (Math.random() - 0.5) * 2)),
        })
        return newData
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const [sensorStats, setSensorStats] = useState({
    active: 11800,
    alerts: 23,
    dataPoints: 2847291,
    uptime: 99.7,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorStats(prev => ({
        active: prev.active + Math.floor(Math.random() * 3),
        alerts: Math.max(0, prev.alerts + Math.floor(Math.random() * 3) - 1),
        dataPoints: prev.dataPoints + Math.floor(Math.random() * 150),
        uptime: Math.min(100, Math.max(99, prev.uptime + (Math.random() - 0.5) * 0.1)),
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const sensorCards = [
    { label: 'Active Sensors', value: sensorStats.active.toLocaleString(), Icon: Radio },
    { label: 'Alerts', value: sensorStats.alerts.toString(), Icon: AlertTriangle },
    { label: 'Data Points', value: (sensorStats.dataPoints / 1000000).toFixed(2) + 'M', Icon: Database },
    { label: 'Uptime', value: sensorStats.uptime.toFixed(1) + '%', Icon: Zap },
  ]

  return (
    <div className="space-y-6">
      {/* Live sensor stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sensorCards.map((stat, i) => {
          const Icon = stat.Icon
          return (
            <div key={i} className="card p-5">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={12} className="text-white/40" strokeWidth={1.5} />
                <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-[#666666] font-[family-name:var(--font-space-mono)]">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-white stat-mono">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Real-time sensor data chart */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
            <h3 className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#666666] font-[family-name:var(--font-space-mono)]">Real-Time Sensor Data</h3>
          </div>
          <div className="flex gap-2">
            {[
              { key: 'temperature', label: 'Temp °C' },
              { key: 'humidity', label: 'Humidity %' },
              { key: 'soil', label: 'Soil %' },
            ].map(m => (
              <button
                key={m.key}
                onClick={() => setActiveMetrics(prev => ({ ...prev, [m.key]: !prev[m.key as keyof typeof prev] }))}
                className={`text-[9px] px-2 py-1 rounded font-semibold tracking-wider uppercase transition-all ${
                  activeMetrics[m.key as keyof typeof activeMetrics]
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'text-[#666666] border border-[rgba(255,255,255,0.06)]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={timeData}>
            <defs>
              <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="humGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#999999" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#999999" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#666666" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#666666" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
            <XAxis dataKey="time" tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.3)' }} interval={6} />
            <YAxis tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.3)' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 26, 26, 0.95)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
                fontSize: '11px',
                color: '#FFFFFF',
              }}
            />
            {activeMetrics.temperature && (
              <Area type="monotone" dataKey="temperature" stroke="#FFFFFF" fill="url(#tempGrad)" strokeWidth={1.5} dot={false} />
            )}
            {activeMetrics.humidity && (
              <Area type="monotone" dataKey="humidity" stroke="#999999" fill="url(#humGrad)" strokeWidth={1.5} dot={false} />
            )}
            {activeMetrics.soil && (
              <Area type="monotone" dataKey="soil" stroke="#666666" fill="url(#soilGrad)" strokeWidth={1.5} dot={false} />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom row: Crop health + Carbon credits */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Crop health */}
        <div className="card p-5">
          <h3 className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#666666] font-[family-name:var(--font-space-mono)] mb-4">Crop Health</h3>
          <div className="space-y-4">
            {cropData.map((crop, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[12px] text-[#999999]">{crop.name}</span>
                  <span className="text-[12px] font-semibold text-white stat-mono">{crop.value}%</span>
                </div>
                <div className="h-1 bg-[#252525] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/60 rounded-full transition-all duration-1000"
                    style={{ width: `${crop.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carbon credits */}
        <div className="card p-5">
          <h3 className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#666666] font-[family-name:var(--font-space-mono)] mb-4">Carbon Credits (tCO₂)</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={carbonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="month" tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.3)' }} />
              <YAxis tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.3)' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(26, 26, 26, 0.95)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                  fontSize: '11px',
                  color: '#FFFFFF',
                }}
              />
              <Bar dataKey="sequestered" fill="rgba(255,255,255,0.5)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="traded" fill="rgba(255,255,255,0.2)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
