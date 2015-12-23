'use strict';

import { ChatDispatcher } from '../dispatches/chat';
import { ChatConstants } from '../constants/chat';
import { MessageUtils } from '../utils/message';
import { StoreMixins } from './mixins';
import { ThreadStore } from './thread';
import { MessageStore } from './message';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ChatConstants.ActionTypes;

var UnreadThreadStore = assign({}, EventEmitter.prototype, {
    getCount: function () {
        var threads = ThreadStore.getAll();
        var unreadCount = 0;
        var ids = Object.keys(threads);
        for (let i = 0; i < ids.length; i++) {
            if (!threads[ids[i]].lastMesage.isRead) {
                unreadCount++;
            }
        }
        return unreadCount;
    }
}, StoreMixins);

UnreadThreadStore.dispatchToken = ChatDispatcher.register(function (action) {
    ChatDispatcher.waitFor([ThreadStore.dispatchToken, MessageStore.dispatchToken]);

    switch (action.type) {
        case ActionTypes.CLICK_THREAD:
            UnreadThreadStore.emitChange();
            break;

        case ActionTypes.RECEIVE_RAW_MESSAGES:
            UnreadThreadStore.emitChange();
            break;

        default:
            throw TypeError(['No such a type', action.type].join(' '));
    }
});

module.exports = UnreadThreadStore;
