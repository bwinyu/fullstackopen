import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const goodAction = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const okAction = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const badAction = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const zeroAction = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={goodAction}>good</button>
      <button onClick={okAction}>ok</button>
      <button onClick={badAction}>bad</button>
      <button onClick={zeroAction}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
