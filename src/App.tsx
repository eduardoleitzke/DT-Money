import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/theme/default'
import { GbloalStyle } from './styles/global'
import { Transactions } from './pages/Transactions'
import { TransactionsProvider } from './contexts/TransactionsContext'
export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
      <GbloalStyle />
    </ThemeProvider>
  )
}
