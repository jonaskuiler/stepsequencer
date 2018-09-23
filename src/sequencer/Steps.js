// @flow

import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Step } from './Step'

type Sequence = {
  volume: number,
  [number]: boolean
}

type Props = {
  onClickStep: Function,
  currentStep: number,
  track: string,
  sequence: Sequence
}

export const range = (length: number) => [...new Array(length).keys()]

export const Steps = (props: Props) => (
  <Container>
    {range(16).map((index) => {
      const active = props.sequence[index]

      return <Step
        key={index}
        index={index}
        active={active}
        onClick={() => props.onClickStep(props.track, index)}
      />
    })}
  </Container>
)

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`
