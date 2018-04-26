import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

import Store from './store';
import { ConfigContext } from './config';
import './modal.css';
import './global.css';

const content = {
  loading: {
    title: 'Waiting...',
    main: (config) => {
      <p>Waiting...</p>
    },
    footer: ''
  },
  subscribed: {
    title: 'Subscription Completed!',
    main: (config) => (<p>You've successfully purchased a subscription to {config.title}.</p>),
    footer: 'Thanks!'
  },
  subscribe: {
    title: 'Subscribe',
    main: (config) => (<div>
      <p>Support the stream by purchasing a monthly subscription.</p>
        <div className='container'>
        {(config.subscriptionTiers.map((tier, i) => {
          return (<div className='item'>
            <StripeCheckout
              key={i}
              name={config.title}
              description={`Monthly subscription to ${config.title}`}
              image={config.logo}
              panelLabel={'SUBSCRIBE'}
              token={(token) => {
                config.load();
                config.subscribe({ tier: tier, token: token}).then((res) => {
                  // this would be a nice place for redux - update the user tier from here
                  console.log(config);
                  config.complete();
                });
              }}
              stripeKey={config.stripeKey}>
              <button className="stylish-button">{tier.title} (${tier.cost/100})</button>
              </StripeCheckout>
            </div>)
        }))}
        </div>
      </div>),
    footer: ''
  },
};

const ModalContext = React.createContext({ mode: content.subscribe });

const ModalContent = (props) => {
  return (
    <div className='modal container'>
      <div className="background"
            onClick={props.close}></div>
      <div className="content">
        <header>
          <span className="title">{props.content.title}</span>
          <span className="close">
            <button onClick={props.close}>✖</button>
          </span>
        </header>
        <section>
          <ConfigContext.Consumer>
            {(configContext) => props.content.main({
              ...configContext,
              subscribe: props.store.subscribe,
              close: props.close,
              load: props.load,
              complete: props.completeSubscription })}
          </ConfigContext.Consumer>
        </section>
        <footer>
          <p>{props.content.footer}</p>
        </footer>
      </div>
    </div>
  )
}

class Modal extends Component {
  componentDidMount() {
    this.store = new Store();
  }

  render() {
    return (
      <ModalContext.Consumer>
        {(context) => {
          if (context.visible) return (
            <ModalContent
              {...this.props}
              {...context}
              store={this.store} />
          )
        }}
      </ModalContext.Consumer>
    )
  }
}

export { Modal, ModalContext, content };
