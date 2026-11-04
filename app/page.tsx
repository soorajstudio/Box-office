'use client'

import { CurrencyProvider } from '@/components/currency-context'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { StatsBar } from '@/components/stats-bar'
import { FeaturedFilms } from '@/components/featured-films'
import { ExplorerSection } from '@/components/explorer-section'
import { SiteFooter } from '@/components/site-footer'
import { categories } from '@/lib/movie-data'

export default function Page() {
  return (
    <CurrencyProvider>
      <SiteHeader />
      <main>
        <Hero />
        <StatsBar />
        <FeaturedFilms />

        <div id="explorer" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                The Explorer
              </p>
              <h2 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
                Deep-dive every <span className="text-gold-gradient">market</span>
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                Interactive rankings across four categories. Switch currency
                anytime, expand from Top 5 to the full Top 25, and read the data
                the way studios do.
              </p>
            </div>
          </div>

          <div className="divide-y divide-border">
            {categories.map((category, index) => (
              <ExplorerSection
                key={category.key}
                category={category}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </CurrencyProvider>
  )
}
