// @flow

import React from 'react'
import styled from 'styled-components'

type Props = {
  value: number,
  onChange: Function
}

export const BpmSlider = (props: Props) => {
  return <Container>
    <input
      type="range"
      min="60"
      max="200"
      value={props.value}
      onChange={props.onChange}
    />
    <Value>{props.value}</Value>
  </Container>
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Value = styled.span`

`