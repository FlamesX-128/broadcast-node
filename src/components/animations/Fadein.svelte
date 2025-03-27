<script lang="ts">
    import type { Component } from "svelte";
    import { onMount } from "svelte";

    interface Props {
        children: Component<any>;
        class?: string;
    }

    let props: Props = $props();
    let show = $state(false);

    onMount(async () => {
        await new Promise((resolve) => setInterval(resolve, 500));

        show = true;
    });
</script>

<div class={`duration-1000 ${show ? "opacity-100" : "opacity-0"} transition ` + (props.class ?? "")}>
    <props.children />
</div>
