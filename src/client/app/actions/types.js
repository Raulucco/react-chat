'use strict';

import { ChatDispatcher } from '../dispatches/chat';
import { ChatConstants } from '../constants/chat';

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {
    receiveAll: function (rawMessages) {
        ChatDispatcher.dispatch({
            type: ActionTypes.RECEIVE_RAW_MESSAGES,
            rawMessages: rawMessages
        });
    },

    receiveCreateMessage: function (createdMessage) {
        ChatDispatcher.dispatch({
            type: ActionTypes.RECEIVE_RAW_CREATED_MESSAGES,
            rawMessage: createdMessage
        });
    }
};
