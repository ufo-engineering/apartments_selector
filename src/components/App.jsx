import React, { Component } from 'react';
import '../css/App.css';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
	setProject,
	pagerHistoryAdd,
	setCurrentPage,
	filterOpener
} from '../actions/actions.js';
import Header from './Header.jsx';
import Viewer from './Viewer.jsx'
import Filter from './Filter.jsx'



class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			loaded: false,
			pageArr: []

		}

		this.dispatchFetchData = this.dispatchFetchData.bind(this);
		this.testH = this.testH.bind(this);
		this.fetchData = this.fetchData.bind(this);
		this.historyBack = this.historyBack.bind(this);
		this.goTo = this.goTo.bind(this);
		this.filterEvent = this.filterEvent.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
    if (this.props.filterOpened !==nextProps.filterOpened) {
      return true;
    }
		if (this.state.pageArr[0] !== nextState.pageArr[0] ||
				this.state.pageArr[1] !== nextState.pageArr[1]) {
      return true;
    }
    if (this.state.loaded !== nextState.loaded) {
      return true;
    }
    return false;
  }


	componentDidMount(){
		let pageArr = this.props.match.url.substr(1).split('/');
		if(pageArr.length > 1){
			this.fetchData(pageArr[0],pageArr[1],this.dispatchFetchData);
		}else{
			this.fetchData('project',2,this.dispatchFetchData);

		}
	}


	fetchData(url, id, callback){
		let that = this,
				pageArr = [url, id];
		fetch(`//lehtoapi.loc/api/${url}/${id}`,
			{
				headers: {
					'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJFRXdSVFV5T0RKRlJUQXhNVVl4TjBaR01VUXpPVVU1T1RWRlF6WXpRelEzUmtRNVJURXdRdyJ9.eyJpc3MiOiJodHRwczovL3Vmby1lbmcuYXV0aDAuY29tLyIsInN1YiI6IjV6WUFENWcyQ0lXMzZNZTd0MkhSblZha1RSNWNlUURoQGNsaWVudHMiLCJhdWQiOiJodHRwOi8vbGVodG9hcGkubG9jLyIsImlhdCI6MTUyODA5MzY4MSwiZXhwIjoxNTI4MTgwMDgxLCJhenAiOiI1ellBRDVnMkNJVzM2TWU3dDJIUm5WYWtUUjVjZVFEaCIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.bizHFlfaJ--_ZUOZgh2BYARVy7aSaLG-HQgvdPhPzlFthwtqOE2489cn0ZKqp0RBibuptW_1amn5N3k-TCnkh7Jm0AoIJI3EBYsW2STAA1ruVRwgC_dpYeB25mKZk1GwaS94NQpZLkq3Kgx227k1kyUNnmWb_XB7ZY_6eq2NA9zWYwlTi3Rj4OyoblpIukChUo8frm1b9iUi57mMh58S4xQ6kecxoIv3GNiEoLLeQCuUHh2Q9JbqHk90Yd4anTA1FlXPkcDkkkg9SEFVTxQk-O7EpAS6J0MJuNGsmIN7kUd04N914v1myeWU3mbUnCBiUGVqseqvzm8jQgsKPfXHdw',
					'Content-Type': 'application/json'
				},
			    method: "GET"
			}
		).then((response) => {
		  return response.json();
		}).then((json) => {
			callback(json,pageArr);
			return true
		})
		.then((resolve)=>{
				that.setState({
					loaded: resolve,
					pageArr: pageArr
				})
		})
		.catch((err) => {
			console.log(err)
		})
	}
	dispatchFetchData(obj,arr){
		this.props.setProject(obj);
		this.props.pagerHistoryAdd(arr);
		this.props.setCurrentPage(arr)
	}
	testH(e){
		this.fetchData(e.target.value,2,this.dispatchFetchData);
	}
	goTo(arr){
		 this.props.history.push(`/${arr[0]}/${arr[1]}`)
	}
	historyBack(){
		this.props.history.goBack()
	}
	filterEvent(){
		this.props.filterOpener(!this.props.filterOpened)
	}
	render() {
		let isProject = this.state.pageArr[0] && this.state.pageArr[0] !== 'project';
	  return (
		<div className="Viewer-container">
		<Header historyBack={this.historyBack}/>
		{this.props.project && this.props.project.finite !== 1 ?
			<div  className="Viewer-wrapper">
				{this.state.loaded && <Viewer chooseEvent={this.goTo}/>}
				{isProject &&
					<button
						className={`open-filter ${this.props.filterOpened && 'opened'}`}
						onClick={this.filterEvent}>
						<i/>
					</button>
				}
			</div>
			: 'finite component'
			}
			{isProject &&
			<div className={`filter-wrp ${this.props.filterOpened && 'show'}`}>
				<Filter closeEvent={this.filterEvent} />
			</div>}


		</div>
	  );
	}
}

function mapStateToProps(state){
	return {
		pager: state.pagerData,
    filterOpened: state.filterData.opened,
	  project: state.projectData.dataObj,
	}
};
function mapDispatchToProps(dispatch,ownProps) {
	return {
		setProject: bindActionCreators(setProject, dispatch),
		pagerHistoryAdd: bindActionCreators(pagerHistoryAdd, dispatch),
		setCurrentPage: bindActionCreators(setCurrentPage, dispatch),
  	filterOpener: bindActionCreators(filterOpener, dispatch),
	}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
