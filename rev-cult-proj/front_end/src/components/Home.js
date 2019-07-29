import React from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";
import { Redirect } from "react-router";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginRedirect: false
    };
  }
  componentDidMount() {
    console.log("enter componentDidMount");
    axios({
      method: "get",
      url: "http://localhost:4000/revcult/home",
      headers: {
        authorization: localStorage.getItem("token")
      }
    })
      .then(function(res) {
        console.log(res.data.message);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  parseJwt(token) {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  render() {
    let currentUser = "";
    if (localStorage.getItem("token")) {
      currentUser = this.parseJwt(localStorage.getItem("token")).user;
    }
    let homePage = localStorage.getItem("token") ? (
      <div style={{ textAlign: "center" }}>
        <header style={{ margin: "20px" }}>
          <h1>Welcome to My Project, {currentUser}!</h1>
        </header>
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            this.setState({ loginRedirect: true });
          }}
        >
          Logout
        </Button>
      </div>
    ) : (
      <Redirect to="/" />
    );

    let redirect;
    if (this.state.loginRedirect) {
      redirect = <Redirect to="/" />;
    }

    return (
      <div>
        {homePage}
        {redirect}
      </div>
    );
  }
}

export default Home;
