<script lang="ts">
    import Fadein from "@/components/animations/Fadein.svelte";
    import Loader from "@/components/animations/Loader.svelte";

    import Component from "@/pages/home/Component.svelte";

    import { Peer } from "peerjs";

    interface Props {
        params: {};
    }
    const { params }: Props = $props();

    const promise = new Promise((resolve) => {
        const peer = new Peer();

        peer.on("open", (_) => {
            resolve({ params, peer });
        });
    });
</script>

<Fadein>
    <Loader
        class="flex h-screen items-center justify-center w-full"
        {Component}
        {promise}
    />
</Fadein>

<style lang="postcss">
    @reference "@/app.css";
</style>
