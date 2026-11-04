'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Currency } from '@/lib/movie-data'

type CurrencyContextValue = {
  currency: Currency
  toggle: () => void
  setCurrency: (c: Currency) => void
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD')

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency,
      toggle: () => setCurrency((c) => (c === 'USD' ? 'INR' : 'USD')),
    }),
    [currency],
  )

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider')
  return ctx
}
