import Logo from '../../assets/logo.svg'
import { Container, Content } from './styles'

interface HeaderProps {
  onOpenNewTransactionModal: () => void
}

export function Header(props: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={Logo} alt="bg money" />
        <button type="button" onClick={props.onOpenNewTransactionModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  )
}
