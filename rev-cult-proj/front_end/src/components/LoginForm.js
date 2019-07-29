import React from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import axios from "axios";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      token: ""
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

    axios
      .post("http://localhost:4000/revcult/" + this.props.redirect, newUser)
      .then(res => {
        if (res.data.token) {
          console.log(res.data.token);
          window.localStorage.setItem("token", res.data.token);
          this.props.history.push("/restricted/home");
        }
      })
      .catch(err => {
        console.log(err.response);
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
          {this.props.header}
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

export default LoginForm;
