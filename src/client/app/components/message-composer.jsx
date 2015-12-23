'use strict';

import {*} as MessageAction from '../actions/message';
import {React} from 'react';

var ENTER_KEY_CODE = 13;
var MessageComposser = React.createClass({
    propTypes: {
        threadId: React.PropTypes.string.isRequired
    },

    getInitialState: function () {
        return {text: ''};
    },

    render: function () {
        return (
            <textarea
                className="message-composer"
                name="message"
                value={this.state.text}
                onChange={this._onChange}
                onKeyDown={this._onKeyDown}
            />
        );
    },

    _onChange: function (event, value) {
        this.setState({text: event.target.value});
    },

    _onKeyDown: function (event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            event.preventDefault();
            let text = this.state.text.trim();
            if (text) {
                MessageAction.createMessage(text, this.props.threadId);
            }
            this.setState({text: ''});
        }
    }

});

module.exports = MessageComposser;
