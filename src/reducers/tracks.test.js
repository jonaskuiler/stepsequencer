import {
  toggleStep,
  setTrackVolume,
  createNamedTrack
} from './tracks'

describe('Named track reducer', () => {
  it('Should be able to create a named track', () => {
    const track = createNamedTrack('TEST')

    expect(track).toBeDefined()
  })

  it('Should not do anything when track name is mismatched', () => {
    const track = createNamedTrack('TEST')
    const prevState = track(undefined, {})
    const action = toggleStep('TEST_2', 5)

    expect(track(prevState, action)).toEqual(prevState)
  })

  it('Should be able to toggle a step in the track', () => {
    const name = 'TEST'
    const track = createNamedTrack(name)
    const action = toggleStep(name, 5)
    const state = track(undefined, action)

    expect(state).toHaveProperty('5', true)
    expect(track(state, action)).toHaveProperty('5', false)
  })

  it('Should be able to set the volume of a track', () => {
    const name = 'TEST'
    const track = createNamedTrack(name)
    const action = setTrackVolume(name, 0.5)
    const state = track(undefined, action)

    expect(state).toHaveProperty('volume', 0.5)
  })

  it('Should return the state when no action is matched', () => {
    const track = createNamedTrack('TEST')
    const action = { name: 'TEST' }
    const prevState = track(undefined, action)

    expect(track(prevState, action)).toEqual(prevState)
  })
})
