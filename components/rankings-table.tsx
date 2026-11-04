'use client'

import { motion } from 'motion/react'
import { type Currency, type MovieEntry, formatMoney } from '@/lib/movie-data'

export function RankingsTable({
  data,
  startRank,
  currency,
}: {
  data: MovieEntry[]
  startRank: number
  currency: Currency
}) {
  return (
    <div className="scrollbar-gold max-h-[420px] overflow-y-auto rounded-xl border border-border">
      <table className="w-full border-collapse text-left">
        <thead className="sticky top-0 z-10 bg-secondary/95 backdrop-blur">
          <tr>
            <th className="w-16 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Rank
            </th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Title
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Revenue
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((movie, idx) => (
            <motion.tr
              key={movie.name + idx}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.03 }}
              className="border-t border-border transition-colors hover:bg-primary/5"
            >
              <td className="px-4 py-3 font-mono text-sm text-muted-foreground">
                {String(startRank + idx).padStart(2, '0')}
              </td>
              <td className="px-4 py-3 font-medium text-foreground">
                {movie.name}
              </td>
              <td className="px-4 py-3 text-right font-mono text-sm font-semibold text-gold-gradient">
                {formatMoney(movie.val, currency)}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
