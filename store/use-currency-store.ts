import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { mmkvStorage } from '@/helpers/mmkv'
import {
  ConversionResponse,
  convertCurrency,
  Currency,
  fetchCurrencies,
} from '@/api/currencies'

interface CurrencyStore {
  currencies: Currency[]
  result: string
  amount: string
  defaultCurrencies: [Currency, Currency] | []
  setDefaultCurrency: (currency: Currency, index: '0' | '1') => void
  fetchCurrencies: () => Promise<void>
  switchCurrencies: () => void
  setAmount: (amount: string) => void
  convertCurrency: () => Promise<void>
}

// @ts-ignore
export const useCurrencyStore = create(
  persist<CurrencyStore>(
    (set, get) => ({
      currencies: [],
      defaultCurrencies: [],
      amount: '',
      result: '',
      setAmount: (amount: string) => {
        set({ amount })
      },
      fetchCurrencies: async () => {
        const currencies = await fetchCurrencies()
        set({ currencies })
      },
      switchCurrencies: () => {
        const [fromCurrency, toCurrency] = get().defaultCurrencies
        if (!fromCurrency || !toCurrency) {
          return
        }
        set({ defaultCurrencies: [toCurrency, fromCurrency] })
        get().convertCurrency()
      },
      convertCurrency: async () => {
        const [fromCurrency, toCurrency] = get().defaultCurrencies
        if (!fromCurrency || !toCurrency) {
          return
        }
        const amount = get().amount
        if (amount === '') {
          set({ result: '' })
          return
        }
        const { result } = await convertCurrency(
          fromCurrency.code,
          toCurrency.code,
          amount,
        )
        set({ result: result.toFixed(2) })
      },
      setDefaultCurrency: (currency, index) => {
        const defaultCurrencies = get().defaultCurrencies
        defaultCurrencies[index] = currency
        set({ defaultCurrencies })
      },
    }),
    {
      name: 'currency-store',
      // @ts-expect-error Partialize error with Zustand
      partialize: state => ({
        defaultCurrencies: state.defaultCurrencies,
        currencies: state.currencies,
      }),
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
)
