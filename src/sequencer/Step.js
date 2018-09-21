// @flow

import React, { Component } from 'react'
import styled from 'styled-components'

type Props = {
  active: Boolean,
  index: Number,
  onClick: Function
}

export const Step = (props: Props) => {
  return <Container>
    <Button {...props} />
    <Number>{props.index + 1}</Number>
  </Container>
}

const activeColor = props => props.active
  ? '#ff0000'
  : 'rgba(0, 0, 0, 0.2)'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Button = styled.div`
  cursor: pointer;
  width: 24px;
  height: 32px;
  margin-bottom: 8px;
  background-color: ${activeColor};
`

const Number = styled.span`
  font-family: sans-serif;
`
