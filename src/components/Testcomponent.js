import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './testcomponent.cssmodule.scss';

class Testcomponent extends React.Component {

  render() {
    return (
      <div className="testcomponent-component" styleName="testcomponent-component">
        Please edit src/components/Testcomponent.js to update this component!
      </div>
    );
  }
}

Testcomponent.displayName = 'Testcomponent';
Testcomponent.propTypes = {};
Testcomponent.defaultProps = {};

export default cssmodules(Testcomponent, styles);
