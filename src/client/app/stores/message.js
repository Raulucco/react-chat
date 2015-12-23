'use strict';

import { ChatDispatcher } from '../dispatches/chat';
import { ChatConstants } from '../constants/chat';
import { MessageUtils } from '../utils/message';
import { ThreadStore } from './tread';
import { StoreMixins } from './mixins';

var EvenEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ChatConstants.ActionTypes;
var messages = {};

function addMessages(rawMessages) {
    rawMessages.forEach(function (message) {
        if (!messages[message.id]) {
            messages[message.id] = MessageUtils.convertRawMessage(
                message, ThreadStore.getCurrentId());
        }
    })
}

function markAllInThreadRead(threadId) {
    var ids = Object.keys(messages);
    for (var i = 0; i < ids.length; i++) {
        let id = ids[i];
        if (messages[id].threadId === threadId) {
            messages[id].isRead = true;
        }
    }
}


var MessageStore = assign({}, EventEmitter.prototype, {

    get: function (id) {
        return messages[id];
    },

    getAll: function () {
        return messages;
    },

    getAllForThread: function (threadId) {
        var threadMessages = [];
        var ids = Object.keys(messages);
        for (var i = 0; i < ids.length; i++) {
            let id = ids[i];
            if (messages[id].threadId === threadId) {
                threadMessages.push(messages[id]);
            }
        }

        threadMessages.sort(function (a, b) {
            if (a.date < b.date) {
                return -1;
            } else if (a.date > b.date) {
                return 1;
            }

            return 0;
        });

        return threadMessages;
    },

    getAllForCurrentThread: function () {
        return this.getAllForThread(ThreadStore.getCurrentId());
    }
}, StoreMixins);

MessageStore.dispatchToken = ChatDispatcher.register(function (action) {
    switch (action.type) {
        case ActionTypes.CLICK_THREAD:
            ChatDispatcher.waitFor([ThreadStore.dispatchToken]);
            markAllInThreadRead(ThreadStore.getCurrentId());
            MessageStore.emitChange();
            break;
        case ActionTypes.CREATE_MESSAGE:
            let message = MessageUtils.getCreatedMessageData(
                action.text,
                action.currentThreadId
                );
            messages[message.id] = message;
            MessageStore.emitChange();
            break;
        case ActionTypes.RECEIVE_RAW_MESSAGES:
            addMessages(action.rawMessages);
            ChatDispatcher.waitFor([ThreadStore.dispatchToken]);
            markAllInThreadRead(ThreadStore.getCurrentThreadId());
            MessageStore.emitChange();
            break;
        default:
            throw TypeError(['There is no Ation of this type', action.type].join(' '));
    }
});

module.exports = MessageStore;
