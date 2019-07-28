import React from "react";
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  // axios
  //   .get("http://localhost:4000/revcult/home")
  //   .then(function(res){
  //     this.setState({loggedIn: true})
  //     console.log(res);
  //   })
  //   .catch(function(err){
  //     console.log(err);
  //   });

  render() {
    return (
      <div>
        <header>
          <h1>Welcome to My Project!</h1>
          <p>{this.state.loggedIn}</p>
        </header>
      </div>
    );
  }
}

export default Home;
