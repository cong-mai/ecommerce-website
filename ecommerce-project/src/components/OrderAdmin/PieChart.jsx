import React from 'react'
import { convertDataChart } from '../../utils';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartComponent = ({ data: rawData }) => {
  const data = convertDataChart(rawData, 'paymentMethod')

  if (!data || data.length === 0) {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '13px' }}>
        No order data
      </div>
    )
  }

  const total = data.reduce((sum, d) => sum + d.value, 0)
  const cx = 150
  const cy = 150
  const r = 110

  let startAngle = -Math.PI / 2
  const slices = data.map((d, i) => {
    const angle = (d.value / total) * 2 * Math.PI
    const endAngle = startAngle + angle
    const mid = startAngle + angle / 2

    let pathD
    if (data.length === 1) {
      // Full circle: draw as two arcs to avoid SVG degenerate case
      pathD = `M ${cx},${cy - r} A ${r},${r} 0 1 1 ${cx - 0.001},${cy - r} Z`
    } else {
      const x1 = cx + r * Math.cos(startAngle)
      const y1 = cy + r * Math.sin(startAngle)
      const x2 = cx + r * Math.cos(endAngle)
      const y2 = cy + r * Math.sin(endAngle)
      const largeArc = angle > Math.PI ? 1 : 0
      pathD = `M ${cx},${cy} L ${x1},${y1} A ${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`
    }

    const lx = cx + (r * 0.6) * Math.cos(mid)
    const ly = cy + (r * 0.6) * Math.sin(mid)
    const pct = Math.round((d.value / total) * 100)

    startAngle = endAngle
    return { pathD, color: COLORS[i % COLORS.length], lx, ly, pct, name: d.name, value: d.value }
  })

  return (
    <div>
      <svg width={300} height={300}>
        {slices.map((s, i) => (
          <g key={i}>
            <path d={s.pathD} fill={s.color} stroke="#fff" strokeWidth={2} />
            {data.length > 1 && (
              <text x={s.lx} y={s.ly} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight="bold">
                {s.pct}%
              </text>
            )}
          </g>
        ))}
        {data.length === 1 && (
          <text x={cx} y={cy} fill={COLORS[0]} textAnchor="middle" dominantBaseline="central" fontSize={15} fontWeight="bold">
            100%
          </text>
        )}
      </svg>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 4 }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: COLORS[i % COLORS.length] }} />
            <span style={{ fontSize: 13 }}>{d.name}: {d.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PieChartComponent
