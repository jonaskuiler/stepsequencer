// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import { Pad } from './Pad'
import { Steps } from './Steps'
import { Controls } from './Controls'

type TrackState = { [number]: boolean }

type TrackAction = {
  type: string,
  payload: number
}

const samples = {
  // $FlowFixMe
  BD: new Audio(require('./samples/bd01.wav')),
  // $FlowFixMe
  HH: new Audio(require('./samples/hh01.wav')),
  // $FlowFixMe
  SD: new Audio(require('./samples/sd01.wav')),
  // $FlowFixMe
  RS: new Audio(require('./samples/rs01.wav')),
}

const stopPlayAudio = audio => {
  audio.pause()
  audio.currentTime = 0
  audio.play()
}

const createNamedTrack = (name = '') => {
  return (state: TrackState = {}, action: TrackAction) => {
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

type Props = {}

type State = {
  instrument: string,
  playing: boolean,
  currentStep: number,
  bpm: number,
  BD: TrackState,
  HH: TrackState,
  SD: TrackState,
  RS: TrackState
}

export class Sequencer extends Component<Props, State> {
  state: State = {
    instrument: 'BD',
    playing: false,
    currentStep: -1,
    bpm: 120,
    BD: {},
    HH: {},
    SD: {},
    RS: {}
  }

  timeout: TimeoutID

  onPlayPause = () => {
    if (this.state.playing) {
      this.onPause()
    } else {
      this.onPlay()
    }
  }

  onPlay = () => {
    const bpm = this.state.bpm
    const second = 1000
    const minute = 60 * second
    const bpmInMs = bpm => minute / bpm / 4

    const ticker = bpm => setTimeout(() => {
      this.timeout = ticker(bpmInMs(this.state.bpm))
      this.onTick()
    }, bpm)

    this.timeout = ticker(bpmInMs(bpm))

    this.setState(prevState => ({
      playing: true,
      currentStep: prevState !== null
        ? prevState.currentStep
        : 0
    }))
  }

  onPause = () => {
    clearTimeout(this.timeout)

    this.setState({ playing: false })
  }

  onStop = () => {
    clearTimeout(this.timeout)

    this.setState({ playing: false, currentStep: -1 })
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

  onClickNamedPad = (instrument: string) => () => {
    const sample = samples[instrument]

    this.setState({ instrument })

    if (!this.state.playing) {
      sample.pause()
      sample.currentTime = 0
      sample.play()
    }
  }

  onClickStep = (payload: number) => {
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

  onChangeBpm = (event: SyntheticEvent<HTMLInputElement>) => {
    // $FlowFixMe
    this.setState({ bpm: event.target.value })
  }

  render () {
    const sequence = this.state[this.state.instrument]

    return (
      <Container>
        <Main>
          <Instruments>
            {['BD', 'HH', 'SD', 'RS'].map((name, idx) => {
              return <StyledPad
                key={idx}
                onClick={this.onClickNamedPad(name)}
                title={['Kick', 'Hihat', 'Snare', 'Rim shot'][idx]}
                active={this.state.instrument === name}
              />
            })}
          </Instruments>
          <Steps
            onClickStep={this.onClickStep}
            currentStep={this.state.currentStep}
            sequence={sequence}
          />
        </Main>
        <Aside>
          <Controls
            onPlayPause={this.onPlayPause}
            onStop={this.onStop}
            onChangeBpm={this.onChangeBpm}
            playing={this.state.playing}
            bpm={this.state.bpm}
        />
        </Aside>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 1000px;
  height: 620px;
  background-color: ${({ theme }) => theme.background};
  border: 4px solid ${({ theme }) => theme.primary};
  border-radius: 4px;
`

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40px 20px 40px 40px;
`

const Aside = styled.div`
  display: flex;
  padding: 40px 40px 40px 20px;
`

const Instruments = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
`

const StyledPad = styled(Pad)`
  margin: 0 10px;
`
