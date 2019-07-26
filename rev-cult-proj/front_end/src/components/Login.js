import React from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  onChangeUsername = e => {
    this.setState({
      username: e.target.value
    });
  };

  onChangePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      password: this.state.password
    };

    console.log(newUser);

    axios
      .post("http://localhost:4000/signup", newUser)
      .then(res => {
        console.log("axios res.data add user", res.data);
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Username:</label>
            <input
              value={this.state.username}
              onChange={this.onChangeUsername}
              placeholder="Username"
            />
          </Form.Field>
          <Form.Field>
            <label>Password:</label>
            <input
              value={this.state.password}
              onChange={this.onChangePassword}
              placeholder="Password"
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default Login;
