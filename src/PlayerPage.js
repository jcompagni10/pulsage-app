import React from 'react';
import {Link} from 'react-router-dom';
import dateformat from 'dateformat';
import {formatDate} from './helperFunctions.js';


export class VideoPlayer extends React.Component {
	render(){
			const src = "0687c9aba5bd7be2c4df56c2c9449696_52124889213__0CCD2C9F-5DA5-491A-9834-C84682A4E0D8.MOV";
		return(
			<div className="videoPlayer">
				<video preload="auto" controls="">
					<source src={"http://ec2-52-41-197-88.us-west-2.compute.amazonaws.com:80/parse/files/47c8fc76540e3cc121f93a817fd42e2a15dc41c8/" + src } ></source>
				</video>
			</div>
		);
	}
}

export class VideoInfo extends React.Component {
	render(){
		return(
			<div className="videoInfo">
				<div className="row videoInfoUpper">
					<div className="videoTitle font-weight-bold">
						<div className="col-12">
							{this.props.data['title']}
						</div>
					</div>
					<table className="videoInfoTable">
					<tbody>
						<tr>
							<td className="col-3 align-bottom">{this.props.data['views']} views</td>
							<td className="col-3 align-bottom hidden-sm-down">Posted: {formatDate(this.props.data['posted'])} </td>
							<td className="col-3 align-bottom">
								<span className="fa fa-user"></span> {this.props.data['attempts']} Attempts
							</td>
							<td className="col-3 bestIcon align-bottom">
								Vote Best
							</td>
						</tr>
					</tbody>
					</table>
				</div>
				<div className="row videoInfoLower">
					<div className="col-sm-6 col-xs-12 infoLowerLeft">
						<span className="challengeName">
							<Link to="/ChallengePage"> Visit Challenge Page</Link><br/>
						</span>
						<span>Challenger: 
							<Link to="/Profile"> {this.props.data['challengeBy']} </Link>
						</span>
						<br/>
						<span>Attempt by: 
							<Link to = "/Profile"> {this.props.data['by']} </Link>
						</span>
					</div>
					<div className ="col-sm-6 col-xs-12">
						<button type="button" className="btn acceptChallengeBtn">Accept Challenge</button>
					</div>
				</div>
			</div>
		);
	}
}
class RecVideo extends React.Component {
	constructor(props){
		super(props);
		const data = require('./testData.js').default;
		this.state = {
			curVideo : data['videos'][this.props.video]
		}
	}
	
	render(){
		const link = this.props.video
		return(
			<Link to = {link}>
				<div className="row recVideoRow">
					<div className="col-6 col-md-3">
						<img className="videoThumb" src={require('./img/thumb.png')}></img>
					</div>
					<div className="flex-bottom col-6 col-md-4 thumbInfo">
						<span className="thumbInfo">{this.state.curVideo['title']}</span> <br></br>
						<span className="thumbInfo">Views: {this.state.curVideo['views']}</span> <br></br>
						<span className="thumbInfo">Posted: {formatDate(this.state.curVideo['posted'])}</span>
					</div>
				</div>	
			</Link>

		);
	}
}

class VideoRecSection extends React.Component {
	render(){
		return(
			<div className="col flex-bottom videoSection">
					{this.props.recVideos.map(function(video){
						return <RecVideo key={video} video = {video} />	
					})}												
			</div>
		);
	}
}
		
class Comment extends React.Component {
	constructor(props){
		super(props);
		const comments = require('./testData.js').default['comments'];
		this.state = {
			curComment : comments[this.props.comment]
		};
	}
	render(){
		return(
			<div className="row commentWrapper">
				<div className="col-3 col-sm-2">
					<img src="https://secure.gravatar.com/avatar/1a705a00624ba4ce54237d80dac4b524?s=96&d=blank&r=g" className="profilePic" alt="img test"></img>
				</div>
				<div className="postedComment col-9 col-sm-10">
					<Link to="/profile"><div className="user">{this.state.curComment['poster']}</div></Link>
					<p>{this.state.curComment['text']}</p>
				</div>
			</div>	
		);
	}
}	
class CommentSection extends React.Component {
	render(){
		var comments = [0,1,2,3];
		return (
			<div className="col commentsSection">
				<div className="commentWrapper">
					<div className="row">
						<div className="col-3 col-sm-2">
							<img src="http://www.uuthaa.com/contenido/imagenes/usuarios/85/1449512510650_img_222_nafarroa-bai-irunea-propone-ampliar-el-perfil-de-los-destinatarios-de-las-viviendas-municipales.jpg" className="pull-left profilePic" alt="img test"></img>
						</div>
						<div className="col-9 col-sm-10">
							<textarea className="form-control comment" id="exampleTextarea" rows="3" placeholder="Add a public comment..."></textarea>
						</div>
					</div>
					<div className="row">
						<div className="col-9 offset-3 offset-sm-6 col-sm-6 commentButtonWrapper">
							<button className="btn btn-sm commentBtn">Comment </button>
						</div>
					</div>
				</div>
				
				{comments.map(function(n, index){
					return(
						<Comment key = {index} comment = {n} />
					);})}
				
				
			</div>
		);
	}
}

class VideoLowerContent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			currentContent: "videoSection",
			video : this.props.data

		}
	};
	btnClick(btn){
		this.setState({ currentContent: btn});
	}
	
	currentLower(){
		if (this.state.currentContent == 'videoSection'){
			return(
				<VideoRecSection
				 recVideos = {['video0', 'video1', 'video2', 'video3', 'video4']}
				 />
			);
		}
		if (this.state.currentContent == 'commentSection'){
			return(
				<CommentSection />
			);
		}
		else{
			return(
				<div className="col descriptionSection">
					<div className = "postDate">
						Posted {dateformat(this.props.data['posted'], "mmmm dS, yyyy")} 
					</div>
					<p> A video description would go here and have lots of information about lots of stuff. Yup!! </p>
					<p> Post to: <Link to="/ChallengePage" className="blueLink"> {this.state.video['challengeName']}</Link></p>
				</div>
			)
		}
	}
	
	isSelected(btn){
		var base = "col-4 btn btn-sm"
		if(btn == this.state.currentContent){
			return base + " btn-primary";
		}
		else{
			return base + " btn-secondary"
		}
	}
	
	render() {
		return(
			<div>
				<div className="row contentSelect">
					<button type="button" onClick={() => this.btnClick('videoSection')} className={this.isSelected('videoSection')} >More Videos</button>
					<button type="button" onClick={() => this.btnClick('descriptionSection')} className={this.isSelected('descriptionSection')}>Description</button>
					<button type="button" onClick={() => this.btnClick('commentSection')} className={this.isSelected('commentSection')}>Comments</button>
				</div>
				{this.currentLower()}
			</div>
		);
	}
}
				
	
export class PlayerPage extends React.Component {
	constructor(props){
		super(props);
		const url = this.props.location.pathname;
		const play = this.props.location.search['play']
		console.log(play);
		console.log(this.props.location.search);
		const curVideo = url.slice(url.lastIndexOf('/')+1,url.length);
		const videoData = require('./testData.js').default['videos'][curVideo];
		this.state = {
			videoData : videoData
		}
	}
	render() {
		return(
				<div className="row playerPage">
					<div className="col">
						<VideoPlayer 
							src = {this.state.videoData['src']}
						/>
						<VideoInfo 
							data = {this.state.videoData}
						/>
						<VideoLowerContent 
							data = {this.state.videoData}
						/>
					</div>
				</div>
		);
	}
}
