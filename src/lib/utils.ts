import { cubicOut } from "svelte/easing";
import { get } from "svelte/store";
import { showToastMessage } from "domtoastmessage";
import { buttonSoundEnabled, messageSoundEnabled } from "./store";
import { browser } from "$app/environment";


export function toSentenceCase(inputString: string) {
    return inputString.replace(/(^|\. )\w/g, (match) => match.toUpperCase());
}

export const emojis = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🥰', '😗', '😙', '😚', '🙂', '🤗', '🤩', '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '🥱', '😴', '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰', '😱', '🥵', '🥶', '😳', '🤪', '😵', '🥴', '😠', '😡', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🥳', '🥺', '🤠', '🤡', '🤥', '🤫', '🤭', '🧐', '🤓', '😈', '👿', '👹', '👺', '💀', '☠', '👻', '👽', '👾', '🤖', '💩', '😺', '😸', '😹', '😻', '🙈', '🙉', '🙊', '🐵', '🐶', '🐺', '🐱', '🦁', '🐯', '🦒', '🦊', '🦝', '🐮', '🐷', '🐗', '🐭', '🐹', '🐰', '🐻', '🐨', '🐼', '🐸', '🦓', '🐴', '🦄', '🐔', '🐲', '🐽', '🐧', '🐥', '🐤', '🐣', '🌻', '🌸', '🥀', '🌼', '🌷', '🌹', '🏵️', '🌺', '🦇', '🦋', '🐌', '🐛', '🦟', '🦗', '🐜', '🐝', '🐞', '🦂', '🕷', '🕸', '🦠', '🧞‍♀️', '🧞‍♂️', '🗣', '👀', '🦴', '🦷', '👅', '👄', '🧠', '🦾', '🦿', '👩🏻', '👨🏻', '🧑🏻', '👧🏻', '👦🏻', '🧒🏻', '👶🏻', '👵🏻', '👴🏻', '🧓🏻', '👩🏻‍🦰', '👨🏻‍🦰', '👩🏻‍🦱', '👨🏻‍🦱', '👩🏻‍🦲', '👨🏻‍🦲', '👩🏻‍🦳', '👨🏻‍🦳', '👱🏻‍♀️', '👱🏻‍♂️', '👸🏻', '🤴🏻', '👳🏻‍♀️', '👳🏻‍♂️', '👲🏻', '🧔🏻', '👼🏻', '🤶🏻', '🎅🏻', '👮🏻‍♀️', '👮🏻‍♂️', '🕵🏻‍♀️', '🕵🏻‍♂️', '💂🏻‍♀️', '💂🏻‍♂️', '👷🏻‍♀️', '👷🏻‍♂️', '👩🏻‍⚕️', '👨🏻‍⚕️', '👩🏻‍🎓', '👨🏻‍🎓', '👩🏻‍🏫', '👨🏻‍🏫', '👩🏻‍⚖️', '👨🏻‍⚖️', '👩🏻‍🌾', '👨🏻‍🌾', '👩🏻‍🍳', '👨🏻‍🍳', '👩🏻‍🔧', '👨🏻‍🔧', '👩🏻‍🏭', '👨🏻‍🏭', '👩🏻‍💼', '👨🏻‍💼', '👩🏻‍🔬', '👨🏻‍🔬', '👩🏻‍💻', '👨🏻‍💻', '👩🏻‍🎤', '👨🏻‍🎤', '👩🏻‍🎨', '👨🏻‍🎨', '👩🏻‍✈️', '👨🏻‍✈️', '👩🏻‍🚀', '👨🏻‍🚀', '👩🏻‍🚒', '👨🏻‍🚒', '🧕🏻', '👰🏻', '🤵🏻', '🤱🏻', '🤰🏻', '🦸🏻‍♀️', '🦸🏻‍♂️', '🦹🏻‍♀️', '🦹🏻‍♂️', '🧙🏻‍♀️', '🧙🏻‍♂️', '🧚🏻‍♀️', '🧚🏻‍♂️', '🧛🏻‍♀️', '🧛🏻‍♂️', '🧜🏻‍♀️', '🧜🏻‍♂️', '🧝🏻‍♀️', '🧝🏻‍♂️', '🧟🏻‍♀️', '🧟🏻‍♂️', '🙍🏻‍♀️', '🙍🏻‍♂️', '🙎🏻‍♀️', '🙎🏻‍♂️', '🙅🏻‍♀️', '🙅🏻‍♂️', '🙆🏻‍♀️', '🙆🏻‍♂️', '🧏🏻‍♀️', '🧏🏻‍♂️', '💁🏻‍♀️', '💁🏻‍♂️', '🙋🏻‍♀️', '🙋🏻‍♂️', '🙇🏻‍♀️', '🙇🏻‍♂️', '🤦🏻‍♀️', '🤦🏻‍♂️', '🤷🏻‍♀️', '🤷🏻‍♂️', '💆🏻‍♀️', '💆🏻‍♂️', '💇🏻‍♀️', '💇🏻‍♂️', '🧖🏻‍♀️', '🧖🏻‍♂️', '🤹🏻‍♀️', '🤹🏻‍♂️', '👩🏻‍🦽', '👨🏻‍🦽', '👩🏻‍🦼', '👨🏻‍🦼', '👩🏻‍🦯', '👨🏻‍🦯', '🧎🏻‍♀️', '🧎🏻‍♂️', '🧍🏻‍♀️', '🧍🏻‍♂️', '🚶🏻‍♀️', '🚶🏻‍♂️', '🏃🏻‍♀️', '🏃🏻‍♂️', '💃🏻', '🕺🏻', '🧗🏻‍♀️', '🧗🏻‍♂️', '🧘🏻‍♀️', '🧘🏻‍♂️', '🛀🏻', '🛌🏻', '🕴🏻', '🏇🏻', '🏂🏻', '💪🏻', '🦵🏻', '🦶🏻', '👂🏻', '🦻🏻', '👃🏻', '🤏🏻', '👈🏻', '👉🏻', '☝🏻', '👆🏻', '👇🏻', '✌🏻', '🤞🏻', '🖖🏻', '🤘🏻', '🤙🏻', '🖐🏻', '✋🏻', '👌🏻', '👍🏻', '👎🏻', '✊🏻', '👊🏻', '🤛🏻', '🤜🏻', '🤚🏻', '👋🏻', '🤟🏻', '✍🏻', '👏🏻', '👐🏻', '🙌🏻', '🤲🏻', '🙏🏻', '🤝🏻', '💅🏻', '📌', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💔', '❣', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '💌', '💢', '💥', '💤', '💦', '💨', '💫'];

//custom animation for svelte:spin
export function spin(node: HTMLElement, { delay = 0, duration = 400, degree = 360, easing = cubicOut }: { delay?: number, duration?: number, degree?: number, easing?: (t: number) => number } = {}) {

    //start from -degree to 0

    return {
        delay,
        duration,
        easing,
        css: (t: number) => `
            transform: rotate(${t * degree - degree}deg);
        `,
    };
}

const iconMap: {[key: string]: string} = {
    'video': 'fa-file-video',
    'audio': 'fa-file-audio',
    'image': 'fa-file-image',
    'file': 'fa-file-lines',
    'pdf': 'fa-file-pdf',
    'zip': 'fa-file-zipper',
    'word': 'fa-file-word',
    'excel': 'fa-file-excel',
    'powerpoint': 'fa-file-powerpoint',
    'csv': 'fa-file-csv',
}

export function getIcon(type: string){
    //file.type is like 'application/pdf', 'application/zip', 'application/msword', 'application/vnd.ms-excel', 'application/vnd.ms-powerpoint', 'text/csv'
    //so check if it includes 'pdf', 'zip', 'word', 'excel', 'powerpoint', 'csv'
    //then return the corresponding icon
    //use regex to find the match word that we will use for indexing the iconMap
    //build the regex from the iconMap keys
    const regex = new RegExp(Object.keys(iconMap).join('|'), 'i');
    const match = type.match(regex);

    if (match){
        return iconMap[match[0]];
    } else {
        return iconMap['file'];
    }
}

export async function copyText(text: string){
    if (!text) return;

    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        showToastMessage('Copied to clipboard');
    } catch (err) {
        console.error('Async: Could not copy text: ', err);
        showToastMessage('Could not copy to clipboard');
    }
}

function fallbackCopyTextToClipboard(text: string){
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position="fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        showToastMessage('Copied to clipboard (Fallback)');
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        showToastMessage('Could not copy to clipboard (Fallback)');
    }

    document.body.removeChild(textArea);
}

/*
//message sounds
const incommingSound = new Audio("/sounds/incomingmessage.mp3");
const outgoingSound = new Audio("/sounds/outgoingmessage.mp3");
const stickerSound = new Audio("/sounds/sticker.mp3");
const locationSound = new Audio("/sounds/location.mp3");

//interaction sounds
const typingSound = new Audio("/sounds/typing.mp3");
const reactionSound = new Audio("/sounds/react.mp3");
//const deleveredSound = new Audio("/sounds/delivered.mp3");
const startRecordingSound = new Audio("/sounds/startrecording.mp3");
const reactsShowSound = new Audio("/sounds/reacts.mp3");

//join/leave sounds
const joinSound = new Audio("/sounds/join.mp3");
const leaveSound = new Audio("/sounds/leave.mp3");

//error sounds
const errorSound = new Audio("/sounds/error.mp3");

const notificationSound = new Audio("/sounds/notification.mp3");
*/

let clickSound: HTMLAudioElement;
let incommingSound: HTMLAudioElement;
let outgoingSound: HTMLAudioElement;
let stickerSound: HTMLAudioElement;
let locationSound: HTMLAudioElement;
let typingSound: HTMLAudioElement;
let reactionSound: HTMLAudioElement;
let startRecordingSound: HTMLAudioElement;
let reactsShowSound: HTMLAudioElement;
let joinSound: HTMLAudioElement;
let leaveSound: HTMLAudioElement;
let errorSound: HTMLAudioElement;
let notificationSound: HTMLAudioElement;


function loadAudios() {
    clickSound = new Audio("/sounds/click.mp3");
    incommingSound = new Audio("/sounds/incomingmessage.mp3");
    outgoingSound = new Audio("/sounds/outgoingmessage.mp3");
    stickerSound = new Audio("/sounds/sticker.mp3");
    locationSound = new Audio("/sounds/location.mp3");
    typingSound = new Audio("/sounds/typing.mp3");
    reactionSound = new Audio("/sounds/react.mp3");
    startRecordingSound = new Audio("/sounds/startrecording.mp3");
    reactsShowSound = new Audio("/sounds/reactsMenu.mp3");
    joinSound = new Audio("/sounds/join.mp3");
    leaveSound = new Audio("/sounds/leave.mp3");
    errorSound = new Audio("/sounds/error.mp3");
    notificationSound = new Audio("/sounds/notification.mp3");
}

if (browser){
    loadAudios();
    console.log('audios loaded');
}

export function adjustMessagePosition(){
    console.log('adjustMessagePosition');
}

export async function playClickSound(){

    if (!get(buttonSoundEnabled)){
        return;
    }

    clickSound.currentTime = 0;
    clickSound.play();
}

type MessageSoundType = 'incoming' | 'outgoing' | 'sticker' | 'location' | 'typing' | 'react' | 'startRecording' | 'reactsMenu' | 'join' | 'leave' | 'error' | 'notification';

export async function playMessageSound(type: MessageSoundType){


    if (!get(messageSoundEnabled)){
        return;
    }


    switch (type) {
        case 'incoming':
            incommingSound.currentTime = 0;
            incommingSound.play();
            break;
        case 'outgoing':
            outgoingSound.currentTime = 0;
            outgoingSound.play();
            break;
        case 'sticker':
            stickerSound.currentTime = 0;
            stickerSound.play();
            break;
        case 'location':
            locationSound.currentTime = 0;
            locationSound.play();
            break;
        case 'typing':
            typingSound.currentTime = 0;
            typingSound.play();
            break;
        case 'react':
            reactionSound.currentTime = 0;
            reactionSound.play();
            break;
        case 'startRecording':
            startRecordingSound.currentTime = 0;
            startRecordingSound.play();
            break;
        case 'reactsMenu':
            reactsShowSound.currentTime = 0;
            reactsShowSound.play();
            break;
        case 'join':
            joinSound.currentTime = 0;
            joinSound.play();
            break;
        case 'leave':
            leaveSound.currentTime = 0;
            leaveSound.play();
            break;
        case 'error':
            errorSound.currentTime = 0;
            errorSound.play();
            break;
        case 'notification':
            notificationSound.currentTime = 0;
            notificationSound.play();
            break;
        default:
            break;
    }
}