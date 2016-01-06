import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import DataTable from 'components/DataTable'
import Immutable from 'immutable'

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

function setup() {

  const actions = {
    updateFilters: expect.createSpy(),
    getData: expect.createSpy()
  }
  const component = TestUtils.renderIntoDocument(<DataTable listItems={exampleData} listActions={actions} />)

  return {
    component: component,
    actions: actions
  }
}

describe('Counter component', () => {

  it('should display orgs and counts', () => {

    const { actions, component } = setup()

    const displayNodes = TestUtils.scryRenderedDOMComponentsWithClass(component, 'display-item')
    const nodeTexts = displayNodes.map( node => { return node.textContent } )

    expect(nodeTexts).toInclude('OrgA')
    expect(nodeTexts).toInclude('OrgB')
    expect(nodeTexts).toInclude('5')
    expect(nodeTexts).toInclude('10')
  })

  it('should call updateFilters after count header click', () => {

    const { actions, component } = setup()
    const headerDivs = TestUtils.scryRenderedDOMComponentsWithClass(component, 'header-item')

    const countDiv = headerDivs.find( node => { return node.textContent.trim() === 'Count' } )
    TestUtils.Simulate.click(countDiv)

    expect(actions.updateFilters).toHaveBeenCalled()
  })
})
