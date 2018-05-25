import {
  PAGER_ADD_TO_HISTORY,
  PAGER_CURRENT_PAGE,
  PAGER_REMOVE_LATEST
  } from '../actions/actionTypes';

const pagerData = (state = {
    history: [],
    currentPage: []
    }, action) => {
	switch (action.type) {
		case PAGER_ADD_TO_HISTORY:
      return Object.assign({}, state, {
        history: [...state.history, action.pageArr]
      })

		case PAGER_CURRENT_PAGE:
      return Object.assign({}, state, {
        currentPage: action.currentPage
      })

    case PAGER_REMOVE_LATEST:
        if(state.history.length>2){
          state.history.pop()
        }
        return Object.assign({}, state, {
          history: state.history
        })

		default:
			return state
  }
}
export default pagerData
