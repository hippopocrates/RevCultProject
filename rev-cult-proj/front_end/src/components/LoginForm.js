import React from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import axios from "axios";
import { Redirect } from "react-router";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false,
      invalidLogin: false
    };
  }

  onChangeUsername = e => {
    this.setState({
      username: e.target.value,
      invalidLogin: false
    });
  };

  onChangePassword = e => {
    this.setState({
      password: e.target.value,
      invalidLogin: false
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      password: this.state.password
    };

    axios({
      method: "post",
      url: "http://localhost:4000/revcult/login",
      data: newUser,
      headers: {
        currentUser: newUser.username
      }
    })
      .then(res => {
        if (res.data.token) {
          window.localStorage.setItem("token", res.data.token);
          this.setState({ redirect: true });
        }
      })
      .catch(err => {
        console.log(err);
      });

    if (!this.state.redirect) {
      this.setState({
        username: "",
        password: "",
        invalidLogin: true
      });
    }
  };

  render() {
    let invalidLogin;
    if (this.state.invalidLogin) {
      invalidLogin = (
        <p style={{ color: "red", marginTop: "7px" }}>
          invalid username or password!
        </p>
      );
    }
    console.log("this.state.loginSuccess", this.state.loginSuccess);

    let homeRedirect;
    if (this.state.redirect) {
      homeRedirect = <Redirect to="/home" />;
    }
    return (
      <Grid.Column>
        <Header as="h3" attached="top">
          Login
        </Header>
        <Segment attached>
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
            {homeRedirect}
          </Form>
          {invalidLogin}
        </Segment>
      </Grid.Column>
    );
  }
}

export default LoginForm;
