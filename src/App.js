import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
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

let initialState

try {
  const params = new URLSearchParams(window.location.search)
  const sequence = params.get('sequence')

  console.log('sequence', sequence)

  initialState = { tracks: JSON.parse(atob(sequence)) }
} catch (error) {
  initialState = {}
}

const store = createStore(reducers, initialState)

class App extends Component {
  render() {
    return (
      <Container>
        <Router>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <SequencerContainer />
            </ThemeProvider>
          </Provider>
        </Router>
      </Container>
    )
  }
}

export default App
