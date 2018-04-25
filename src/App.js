import React, { Component } from 'react';
import update from 'react-addons-update';

import { StreamScreen } from './stream';
import { Nav } from './nav';
import { Modal, ModalContext, content } from './modal';
import { UserContext, userState } from './user';
import { ConfigContext, configState } from './config';
import './app.css';

// @todo expose this component as a module-level export
// extract clientside stuff to separate repo
// require in serverside package & import it there
class App extends Component {
  constructor(props) {
    super(props);

    // 
    // Context transformer methods
    // 

    const user = props.user || userState.user;
    const config = { ...configState, ...props.config };

    this.modalClose = () => {
      this.setState((state) => {
        return update(state, {
          modal: { visible: { $set: false } }
        });
      });
    };

    this.modalSubscribe = () => {
      this.setState((state) => {
          return update(state, { modal: {
            visible: { $set: true },
            content: { $set: content.subscribe }}
        });
      });
    };

    this.modalCheckout = () => {
      this.setState((state) => {
          return update(state, { modal: {
            visible: { $set: true },
            stripe: { $set: true }}
        });
      });
    };

    this.state = {
      modal: {
        content: content.subscribe,
        visible: false,
        subscribe: this.modalSubscribe,
        close: this.modalClose,
        checkout: this.modalCheckout,
      },
      auth: {
        user: user,
      },
      config: config
    };
  }

  render() {
    return (
      <div className="root vertical container">
        <ConfigContext.Provider value={this.state.config}>
        <UserContext.Provider value={this.state.auth}>
        <ModalContext.Provider value={this.state.modal}>
          <Nav />
          <StreamScreen />
          <Modal />
        </ModalContext.Provider>
        </UserContext.Provider>
        </ConfigContext.Provider>
      </div>
    );
  }
}

export default App;
