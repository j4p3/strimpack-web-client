import React, { Component } from 'react';

import { ModalContext } from './modal';
import { UserContext } from './user';
import './nav.css';

// @todo: ConfigContext provider that reads from server env or config file?
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

const Login = (props) => {
  return (
    <a href='/auth'><li>Login</li></a>
  )
}

const UserMenu = (props) => {
  return (
    <a href="/"><li>{props.username}</li></a>
  )
}

const NavItem = (props) => {
  return (<a href={`${props.href ? props.href : ''}`}
             onClick={props.onClick}>
             <li>{props.text}</li></a>)
}

// 
// Expects properties:
//  `items`
//  item definition spreads into an <a>:
//    `text`
//    `href` URL OR `onClick` function
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
          {this.props.items.map((item, i) =>  (<NavItem {...item} />) )}
          <ModalContext.Consumer>
            {(modalContext) => <NavItem
              text='Subscribe'
              action={modalContext.subscribe} />}
          </ModalContext.Consumer>
          <UserContext.Consumer>
            {(userContext) => {
              if (userContext.user) return (<UserMenu {...userContext.user}/>);
              return (<Login />);
            }}
          </UserContext.Consumer>
        </ul>
          
      </nav>
    );
  }
}

export { Nav, navItems };
