<script lang="ts">
    import Fadein from "@/components/animations/Fadein.svelte";
    import Loader from "@/components/animations/Loader.svelte";

    import Component from "@/pages/deterministic/Component.svelte";

    import { Peer } from "peerjs";
    import { v5 as uuid } from "uuid";

    const namespace = "2ade2397-d91c-4932-928d-17243fc8c8c9";

    interface Props {
        params: {
            name?: string;
        };
    }
    const { params }: Props = $props();

    const promise = new Promise((resolve) => {
        let peer: Peer;

        if (!params.name || params.name.length < 3) {
            peer = new Peer();
        } else {
            peer = new Peer(uuid(params.name!, namespace));
        }

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
