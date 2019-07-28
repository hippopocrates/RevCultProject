import React from "react";
import "./App.css";
import LoginPage from "./components/LoginPage";
import { Container, Header } from "semantic-ui-react";

function App() {
  return (
    <div>
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
