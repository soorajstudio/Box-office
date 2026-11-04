'use client'

import { Clapperboard } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-gradient text-primary-foreground">
                <Clapperboard className="h-5 w-5" />
              </span>
              <span className="font-heading text-xl font-bold tracking-tight">
                Lumi<span className="text-gold-gradient">è</span>re
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Box office &amp; franchise intelligence built for the film
              industry. Data integrated for 2026 across global, Indian, and
              Malayalam cinema.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            <div>
              <p className="mb-3 font-semibold text-foreground">Markets</p>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#section-global" className="hover:text-primary">Global</a></li>
                <li><a href="#section-indian" className="hover:text-primary">Indian</a></li>
                <li><a href="#section-malayalam" className="hover:text-primary">Malayalam</a></li>
                <li><a href="#section-franchises" className="hover:text-primary">Franchises</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-semibold text-foreground">Platform</p>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#featured" className="hover:text-primary">Featured</a></li>
                <li><a href="#explorer" className="hover:text-primary">Explorer</a></li>
                <li><span className="cursor-default">Reports</span></li>
                <li><span className="cursor-default">API Access</span></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-semibold text-foreground">Company</p>
              <ul className="space-y-2 text-muted-foreground">
                <li><span className="cursor-default">About</span></li>
                <li><span className="cursor-default">Methodology</span></li>
                <li><span className="cursor-default">Contact</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 Lumière Intelligence. All figures are illustrative estimates.</p>
          <p>Conversions at 1 USD ≈ ₹83.</p>
        </div>
      </div>
    </footer>
  )
}
