'use client'

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  type Currency,
  type MovieEntry,
  formatMoney,
  getChartValue,
} from '@/lib/movie-data'

type Props = {
  data: MovieEntry[]
  currency: Currency
}

type Row = { name: string; value: number; raw: number }

function CustomTooltip({
  active,
  payload,
  currency,
}: {
  active?: boolean
  payload?: { payload: Row }[]
  currency: Currency
}) {
  if (!active || !payload?.length) return null
  const row = payload[0].payload
  return (
    <div className="rounded-lg border border-primary/30 bg-popover/95 px-3 py-2 text-sm shadow-xl backdrop-blur-md">
      <p className="font-medium text-foreground">{row.name}</p>
      <p className="font-mono font-semibold text-gold-gradient">
        {formatMoney(row.raw, currency)}
      </p>
    </div>
  )
}

export function CategoryChart({ data, currency }: Props) {
  const rows: Row[] = data.map((d) => ({
    name: d.name,
    value: getChartValue(d.val, currency),
    raw: d.val,
  }))

  const height = Math.max(220, rows.length * 38)

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={rows}
        layout="vertical"
        margin={{ top: 4, right: 56, bottom: 4, left: 8 }}
        barCategoryGap={8}
      >
        <defs>
          <linearGradient id="goldBar" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8a6d1f" />
            <stop offset="55%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#f5d57a" />
          </linearGradient>
        </defs>
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          width={150}
          tickLine={false}
          axisLine={false}
          tick={{ fill: '#cbb78a', fontSize: 12 }}
          interval={0}
        />
        <Tooltip
          cursor={{ fill: 'rgba(212,175,55,0.06)' }}
          content={<CustomTooltip currency={currency} />}
        />
        <Bar
          dataKey="value"
          radius={[0, 6, 6, 0]}
          fill="url(#goldBar)"
          isAnimationActive
          animationDuration={900}
          label={{
            position: 'right',
            fill: '#cbb78a',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            formatter: (v: number) => {
              const raw = currency === 'USD' ? v : v / 83
              return formatMoney(raw, currency)
            },
          }}
        >
          {rows.map((_, i) => (
            <Cell key={i} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
