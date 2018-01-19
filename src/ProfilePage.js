import React from 'react';
import Slider from 'react-slick';
import {Link} from 'react-router-dom'
import {VideoRow} from './HomePage.js';
 

class ProfileBanner extends React.Component{
    render(){
        return(
                <div className ="row  profileBannerWrapper">
                    <img className ="bannerImage img-fluid" src="https://i.ytimg.com/vi/ICm7QiYNH2A/maxresdefault.jpg"></img>
                </div>
        );
    }
}
class ProfilePicture extends React.Component{
    render(){
        return(
                <div className ="row  profilePictureWrapper">
                    <img  className ="profilePic" src="http://media2.intoday.in/indiatoday/images/stories/neil-patrick-harris-story_647_121115052131.jpg"></img>
                    <div className ="w-100"></div>
                    <div className ="profileName">
                        <span> User129 </span> 
                        <div className="profileSettings"> 
                            <i className ="fa fa-cog fa-sm"></i>
                        </div>
                    </div>
                </div>
        );
    }
}

class ContentSelector extends React.Component{
    icon(){
        if (this.props.type =="video"){
            return "fa fa-video-camera"
         }
        else {
            return "fa fa-star"
        }
    }
    render(){
        return(
            <div>
                <i className ={this.icon()}></i><br></br>
                <span>{this.props.name}</span>
            </div>
        )
    }
}


class ProfileContentSlider extends React.Component{
    constructor(props){
        super(props);
        if (props.content == 'videos'){
            this.state = {
                curSection : "All Videos",
                selectors : ["All Videos", "Best Videos" ,"First Videos"],
                type: "video"
            }
        }
        else{
            this.state = {
                curSection : "Challenges Posted",
                selectors : ["Challenges Posted", "Challenges Accepted"],
                type : "challenge"
            }
        }
    }

    isActive(sec){
        return (sec == this.state.curSection ? "active" : "")
    }

    selectorClick(src){
        console.log(src);
        this.setState({curSection : src})
    }

    getContent(){
        const content = {'All Videos': ['video1', 'video0', 'video3', 'video4'], 'Best Videos': ['video0', 'video4', 'video1', 'video3'], 'First Videos': ['video4', 'video3', 'video2', 'video1'], 'Challenges Posted': ['video0', 'video4', 'video1', 'video3'], 'Challenges Accepted': ['video4', 'video3', 'video2', 'video1']};
        return content[this.state.curSection];
    }

    render(){
        return(
            <div className ="col profileContentSlider">
                <div className = "row">
                    <div className ="col offset-md-3 col-md-6 contentSelectTop">
                        <div className ="row selectWrapper align-items-end">
                            {this.state.selectors.map(function(selector){
                                return( 
                                    <div key ={selector} className ={"contentSelect col " + this.isActive(selector)} onClick = {(src) =>this.selectorClick(selector)}>
                                        <ContentSelector
                                        name = {selector}
                                        type = {this.state.type}
                                        />
                                    </div>
                                )
                            }, this)}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col Videos">
                        <VideoRow 
                            videos={this.getContent()}
                            title = ""					
                        />
                    </div>
                </div>
            </div>
        )
    }
}


export class ProfilePage extends React.Component{
    render(){
        return(
            <div className="profilePage">
                <ProfileBanner />
                <ProfilePicture/>
                <ProfileContentSlider 
                    content = "videos" 
                />
                <ProfileContentSlider 
                    content = "challenges"
                />
            </div>
        )
    }
}