import React from "react";
import { Container, Header } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import LoginPage from "./components/LoginPage";
import Home from "./components/Home";

function App() {
  return (
    <div className="app-routes">
      <Container style={{ marginTop: "50px" }}>
        <Header as="h1" block style={{ textAlign: "center" }}>
          RevCult Project
        </Header>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
