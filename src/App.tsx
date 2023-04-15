import { Button } from './components/Button'

import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './contexts/themes/default'
import { GlobalStyle } from './styles/global'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>Álvaro Bianor</h1>
      <Button>Álvaro</Button>
      <Button variant="secondary">Bianor</Button>
      <Button variant="success">Sousa</Button>
      <Button variant="warning">Medeiros</Button>
      <Button variant="danger">O mais lindo</Button>

      <GlobalStyle />
    </ThemeProvider>
  )
}
