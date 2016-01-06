import Immutable from 'immutable'

import { UPDATE_FILTERS, GET_DATA } from 'constants/ListActionTypes'
import { UP, DOWN } from 'constants/Constants'

const data = Immutable.fromJS({
  items: [],
  headers: [],
  original: {}
})

function getNewHeaders(headers, updateObj) {

  const thisHeader = headers.find(header => {
    return header.get('key') === updateObj.key
  })
  const isSortSelect = thisHeader.has('sort')

  const newHeadersRemoveSorts = isSortSelect ? headers.map(header => {
    return header.has('sort') ? header.remove('value') : header
  }) : headers

  const newHeaders = newHeadersRemoveSorts.map(header => {

    const headerKey = header.get('key')
    const updateKey = updateObj.key
    const value = updateObj.value

    if (headerKey === updateKey) {
      return header.set('value', value)
    }
    return header
  })

  return newHeaders
}

function getFilteredItems(newHeaders, originalItems) {

  const filteredItems = originalItems.filter(item => {
    for (const header of newHeaders.values()) {
      if (header.get('input')) {
        const headerKey = header.get('key')
        const headerValue = header.get('value')

        if (headerValue) {

          const dataValue = item.get('data').get(headerKey)
          const details = header.get('details')

          if (details) {
            for (const detail of details.values()) {
              if (detail.get('input')) {
                const detailKey = detail.get('key')

                const dataExists = dataValue.some(subData => {
                  return subData.get(detailKey).startsWith(headerValue)
                })

                if (!dataExists) {
                  return false
                }
              }
            }
          } else if (!dataValue.startsWith(headerValue)) {
            return false
          }
        }
      }
    }
    return true
  })

  return filteredItems
}

function getSortedItems(newHeaders, filteredItems) {

  const sortKeyHeader = newHeaders.find(header => {
    if (header.get('sort') && (header.get('value') === UP || header.get('value') === DOWN)) {
      return true
    }
    return false
  })
  const sortKey = sortKeyHeader ? sortKeyHeader.get('key') : null
  const sortDown = sortKeyHeader ? sortKeyHeader.get('value') === DOWN : false

  const sortedItems = sortKey ? filteredItems.sortBy(item => {
    return item.get('data').get(sortKey)
  }) : filteredItems

  const sortedItemsWithReverse = sortDown ? sortedItems.reverse() : sortedItems

  return sortedItemsWithReverse
}

function updateFilters(state, action) {
  const updateObj = action.updateObj

  const headers = state.get('headers')
  const newHeaders = getNewHeaders(headers, updateObj)

  if (headers.equals(newHeaders)) {
    return state
  }

  const newStateHeaders = state.set('headers', newHeaders)

  const originalItems = state.get('original').get('items')

  const filteredItems = getFilteredItems(newHeaders, originalItems)

  const sortedItemsWithReverse = getSortedItems(newHeaders, filteredItems)

  return newStateHeaders.set('items', sortedItemsWithReverse)
}

function getData(state, action) {
  return Immutable.fromJS({
    ...action.data,
    original: action.data
  })
}

export default function listItems(state = data, action) {
  switch (action.type) {
    case UPDATE_FILTERS:
      return updateFilters(state, action)

    case GET_DATA:
      return getData(state, action)

    default:
      return state
  }
}
