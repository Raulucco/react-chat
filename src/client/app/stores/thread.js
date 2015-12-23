'use strict';

import { ChatDispatcher } from '../dispatches/chat';
import { ChatConstants } from '../constants/chat';
import { MessageUtils } from '../utils/message';
import { StoreMixins } from './mixins';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ChatConstants.ActionTypes;
var currentId = null;
var threads = {};

var TheadStore = assign({}, EventEmitter.prototype, {

    init: function (rawMessages) {
        rawMessages.forEach(function (message) {
            var threadId = message.threadId;
            var thread = threads[threadId];

            if (!(thread && thread.lastTimeStamp > message.timestamp)) {
                threads[threadId] = {
                    id: threadId,
                    name: message.threadName,
                    lastMessage: MessageUtils.convertRawMessage(message, currentId)
                };
            }
        }, this);

        if (!currentId) {
            var allChrono = this.getAllChrono();
            currentId = allChrono[allChrono.length - 1].id;
        }

        threads[currentId].lastMessage.isRead = true;
    },

    get: function (id) {
        return threads[id];
    },

    getAll: function () {
        return threads;
    },

    getCurrentId: function () {
        return currentId;
    },

    getCurrent: function () {
        return this.get(this.getCurrentId());
    },

    getAllChrono: function () {
        let orderedThreads = [];
        let ids = Object.keys(threads);
        for (let i = 0; i < ids.length; i++) {
            let thread = threads[ids[i]];
            orderedThreads.push(thread);
        }
        orderedThreads.sort(function (a, b) {
            if (a.lastMessage.date < b.lastMessage.date) {
                return -1;
            } else if (a.lastMessage.date > b.lastMessage.date) {
                return 1;
            }

            return 0;
        });

        return orderedThreads;
    }

}, StoreMixins);

ThreadStore.dispatchToken = ChatDispatcher.register(function (action) {
    switch (action.type) {
        case ActionTypes.CLICK_THREAD:
            currentId = action.threadId;
            threads[currentId].lastMessage.isREad = true;
            ThreadStore.emitChange();
            break;

        case ActionTypes.RECEIVE_RAW_MESSAGES:
            ThreadStore.init(action.rawMessages);
            ThreadStore.emitChange();
            break;

        default:
            throw new TypeError(['No such a type', action.type].join());
    }
});

module.exports = ThreadStore;
