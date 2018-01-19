import React from 'react';

function ProfileContainer(props){
    return(
    <div className ="col-md-4 profileContainer">
        <div className ="row no-gutters profileRow">
            <div className ="col-4 col-md-12 headshotContainer">
                <img className="headshot" src="https://pbs.twimg.com/profile_images/3256790994/c96594c003624f8c8451f7efaf0335c7.jpeg"></img>
            </div>
            <div className="col-8 col-md-12 mainText">
                <span className="firstName">{props.firstName}</span><br/>
                <span className="lastName">{props.lastName}</span><br/>
                <span className="title">Co-Founder</span>
                <div data-toggle="collapse" data-target={"#profileText" +props.key}>More Info </div>
            </div>
            <div className="profileText collapse" id={"profileText" + props.key}> 
                <p> Profile text goes here. Lots of information about this person, fun facts, business background
                    more stuff. Lots of text. But not that long. Witty, pithy, dope.
                </p>
            </div>
        </div>
    </div>
    )
}
export class AboutPage extends React.Component{
    render(){
        return(
            <div className="row aboutPage d-flex align-items-stretch">
                <ProfileContainer 
                    key = {0}
                    firstName ={"Michael"}
                    lastName = {"Polyakov"}
                 />
                <ProfileContainer 
                    key = {1}
                    firstName ={"Osvaldo"}
                    lastName = {"Lopez"}
                />
                <ProfileContainer 
                    key = {2}
                    firstName ={"Julian"}
                    lastName = {"Compagni Portis"}
                />
                            
            </div>
        )
    }
}