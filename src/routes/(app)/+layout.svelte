<script lang="ts">
    import "$lib/styles/global.scss";
    import { playClickSound } from "$lib/utils";
    import NavigationIndicator from "$lib/components/NavigationIndicator.svelte";
    import { loadChatSettings } from "$lib/components/chatUI/chatComponents/quickSettingsModal.svelte";
    import { onMount } from "svelte";
    console.log("Mounted root +layout.svelte");

    function removeAttribute(evt: MouseEvent | TouchEvent) {
        const element = evt.target as HTMLElement;
        element.removeAttribute("data-pressed");
        //console.log("remove data-pressed");
    }

    function handleClick(event: MouseEvent | TouchEvent) {
        const target = event.target as HTMLElement;

        if (target.classList.contains("button-animate")) {
            target.setAttribute("data-pressed", "true");
            //console.log("add data-pressed");
            //if mouse event, add listener for mouseleave
            if (event instanceof MouseEvent) {
                target.addEventListener("mouseleave", removeAttribute, {
                    once: true,
                });
            } else {
                //if touch event, add listener for touchend
                target.addEventListener("touchend", removeAttribute, {
                    once: true,
                });
            }
        }
        if (target.classList.contains("play-sound")) {
            //console.log("play sound");
            playClickSound();
        }
    }

    onMount(() => {
        loadChatSettings();
    });

</script>

<svelte:body on:contextmenu|preventDefault on:click={handleClick} />

<NavigationIndicator />

<div class="maincontainer">
    <slot />
</div>

<style lang="scss">

    .maincontainer {
        background: rgba(0, 0, 0, 0.6117647059) var(--pattern);
        transition: background 500ms;
        background-blend-mode: soft-light;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        text-align: justify;
        gap: 20px;
        height: 100%;
        width: 100%;
        inset: 0;
        //overflow: scroll;
    }
</style>
