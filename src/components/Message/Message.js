import React from 'react';

import styleClasses from './Message.module.scss';

// type MessageProps = {
//     score: 'full' | 'consecutive' | 'inconsecutive' | '';
// };

export const loserMessages = [
    'Not quite 😕',
    'Stop gambling 😈',
    'Hey, you lost! 🙃',
    'Ouch! I felt that 🤭',
    "Don't beat yourself up 👊",
    'There goes the college fund 💸',
    'I have a cat. You have a loss 😂',
    "You're awesome at losing 🤪",
    'Coding is hard 🥶',
    "Don't hate the coder 😇"
];

export const winnerMessages = {
    full: 'You won $10 🎉',
    consecutive: 'You won $5 🍻',
    inconsecutive: 'You won $2 🍺'
};

const updateData = async (score) => {

    var amount = -5;
    if (score == 'full') {
        amount = 10;
    } else if (score == 'consecutive') {
        amount = 5;
    }
    else {
        amount = 2;
    }

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = yyyy + "-" + mm + '-' + dd;

    await fetch(window.configs.apiUrl + '/credits/' + localStorage.getItem('email'), {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            deduction: amount,
            date: formattedToday
        })
    })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
        }).catch((data) => {
            console.log(data);
        });
}

const Message = ({ score }) => {
    let message;
    if (typeof winnerMessages[score] !== 'undefined') {
        message = winnerMessages[score];
    } else {
        message = loserMessages[Math.floor(Math.random() * loserMessages.length)] + ' ';
    }
    updateData(score);
    return <p className={styleClasses['message']}>{message}</p>;
};

export default Message;
