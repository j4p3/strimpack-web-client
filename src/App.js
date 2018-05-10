import React, { Component } from 'react';
import update from 'react-addons-update';

import { StreamScreen } from './stream';
import { Nav } from './nav';
import { Modal, ModalContext, content } from './modal';
import { UserContext, userState } from './user';
import { ConfigContext, configState } from './config';
import './app.css';

class App extends Component {
  constructor(props) {
    super(props);

    // 
    // Context transformer methods
    // 

    const user = props.user || userState.user;
    const stream = { ...configState, ...props.stream };

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

    this.modalCompleteSubscription = () => {
      this.setState((state) => {
          return update(state, { modal: {
            visible: { $set: true },
            content: { $set: content.subscribed }}
        });
      });
    };

    this.modalLoad = () => {
      this.setState((state) => {
          return update(state, { modal: {
            visible: { $set: true },
            content: { $set: content.loading }}
        });
      });
    };

    this.state = {
      modal: {
        content: content.subscribe,
        visible: false,
        subscribe: this.modalSubscribe,
        close: this.modalClose,
        completeSubscription: this.modalCompleteSubscription,
        load: this.modalLoad,
      },
      auth: {
        user: user,
      },
      config: stream
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
