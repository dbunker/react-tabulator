import expect from 'expect'
import * as types from 'constants/ListActionTypes'
import * as actions from 'actions/listActions'

describe('list actions', () => {
  it('updateFilters should create UPDATE_FILTERS action', () => {

    const updateObj = {
      key: 'column-key',
      value: 'column-value'
    }

    expect(actions.updateFilters(updateObj)).toEqual({
      type: types.UPDATE_FILTERS,
      updateObj
    })
  })
})
