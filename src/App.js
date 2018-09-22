import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Sequencer } from './sequencer'

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const theme = {
  background: 'rgba(0, 0, 0, 0.72)',
  primary: '#0000ff'
}

class App extends Component {
  render() {
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <Sequencer />
        </ThemeProvider>
      </Container>
    )
  }
}

export default App
