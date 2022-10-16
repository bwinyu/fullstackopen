import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('state becomes { good: 5, ok: 4, bad: 2 }', () => {
    const goodAction = {
      type: 'GOOD'
    }
    const okAction = {
      type: 'OK'
    }
    const badAction = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    let newState = counterReducer(state, goodAction)
    newState = counterReducer(newState, goodAction)
    newState = counterReducer(newState, goodAction)
    newState = counterReducer(newState, goodAction)
    newState = counterReducer(newState, goodAction)
    newState = counterReducer(newState, okAction)
    newState = counterReducer(newState, okAction)
    newState = counterReducer(newState, okAction)
    newState = counterReducer(newState, okAction)
    newState = counterReducer(newState, badAction)
    newState = counterReducer(newState, badAction)
    expect(newState).toEqual({
      good: 5,
      ok: 4,
      bad: 2
    })
  })
})