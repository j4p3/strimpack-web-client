import React, { Component } from 'react';

import { ModalContext } from './modal';
import { UserContext } from './user';
import { ConfigContext } from './config';
import './nav.css';

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

const NavList = (props) => {
  return props.items.map((item, i) => (<NavItem key={i} {...item} />));
}

const UserMenu = (props) => {
  // @todo user-related dropdowns
  return <NavItem href='/' text={props.username} />
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
        <ul className='left header'>
          <NavItem className='title accent pointer' text='Title' />
        </ul>
          <ConfigContext.Consumer>
            {(configContext) => (
            <ul className='right'>
              <NavList items={configContext.navItems} />
              <ModalContext.Consumer>
                {(modalContext) => <NavItem
                  key='subscribe'
                  text='Subscribe'
                  onClick={modalContext.subscribe} />}
              </ModalContext.Consumer>
              <UserContext.Consumer>
                {(userContext) => {
                  if (userContext.user) {
                    return (<UserMenu {...userContext.user}/>)
                  }
                  return (<NavItem href='/auth' text='Login' />);
                }}
              </UserContext.Consumer>
            </ul>)}
          </ConfigContext.Consumer>
      </nav>
    );
  }
}

export { Nav };
