<script lang="ts">
    import { link } from "svelte-spa-router";
</script>

<aside class="hidden bg-zinc-940 flex-col gap-2 h-screen p-2 text-zinc-400 md:flex md:max-w-64 md:min-w-64">
    <div
        class="select-none cursor-default duration-300 flex gap-4 items-center justify-center py-2 px-4 w-full"
    >
        <span>Broadcast Node</span>
    </div>
    <hr class="border-zinc-800" />
    <ul class="flex flex-col gap-2 w-full">
        <li class="flex">
            <a
                class="select-none cursor-pointer duration-300 flex gap-4 items-center py-2 px-4 hover:bg-zinc-800 hover:text-zinc-200 w-full"
                href="/network/create"
                use:link
            >
                <i class="fa-solid fa-tower-broadcast"></i>
                <span>Create</span>
            </a>
        </li>
        <li class="flex">
            <a
                class="select-none cursor-pointer duration-300 flex gap-4 items-center py-2 px-4 hover:bg-zinc-800 hover:text-zinc-200 w-full"
                href="/network/join"
                use:link
            >
                <i class="fa-solid fa-circle-nodes"></i>
                <span>Join</span>
            </a>
        </li>
    </ul>
</aside>

<style lang="postcss">
    @reference "@/app.css";
</style>
