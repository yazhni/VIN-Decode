import * as types from '../actionTypes';

const initialState = {
  currentVin : null,
  cache : [],
  loading: false,
  serverError: null,
}

export default function vinsSearch(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_SEARCH_VIN_START:
      return {
        ...state, loading: true,
      }
    case types.WRITE_TO_CACHE:
      return {
        ...state, 
        cache: [
          action.vin,
          ...[...state.cache].slice(0, 9),
        ],
      }
    case types.SERVER_ERROR:
      return {
        ...state, 
        loading: false,
        serverError: action.payload,
      }
    case types.UPDATE_VIN:
      return {
        ...state, 
        currentVin: action.currentVin,
        loading: false,
        serverError: null,
      }
    case types.SET_VIN:
      return {
        ...state, 
        currentVin: action.currentVin, 
        serverError: null,
      }
    default:
      return state
  }
}