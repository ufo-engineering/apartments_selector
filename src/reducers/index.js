import { combineReducers } from 'redux'
import projectData from './project'
import pagerData from './pager'
import filterData from './filter'


export default combineReducers({
  projectData,
  pagerData,
  filterData
})
