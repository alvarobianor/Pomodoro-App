import { Button } from "./components/Button";

import { ThemeProvider } from 'styled-components'
import { defaultTheme } from "./contexts/themes/default";

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>Álvaro Bianor</h1>
      <Button />
      <Button variant="secondary" />
      <Button variant="success" />
      <Button variant="warning" />
      <Button variant="danger" />
    </ThemeProvider>
  )
}

