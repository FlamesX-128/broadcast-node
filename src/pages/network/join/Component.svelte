<script lang="ts">
    import Fadein from "@/components/animations/Fadein.svelte";
    import Aside from "@/components/Aside.svelte";

    import { replace } from "svelte-spa-router";

    let value = $state("");
    let isDisabled = $derived(value.length < 36);

    function onClick(e: Event) {
        e.preventDefault();

        if (value.length >= 36) {
            replace(`/network/session/${value}`);
        }
    }
</script>

<div class="flex">
    <Aside />

    <Fadein class="flex flex-col h-screen text-zinc-400 w-full">
        <section class="flex h-full items-center justify-center w-full">
            <form class="flex flex-col gap-2 min-w-80 md:min-w-md">
                <div
                    class="select-none cursor-default duration-300 flex gap-2 items-center"
                >
                    <div
                        class="select-none cursor-pointer duration-300 flex items-center justify-center py-3 px-3"
                    >
                        <i class="fa-solid fa-cube"></i>
                    </div>
                    <input
                        class="bg-zinc-900 focus:outline-none focus:ring-0 w-full"
                        type="text"
                        placeholder="Universally unique identifier"
                        autocomplete="off"
                        bind:value
                    />
                </div>
                <hr class="border-zinc-600" />
                <div class="flex gap-2 justify-end">
                    <button
                        aria-label="connect"
                        class="select-none cursor-pointer duration-300 flex items-center justify-center py-3 px-3
                               hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isDisabled}
                        onclick={onClick}
                        type="submit"
                    >
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </form>
        </section>
    </Fadein>
</div>

<style lang="postcss">
    @reference "@/app.css";
</style>
