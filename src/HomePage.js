import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

class HeroSlide extends React.Component {
  render() {
    const slide = this.props.slide;
    const imgSrc = require("./img/" + this.props.slide["img"]);
    return (
      <div
        className="col heroSlide"
        style={{ backgroundImage: "url(" + imgSrc + ")" }}
      >
        <div className="row contentWrapper">
          <div className="col-12 heroTitle toptitle">Popular Challenge</div>
          <div className="col-12 heroTitle ofthisweek">Of This Week :</div>
          <div className="col-12 heroTitle">
            <div className="chall">
              <span>{slide["challenge"]}</span>
            </div>
          </div>
          <div className="col-12 heroLinks">
            <ul>
              <li className="">
                <Link to={{ pathname: "ChallengePage", play: "first" }}>
                  Watch The First
                </Link>{" "}
                |
              </li>

              <li className="">
                <Link to={{ pathname: "ChallengePage", play: "best" }}>
                  Watch The Best
                </Link>{" "}
                |
              </li>

              <li className="">
                <Link to="ChallengePage"> Post To Challenge</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

class Hero extends React.Component {
  render() {
    const slides = require("./testData.js").default["heroSlides"];
    var settings = {
      slidesToShow: 1,
      arrows: false,
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 5000,
      infinite: true
    };
    return (
      <Slider {...settings} className="heroSlider">
        {slides.map(function(slide) {
          return (
            <div>
              <HeroSlide key={slide} slide={slide} />
            </div>
          );
        })}
      </Slider>
    );
  }
}

class Video extends React.Component {
  render() {
    const video = this.props.video;
    const curVideo = require("./testData.js").default["videos"][video];
    const url = curVideo["url"];

    return (
      <Link to={"Player/" + video}>
        <div className="videoCon">
          <img className="videoThumb" src={curVideo["src"]} />
          <div className="bottomSection profile row">
            <div className="col-3">
              <img
                className="profilePic sm"
                src="http://pm1.narvii.com/6511/5827f7e749c37dc868a3abec4c898735a3f0c2b6_128.jpg"
              />
            </div>
            <div className="col-9 videoInfo">
              <div className="videoTitle">{curVideo["title"]}</div>
              <span className="profileText">By: {curVideo["first"]}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

function NextArrow(props) {
  const { onClick } = props;
  return <i className="fa fa-chevron-right vidRow-next" onClick={onClick} />;
}

function PrevArrow(props) {
  const { onClick } = props;
  return <i className="fa fa-chevron-left vidRow-prev" onClick={onClick} />;
}

export class VideoRow extends React.Component {
  render() {
    var settings = {
      slidesToShow: 4,
      centerMode: true,
      centerPadding: "0",
      infinite: true,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      responsive: [
        {
          breakpoint: 1050,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 550,
          settings: "unslick"
        }
      ]
    };

    return (
      <div className="row videoSectionWrapper">
        <div className="videoSectionTitle col-12">
          <span className="celltitle">{this.props.title}</span>
          <Link to="/ChallengePage" className="blueLink">
            <span className="viewMore">
              View More <i className="fa fa-chevron-right fa-sm" />
            </span>
          </Link>
        </div>
        <div className="col-12">
          <Slider {...settings} className="videoSection">
            {this.props.videos.map(function(video) {
              return (
                <div className="">
                  <Video key={video} video={video} />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    );
  }
}

export class HomePage extends React.Component {
  render() {
    return (
      <div className="row">
        <Hero />

        <div className="col">
          <VideoRow
            videos={[
              "video0",
              "video1",
              "video3",
              "video4",
              "video4",
              "video0"
            ]}
            title="Most Popular"
          />
          <VideoRow
            videos={[
              "video4",
              "video2",
              "video3",
              "video0",
              "video4",
              "video0",
              "video4"
            ]}
            title="Kickflip Challenge"
          />
        </div>
      </div>
    );
  }
}
