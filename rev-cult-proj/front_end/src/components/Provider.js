import React from "react";
import Context from "./Context";

class Provider extends React.Component {
  state = {
    username: "",
    updateUsername: newUsername => {
      this.setState({
        username: newUsername
      });
    }
  };
  render() {
    return (
      <Context.Provider
        value={{
          state: this.state
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Provider;
