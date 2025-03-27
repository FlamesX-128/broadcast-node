<script lang="ts">
    import Fadein from "@/components/animations/Fadein.svelte";
    import Loader from "@/components/animations/Loader.svelte";
    import Aside from "@/components/Aside.svelte";

    import Component from "@/pages/network/session/Component.svelte";

    import { Peer } from "peerjs";
    import { replace } from "svelte-spa-router";

    interface Props {
        params: {
            id: string;
        };
    }
    const { params }: Props = $props();

    if (params.id.length < 36) {
        replace("/");
    }

    const promise = new Promise((resolve) => {
        const peer = new Peer();

        peer.on("open", (_) => {
            resolve({ params, peer });
        });
    });
</script>

<div class="flex">
    <Aside />

    <Fadein class="flex flex-col w-full">
        <Loader
            class="flex flex-col h-full items-center justify-center w-full"
            {Component}
            {promise}
        />
    </Fadein>
</div>

<style lang="postcss">
    @reference "@/app.css";
</style>
