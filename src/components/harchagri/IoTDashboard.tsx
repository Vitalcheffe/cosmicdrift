'use client'

import { useEffect, useRef, useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, RadialBarChart, RadialBar, Legend
} from 'recharts'

// Simulated real-time data
const generateTimeData = () => {
  const data = []
  const now = Date.now()
  for (let i = 30; i >= 0; i--) {
    data.push({
      time: new Date(now - i * 2000).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      temperature: 22 + Math.sin(i * 0.3) * 4 + Math.random() * 2,
      humidity: 65 + Math.cos(i * 0.2) * 10 + Math.random() * 5,
      soil: 40 + Math.sin(i * 0.15) * 8 + Math.random() * 3,
    })
  }
  return data
}

const cropData = [
  { name: 'Blé', value: 85, fill: '#22c55e' },
  { name: 'Maïs', value: 72, fill: '#10b981' },
  { name: 'Tomates', value: 91, fill: '#f59e0b' },
  { name: 'Oignons', value: 68, fill: '#06b6d4' },
]

const carbonData = [
  { month: 'Jan', sequestered: 120, traded: 45 },
  { month: 'Fév', sequestered: 145, traded: 52 },
  { month: 'Mar', sequestered: 168, traded: 61 },
  { month: 'Avr', sequestered: 190, traded: 78 },
  { month: 'Mai', sequestered: 210, traded: 85 },
  { month: 'Jun', sequestered: 235, traded: 95 },
]

const radialData = [
  { name: 'Irrigation', value: 78, fill: '#22c55e' },
  { name: 'Fertilisation', value: 65, fill: '#10b981' },
  { name: 'Protection', value: 89, fill: '#f59e0b' },
  { name: 'Récolte', value: 72, fill: '#06b6d4' },
]

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
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
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

  return (
    <div className="space-y-6">
      {/* Live sensor stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Capteurs Actifs', value: sensorStats.active.toLocaleString(), color: '#22c55e', icon: '📡' },
          { label: 'Alertes', value: sensorStats.alerts.toString(), color: '#f59e0b', icon: '⚠️' },
          { label: 'Points de Données', value: (sensorStats.dataPoints / 1000000).toFixed(2) + 'M', color: '#06b6d4', icon: '📊' },
          { label: 'Uptime', value: sensorStats.uptime.toFixed(1) + '%', color: '#10b981', icon: '⚡' },
        ].map((stat, i) => (
          <div key={i} className="relative overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4">
            <div className="absolute top-0 left-0 w-full h-0.5" style={{ backgroundColor: stat.color }} />
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">{stat.icon}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold tracking-tight" style={{ color: stat.color }}>
              {stat.value}
            </p>
            <div className="absolute bottom-0 right-0 w-16 h-16 opacity-5">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill={stat.color} />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Real-time sensor data chart */}
      <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <h3 className="text-sm font-semibold">Données Capteurs en Temps Réel</h3>
          </div>
          <div className="flex gap-2">
            {[
              { key: 'temperature', label: 'Temp °C', color: '#22c55e' },
              { key: 'humidity', label: 'Humidité %', color: '#06b6d4' },
              { key: 'soil', label: 'Sol %', color: '#f59e0b' },
            ].map(m => (
              <button
                key={m.key}
                onClick={() => setActiveMetrics(prev => ({ ...prev, [m.key]: !prev[m.key as keyof typeof prev] }))}
                className="text-[10px] px-2 py-1 rounded-md border transition-all"
                style={{
                  borderColor: activeMetrics[m.key as keyof typeof activeMetrics] ? m.color : 'rgba(255,255,255,0.1)',
                  color: activeMetrics[m.key as keyof typeof activeMetrics] ? m.color : 'rgba(255,255,255,0.3)',
                  backgroundColor: activeMetrics[m.key as keyof typeof activeMetrics] ? m.color + '10' : 'transparent',
                }}
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
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="humGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
            <XAxis dataKey="time" tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.3)' }} interval={6} />
            <YAxis tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.3)' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(10, 15, 13, 0.9)',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                borderRadius: '8px',
                fontSize: '11px',
              }}
            />
            {activeMetrics.temperature && (
              <Area type="monotone" dataKey="temperature" stroke="#22c55e" fill="url(#tempGrad)" strokeWidth={2} dot={false} />
            )}
            {activeMetrics.humidity && (
              <Area type="monotone" dataKey="humidity" stroke="#06b6d4" fill="url(#humGrad)" strokeWidth={2} dot={false} />
            )}
            {activeMetrics.soil && (
              <Area type="monotone" dataKey="soil" stroke="#f59e0b" fill="url(#soilGrad)" strokeWidth={2} dot={false} />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom row: Crop health + Carbon credits */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Crop health */}
        <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4">
          <h3 className="text-sm font-semibold mb-3">Santé des Cultures</h3>
          <div className="space-y-3">
            {cropData.map((crop, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{crop.name}</span>
                  <span style={{ color: crop.fill }}>{crop.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${crop.value}%`,
                      backgroundColor: crop.fill,
                      boxShadow: `0 0 8px ${crop.fill}40`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carbon credits */}
        <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4">
          <h3 className="text-sm font-semibold mb-3">Crédits Carbone (tCO2)</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={carbonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="month" tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.3)' }} />
              <YAxis tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.3)' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(10, 15, 13, 0.9)',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                  borderRadius: '8px',
                  fontSize: '11px',
                }}
              />
              <Bar dataKey="sequestered" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="traded" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
