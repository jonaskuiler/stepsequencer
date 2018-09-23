type TrackState = { [number]: boolean }

type TrackAction = {
  type: string,
  name: string,
  payload: any,
  volume: number
}

export const TOGGLE_STEP = 'NAMED_TRACK/TOGGLE_STEP'

export const SET_VOLUME = 'NAMED_TRACK/SET_VOLUME'

export const toggleStep = (name: string, payload: number) => ({
  type: TOGGLE_STEP,
  name,
  payload
})

export const setTrackVolume = (name: string, payload: number) => ({
  type: SET_VOLUME,
  name,
  payload
})

export const createNamedTrack = (name: string) => {
  return (state: TrackState = { volume: 1 }, action: TrackAction) => {
    if (name !== action.name) {
      return state
    }

    switch (action.type) {
      case TOGGLE_STEP:
        return {
          ...state,
          [action.payload]: !state[action.payload]
        }
      case SET_VOLUME:
        return {
          ...state,
          volume: action.payload
        }
      default:
        return state
    }
  }
}

export const selectTrack = (state, name) => state.tracks[name]

export const selectTracks = (state, name) => state.tracks
