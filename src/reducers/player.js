// @flow

export const PLAY_PAUSE = 'PLAYER/PLAY_PAUSE'
export const STOP = 'PLAYER/STOP'
export const SET_BPM = 'PLAYER/SET_BPM'
export const SET_TRACK = 'PLAYER/SET_TRACK'
export const SET_STEP = 'PLAYER/SET_STEP'

export const playPause = () => ({ type: PLAY_PAUSE })

export const stop = () => ({ type: STOP })

export const setBpm = (payload: number) => ({ type: SET_BPM, payload })

export const setTrack = (payload: string) => ({ type: SET_TRACK, payload })

export const setStep = (payload: number) => ({ type: SET_STEP, payload })

const initialState = {
  playing: false,
  bpm: 128,
  track: 'kick', // @TODO hardcoded constant
  step: -1
}

type State = {
  playing: boolean,
  bpm: number,
  track: string,
  step: number
}

type Action = {
  type: string,
  payload: any
}

export const player = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case PLAY_PAUSE:
      return { ...state, playing: !state.playing }
    case STOP:
      return { ...state, playing: false, step: -1 }
    case SET_BPM:
      return { ...state, bpm: action.payload }
    case SET_TRACK:
      return { ...state, track: action.payload }
    case SET_STEP:
      return { ...state, step: action.payload }
    default:
      return state
  }
}

export const selectPlayer = (state: any) => state.player
