import React from 'react'
import styled from 'styled-components'

const Input = styled.input.attrs({
  type: 'range',
  min: 1,
  max: 100
})`
  transform: rotate(-90deg);
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`

export const VolumeSlider = props => (
  <Input
    name={props.name}
    value={props.value}
    onChange={event => {
      props.onChange(props.name, event.target.value / 100)
    }}
  />
)
