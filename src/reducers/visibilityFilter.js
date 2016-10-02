// import { SET_VISIBILITY_FILTER } from '../actions/index.js';
//
// const initialState = {
//   filter: 'all'
// };
//
// export default (state = initialState, action) => {
//   switch(action.type) {
//     case SET_VISIBILITY_FILTER:
//       return {
//         filter: action.filter
//       };
//     default:
//       return state;
//   }
// }

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

export default visibilityFilter
