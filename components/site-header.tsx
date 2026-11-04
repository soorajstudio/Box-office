'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Clapperboard, IndianRupee, DollarSign } from 'lucide-react'
import { useCurrency } from './currency-context'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'Global', href: '#section-global' },
  { label: 'Indian', href: '#section-indian' },
  { label: 'Malayalam', href: '#section-malayalam' },
  { label: 'Franchises', href: '#section-franchises' },
]

export function SiteHeader() {
  const { currency, toggle } = useCurrency()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <a href="#" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-gradient text-primary-foreground">
            <Clapperboard className="h-5 w-5" />
          </span>
          <span className="font-heading text-xl font-bold tracking-tight">
            Lumi<span className="text-gold-gradient">è</span>re
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          onClick={toggle}
          className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-semibold text-foreground transition-all hover:border-primary/60 hover:bg-primary/10"
          aria-label={`Switch currency to ${currency === 'USD' ? 'INR' : 'USD'}`}
        >
          {currency === 'USD' ? (
            <DollarSign className="h-4 w-4 text-primary" />
          ) : (
            <IndianRupee className="h-4 w-4 text-primary" />
          )}
          <span className="tabular-nums">{currency}</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            · Tap for {currency === 'USD' ? '₹' : '$'}
          </span>
        </button>
      </div>
    </motion.header>
  )
}
