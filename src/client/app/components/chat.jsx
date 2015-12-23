'use strict';

import {MessageSection} from './message-section';
import {ThreadSection} from './thread-section';
import {React} from 'react';

var Chat = React.createClass({
    render: function () {
        return (
            <div className="chat-app">
                <ThreadSection />
                <MessageSection />
            </div>
        );
    }
});

module.exports = Chat;
