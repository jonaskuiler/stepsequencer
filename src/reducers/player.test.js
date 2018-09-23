import {
  playPause,
  stop,
  setBpm,
  setTrack,
  setStep,
  player
} from './player'

describe('Player reducer', () => {
  it('Should be able to toggle play/pause', () => {
    const action = playPause()
    const state = player(undefined, action)

    expect(state).toHaveProperty('playing', true)
    expect(player(state, action)).toHaveProperty('playing', false)
  })

  it('Should be able to stop playing', () => {
    const action = stop()

    expect(player(undefined, action)).toHaveProperty('playing', false)
  })

  it('Should be able to set the Beats Per Minute', () => {
    const action = setBpm(150)

    expect(player(undefined, action)).toHaveProperty('bpm', 150)
  })

  it('Should be able to set the current track', () => {
    const action = setTrack('hihat')

    expect(player(undefined, action)).toHaveProperty('track', 'hihat')
  })

  it('Should be able to set the current step', () => {
    const action = setStep(10)

    expect(player(undefined, action)).toHaveProperty('step', 10)
  })
})
