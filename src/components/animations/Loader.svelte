<script lang="ts">
    import { fade } from "svelte/transition";

    import type { Component as ComponentType } from "svelte";
    import { onDestroy } from "svelte";

    interface Props {
        class?: string;
        Component: ComponentType<any>;
        promise: Promise<any>;
    }

    let { Component, ...props }: Props = $props();

    let resolvedProps: any = $state(null);
    let showLoading = $state(true);

    const fadeDuration = 1000;
    let timeoutId: NodeJS.Timeout;

    props.promise
        .then((data) => {
            showLoading = false;

            timeoutId = setTimeout(() => {
                resolvedProps = data;
            }, fadeDuration);
        })
        .catch(() => {});

    onDestroy(() => {
        clearTimeout(timeoutId);
    });
</script>

{#if showLoading}
    <div class={props.class ?? ""}>
        <span transition:fade={{ duration: fadeDuration }}>Loading</span>
    </div>
{:else if resolvedProps}
    <Component {...resolvedProps} />
{/if}
