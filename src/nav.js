import React, { Component } from 'react';

import { ModalContext } from './modal';
import { UserContext } from './user';
import './nav.css';

// @todo: ConfigContext provider that reads from server env or config file?
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
  return (<a href={`${props.href ? props.href : ''}`}
             onClick={props.onClick}>
             <li>{props.text}</li></a>)
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
        <ul className="left">
          <a className="logo-wrap" href="#"><li className="logo"></li></a>
          <a className="title" href="#"><li><span className="accent">Title</span></li></a>
        </ul>
        <ul className="right">
        </ul>
        <ul className="right">
          {this.props.items.map((item, i) =>  (<NavItem key={i} {...item} />))}
          <ModalContext.Consumer>
            {(modalContext) => <NavItem
              key='subscribe'
              text='Subscribe'
              action={modalContext.subscribe} />}
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
