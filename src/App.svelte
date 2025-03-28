<script lang="ts">
    import Router from "svelte-spa-router";

    import Home from "@/pages/home/Loader.svelte";
    import Deterministic from "@/pages/deterministic/Loader.svelte";

    const routes = {
        "/": Home,
        "/room/:name": Deterministic,
    };
</script>

<div
    class="bg-zinc-900 flex flex-col max-w-screen min-h-screen mix-w-screen text-white"
>
    <Router {routes} />
</div>
