'use strict';

import { ChatDispatcher } from '../dispatches/chat';
import { ChatConstants } from '../constants/chat';

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {
    clickThread: function (threadId) {
        ChatDispatcher.dispatch({
            type: ActionTypes.CLICK_THREAD,
            threadId: threadId
        });
    }
};
