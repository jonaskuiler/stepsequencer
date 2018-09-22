// @flow

import React from 'react'
import styled from 'styled-components'
import { BpmSlider } from './BpmSlider'

type Props = {
  onPlayPause: Function,
  onStop: Function,
  onChangeBpm: Function,
  bpm: number
}

export const Controls = (props: Props) => {
  return (
    <Container>
      <BpmSlider
        value={props.bpm}
        onChange={props.onChangeBpm}
      />
      <div>
        <Button onClick={props.onPlayPause}>
          {props.playing
            ? 'Pause'
            : 'Play'}
        </Button>
        <Button onClick={props.onStop}>Stop</Button>
      </div>
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const Button = styled.button`
  width: 100px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.6);

  &:first-child {
    margin-right: 10px;
  }
`
