// @flow

import React from 'react'
import styled from 'styled-components'

type Props = {
  active: boolean,
  index: number,
  onClick: Function
}

const activeColor = props => props.active
  ? '#ff0000'
  : 'rgba(255, 255, 255, 0.8)'

export const Step = (props: Props) => {
  return <Container>
    <Button {...props}>
      <svg width='24px' height='38px' viewBox='0 0 24 36'>
        <rect
          x='0'
          y='0'
          fill={activeColor(props)}
          width='24'
          height='32'
        />
        {/* <rect
          x='0'
          y='32'
          fill='rgba(0, 0, 0, 0.2)'
          width='24'
          height='4'
        /> */}
      </svg>
    </Button>
    <Number>{props.index + 1}</Number>
  </Container>
}

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
`

const Number = styled.span`
  font-family: sans-serif;
`
