export const ADD_LAYOUT = 'ADD_LAYOUT';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const TOGGLE_LAYOUT = 'TOGGLE_LAYOUT';
export const FETCH_LAYOUT = 'FETCH_LAYOUT';

let nextLayoutId = 0;
export const addLayout = (data) => {
  return {
    type: ADD_LAYOUT,
    id: nextLayoutId++,
    data
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}

export const toggleLayout = (id) => {
  return {
    type: TOGGLE_LAYOUT,
    id
  }
}

export const fetchLayouts = () => {
  // note that for now I am just hardcoding the token
  const userInfo = 'SOME_AUTH_TOKEN';
  const url = 'SOME_URL_TO_HIT';
  debugger;
  return () => ({
    type: FETCH_LAYOUT,
    payload: {
      promise: fetch(url).then(response => response.json())
    }
  });
}
