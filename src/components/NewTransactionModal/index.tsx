import Modal from 'react-modal'
import { Container, TransactionTypeContainer, RadioBox } from './styles'
import income from '../../assets/income.svg'
import outcome from '../../assets/outcome.svg'
import close from '../../assets/close.svg'
import { FormEvent, useState } from 'react'
import { useTransactions } from '../../hooks/useTransactions'

interface NewTransactionModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

export function NewTransactionModal(props: NewTransactionModalProps) {
  const { createTransaction } = useTransactions()

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [type, setType] = useState('deposit')

  async function handleCreateNewTransaction(e: FormEvent) {
    e.preventDefault()

    await createTransaction({
      title,
      amount,
      category,
      type
    })

    setTitle('')
    setAmount(0)
    setCategory('')
    setType('')
    props.onRequestClose()
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content">
      <button type="submit" onClick={props.onRequestClose}>
        <img src={close} alt="Fechar modal" className="react-modal-close" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isActive={type === 'deposit'}
            activeColor="green"
            onClick={() => {
              setType('deposit')
            }}>
            <img src={income} alt="Entrada" />
            Entrada
          </RadioBox>

          <RadioBox
            type="button"
            isActive={type === 'withdraw'}
            activeColor="red"
            onClick={() => {
              setType('withdraw')
            }}>
            <img src={outcome} alt="Saída" />
            Saída
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  )
}
