<script lang="ts">
    import Router from "svelte-spa-router";

    import Home from "@/pages/Home.svelte";

    import Join from "@/pages/network/join/Component.svelte";
    import Create from "@/pages/network/create/Loader.svelte";
    import Session from "@/pages/network/session/Loader.svelte";

    const routes = {
        "/": Home,

        "/network/join": Join,
        "/network/create": Create,
        "/network/session/:id": Session,
    };
</script>

<div class="bg-zinc-900 flex flex-col max-h-screen max-w-screen min-h-screen mix-w-screen text-white">
    <Router {routes} />
</div>
