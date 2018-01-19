import React from "react";
import ReactDOM from "react-dom";
import "./pulsage.css";
import { HashRouter, Route, Link } from "react-router-dom";
import { PlayerPage } from "./PlayerPage.js";
import { HomePage } from "./HomePage.js";
import { ChallengePage } from "./ChallengePage.js";
import { Modal } from "react-bootstrap";
import { ProfilePage } from "./ProfilePage.js";
import { AboutPage } from "./AboutPage.js";

/* ****************
				Main Components 
				***************/
class ModalDialogue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: this.props.isVisible,
      content: "",
      formVisible: true,
      feedback: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isVisible: nextProps.isVisible,
      content: nextProps.content
    });
  }

  close() {
    this.setState({ showModal: false });
    this.props.showModal(false, "");
  }

  feedbackInput(event) {
    this.setState({ feedback: event.target.value });
  }

  feedbackSubmit() {
    this.setState({ formVisible: false });
    setTimeout(
      function() {
        this.props.showModal(false);
      }.bind(this),
      2000
    );
    setTimeout(
      function() {
        this.setState({ formVisible: true });
      }.bind(this),
      2100
    );
  }

  bodyContent() {
    if (this.state.content === "menu") {
      return (
        <Modal.Body className="menuModal">
          <div className="closeButton" onClick={() => this.close()}>
            X{" "}
          </div>
          <ul className="menuOptions">
            <li className="menuHighlite"> Create Challenge </li>
            <li onClick={() => this.props.showModal(true, "feedback")}>
              Feedback
            </li>
            <li> Challeneges Accepted </li>
            <li onClick={() => this.props.showModal(true, "signin")}>
              {" "}
              Log In{" "}
            </li>
            <li> Profile </li>
          </ul>
        </Modal.Body>
      );
    } else if (this.state.content === "feedback") {
      this.feedbackInput = this.feedbackInput.bind(this);
      return (
        <div className="feedbackModal">
          <Modal.Header closeButton>
            <Modal.Title>Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              className={
                "defaultContent " + (this.state.formVisible ? "" : "collapse")
              }
            >
              <div className="form-group">
                <label>Tell us what to improve. What don't you like?</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Write something in here"
                  onChange={this.feedbackInput}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.feedbackSubmit()}
              >
                Submit
              </button>
            </div>
            <div
              className={
                "postSubmitContent " +
                (!this.state.formVisible ? "" : "collapse")
              }
            >
              Shots Fired...
            </div>
          </Modal.Body>
        </div>
      );
    } else if (this.state.content === "signin") {
      return (
        <div className="signinModal">
          <Modal.Header closeButton>
            <img
              className="signinLogo"
              src={require("./img/pulsagelogo.png")}
              alt="Pulsage logo"
            />
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <div className="row">
                <div className="col">
                  <input type="text" name="email" placeholder="Email" />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="row otherOptions">
                <div className="col-5">
                  <button className="forgotPassword blueLink">
                    {" "}
                    Forgot Password{" "}
                  </button>
                </div>
                <div className="col-2">
                  <span>Or </span>
                </div>
                <div className="col-5">
                  <button className="signUp"> Sign Up </button>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <button className="btn btn-primary"> Login </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </div>
      );
    } else if (this.state.content === "signup") {
      return (
        <div className="signinModal">
          <Modal.Header closeButton>
            <img
              className="signinLogo"
              src={require("./img/pulsagelogo.png")}
              alt="Pulsage logo"
            />
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <div className="row">
                <div className="col">
                  <input type="text" name="email" placeholder="Email" />
                </div>
                <div className="col">
                  <input type="text" name="username" placeholder="Username" />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    type="password"
                    name="password"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <button className="btn btn-primary"> Sign Up </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </div>
      );
    }
  }

  render() {
    return (
      <Modal
        show={this.state.isVisible}
        onHide={() => this.close()}
        className={this.state.isVisible ? "show" : ""}
      >
        {this.bodyContent()}
      </Modal>
    );
  }
}

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Feedback bar visibilty, default invisible
      feedbackState: ""
    };
  }
  render() {
    //Show feedback bar after 4 seconds
    setTimeout(
      function() {
        this.setState({ feedbackState: "visible" });
      }.bind(this),
      4000
    );

    return (
      <nav className="navbar navbar-toggleable-md navbar-light">
        <button
          type="button"
          className="navbar-toggler navbar-toggler-right"
          onClick={() => this.props.showModal(true, "menu")}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <Link to="/">
          <span className="navbar-brand" href="#">
            <img src={require("./img/pulsagelogo.png")} alt="Pulsage logo" />
          </span>
        </Link>
        <div
          className={"navFeedback hidden-lg-up " + this.state.feedbackState}
          onClick={() => this.props.showModal(true, "feedback")}
        >
          <span>Feedback</span>
        </div>
        <div className="uploadButton hidden-lg-up">
          <img src={require("./img/plusIcon.png")} alt="uploadvideo" />
        </div>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <div className="search input-group">
            <input
              type="text"
              className="form-control"
              placeholder="coming soon"
              aria-describedby="btnGroupAddon"
            />
            <span className="input-group-addon" id="btnGroupAddon">
              <i className="fa fa-search" aria-hidden="true" />
            </span>
          </div>
          <ul className="navbar-nav">
            <li className="nav-link">
              <img
                className="uploadIcon"
                src={require("./img/plusIcon.png")}
                alt="uploadvideo"
              />{" "}
              Post to Challenge
            </li>
            <li
              className="nav-link"
              onClick={(val, content) => this.props.showModal(true, "feedback")}
            >
              Feedback
            </li>
            <li
              className="nav-link"
              onClick={(val, content) => this.props.showModal(true, "signup")}
            >
              Sign Up
            </li>
            <li
              className="nav-link"
              onClick={() => this.props.showModal(true, "signin")}
            >
              Sign In
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="footer row">
          <div className="footerLeft col col-xs-6  offset-sm-2 ">
            <ul className="footerItems">
              <li>Contact Us</li>
              <li>The Team</li>
              <li>Our Mission</li>
            </ul>
          </div>
          <div className="footerRight col col-xs-6  offset-sm-2">
            <ul className="footerItems">
              <li>Portland, OR</li>
              <li>info@pulsage.com</li>
              <li>
                <a href="#" className="fa fa-facebook" />
                <a href="#" className="fa fa-twitter" />
                <a href="#" className="fa fa-instagram" />
              </li>
            </ul>
          </div>
        </div>
        <div className="footerBottom row">
          <div className="col offset-sm-2">
            <img
              className="footerLogo"
              src={require("./img/pulsageLogoGrey.png")}
            />
          </div>
        </div>
      </footer>
    );
  }
}

/* ****************
						Site 
				***************/
class Site extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      modalContent: ""
    };
  }
  //Set modal visibility and content
  showModal(isVisible, content) {
		console.log(process.env.PUBLIC_URL);
    this.setState({
      modalVisible: isVisible,
      modalContent: content
    });
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Navbar
            showModal={(isVisible, content) =>
              this.showModal(isVisible, content)
            }
          />
          <ModalDialogue
            content={this.state.modalContent}
            isVisible={this.state.modalVisible}
            showModal={(isVisible, content) =>
              this.showModal(isVisible, content)
            }
          />
          <div className="mainContent container-fluid">
            <Route exact path= {process.env.PUBLIC_URL + '/'}component={HomePage} />
            <Route path= {process.env.PUBLIC_URL + "/Player"} component={PlayerPage} />
            <Route path= {process.env.PUBLIC_URL + "/ChallengePage"} component={ChallengePage} />
            <Route path= {process.env.PUBLIC_URL + "/Profile"} component={ProfilePage} />
            <Route path= {process.env.PUBLIC_URL + "/About"} component={AboutPage} />
          </div>
          <Footer />
        </div>
      </HashRouter>
    );
  }
}
ReactDOM.render(<Site />, document.getElementById("root"));