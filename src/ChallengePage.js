import React from 'react';
import Slider from 'react-slick';
import {Link} from 'react-router-dom'
import {VideoPlayer} from './PlayerPage.js';
import {VideoRow} from './HomePage.js';
import {formatDate} from './helperFunctions.js';


class TopVideo extends React.Component {
	constructor(props){
		super(props);
			const videoData = require('./testData.js').default['videos']
			this.state = {
				videos : videoData,
				curVideo : videoData[this.props.video]
			};
	}
	componentWillReceiveProps(next){
		this.setState({curVideo : this.state.videos[next.video]})
	}
	render() {
		return( 
			<div>
				<VideoPlayer 
				src = {this.state.curVideo['src']}
				/>
				<div className="col videoInfoUpper">
					<table className="videoInfoTable">
					<tbody>
						<tr>
							<td className="col-3 align-bottom">{this.state.curVideo['views']} views</td>
							<td className="col-3 align-bottom">Post: {formatDate(this.state.curVideo['posted'])}</td>
							<td className="col-3 align-bottom">
								<span className="fa fa-user"></span> {this.state.curVideo['attempts']} Attempts
							</td>
							<td className="col-3 bestIcon align-bottom">
								Vote Best
							</td>
						</tr>
					</tbody>
					</table>
				</div>
			</div>
		)

	}
}
class TopSection extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			showFirst : (this.props.play == "best") ? false : true
		};
		console.log(this.state.showFirst);
	}
	
	setVideoClick(val){
		this.setState({showFirst : val == 'first'})
	}
	setVideo(){
		const video = (this.state.showFirst ? "video3" : "video4")
		return(
			<TopVideo video = {video}/>
		)
		
	}

	render(){
		return(
			<div className="col topSection">
				<div className="challenegeTitle ">
					Penta Kill With Ashe
				</div>
				<div className="row videoSelectBtns">
					<button className = {"col-6 btn btn-secondary " + (this.state.showFirst ? 'active' : '')}  onClick={() => this.setVideoClick('first')}>First</button>
					<button className = {"col-6 btn btn-secondary " + (!this.state.showFirst ? 'active' : '')} onClick={() => this.setVideoClick('best')}>Best</button>
				</div>
				{this.setVideo()}
				<div className = "row optionButtons">
					<button className ="btn btn-md challengeOptionBtn">Upload Attempt</button>
					<button className ="btn btn-md challengeOptionBtn">Accept Challenge</button>
				</div>
				<div className ="challengeInfoTop row">
					<a href="#" className="col-12" data-toggle="collapse" data-target="#challengeInfoBottom">
						<button className ="btn btn-md challengeInfoBtn"> Challenge Info</button>
						<div className="downArrow"><i className="fa fa-angle-down"></i></div>
					</a>
				</div>
				<div className = "row">
					<div className ="challengeInfoBottom collapse col-12" id="challengeInfoBottom">
						<p> Challenge Info would go here. Lots of things about the challenge. </p>
					</div>
				</div>
			</div>
		)
	}

}

class LowerVideoSection extends React.Component{
	render(){
		return( 
			<div className="col">
				<VideoRow 
					videos={['video0', 'video1', 'video3', 'video4','video4']}
					title = "Recent"
					
				/>
				<VideoRow
					videos={['video4', 'video2', 'video3', 'video0', 'video4']}
					title = "Highest Voted"
					/>
				<VideoRow
					videos={['video4', 'video2', 'video3', 'video0', 'video4']}
					title = "Early Achievers"
				/>
			</div>
		)
	}			
}

export class ChallengePage extends React.Component {
	render() {
		console.log(this.props.location.play)
		return(
			<div className="challengePage">
				<TopSection 
					play ={this.props.location.play}
				/>
				<LowerVideoSection />
			</div>
		)
	}
}