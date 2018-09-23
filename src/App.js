import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { reducers } from './reducers'
import { SequencerContainer } from './sequencer'

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

const store = createStore(reducers)

class App extends Component {
  render() {
    return (
      <Container>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <SequencerContainer />
          </ThemeProvider>
        </Provider>
      </Container>
    )
  }
}

export default App
