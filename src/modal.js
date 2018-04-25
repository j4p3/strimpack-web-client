import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import { ConfigContext } from './config';
import './modal.css';
import './global.css';

const content = {
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
              token={() => console.log('token @todo subscription creation endpoint')}
              stripeKey='pk_test_L8vQdW3ODhXGRdYYcNRZh7Ek' >
              <button className="stylish-button">{tier.description} (${tier.cost})</button>
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
            {(configContext) => props.content.main(configContext)}
          </ConfigContext.Consumer>
        </section>
        <footer>
          <p>{props.content.footer}</p>
        </footer>
      </div>
    </div>
  )
}

const Modal = (props) => {
  return (
    <ModalContext.Consumer>
      {(context) => {
        if (context.visible) return (
          <ModalContent
            {...props}
            {...context} />
        )
      }}
    </ModalContext.Consumer>
  )
}

export { Modal, ModalContext, content };
