import {
  SET_PROJECT_DATA,
  PAGER_ADD_TO_HISTORY,
  PAGER_CURRENT_PAGE,
  PAGER_REMOVE_LATEST,
  FILTER_OPENER,
  FILTER_BY_STATUS,
} from './actionTypes';

export function setProject(dataObj) {
  return {
  	type: SET_PROJECT_DATA,
  	dataObj
  }
}

export function pagerHistoryAdd(pageArr) {
  return {
  	type: PAGER_ADD_TO_HISTORY,
  	pageArr
  }
}

export function setCurrentPage(currentPage) {
  return {
  	type: PAGER_CURRENT_PAGE,
  	currentPage
  }
}

export function removeLatestFromHistory() {
  return {
  	type: PAGER_REMOVE_LATEST
  }
}

export function filterOpener(value){
  return{
    type: FILTER_OPENER,
    value: value
  }
}

export function statusFilter(value){
  return{
    type: FILTER_BY_STATUS,
    value: value
  }
}
