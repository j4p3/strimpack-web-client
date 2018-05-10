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
// @todo prevent subscription if not logged in
class Nav extends Component {
  render() {
    return (<ConfigContext.Consumer>
      {(configContext) => (
            <nav>
              <ul className='left header'>
                <li className='logo pointer' style={{backgroundImage: `url('${configContext.logo}')`}}>
                </li>
                <li className='title'>
                  <span className='pointer' style={{ color: configContext.themeColor }}>{configContext.title}</span>
                </li>
              </ul>
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
              </ul>
            </nav>)}
    </ConfigContext.Consumer>);
  }
}

export { Nav };
