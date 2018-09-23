import { TOGGLE_STEP, createNamedTrack } from './tracks'

describe('Named track reducer', () => {
  it('Should be able to create a named track', () => {
    const track = createNamedTrack('TEST')

    expect(track).toBeDefined()
  })

  it('Should be able to toggle a step in the track', () => {
    const name = 'TEST'
    const track = createNamedTrack(name)

    const action = {
      name,
      type: TOGGLE_STEP,
      payload: 5
    }

    const state = track(undefined, action)

    expect(state).toEqual({ "5": true })
    expect(track(state, action)).toEqual({ "5": false })
  })
})
