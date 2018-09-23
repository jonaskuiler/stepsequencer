import React from 'react'
import { Sequencer } from './Sequencer'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'

const tracks = {
  kick: { volume: 1 },
  snare: { volume: 1 },
  hihat: { volume: 1 },
  rimshot: { volume: 1 }
}

describe('Sequencer component', () => {
  let component, instance

  // beforeEach(() => {
  //   component = shallow(
  //     <Sequencer
  //       tracks={tracks}
  //       playing={true}
  //       setTrack={() => {}}
  //     />
  //   )
  // })

  // it('should play a sound when you click a pad', () => {
  //   // Not sure how to test this,
  //   // I don't expect any outcome other than playing audio
  //   component.instance().onClickPad('kick')
  // })

  // it('should start/clear a ticker when the "playing" prop changes', () => {
  //   const props = component.props()

  //   component.instance().componentDidUpdate({ ...props, playing: false })
  // })
})
