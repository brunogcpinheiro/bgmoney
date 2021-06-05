import { GlobalStyle } from './styles/global'
import { Header } from './components/Header'
import { Dashboard } from './components/Dashboard'
import { NewTransactionModal } from './components/NewTransactionModal'
import Modal from 'react-modal'
import { useState } from 'react'
import { TransactionsProvider } from './hooks/useTransactions'

Modal.setAppElement('#root')

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false)

  function handleOpenNewTransactionOpenModal() {
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionOpenModal() {
    setIsNewTransactionModalOpen(false)
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionOpenModal} />
      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionOpenModal}
      />

      <GlobalStyle />
    </TransactionsProvider>
  )
}
