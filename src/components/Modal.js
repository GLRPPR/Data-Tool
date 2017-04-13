import React,{Component} from 'react';
import cssmodules from 'react-css-modules';
import autoBind from 'react-autobind'
import BoronModal from 'boron/FadeModal'

import SearchUtility from './SearchUtility'
import styles from './modal.cssmodule.scss';

const modalStyle = {
    width: '300px',
    height: '300px',
    background: 'white',
    display: 'flex',
    "justify-content": 'center',
    "align-items": 'center'
};

class Modal extends React.Component {
    constructor(props) {
      super(props)
      autoBind(this)
    };

    componentDidMount() {
      this.refs.modal.show();
    }

    hideModal(){
      this.refs.modal.hide();
    }

    callback(event){
      console.log(event);
    }

    render() {
      const {actions} = this.props
      return (
        <div className="modal-component" styleName="modal-component">
          <BoronModal
            ref="modal"
            modalStyle={modalStyle}
            keyboard={this.callback.bind(this)}
          >
            <SearchUtility
              actions={actions}
              onSubmit={() => {
                this.refs.modal.hide()
              }}
            />
          </BoronModal>
        </div>
      );
    }

}

Modal.displayName = 'Modal';
Modal.propTypes = {};
Modal.defaultProps = {};

export default cssmodules(Modal, styles);
