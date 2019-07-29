import React from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
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
    return (
      <div>
        <header>
          <h1>Welcome to My Project!</h1>
          <Button onClick={localStorage.setItem("token", "")}>logout</Button>
        </header>
      </div>
    );
  }
}

export default Home;
