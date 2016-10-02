const layout = (state, action) => {
  switch (action.type) {
    case 'ADD_LAYOUT':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_LAYOUT':
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state, {
        completed: !state.completed
      })
    default:
      return state
  }
}

const layouts = (state = [], action) => {
  switch (action.type) {
    case 'ADD_LAYOUT':
      return [
        ...state,
        layout(undefined, action)
      ]
    case 'TOGGLE_LAYOUT':
      return state.map(t =>
        layout(t, action)
      )
    default:
      return state
  }
}

export default layouts;
