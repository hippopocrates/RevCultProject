import React from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";
import { Redirect } from "react-router";

import Provider from "./Provider";

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
      url: "http://localhost:4000/revcult/restricted/home",
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

  render() {
    let homePage = localStorage.getItem("token") ? (
      <div>
        <header>
          <h1>Welcome to My Project!</h1>
        </header>
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            this.state.loginRedirect = true;
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
