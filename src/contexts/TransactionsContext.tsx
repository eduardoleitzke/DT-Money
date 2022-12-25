import { ReactNode, useState, useEffect, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface TransactionsType {
  id: number
  price: number
  type: 'income' | 'outcome'
  category: string
  description: string
  createdAt: string
}

interface TransactionsContextProviderProps {
  children: ReactNode
}

interface NewTransactionType {
  category: string
  description: string
  price: number
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: TransactionsType[]
  fetchTransaction: (query?: string) => Promise<void>
  createNewTransaction: (data: NewTransactionType) => Promise<void>
}

export const TransactionContext = createContext({} as TransactionContextType)

export function TransactionsProvider({
  children,
}: TransactionsContextProviderProps) {
  const [transactions, setTransactions] = useState<TransactionsType[]>([])
  async function fetchTransaction(query?: string) {
    const response = await api.get('transactions', {
      params: {
        q: query,
      },
    })
    setTransactions(response.data)
  }

  const createNewTransaction = useCallback(async (data: NewTransactionType) => {
    const { category, description, price, type } = data
    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })
    setTransactions((state) => [response.data, ...state])
  }, [])

  useEffect(() => {
    fetchTransaction()
  }, [])
  return (
    <TransactionContext.Provider
      value={{ transactions, fetchTransaction, createNewTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
