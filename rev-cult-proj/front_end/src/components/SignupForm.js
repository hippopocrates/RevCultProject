import React from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import axios from "axios";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      success: false
    };
  }

  onChangeUsername = e => {
    this.setState({
      username: e.target.value,
      success: false
    });
  };

  onChangePassword = e => {
    this.setState({
      password: e.target.value,
      success: false
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
      url: "http://localhost:4000/revcult/signup",
      data: newUser
    })
      .then(res => {})
      .catch(err => {
        console.log(err);
      });

    this.setState({
      username: "",
      password: "",
      success: true
    });
  };

  render() {
    let success;
    if (this.state.success) {
      success = (
        <p style={{ color: "green", marginTop: "7px" }}>
          user successfully added!
        </p>
      );
    }
    return (
      <Grid.Column>
        <Header as="h3" attached="top">
          Sign Up
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
          </Form>
          {success}
        </Segment>
      </Grid.Column>
    );
  }
}

export default SignupForm;
