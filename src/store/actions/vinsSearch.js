import vinAPI from '../../api/api'
import * as types from '../actionTypes';
import axios from'axios';

export function fetchVin(code) {
  return async dispatch => {
    dispatch(fetchSearchVinStart())

    try {
      const response = await vinAPI.getDecodeVin(code);

      if (response && (response.status === 200) && response.results) {  
        let currentVin = {name: code, ...response};
        console.log("currentVin...",response,"response.results.length",response.results.length)
        if(response.results.length > 2)
        {
          let obj = {
            data:response.results,
            code:code
          }
        axios.post("http://localhost:2082/api/insertVinDetails", obj,
        {
          headers: {
            'x-auth-token': localStorage.getItem("x-auth-token")
          }
        })
          .then(response => {
            console.log("response",response)
           
          })
          .catch(error => {
            console.log(error)
          })
        }
        dispatch(writeToCache(currentVin))
        dispatch(updateVin(currentVin))
      } else {
        throw new Error('Sorry. There was some mistake on the server.')
      }
    } catch (e) {
      dispatch(serverError(e.message))
    }
  }
}

const takeFromCache = (code, state) => { 
  return state.cache[0] && state.cache.find(el => code === el.name);
}

export function getData(code) {
  return (dispatch, getState) => {
    const state = getState().vinsSearch
    let cacheElem = takeFromCache(code, state);
  
    if (cacheElem) {
      dispatch(writeToCache(cacheElem))
      dispatch(setVin(cacheElem))
      return;
    }
  
    dispatch(fetchVin(code))
  }
}

export function fetchSearchVinStart() {
  return {
    type: types.FETCH_SEARCH_VIN_START,
  }
}

export function writeToCache(vin) {
  return {
    type: types.WRITE_TO_CACHE,
    vin
  }
}
export function updateVin(currentVin) {
  return {
    type: types.UPDATE_VIN,
    currentVin
  }
}

export function serverError(reason) {
  return {
    type: types.SERVER_ERROR,
    payload: reason,
  }
}

export function setVin(currentVin) {
  return {
    type: types.SET_VIN,
    currentVin
  }
}