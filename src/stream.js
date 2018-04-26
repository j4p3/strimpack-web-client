import React from 'react';

import { UserContext } from './user';
import { ConfigContext } from './config';
import Chat from './chat';
import './global.css';
import './stream.css';

export const Stream = (props) => {
  if (props.channel) {
    return (<iframe
      title={props.title}
      className="embedded"
      src={`//player.twitch.tv/?channel=${props.channel}`}
      marginHeight="0"
      marginWidth="0"
      frameBorder="0"
      scrolling="no">
    </iframe>);
  }
  return (<h1>content</h1>);
}

    


export const StreamScreen = (props) => {
  return (
      <section className="stream-container container ">        
        <main className="stream" style={{background: '#333'}}>
          <ConfigContext.Consumer>
            {context => <Stream {...context} />}
          </ConfigContext.Consumer>
        </main>
        <aside className="chat"><div className="inner">
          <UserContext.Consumer>
            {context => <Chat user={context.user} />}
          </UserContext.Consumer>
        </div></aside>
      </section>
  );
}
