import React, { Component } from 'react'
import styled from 'styled-components'
import { Sequencer } from './sequencer'

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

class App extends Component {
  render() {
    return (
      <Container>
        <Sequencer />
      </Container>
    )
  }
}

export default App
