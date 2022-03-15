import React, { Component } from "react";
import "../styles.css";
import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    
    return (
      <section className="main-container-images">
      <div className="container">
        <header className="jumbotron">
        <div className="cssmarquee">
          <h3>{this.state.content}</h3>
          </div>
        </header>
        {/* <div className="img"> */}
       {/* <img src="/images/home.jpg" alt=""/>  */}
       
       {/* <div class="w3-content w3-section">
      <img class="mySlides w3-animate-top" src="/images/homep.jpg" alt=""/>
      <img class="mySlides w3-animate-bottom" src="/images/homepa.jpg" alt="" />
      </div> */}
      {/* </div> */}
      </div>
      </section>
    );
  }
}
