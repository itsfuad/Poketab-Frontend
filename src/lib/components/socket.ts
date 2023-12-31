import { reconnectButtonEnabled, socketConnected, formNotification, formActionButtonDisabled, splashMessage } from "$lib/store";
import { get, writable } from "svelte/store";
import {io} from "socket.io-client";
import { chatRoomStore, type User } from "$lib/store";

//get server value from .env file
const server = import.meta.env.VITE_SOCKET_SERVER_URL;

export const socket = io(server);

export function reConnectSocket(){
    console.log('%cReconnecting server', 'color: lime');
    retryCount.set(1);
    formNotification.set('Reconnecting...');
    reconnectButtonEnabled.set(false);
    socket.connect();
}

socket.on('updateUserListWR', (users: {[key: string]: User}) => {
    console.log('Updating user list - WR');
    chatRoomStore.update((chatRoom) => {
        chatRoom.userList = users
        return chatRoom;
    });
});

socket.on('connect', () => {
    console.log('%cConnected to server', 'color: blue');
    splashMessage.set('');
    formActionButtonDisabled.set(false);
    retryCount.set(1);
    socketConnected.set(true);
    if (get(formNotification) == ''){
        return;
    }
    formNotification.set('Connected to server');
    console.log('%cReconnected to server', 'color: lime');
    setTimeout(() => {
        formNotification.set('');
    }, 2000);
});

let retryCount = writable(1);

formNotification.subscribe(value => {
    if (value.includes('offline')){
        retryCount.set(1);
        reconnectButtonEnabled.set(false);
    } else if (value.includes('Error: ')){
        setTimeout(() => {
            formNotification.set('');
        }, 2000);
    }
});


socket.on('connect_error', (err) => {
    console.log('%cConnection error - Socket.ts', 'color: red');
    socketConnected.set(false);

    if (get(formNotification) == 'Disconnected from server'){
        formNotification.set('Reconnecting...');
    } else {
        if(get(retryCount) >= 3){
            formNotification.set('Could not connect to server.');
            console.log('%cCould not connect to server', 'color: red');
            reconnectButtonEnabled.set(true);
            socket.disconnect();
            retryCount.set(1);
            return;
        }
        formNotification.set('Could not connect to server. Retrying... ' + get(retryCount) + '/3');
        retryCount.update(n => n + 1);
    }
});


socket.on('disconnect', () => {
    formNotification.set('Disconnected from server');
    socketConnected.set(false);

    formActionButtonDisabled.set(true);
    retryCount.set(1);
    console.log('%cDisconnected from server', 'color: red');
});