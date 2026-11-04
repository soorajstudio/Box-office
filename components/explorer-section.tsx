'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Film } from 'lucide-react'
import { type Category, formatMoney } from '@/lib/movie-data'
import { useCurrency } from './currency-context'
import { CategoryChart } from './category-chart'
import { RankingsTable } from './rankings-table'

const BUTTON_LABELS = ['Show Top 10', 'Show Full List (11–25)', 'Collapse']

export function ExplorerSection({
  category,
  index,
}: {
  category: Category
  index: number
}) {
  const { currency } = useCurrency()
  // 0 = Top 5, 1 = Top 10, 2 = Top 10 + table (11-25)
  const [state, setState] = useState(0)
  const limit = state === 0 ? 5 : 10
  const chartData = category.data.slice(0, limit)
  const tableData = category.data.slice(10, 25)

  return (
    <section
      id={`section-${category.key}`}
      className="scroll-mt-24 py-16 sm:py-20"
      aria-label={category.title}
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[300px_1fr]">
        {/* Poster / identity column */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-border gold-glow">
              <Image
                src={category.poster || '/placeholder.svg'}
                alt={`${category.title} artwork`}
                fill
                sizes="300px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                  <Film className="h-3 w-3" />
                  {String(index + 1).padStart(2, '0')} / 04
                </span>
              </div>
            </div>
            <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight">
              {category.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {category.tagline}
            </p>
            <div className="mt-4 rounded-xl border border-border bg-card/50 p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Current Leader
              </p>
              <p className="mt-1 font-heading text-lg font-bold text-foreground">
                {category.data[0].name}
              </p>
              <p className="font-mono text-sm font-semibold text-gold-gradient">
                {formatMoney(category.data[0].val, currency)}
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-wider text-muted-foreground">
                {category.unit}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Chart + table column */}
        <div className="min-w-0">
          <div className="rounded-2xl border border-border bg-card/40 p-5 sm:p-7">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="font-heading text-xl font-semibold">
                {state === 0 ? 'Top 5' : 'Top 10'} by Revenue
              </h3>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                {currency === 'USD' ? 'USD Millions' : 'INR Crores'}
              </span>
            </div>

            <CategoryChart data={chartData} currency={currency} />

            <AnimatePresence initial={false}>
              {state === 2 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <span className="h-px flex-1 bg-border" />
                    Ranks 11 – 25
                    <span className="h-px flex-1 bg-border" />
                  </div>
                  <RankingsTable
                    data={tableData}
                    startRank={11}
                    currency={currency}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setState((s) => (s + 1) % 3)}
                className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/60 hover:bg-primary/10"
              >
                {BUTTON_LABELS[state]}
                <ChevronDown
                  className={`h-4 w-4 text-primary transition-transform ${
                    state === 2 ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
