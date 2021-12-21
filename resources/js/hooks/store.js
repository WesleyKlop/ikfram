import React, { createContext, useContext, useEffect, useReducer } from 'react'
import loadMeta from '../services/loadMeta'

const initialState = {
  count: 0,
  filters: [],
}
const store = createContext(initialState)
const { Provider } = store

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return action.payload
    case 'UPDATE_COUNT':
      return {
        ...state,
        count: action.payload,
      }
    case 'UPDATE_FILTER':
      const { selected, id } = action.payload
      // Find the filter by id and update the selected option
      const filters = state.filters.map((filter) => {
        if (filter.id !== id) {
          return filter
        }
        const updatedOptions = filter.options.map((option) => {
          if (option.id !== selected.id) {
            return option
          }
          return {
            ...option,
            selected: !selected.selected,
          }
        })
        return {
          ...filter,
          options: updatedOptions,
        }
      })
      return {
        ...state,
        filters,
      }
  }
  return state
}

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, undefined)

  useEffect(() => {
    loadMeta().then((payload) => {
      dispatch({ type: 'INIT', payload })
    })
  }, [])

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export const useStoreState = () => {
  const context = useContext(store)
  return context.state
}

export const useStoreDispatch = () => {
  const context = useContext(store)
  return context.dispatch
}

export const useStore = () => useContext(store)
