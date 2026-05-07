'use client'

import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

interface HubData {
  name: string
  country: string
  lat: number
  lon: number
  sensors: number
  hectares: number
  type: string
  color: string
}

const hubs: HubData[] = [
  { name: 'Casablanca Hub', country: 'Morocco', lat: 33.57, lon: -7.59, sensors: 2400, hectares: 5000, type: 'IoT + Drones', color: '#22c55e' },
  { name: 'Dakar Hub', country: 'Senegal', lat: 14.69, lon: -17.44, sensors: 1800, hectares: 3500, type: 'IoT + Carbon', color: '#10b981' },
  { name: 'Nairobi Hub', country: 'Kenya', lat: -1.29, lon: 36.82, sensors: 3200, hectares: 8000, type: 'Full Stack', color: '#f59e0b' },
  { name: 'Accra Hub', country: 'Ghana', lat: 5.56, lon: -0.19, sensors: 1500, hectares: 2500, type: 'IoT + Vertical', color: '#06b6d4' },
  { name: 'Lagos Hub', country: 'Nigeria', lat: 6.52, lon: 3.38, sensors: 2100, hectares: 6000, type: 'Drones + Carbon', color: '#22c55e' },
]

export default function AfricaMap() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [activeHub, setActiveHub] = useState<HubData | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    // Africa projection
    const projection = d3.geoMercator()
      .center([20, 5])
      .scale(width * 0.22)
      .translate([width / 2, height / 2])

    const path = d3.geoPath().projection(projection)

    const g = svg.append('g')

    // Draw simplified Africa outline
    // Using a basic Africa shape as path data
    const africaOutline = [
      { type: 'Feature', geometry: { type: 'Point', coordinates: [0, 0] } }
    ]

    // Draw grid lines
    const gridGroup = g.append('g').attr('class', 'grid')

    // Longitude lines
    for (let lon = -20; lon <= 55; lon += 10) {
      const lineData: [number, number][] = []
      for (let lat = -35; lat <= 38; lat += 2) {
        lineData.push([lon, lat])
      }
      gridGroup.append('path')
        .datum({ type: 'LineString', coordinates: lineData })
        .attr('d', path as any)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(34, 197, 94, 0.06)')
        .attr('stroke-width', 0.5)
    }

    // Latitude lines
    for (let lat = -35; lat <= 38; lat += 10) {
      const lineData: [number, number][] = []
      for (let lon = -20; lon <= 55; lon += 2) {
        lineData.push([lon, lat])
      }
      gridGroup.append('path')
        .datum({ type: 'LineString', coordinates: lineData })
        .attr('d', path as any)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(34, 197, 94, 0.06)')
        .attr('stroke-width', 0.5)
    }

    // Draw coverage circles (pulsing)
    hubs.forEach((hub) => {
      const pos = projection([hub.lon, hub.lat])
      if (!pos) return

      // Coverage area
      g.append('circle')
        .attr('cx', pos[0])
        .attr('cy', pos[1])
        .attr('r', 0)
        .attr('fill', hub.color)
        .attr('fill-opacity', 0.05)
        .attr('stroke', hub.color)
        .attr('stroke-opacity', 0.2)
        .attr('stroke-width', 1)
        .transition()
        .duration(2000)
        .attr('r', 40)

      // Pulse ring
      g.append('circle')
        .attr('cx', pos[0])
        .attr('cy', pos[1])
        .attr('r', 5)
        .attr('fill', 'none')
        .attr('stroke', hub.color)
        .attr('stroke-opacity', 0.6)
        .attr('stroke-width', 1.5)
        .call(pulseAnimation)
    })

    function pulseAnimation(selection: d3.Selection<SVGCircleElement, unknown, null, undefined>) {
      function repeat() {
        selection
          .attr('r', 5)
          .attr('stroke-opacity', 0.6)
          .transition()
          .duration(2000)
          .attr('r', 30)
          .attr('stroke-opacity', 0)
          .on('end', repeat)
      }
      repeat()
    }

    // Draw connection lines between hubs
    const connections = [
      [0, 1], [0, 4], [1, 3], [3, 4], [4, 2]
    ]

    connections.forEach(([from, to]) => {
      const fromPos = projection([hubs[from].lon, hubs[from].lat])
      const toPos = projection([hubs[to].lon, hubs[to].lat])
      if (!fromPos || !toPos) return

      const midX = (fromPos[0] + toPos[0]) / 2
      const midY = (fromPos[1] + toPos[1]) / 2 - 20

      g.append('path')
        .attr('d', `M ${fromPos[0]} ${fromPos[1]} Q ${midX} ${midY} ${toPos[0]} ${toPos[1]}`)
        .attr('fill', 'none')
        .attr('stroke', 'url(#lineGradient)')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '4 4')
        .attr('opacity', 0.4)

      // Animated data packet
      g.append('circle')
        .attr('r', 2)
        .attr('fill', '#22c55e')
        .attr('opacity', 0.8)
        .append('animateMotion')
        .attr('dur', `${3 + Math.random() * 2}s`)
        .attr('repeatCount', 'indefinite')
        .attr('path', `M ${fromPos[0]} ${fromPos[1]} Q ${midX} ${midY} ${toPos[0]} ${toPos[1]}`)
    })

    // Gradient definition
    const defs = svg.append('defs')
    const gradient = defs.append('linearGradient')
      .attr('id', 'lineGradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '100%').attr('y2', '0%')
    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#22c55e')
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#06b6d4')

    // Draw hub markers (interactive)
    const hubGroup = g.append('g').attr('class', 'hubs')

    hubs.forEach((hub, index) => {
      const pos = projection([hub.lon, hub.lat])
      if (!pos) return

      const group = hubGroup.append('g')
        .attr('transform', `translate(${pos[0]}, ${pos[1]})`)
        .style('cursor', 'pointer')

      // Outer glow
      group.append('circle')
        .attr('r', 8)
        .attr('fill', hub.color)
        .attr('fill-opacity', 0.2)
        .attr('stroke', hub.color)
        .attr('stroke-opacity', 0.5)
        .attr('stroke-width', 1)

      // Inner dot
      group.append('circle')
        .attr('r', 4)
        .attr('fill', hub.color)
        .attr('fill-opacity', 0.9)

      // Label
      group.append('text')
        .attr('x', 12)
        .attr('y', 4)
        .attr('fill', hub.color)
        .attr('font-size', '10px')
        .attr('font-family', 'var(--font-geist-sans)')
        .attr('font-weight', '600')
        .text(hub.name)

      // Hover interaction
      group.on('mouseenter', (event) => {
        setActiveHub(hub)
        setTooltipPos({ x: event.offsetX, y: event.offsetY })
        d3.select(group.node())
          .select('circle:first-child')
          .transition()
          .duration(200)
          .attr('r', 14)
          .attr('fill-opacity', 0.3)
      })
      group.on('mouseleave', () => {
        setActiveHub(null)
        d3.select(group.node())
          .select('circle:first-child')
          .transition()
          .duration(200)
          .attr('r', 8)
          .attr('fill-opacity', 0.2)
      })
    })

  }, [])

  return (
    <div className="relative w-full h-full">
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
      />
      {activeHub && (
        <div
          className="absolute pointer-events-none z-10 px-4 py-3 rounded-lg border border-border bg-card/90 backdrop-blur-sm shadow-xl"
          style={{
            left: Math.min(tooltipPos.x + 20, 600),
            top: tooltipPos.y - 60,
            transition: 'all 0.15s ease-out',
          }}
        >
          <p className="text-sm font-bold" style={{ color: activeHub.color }}>
            {activeHub.name}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{activeHub.country} — {activeHub.type}</p>
          <div className="flex gap-4 mt-2">
            <div>
              <p className="text-lg font-bold text-foreground">{activeHub.sensors.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">Capteurs IoT</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{activeHub.hectares.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">Hectares</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
