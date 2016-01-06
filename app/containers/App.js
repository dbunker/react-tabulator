import React from 'react'
const { Component, PropTypes } = React
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import DataTable from 'components/DataTable'
import * as ListActions from 'actions/listActions'

class App extends Component {
  static propTypes = {
    listItems: PropTypes.object.isRequired,
    listActions: PropTypes.object.isRequired
  }

  render() {
    const { listItems, listActions } = this.props
    return (
      <div>
        <DataTable listItems={listItems} listActions={listActions} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    listItems: state.listItems
  }
}

function mapDispatchToProps(dispatch) {
  return {
    listActions: bindActionCreators(ListActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
