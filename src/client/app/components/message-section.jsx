'use strict';

import {React} from 'react';
import {MessageComposer} from './message-composer';
import {MessageListItem} from './message-list-item';
import {MessageStore} from '../stores/message';
import {ThreadStore} from '../stores/thread';

function getStateFromStores () {
    return {
        messages: MessageStore.getAllForCurrentThread()
        thread: ThreadStore.getCurrent()
    };
}

function getMessageListItem(message) {
    return (
        <MessageListItem key={message.id} message={message} />
    );
}

var MessageSection = React.createClass({
    getInitialState: function () {
        return getStateFromStores();
    },

    componentDidMount: function () {
        this._scrollToBottom();
        MessageStore.addChangeListener(this._onChange);
        ThreadStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        MessageStore.removeChangeListener(this._onChange);
        ThreadStore.removeChangeListener(this._onChange);
    },

    render: function () {
        let messageListItems = this.state.messages.map(getMessageListItem);

        return (
             <div className="message-section">
                <h3 className="message-thread-heading">{this.state.thread.name}</h3>
                <ul className="message-list" ref="messageList">{messageListItems}</ul>
                <MessageComposer threadId={this.state.thread.id} />
             </div>
        );
    },

    componentDidMount: function () {
        this._scrollToBottom();
    },

    _scrollToBottom: function () {
        var ul = this.refs.messageList.getDOMNode();
        ul.scrollTop = ul.scrollHeight;
    },

    _onChange: function () {
        this.setState(getStateFromStores());
    }

});

module.exports = MessageSection;
