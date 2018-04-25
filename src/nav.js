import React, { Component } from 'react';

import { ModalContext } from './modal';
import { UserContext } from './user';
import './nav.css';

// @todo: ConfigContext provider that reads from server env or config file?
// menu items, color scheme, logo file, etc
// or real redux
const navItems = [{
  text: 'Donate',
  href: 'https://twitch.streamlabs.com/neuro'
}, {
  text: 'Become a Patron',
  href: 'https://www.patreon.com/NeuroZerg'
}, {
  text: 'Forums',
  href: '/'
}];

// 
// Expects properties:
//    `text`
//    `href` URL OR `onClick` function
// 
const NavItem = (props) => {
  let content;
  if (props.href) {  
    content = (<a {...props}>{props.text}</a>)
  } else if (props.onClick) {
    content = (<span {...props} className='pointer'>{props.text}</span>)
  } else {
    content = (<span {...props}>{props.text}</span>)
  }
  return (<li>{content}</li>)
}

const UserMenu = (props) => {
  // @todo user-related dropdowns
  return <NavItem href="/" text={props.username} />
}

// 
// Expects properties:
//  `items` array
// 
class Nav extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }
  render() {
    return (
      <nav>
        <ul className="left header">
          <NavItem className='title accent pointer' text='Title' />
        </ul>
        <ul className="right">
          {this.props.items.map((item, i) =>  (<NavItem key={i} {...item} />))}
          <ModalContext.Consumer>
            {(modalContext) => <NavItem
              key='subscribe'
              text='Subscribe'
              onClick={modalContext.subscribe} />}
          </ModalContext.Consumer>
          <UserContext.Consumer>
            {(userContext) => {
              if (userContext.user) return (<UserMenu {...userContext.user}/>);
              return (<NavItem href="/auth" text='Login' />);
            }}
          </UserContext.Consumer>
        </ul>
      </nav>
    );
  }
}

export { Nav, navItems };
