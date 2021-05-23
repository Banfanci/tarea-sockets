
import React from 'react';

import ReactEmoji from 'react-emoji'

export const Message = ({message, name}) => {
    let isSentByCurrentUser = false;

    if(name === message.name) {
        isSentByCurrentUser = true
    }

    return (
    isSentByCurrentUser
    ? (
        <div className="messageContainer justifyEnd">
            <div className="messages-info">
                <p className="sentText pr-10 justifyEnd">{`${name}`}</p>
                <p className="sentText pr-10">{`${new Date(message.date).toLocaleString()}`}</p>
            </div>
            <div className="messageBox backgroundBlue">
                <p className="messageText colorWhite">{ReactEmoji.emojify(message.message)}</p>
            </div>
        </div>
    )
    : (
        <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
                <p className="messageText colorDark">{message.message}</p>
            </div>
            <div className="messages-info">
                <p className="sentText pl-10">{`${message.name}`}</p>
                <p className="sentText pl-10">{`${new Date(message.date).toLocaleString()}`}</p>
            </div>
        </div>
    ) 
    )

};