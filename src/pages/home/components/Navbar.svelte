<script lang="ts">
    interface Props {
        onConnect: (value: string) => Promise<void>;
    }

    const { onConnect }: Props = $props();

    let value = $state("");
    let isDisabled = $derived(value.length < 36);

    async function onClick(e: Event) {
        e.preventDefault();
        onConnect(value);

        value = "";
    }
</script>

<div class="h-16 w-full">
    <nav class="bg-zinc-940 flex fixed justify-center h-16 w-full z-10">
        <form class="flex gap-2 items-center justify-end p-2 w-full">
            <input
                class="bg-zinc-900 border-0 px-4 py-2 w-full md:max-w-md focus:outline-none focus:ring-0"
                type="text"
                placeholder="Universal identifier"
                autocomplete="off"
                bind:value
            />
            <button
                aria-label="connect"
                class="duration-300 flex items-center justify-center max-h-12 max-w-12 min-h-12 min-w-12 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isDisabled}
                onclick={onClick}
                type="submit"
            >
                <i class="fa-solid fa-magnifying-glass fa-xl"></i>
            </button>
        </form>
    </nav>
</div>
