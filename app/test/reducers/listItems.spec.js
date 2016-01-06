import expect from 'expect'
import Immutable, { List, Map } from 'immutable'

import listItems from 'reducers/listItems'

import { UPDATE_FILTERS, GET_DATA } from 'constants/ListActionTypes'
import { UP, DOWN } from 'constants/Constants'

const exampleHeaders = [{
  "input": true,
  "display": "Organization",
  "key": "org",
  "size": "5em"
}, {
  "sort": true,
  "display": "Count",
  "key": "count",
  "size": "5em"
}, {
  "input": true,
  "display": "Synonyms",
  "key": "synonyms",
  "size": "10em",
  "details": [{
    "input": true,
    "display": "Word",
    "key": "word",
    "size": "5em"
  }, {
    "display": "Similarity",
    "key": "similarity",
    "size": "5em"
  }]
}]

const exampleItems = [{
  "data": {
    "org": "OrgA",
    "count": 10,
    "synonyms": [{
      "word": "adjectiveA",
      "similarity": 1.8
    }, {
      "word": "adjectiveB",
      "similarity": 1.7
    }]
  },
  "id": 0
}, {
  "data": {
    "org": "OrgB",
    "count": 5,
    "synonyms": [{
      "word": "adjectiveC",
      "similarity": 1.4
    }, {
      "word": "adjectiveD",
      "similarity": 1.3
    }]
  },
  "id": 1
}]

const exampleData = Immutable.fromJS({
  items: exampleItems,
  headers: exampleHeaders,
  original: {
    items: exampleItems,
    headers: exampleHeaders
  }
})

describe('reducers', () => {

  it('should handle initial state', () => {

    const state = listItems(undefined, {})

    expect(state.get('items')).toBe(List())
    expect(state.get('headers')).toBe(List())
    expect(state.get('original')).toBe(Map())
  })

  it('should sort rows', () => {

    const expectedSortedItems = [{
      "data": {
        "org": "OrgB",
        "count": 5,
        "synonyms": [{
          "word": "adjectiveC",
          "similarity": 1.4
        }, {
          "word": "adjectiveD",
          "similarity": 1.3
        }]
      },
      "id": 1
    }, {
      "data": {
        "org": "OrgA",
        "count": 10,
        "synonyms": [{
          "word": "adjectiveA",
          "similarity": 1.8
        }, {
          "word": "adjectiveB",
          "similarity": 1.7
        }]
      },
      "id": 0
    }]

    const expectedList = Immutable.fromJS(expectedSortedItems)

    const action = {
      type: UPDATE_FILTERS,
      updateObj: {
        key: 'count',
        value: UP
      }
    }

    const state = listItems(exampleData, action)

    const stateString = String(state.get('items'))
    const expectedString = String(expectedList)

    expect(stateString).toBe(expectedString)
  })

  it('should filter rows', () => {

    const expectedSortedItems = [{
      "data": {
        "org": "OrgB",
        "count": 5,
        "synonyms": [{
          "word": "adjectiveC",
          "similarity": 1.4
        }, {
          "word": "adjectiveD",
          "similarity": 1.3
        }]
      },
      "id": 1
    }]

    const expectedList = Immutable.fromJS(expectedSortedItems)

    const action = {
      type: UPDATE_FILTERS,
      updateObj: {
        key: 'org',
        value: 'OrgB'
      }
    }

    const state = listItems(exampleData, action)

    const stateString = String(state.get('items'))
    const expectedString = String(expectedList)

    expect(stateString).toBe(expectedString)
  })
})
