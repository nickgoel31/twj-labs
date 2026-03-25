"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export type Currency = "INR" | "USD"

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  toggleCurrency: () => void
  isLoading: boolean
  exchangeRate: number
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>("INR")
  const [isLoading, setIsLoading] = useState(true)
  const [exchangeRate, setExchangeRate] = useState<number>(0.012)

  useEffect(() => {
    const storedCurrency = localStorage.getItem('user-currency') as Currency | null
    if (storedCurrency) {
      setCurrency(storedCurrency)
    }

    const fetchData = async () => {
      try {
        // Fetch Location
        if (!storedCurrency) {
          const locRes = await fetch('https://ipapi.co/json/')
          const locData = await locRes.json()
          if (locData.country_code === 'US') {
            setCurrency('USD')
            localStorage.setItem('user-currency', 'USD')
          } else {
            setCurrency('INR')
            localStorage.setItem('user-currency', 'INR')
          }
        }

        // Fetch Exchange Rate
        const rateRes = await fetch('https://api.frankfurter.dev/v1/latest?base=INR&symbols=USD')
        const rateData = await rateRes.json()
        if (rateData?.rates?.USD) {
          setExchangeRate(rateData.rates.USD)
        }
      } catch (error) {
        console.error('Error in CurrencyProvider initialization:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency)
    localStorage.setItem('user-currency', newCurrency)
  }

  const toggleCurrency = () => {
    const newCurrency = currency === 'INR' ? 'USD' : 'INR'
    handleSetCurrency(newCurrency)
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency, toggleCurrency, isLoading, exchangeRate }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}
