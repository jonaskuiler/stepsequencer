// @flow

import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Pad } from './Pad'
import { Steps } from './Steps'
import { Controls } from './Controls'
import {
  setTrack,
  setBpm,
  playPause,
  stop,
  setStep,
  selectPlayer
} from '../reducers/player'
import {
  toggleStep,
  setTrackVolume,
  selectTracks,
  selectTrack
} from '../reducers/tracks'

const samples = {
  // $FlowFixMe
  kick: new Audio(require('./samples/bd01.wav')),
  // $FlowFixMe
  hihat: new Audio(require('./samples/hh01.wav')),
  // $FlowFixMe
  snare: new Audio(require('./samples/sd01.wav')),
  // $FlowFixMe
  rimshot: new Audio(require('./samples/rs01.wav')),
}

const stopPlayAudio = (audio, volume = 1) => {
  audio.pause()
  audio.currentTime = 0
  audio.volume = volume
  audio.play()
}

const mapStateToProps = (state, ownProps) => {
  const playerState = selectPlayer(state)
  const tracks = selectTracks(state)
  const currentTrack = selectTrack(state, playerState.track)

  return {
    ...playerState,
    currentTrack,
    tracks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClickNamedPad: name => dispatch(setTrack(name)),
    onClickStep: (name, step) => dispatch(toggleStep(name, step)),
    onPlayPause: () => dispatch(playPause()),
    onStop: () => dispatch(stop()),
    onChangeBpm: bpm => dispatch(setBpm(bpm)),
    setStep: step => dispatch(setStep(step)),
    setTrackVolume: (track, value) => dispatch(setTrackVolume(track, value)),
    setTrack: name => dispatch(setTrack(name))
  }
}

const enhance = connect(mapStateToProps, mapDispatchToProps)

const second = 1000
const minute = 60 * second

class Sequencer extends React.Component {
  timeoutId: TimeoutID

  onClickPad = (name: string) => {
    const sample = samples[name]
    const { volume } = this.props.tracks[name]

    if (!this.props.playing) {
      stopPlayAudio(sample, volume)
    }

    this.props.setTrack(name)
  }

  componentDidUpdate (prevProps) {
    if (this.props.playing !== prevProps.playing) {
      if (this.props.playing) {
        this.timeoutId = this.tick(minute / this.props.bpm)
      } else {
        clearTimeout(this.timeoutId)
      }
    }
  }

  tick = delay => setTimeout(() => {
    this.timeoutId = this.tick(minute / this.props.bpm / 4)
    this.onTick()
  }, delay)

  onTick = () => {
    const { tracks, step } = this.props
    const keys = Object.keys(samples)

    this.props.setStep((step + 1) % 16)

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]
      let track = tracks[key]
      let sample = samples[key]

      if (track[step]) {
        stopPlayAudio(sample, track.volume)
      }
    }
  }

  render () {
    return <Container>
      <Main>
        <Instruments>
          {['kick', 'snare', 'hihat', 'rimshot'].map((name, idx) => {
            const volume = this.props.tracks[name].volume

            return <Track key={idx}>
              <Range
                value={volume * 100}
                onChange={event => {
                  this.props.setTrackVolume(name, event.target.value / 100)
                }}
              />
              <StyledPad
                onClick={() => this.onClickPad(name)}
                title={['Kick', 'Snare', 'Hihat', 'Rim shot'][idx]}
                active={this.props.currentTrack === name}
              />
            </Track>
          })}
        </Instruments>
        <Steps
          onClickStep={(step) => this.props.onClickStep(this.props.track, step)}
          currentStep={this.props.currentStep}
          sequence={this.props.currentTrack}
        />
      </Main>
      <Aside>
        <Controls
          onPlayPause={this.props.onPlayPause}
          onStop={this.props.onStop}
          onChangeBpm={this.props.onChangeBpm}
          playing={this.props.playing}
          bpm={this.props.bpm}
        />
      </Aside>
    </Container>
  }
}

export default enhance(Sequencer)

const Track = styled.div`
  display: flex;
  flex-direction: column;
`

const Range = styled.input.attrs({
  type: 'range',
  min: 1,
  max: 100
})`
  transform: rotate(-90deg);
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`

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
