import React from 'react'
import { injectGlobal } from 'styled-components'
import ReactDOM from 'react-dom'
import App from './App'

injectGlobal`
  html,
  body,
  #root {
    padding: 0;
    margin: 0;
    height: 100%;
  }

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
`

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
