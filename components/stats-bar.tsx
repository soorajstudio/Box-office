'use client'

import { useEffect, useRef } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from 'motion/react'

type Stat = {
  label: string
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
}

const STATS: Stat[] = [
  { label: 'Combined Global Gross', value: 41.4, prefix: '$', suffix: 'B+', decimals: 1 },
  { label: 'Titles Tracked', value: 100, suffix: '', decimals: 0 },
  { label: 'Top Franchise Value', value: 115, prefix: '$', suffix: 'B', decimals: 0 },
  { label: 'Markets Covered', value: 3, suffix: '', decimals: 0 },
]

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) =>
    latest.toLocaleString('en-US', {
      minimumFractionDigits: stat.decimals ?? 0,
      maximumFractionDigits: stat.decimals ?? 0,
    }),
  )

  useEffect(() => {
    if (inView) {
      const controls = animate(count, stat.value, {
        duration: 1.6,
        ease: 'easeOut',
      })
      return controls.stop
    }
  }, [inView, count, stat.value])

  return (
    <span ref={ref} className="tabular-nums">
      {stat.prefix}
      <motion.span>{rounded}</motion.span>
      {stat.suffix}
    </span>
  )
}

export function StatsBar() {
  return (
    <section className="relative z-20 -mt-20 px-5 sm:px-8" aria-label="Key statistics">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4 gold-glow">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-card px-6 py-8 text-center"
          >
            <div className="font-heading text-3xl font-bold text-gold-gradient sm:text-4xl">
              <Counter stat={stat} />
            </div>
            <div className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
