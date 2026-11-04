'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { Trophy } from 'lucide-react'
import { categories, formatMoney } from '@/lib/movie-data'
import { useCurrency } from './currency-context'

function FeaturedCard({
  index,
  poster,
  category,
  title,
  gross,
}: {
  index: number
  poster: string
  category: string
  title: string
  gross: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 15,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 15,
  })

  function onMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative aspect-[2/3] overflow-hidden rounded-2xl border border-border bg-card"
      >
        <Image
          src={poster || '/placeholder.svg'}
          alt={`${title} — top grossing ${category} film artwork`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
          <Trophy className="h-3 w-3" />
          #1 {category}
        </div>

        <div
          className="absolute inset-x-0 bottom-0 p-4"
          style={{ transform: 'translateZ(40px)' }}
        >
          <h3 className="font-heading text-lg font-bold leading-tight text-foreground">
            {title}
          </h3>
          <p className="mt-1 font-mono text-sm font-semibold text-gold-gradient">
            {gross}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function FeaturedFilms() {
  const { currency } = useCurrency()

  return (
    <section
      id="featured"
      className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8"
      aria-label="Featured films"
    >
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          The Record Holders
        </p>
        <h2 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          Leaders of every <span className="text-gold-gradient">market</span>
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          The single highest-grossing title in each category we track. Hover to
          bring each one to life.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {categories.map((cat, i) => (
          <FeaturedCard
            key={cat.key}
            index={i}
            poster={cat.poster}
            category={cat.title.replace(' Cinema', '').replace('Media ', '')}
            title={cat.data[0].name}
            gross={formatMoney(cat.data[0].val, currency)}
          />
        ))}
      </div>
    </section>
  )
}
