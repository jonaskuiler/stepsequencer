// @flow

import React from 'react'
import styled from 'styled-components'

type Props = {
  onClick: Function,
  title: string,
  name: string,
  active: boolean
}

export const Pad = (props: Props) => {
  return <Container {...props} onChange={() => props.onClick(props.name)}>
    <Button active={props.active} />
    <Title>{props.title}</Title>
  </Container>
}

const activeColor = props => props.active
  ? '#ff0000'
  : 'rgba(255, 255, 255, 0.8)'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Button = styled.div`
  cursor: pointer;
  width: 44px;
  height: 44px;
  background-color: ${activeColor};
`

const Title = styled.span`
  position: absolute;
  top: 100%;
  left: 50%;
  width: 80px;
  text-align: center;
  transform: translate(-50%, 10px);
  font-family: sans-serif;
`