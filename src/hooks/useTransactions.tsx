import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext
} from 'react'
import api from '../services/api'

interface Transaction {
  id: number
  title: string
  amount: number
  category: string
  type: string
  createdAt: Date
}

interface TransactionsContextProps {
  children: ReactNode
}

interface TransactionsContextValues {
  transactions: Transaction[]
  createTransaction: (transaction: TransactionInput) => Promise<void>
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

const TransactionsContext = createContext<TransactionsContextValues>(
  {} as TransactionsContextValues
)

export function TransactionsProvider({ children }: TransactionsContextProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    async function getTransactions() {
      const { data } = await api.get('/transactions')
      setTransactions(data.transactions)
    }

    getTransactions()
  }, [])

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date()
    })
    const { transaction } = response.data

    setTransactions([...transactions, transaction])
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)

  return context
}
