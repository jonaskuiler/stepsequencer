// @flow

import React from 'react'
import styled from 'styled-components'
import { Step } from './Step'

type Sequence = { [number]: boolean }

type Props = {
  onClickStep: Function,
  currentStep: number,
  sequence: Sequence
}

export const range = (length: number) => [...new Array(length).keys()]

export const Steps = (props: Props) => {
  return (
    <Container>
      {range(16).map((index) => {
        const active = props.currentStep === index || props.sequence[index]

        return (
          <Step
            key={index}
            index={index}
            active={active}
            onClick={() => props.onClickStep(index)}
          />
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`