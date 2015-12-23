'use strict';

import { ChatDispatcher } from '../dispatches/chat';
import { ChatConstants } from '../constants/chat';
import { MessageUtils } from '../utils/message';
import { WebApiUtils } from '../utils/web-api';

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {
    createMessage: function (text, currentThreadId) {
        ChatDispatcher.dispatch({
            type: ActionTypes.CREATE_MESSAGE,
            text: text,
            currentThreadId: currentThreadId
        });
        var message = MessageUtils.getCreatedMessageData(text, currentThreadId);
        WebApiUtils.createMessage(message);
    }
};
