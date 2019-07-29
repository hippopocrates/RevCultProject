import React from "react";
import { Grid } from "semantic-ui-react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <Grid columns={2} divided>
          <Grid.Row>
            <SignupForm />
            <LoginForm header="Login" redirect="login" {...this.props} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default LoginPage;
