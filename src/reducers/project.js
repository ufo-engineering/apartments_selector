import {SET_PROJECT_DATA} from '../actions/actionTypes';

const projectData = (state = {}, action) => {
	switch (action.type) {
		case SET_PROJECT_DATA:
			return Object.assign({}, state, {
				dataObj: action.dataObj
			})

		default:
			return state
  }
}
export default projectData
