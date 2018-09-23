import {
  PLAY_PAUSE,
  SET_TRACK,
  SET_BPM,
  SET_STEP,
  STOP,
  player
} from './player'

describe('Player reducer', () => {
  it('Should be able to toggle play/pause', () => {
    const action = {
      type: PLAY_PAUSE
    }

    const state = player(undefined, action)

    expect(state).toHaveProperty('playing', true)
    expect(player(state, action)).toHaveProperty('playing', false)
  })

  it('Should be able to stop playing', () => {
    const action = {
      type: STOP
    }

    expect(player(undefined, action)).toHaveProperty('playing', false)
  })

  it('Should be able to set the Beats Per Minute', () => {
    const action = {
      type: SET_BPM,
      payload: 150
    }

    expect(player(undefined, action)).toHaveProperty('bpm', 150)
  })

  it('Should be able to set the current track', () => {
    const action = {
      type: SET_TRACK,
      payload: 'hihat'
    }

    expect(player(undefined, action)).toHaveProperty('track', 'hihat')
  })

  it('Should be able to set the current step', () => {
    const action = {
      type: SET_STEP,
      payload: 10
    }

    expect(player(undefined, action)).toHaveProperty('step', 10)
  })
})
