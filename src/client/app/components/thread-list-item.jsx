'use strict';

import {*} as ThreadActionCreator from '../actions/thread-creator';
import {React} from 'react';
import {classNames} from 'classnames'

var ThreadListItem = React.createClass({
    propTypes: {
        thread: ReactPropTypes.object,
        currentThreadId: ReactPropTypes.string
    },

    render: function () {
        let thread = this.props.thread;
        let lastMessage = thread.lastMessage;
        return (
            <li className={classNames({'thread-list-item': true, 'active': thread.id === this.props.currentThreadId })}
            onClick={this._onClick}>
                <h5 className="thread-name">{thread.name}</h5>
                <p className="thread-time">{lastMessage.date.toLocateTimeString()}</p>
                <p className="thread-last-message">{lastMessage.text}</p>
            </li>
        );
    },

    _onClick: function () {
        ThreadActionCreator.clickThread(this.props.thread.id);
    }
});

module.exports = ThreadListItem;
