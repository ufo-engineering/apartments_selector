import {
  SET_PROJECT_DATA,
  PAGER_ADD_TO_HISTORY,
  PAGER_CURRENT_PAGE,
  PAGER_REMOVE_LATEST
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
