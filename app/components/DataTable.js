import React from 'react'
const { Component, PropTypes } = React

import { UP, DOWN } from 'constants/Constants'

const MAX_ITEMS = 50

export default class DataTable extends Component {
  static propTypes = {
    listItems: PropTypes.object.isRequired,
    listActions: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context)
    this.renderTable = this.renderTable.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.loadMore = this.loadMore.bind(this)
    this.headerClick = this.headerClick.bind(this)

    // initially set to max items, increased on load more button
    this.state = {
      numItems: MAX_ITEMS
    }
  }

  componentWillReceiveProps() {
    // reset size on filter change
    this.setState({
      numItems: MAX_ITEMS
    })
  }

  handleInputChange(event, header) {
    const updateObj = {
      key: header.get('key'),
      value: event.target.value
    }
    this.props.listActions.updateFilters(updateObj)
  }

  headerClick(header) {
    if (!header.get('sort')) {
      return
    }

    const direction = (() => {
      switch (header.get('value')) {
        case UP: return DOWN
        case DOWN: return UP
        default: return DOWN
      }
    })()

    const updateObj = {
      key: header.get('key'),
      value: direction
    }

    this.props.listActions.updateFilters(updateObj)
  }

  loadMore() {
    this.setState({
      numItems: this.state.numItems + MAX_ITEMS
    })
  }

  displayItem(header, item) {
    const data = item.get('data').get(header.get('key'))
    const details = header.get('details')

    // if details present, will show it in sub table
    if (details) {
      return <div>
        <table className="table">
          <thead>
            <tr style={{display: 'block'}}>
              { details.map(headerObj =>
                <th style={{width: headerObj.get('size')}} key={headerObj.get('key')}>
                  { headerObj.get('display') }
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            { data.map((dataObj, dataIndex) =>
              <tr style={{display: 'block'}} key={dataIndex}>
                { details.map(headerObj =>
                  <td style={{width: headerObj.get('size')}} key={headerObj.get('key')}>
                    { dataObj.get(headerObj.get('key')) }
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    }

    return data
  }

  renderTable() {

    const { listItems } = this.props
    const headers = listItems.get('headers')
    const items = listItems.get('items')

    const shownItems = items.slice(0, this.state.numItems)

    const direct = header => {
      if (!header.get('sort')) {
        return null
      }

      switch (header.get('value')) {
        case UP: return <span className="glyphicon glyphicon-collapse-up"></span>
        case DOWN: return <span className="glyphicon glyphicon-collapse-down"></span>
        default: return <span className="glyphicon glyphicon-unchecked"></span>
      }
    }

    return (
      <div>
        <table className="table table-bordered" style={{marginBottom: 0}}>
          <thead>
            <tr>
              { headers.map(header =>
                <th className="header-item" key={header.get('key')} onClick={() => this.headerClick(header)}>
                  <div style={{ width: header.get('size'), overflow: 'auto' }}>
                    { header.get('display') } { direct(header) }
                  </div>
                </th>
              )}
            </tr>
            <tr>
              { headers.map(header =>
                <th key={header.get('key')}>
                  { header.get('input') ?
                    <input onChange={event => this.handleInputChange(event, header)}
                      style={{width: header.get('size')}} /> :
                    null
                  }
                </th>
              )}
            </tr>
          </thead>
        </table>
        <div style={{ height: '40em', overflow: 'auto' }}>
          <table className="table table-bordered" style={{marginBottom: 0}}>
            <tbody>
              { shownItems.map(item =>
                <tr key={item.get('id')}>
                  { headers.map(header =>
                    <td key={header.get('key')}>
                      <div className="display-item" style={{ width: header.get('size'), overflow: 'auto' }}>
                        { this.displayItem(header, item) }
                      </div>
                    </td>
                  )}
                </tr>
              )}
              { (shownItems.size < items.size) ?
                <tr key="load-more">
                  <td colSpan={headers.size}>
                   <button className="btn center-block" onClick={this.loadMore}>Load More</button>
                  </td>
                </tr> : null
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  render() {
    const { listItems } = this.props
    const headers = listItems.get('headers')

    return (
      <div>
        <div>
          { headers.size === 0 ?
            <div style={{ height: '40em', padding: '1em', textAlign: 'center', fontSize: '4em' }}>
              <span className="fa fa-spinner fa-pulse"></span>
            </div> :
            <div style={{ overflow: 'auto', display: 'inline-block', borderStyle: 'solid', borderColor: '#ddd'}}>
              { this.renderTable() }
            </div>
          }
        </div>
      </div>
    )
  }
}
