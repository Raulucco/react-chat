'use strict';

import {React} from 'react';
import {MessageStore} from '../stores/message';
import {ThreadStore} from '../stores/thread';
import {UnreadThreadStore} from '../stores/unread-thread';
import {ThreadListItem} from './thread-list-item';

function getStateFromStores() {
    return {
        threads: ThreadStore.getAllChrono(),
        currentThreadId: ThreadStore.getCurrentId(),
        unreadCount: UnreadThreadStore.getCount()
    };
}

var ThreadSection = React.createClass({
    getInitialState: function () {
        return getStateFromStores();
    },

    componentDidMount: function () {
        ThreadStore.addChangeListener(this._onChange);
        UnreadThreadStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        ThreadStore.removeChangeListener(this._onChange);
        UnreadThreadStore.removeChangeListener(this._onChange);
    },

    render: function () {
        var threadListItems = this.state.threads.map(function (thread) {
            return (
                <ThreadListItem key={thread.id} thread={thread} currentThreadId={this.state.currentThreadId} />
            );
        }, this);

        var unread = this.state.unreadCount === 0 ? null : <span>Unread threads: {this.state.unreadCount}</span>

        return (
            <div className="thread-section">
                <div className="thread-count">{unread}</div>
                <ul className="thread-list">{threadListItems}</ul>
            </div>
        );
    },

    _onChange: function () {
        this.setState(getStateFromStores());
    }
});

module.exports = ThreadSection;
