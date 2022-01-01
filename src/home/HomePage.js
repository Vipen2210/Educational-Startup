import React from "react";
import { Carousel } from "react-bootstrap";
import "./home.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Footer from "../footer/Footer";
import { useHistory } from "react-router-dom";

export default function HomePage() {
  const history=useHistory();
  return (
    <>
      <div className="mainPage">
        <h1 className="mainDescription">
          Introducing an explorative and engaging e-learning platform for
          teenagers in India.
        </h1>
        <img
          src="https://www.greatplacetowork.com/images/blog-images/vera_marie_reed_blog.jpg"
          className="mainPageImage"
          alt=""
        />
        <div className="shortDescription">
          Learn top-notch skills and build unique qualities to guarantee a
          better future.
        </div>
        <button className="explore">
          <Link className="Explorelinks" to="/events">
            Explore
          </Link>
        </button>
      </div>
      <div className="Question">
        <p className="paraQuestion">
          Why we are a <span className="Qspan">perfect partner</span> for your
          learning?
        </p>
      </div>
      <div className="CarouselContainerHome">
        <Carousel>
          <Carousel.Item interval={1000}>
            <img
              className="Carouselimage"
              src="https://pc-tablet.com/wp-content/uploads/2020/11/stock-online-course.png"
              alt="First slide"
            />
            <div className="carouselCaption">
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              className=" Carouselimage"
              src="https://thumbs.dreamstime.com/b/sun-rays-mountain-landscape-5721010.jpg"
              alt="Second slide"
            />
            <div className="carouselCaption">
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              className=" Carouselimage"
              src="https://images.squarespace-cdn.com/content/v1/59778b2ae58c626d8562c154/1517853923230-FNH185BVSQEKW6GZ5ENM/6S595T6.jpg?format=2500w"
              alt="Second slide"
            />
            <div className="carouselCaption">
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            {/* <Carousel.Caption className="carouselCaption">
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              className="Carouselimage"
              src="https://live.staticflickr.com/872/41753932712_44748bb6f8_b.jpg"
              alt="Third slide"
            />
            <div className="carouselCaption">
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </Carousel.Item>
        </Carousel>
        </div>
        <div className="Question">
          <p className="paraQuestion">
            Enhance your <span className="Qspan">skills</span> with us 🚀🚀
          </p>
        </div>
        <div className="practiseQuizWorkshop">
          <div className="monthyQuizes">
            <h2>Live Quizes</h2>
            <img className="HomePage-image"
              src="https://image.shutterstock.com/image-vector/quiz-time-poster-colorful-paper-260nw-1186919491.jpg"
              alt="Quiz Time"
            />
            <Button className="mt-3" onClick={()=>{
              history.push('/liveQuiz');
            }}>
              Take your quiz now!
            </Button>
          </div>
          <div className="monthyQuizes">
            <h2>Unique Events</h2>
            <img  className="HomePage-image" 
              src="https://image.shutterstock.com/image-vector/events-colorful-typography-banner-260nw-1356206768.jpg"
              alt=""
            />
            <Button className="mt-3" onClick={()=>{
              history.push('/events');
            }}>
              Join now!
            </Button>
          </div>
        
      </div>
      <Footer />
    </>
  );
}
