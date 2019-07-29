import React from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import axios from "axios";
import { Redirect } from "react-router";

class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      success: false,
      passwordResetRedirect: false
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
      method: "put",
      url: "http://localhost:4000/revcult/passwordreset",
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
        <p style={{ color: "green", marginTop: "7px" }}>password updated!</p>
      );
    }

    let redirect;
    if (this.state.passwordResetRedirect) {
      redirect = <Redirect to="/" />;
    }

    return (
      <Grid.Column>
        <Header as="h3" attached="top">
          Password Reset
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
            <Button
              type="submit"
              onClick={() => {
                this.setState({ passwordResetRedirect: true });
              }}
            >
              Submit
            </Button>
          </Form>
          {success}
          {redirect}
        </Segment>
      </Grid.Column>
    );
  }
}

export default PasswordReset;
