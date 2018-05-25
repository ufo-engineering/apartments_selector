import React, { PureComponent } from 'react';
import '../css/App.css';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
	setProject,
	pagerHistoryAdd,
	setCurrentPage,
	removeLatestFromHistory
} from '../actions/actions.js';
import {Link} from 'react-router-dom'
import Header from './Header.jsx';
import Viewer from './Viewer.jsx'
import Loader from './Loader.jsx'



class App extends PureComponent {

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
	}
	componentDidMount(){
		let pageArr = this.props.match.url.substr(1).split('/');
		this.setState({pageArr: pageArr})
		if(pageArr.length > 1){
			this.fetchData(pageArr[0],pageArr[1],this.dispatchFetchData);
		}else{
			this.fetchData('project',2,this.dispatchFetchData);

		}
	}
	fetchData(url, id, callback){
		let that = this;
		fetch(`/data/${url}.json`,
			{
			    headers: {
			      'Accept': 'application/json',
			      'Content-Type': 'application/json'
			    },
			    method: "GET"
			}
		).then((response) => {
		  return response.json();
		}).then((json) => {
			callback(json);
			return true
		})
		.then((resolve)=>{
				that.setState({loaded: resolve})
		})
		.catch((err) => {
			console.log(err)
		})
	}
	dispatchFetchData(obj){
		this.props.setProject(obj);
		this.props.pagerHistoryAdd(this.state.pageArr);
		this.props.setCurrentPage(this.state.pageArr)
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
	render() {
	  return (
		<div className="Viewer-container">
		<Header historyBack={this.historyBack}/>
		<div  className="Viewer-wrapper">
		<h2 className="info">{this.props.match.params.id}</h2>
			{this.state.loaded && <Viewer chooseEvent={this.goTo}/>}

		</div>

			<Link to="/buildings/1444" className="default-btn">buildings</Link>
			<Link to="/areas/5648" className="default-btn">area</Link>

		</div>
	  );
	}
}

function mapStateToProps(state){
	return {
		projectObject: state.projectData.dataObj,
    pager: state.pagerData,
	}
};
function mapDispatchToProps(dispatch,ownProps) {
	return {
		setProject: bindActionCreators(setProject, dispatch),
		pagerHistoryAdd: bindActionCreators(pagerHistoryAdd, dispatch),
  	setCurrentPage: bindActionCreators(setCurrentPage, dispatch),
	}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
