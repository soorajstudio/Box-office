'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'motion/react'
import { ChevronDown, Clapperboard } from 'lucide-react'

const HeroScene = dynamic(() => import('./hero-scene'), { ssr: false })

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  return (
    <section
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden"
      aria-label="Introduction"
    >
      {/* 3D layer */}
      <motion.div style={{ scale: sceneScale }} className="absolute inset-0">
        <HeroScene />
      </motion.div>

      {/* cinematic vignette + grain */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 30%, transparent 40%, rgba(10,10,8,0.55) 75%, rgba(10,10,8,0.95) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage: 'url(/textures/film-grain.png)',
          backgroundSize: '420px',
        }}
        aria-hidden
      />

      {/* copy */}
      <motion.div
        style={{ y: textY, opacity }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-primary backdrop-blur-sm"
        >
          <Clapperboard className="h-3.5 w-3.5" />
          Box Office Intelligence · 2026
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
          className="font-heading text-balance text-5xl font-bold leading-[1.05] tracking-tight text-foreground text-shadow-cinematic sm:text-7xl lg:text-8xl"
        >
          Where the World&apos;s
          <br />
          <span className="text-gold-gradient">Biggest Stories</span> Earn
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
          className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          The definitive box office &amp; franchise intelligence platform — built
          for producers, distributors, and studios across global, Indian, and
          Malayalam cinema.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#explorer"
            className="group inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] gold-glow"
          >
            Explore the Data
            <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#featured"
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-primary/10"
          >
            View Featured Films
          </a>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.8 }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-4 w-4 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  )
}
