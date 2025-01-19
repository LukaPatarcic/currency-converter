export interface Currency {
  code: string
  decimal_digits: number
  name: string
  name_plural: string
  rounding: number
  symbol: string
  symbol_native: string
}

export interface ConversionResponse {
  success: boolean
  query: Query
  info: Info
  historical: boolean
  date: string
  timestamp: number
  result: number
}

export interface Query {
  from: string
  to: string
  amount: number
}

export interface Info {
  rate: number
}

const baseUrl = 'https://api.fxratesapi.com'

export const fetchCurrencies = async () => {
  const response = await fetch(`${baseUrl}/currencies`)
  const currencies = (await response.json()) as Record<string, Currency>
  return Object.values(currencies)
}

export const convertCurrency = async (
  from: string,
  to: string,
  amount: string,
) => {
  const url = new URL(`${baseUrl}/convert`)
  url.searchParams.set('from', from)
  url.searchParams.set('to', to)
  url.searchParams.set('amount', amount)
  url.searchParams.set('format', 'json')
  const response = await fetch(url)

  return (await response.json()) as ConversionResponse
}
