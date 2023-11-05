//if client scope
//if server scope


import { writable, type Writable } from 'svelte/store';

console.log('Modal Manager Running');

//!Modal state
export let activeModalsStack: Writable<boolean>[] = [];


export const showSidePanel = writable(false); //Has shortcut key 'o'
showSidePanel.subscribe(value => {
    if (value){
        clearModals();
        activeModalsStack.push(showSidePanel);
    } else {
        //remove it from the stack array
        activeModalsStack = activeModalsStack.filter(modal => modal !== showSidePanel);
    }
});

export const showQuickSettingPanel = writable(false); //Has shortcut key 's'
showQuickSettingPanel.subscribe(value => {
    if (value){
        showSidePanel.set(false);
        activeModalsStack.push(showQuickSettingPanel);
    } else {
        //remove it from the stack array
        activeModalsStack = activeModalsStack.filter(modal => modal !== showQuickSettingPanel);
    }
});

export const showThemesPanel = writable(false); //Has shortcut key 't'
showThemesPanel.subscribe(value => {
    if (value){
        activeModalsStack.push(showThemesPanel);
    } else {
        //remove it from the stack array
        activeModalsStack = activeModalsStack.filter(modal => modal !== showThemesPanel);
    }
});

export const showStickersPanel = writable(false); //Has shortcut key 'i'
showStickersPanel.subscribe(value => {
    if (value){
        activeModalsStack.push(showStickersPanel);
    } else {
        //remove it from the stack array
        activeModalsStack = activeModalsStack.filter(modal => modal !== showStickersPanel);
    }
});

export const showAttachmentPickerPanel = writable(false); //Has shortcut key 'a'
showAttachmentPickerPanel.subscribe(value => {
    if (value){
        activeModalsStack.push(showAttachmentPickerPanel);
    } else {
        //remove it from the stack array
        activeModalsStack = activeModalsStack.filter(modal => modal !== showAttachmentPickerPanel);
    }
});

export const showImageViewerPanel = writable(false);
showImageViewerPanel.subscribe(value => {
    if (value){
        activeModalsStack.push(showImageViewerPanel);
    } else {
        //remove it from the stack array
        activeModalsStack = activeModalsStack.filter(modal => modal !== showImageViewerPanel);
    }
});

export const showFilePreviewPanel = writable(false);
showFilePreviewPanel.subscribe(value => {
    if (value){
        activeModalsStack.push(showFilePreviewPanel);
    } else {
        //remove it from the stack array
        activeModalsStack = activeModalsStack.filter(modal => modal !== showFilePreviewPanel);
    }
});


//clear all modals from stack and set all modals to false
export function clearModals(){
    activeModalsStack.forEach(modal => {
        modal.set(false);
    });
    activeModalsStack.length = 0;
}