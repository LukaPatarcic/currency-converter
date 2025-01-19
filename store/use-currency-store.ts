import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { mmkvStorage } from '@/helpers/mmkv'
import { Currency, fetchCurrencies } from '@/api/currencies'

interface CurrencyStore {
  currencies: Currency[]
  defaultCurrencies: [Currency, Currency] | []
  setDefaultCurrency: (currency: Currency, index: '0' | '1') => void
  fetchCurrencies: () => Promise<void>
}

export const useCurrencyStore = create(
  persist<CurrencyStore>(
    (set, get) => ({
      currencies: [],
      defaultCurrencies: [],
      fetchCurrencies: async () => {
        const currencies = await fetchCurrencies()
        set({ currencies })
      },
      setDefaultCurrency: (currency, index) => {
        const defaultCurrencies = get().defaultCurrencies
        defaultCurrencies[index] = currency
        set({ defaultCurrencies })
      },
    }),
    {
      name: 'currency-store',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
)
