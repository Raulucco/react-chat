'use strict';

import {React} from 'react';

var MessageListItem = React.createClass({
    propTypes: {
        thread: ReactPropTypes.object
    },

    render: function () {
        let message = this.props.message;
        return (
            <li className="message-list-item">
                <h5 className="message-author-name">{message.authorName}</h5>
                <div className="message-time">
                    {message.date.toLocaleTmeString()}
                </div>
                <div className="message-text">{message.text}</div>
            </li>
        );
    }
});

module.exports = MessageListItem;