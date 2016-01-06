import * as types from 'constants/ListActionTypes'
import { getDataFromServer } from 'api/api'

export function updateFilters(updateObj) {
  return {
    type: types.UPDATE_FILTERS,
    updateObj
  }
}

export function getData() {
  return dispatch => {
    getDataFromServer()
      .then(data => {
        dispatch({
          type: types.GET_DATA,
          data
        })
      })
  }
}
