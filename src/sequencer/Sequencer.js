// @flow

import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Pad } from './Pad'
import { Steps } from './Steps'
import { Controls } from './Controls'
import { VolumeSlider } from './VolumeSlider'
import { setTrack, setBpm, playPause, stop, setStep, selectPlayer } from '../reducers/player'
import { toggleStep, setTrackVolume, selectTracks, selectTrack } from '../reducers/tracks'
import { audioSamples } from './audioSamples'

type Tracks = { [string]: any }

type StateProps = {
  playing: boolean,
  bpm: number,
  track: string,
  step: number,
  tracks: Tracks,
  currentTrack: { volume: number, [number]: boolean },
  currentStep: number
}

type DispatchProps = {
  onClickNamedPad: (name: string) => {},
  onClickStep: (name: string) => {},
  onPlayPause: () => {},
  onStop: () => {},
  onChangeBpm: (bpm: number) => {},
  setStep: (step: number) => {},
  setTrackVolume: (track: string, value: number) => {},
  setTrack: (string) => {},
}

type OwnProps = {}

type Props = StateProps & DispatchProps & OwnProps

export const stopPlayAudio = (audio: any, volume: number = 1) => {
  audio.pause()
  audio.currentTime = 0
  audio.volume = volume
  audio.play()
}

const mapStateToProps = (state, ownProps): StateProps => {
  const playerState = selectPlayer(state)
  const tracks = selectTracks(state)
  const currentTrack = selectTrack(state, playerState.track)
  return {
    ...playerState,
    currentTrack,
    tracks
  }
}

const mapDispatchToProps = (dispatch): DispatchProps => ({
  onClickNamedPad: name => dispatch(setTrack(name)),
  onClickStep: (name, step) => dispatch(toggleStep(name, step)),
  onPlayPause: () => dispatch(playPause()),
  onStop: () => dispatch(stop()),
  onChangeBpm: bpm => dispatch(setBpm(bpm)),
  setStep: step => dispatch(setStep(step)),
  setTrackVolume: (track, value) => dispatch(setTrackVolume(track, value)),
  setTrack: name => dispatch(setTrack(name))
})

const enhance = connect(mapStateToProps, mapDispatchToProps)
const second = 1000
const minute = 60 * second

export class Sequencer extends React.Component<Props> {
  timeoutId: TimeoutID

  onClickPad = (name: string) => {
    const sample = audioSamples[name]
    const { volume } = this.props.tracks[name]

    if (!this.props.playing) {
      stopPlayAudio(sample, volume)
    }

    if (this.props.setTrack) {
      this.props.setTrack(name)
    }
  }

  componentDidUpdate (prevProps: Props) {
    if (this.props.playing !== prevProps.playing) {
      if (this.props.playing) {
        this.timeoutId = this.tick(minute / this.props.bpm)
      } else {
        clearTimeout(this.timeoutId)
      }
    }
  }

  tick = (delay: number) => setTimeout(() => {
    const { tracks, step } = this.props

    this.timeoutId = this.tick(minute / this.props.bpm / 4)
    this.props.setStep((step + 1) % 16)

    this.onTick({ tracks, step })
  }, delay)

  onTick = ({ tracks, step }: { tracks: Tracks, step: number }) => {
    const keys = Object.keys(audioSamples)

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i],
        track = tracks[key],
        sample = audioSamples[key]

      if (track[step]) {
        stopPlayAudio(sample, track.volume)
      }
    }
  }

  render () {
    return <Container>
      <Main>
        <Instruments>
          {['kick', 'snare', 'hihat', 'rimshot'].map((name, index) => {
            const volume = this.props.tracks[name].volume
            const title = ['Kick', 'Snare', 'Hihat', 'Rim shot'][index]

            return <Track key={index}>
              <VolumeSlider
                name={name}
                value={volume * 100}
                onChange={this.props.setTrackVolume}
              />
              <StyledPad
                name={name}
                onClick={this.onClickPad}
                title={title}
                active={this.props.currentTrack === name}
              />
            </Track>
          })}
        </Instruments>
        <Steps
          track={this.props.track}
          onClickStep={this.props.onClickStep}
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

export const SequencerContainer = enhance(Sequencer)

const Track = styled.div`
  display: flex;
  flex-direction: column;
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
