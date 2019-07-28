import React from "react";
import { Grid } from "semantic-ui-react";
import LoginForm from "./LoginForm";

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <Grid columns={2} divided>
          <Grid.Row>
            <LoginForm header="Sign Up" redirect="signup" />
            <LoginForm header="Login" redirect="login" />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default LoginPage;
