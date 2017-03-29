import React, {Component} from 'react';
import cssmodules from 'react-css-modules';
import autoBind from 'react-autobind'
import DropdownMenu from 'react-dd-menu';

import styles from './navbar.cssmodule.scss';

// This whole class is WIP
class Navbar extends Component {
  constructor(props) {
    super(props)
    autoBind(this)
    this.state = {
      isMenuOpen: false
    }
  }

  _toggle() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  _close() {
    this.setState({ isMenuOpen: false });
  }

  _click() {
    console.log('You clicked an item');
  }

  render() {
    let defaultOptions = {
      isOpen: this.state.isMenuOpen,
      close: this._close.bind(this),
      align: 'left',
      inverse: true
    }
    let viewOptions = {
      ...defaultOptions,
      toggle: <button type="button" onClick={this._toggle.bind(this)}> view </button>,
    }
    let fileOptions = {
      ...defaultOptions,
      toggle: <button type="button" onClick={this._toggle.bind(this)}> file </button>,
    }

    return (
      <div styleName="navbar-component">
        <DropdownMenu {...fileOptions}>
          <li><button type="button" onClick={this._click.bind(this)}>Example 2</button></li>
        </DropdownMenu>
        <DropdownMenu {...viewOptions}>
          <li><button type="button" onClick={this._click.bind(this)}>Example 2</button></li>
        </DropdownMenu>
      </div>
    )
  }
}

Navbar.displayName = 'Navbar';
Navbar.propTypes = {};
Navbar.defaultProps = {};

export default cssmodules(Navbar, styles);
