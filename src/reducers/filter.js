import {
  FILTER_OPENER,
  FILTER_BY_STATUS
  } from '../actions/actionTypes';

const filterData = (state = {
  opened: false,
  statusFilter: null
  }, action) => {
  	switch (action.type) {
  		case FILTER_OPENER:
        return Object.assign({}, state, {
          opened: action.value
        })
      case FILTER_BY_STATUS:
        return Object.assign({}, state, {
          statusFilter: action.value
        })
  		default:
  			return state
    }
  }
export default filterData
