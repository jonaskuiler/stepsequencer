import React, { Component } from 'react'
import styled from 'styled-components'
import { Step } from './Step'
import { Pad } from './Pad'

const samples = {
  BD: new Audio(require('./samples/bd01.wav')),
  HH: new Audio(require('./samples/hh01.wav')),
  SD: new Audio(require('./samples/sd01.wav')),
  RS: new Audio(require('./samples/rs01.wav')),
}

const stopPlayAudio = audio => {
  audio.pause()
  audio.currentTime = 0
  audio.play()
}

export const range = length => [...new Array(length).keys()]

const createNamedTrack = (name = '') => {
  return (state = {}, action) => {
    if (name !== action.name) {
      return state
    }

    switch (action.type) {
      case 'TOGGLE_STEP':
        return {
          ...state,
          [action.payload]: !state[action.payload]
        }
      default:
        return state
    }
  }
}

export class Sequencer extends Component {
  state = {
    instrument: 'BD',
    playing: false,
    currentStep: null,
    BD: createNamedTrack('BD'),
    HH: createNamedTrack('HH'),
    SD: createNamedTrack('SD'),
    RS: createNamedTrack('RS')
  }

  interval = null

  onPlayPause = () => {
    if (this.state.playing) {
      this.onPause()
    } else {
      this.onPlay()
    }
  }

  onPlay = () => {
    const bpm = 128
    const steps = 16
    const second = 1000
    const minute = 60 * second
    const interval = minute / bpm / 4

    this.interval = setInterval(() =>
      this.onTick(), interval)

    this.setState(prevState => ({
      playing: true,
      currentStep: prevState !== null
        ? prevState.currentStep
        : 0
    }))
  }

  onPause = () => {
    clearInterval(this.interval)

    this.setState({ playing: false })
  }

  onStop = () => {
    clearInterval(this.interval)

    this.setState({ playing: false, currentStep: null })
  }

  onTick = () => {
    this.setState(prevState => ({
      currentStep: (prevState.currentStep + 1) % 16
    }), () => {
      const instruments = ['BD', 'HH', 'SD', 'RS']

      for (let i = 0; i < instruments.length; i++) {
        let name = instruments[i]

        if (this.state[name][this.state.currentStep]) {
          stopPlayAudio(samples[name])
        }
      }
    })
  }

  onClickNamedPad = (instrument) => () => {
    const sample = samples[instrument]

    this.setState({ instrument })

    if (!this.state.playing) {
      sample.pause()
      sample.currentTime = 0
      sample.play()
    }
  }

  onClickStep = payload => {
    const { instrument } = this.state
    const state = this.state[instrument]
    const sequencer = createNamedTrack(instrument)
    const nextState = sequencer(state, {
      type: 'TOGGLE_STEP',
      name: instrument,
      payload
    })

    this.setState({ [instrument]: nextState })
  }

  render () {
    const sequence = this.state[this.state.instrument]

    return (
      <Container>
        <Controls>
          <Button onClick={this.onPlayPause}>
            {this.state.playing
              ? 'Pause'
              : 'Play'}
          </Button>
          <Button onClick={this.onStop}>Stop</Button>
        </Controls>
        <Steps>
          {range(16).map((index) => {
            const active = this.state.currentStep === index || sequence[index]

            return (
              <Step
                key={index}
                index={index}
                active={active}
                onClick={() => this.onClickStep(index)}
              />
            )
          })}
        </Steps>
        <Instruments>
          {['BD', 'HH', 'SD', 'RS'].map((name, idx) => {
            return <StyledPad
              onClick={this.onClickNamedPad(name)}
              title={['Kick', 'Hihat', 'Snare', 'Rim shot'][idx]}
              active={this.state.instrument === name}
            />
          })}
        </Instruments>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 500px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.1);
`

const Controls = styled.div`
  flex: 1;
`

const Button = styled.button``

const Instruments = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
  /* flex: 1; */
`

const StyledPad = styled(Pad)`
  margin: 0 10px;
`

const Steps = styled.div`
  display: flex;
  justify-content: space-between;
`
