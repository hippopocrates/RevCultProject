import React from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import axios from "axios";

class SignupForm extends React.Component {
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
      password: ""
    });
  };

  render() {
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
        </Segment>
      </Grid.Column>
    );
  }
}

export default SignupForm;
