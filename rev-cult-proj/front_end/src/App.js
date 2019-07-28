import React from "react";
import { Container, Header } from "semantic-ui-react";

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
        <LoginPage />
      </Container>
    </div>
  );
}

export default App;
