import {FIRST_ACTION, SECOND_ACTION ,THIRD_ACTION} from '../actions/actionTypes';

const firstRedus = (state = {}, action) => {

	switch (action.type) {
		case FIRST_ACTION:
			return Object.assign({}, state, {
				test: action.text
			})
		case SECOND_ACTION:
			return Object.assign({}, state, {
				test: action.text
			})
		case THIRD_ACTION:
			return Object.assign({}, state, {
				test2: action.text
			})

		default:
			return state
  }
}
export default firstRedus
