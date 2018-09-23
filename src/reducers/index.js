// @flow

import { combineReducers } from 'redux'
import { createNamedTrack } from './tracks'
import { player } from './player'

const kick = createNamedTrack('kick') // @TODO hardcoded constant
const snare = createNamedTrack('snare') // @TODO hardcoded constant
const hihat = createNamedTrack('hihat') // @TODO hardcoded constant
const rimshot = createNamedTrack('rimshot') // @TODO hardcoded constant

export const reducers = combineReducers({
  player,
  tracks: combineReducers({
    kick,
    snare,
    hihat,
    rimshot
  })
})
