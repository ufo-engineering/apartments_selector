import {FIRST_ACTION, SECOND_ACTION, THIRD_ACTION} from './actionTypes';

export function actFirst(text) {
  return { 
  	type: FIRST_ACTION,
  	text: text
  }
}

export function actSec(text) {
  return { 
  	type: SECOND_ACTION, 
  	text 
  }
}

export function actThird(text) {
  return { 
  	type: THIRD_ACTION, 
  	text 
  }
}