import fetch from 'isomorphic-fetch'

/* global DATA_URL */

export function getDataFromServer() {

  const dataUrl = DATA_URL
  return fetch(dataUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json
    })
}
