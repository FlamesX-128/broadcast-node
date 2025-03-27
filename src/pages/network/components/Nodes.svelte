<script lang="ts">
    import Node from "@/pages/network/components/Node.svelte";

    import type { MediaConnection, Peer } from "peerjs";

    interface Props {
        peer: Peer;
    }
    const { peer, ...props }: Props = $props();

    // List of connected nodes
    let nodes: MediaConnection[] = $state([]);

    // Remove node from the list
    function removeNode(connectionId: string) {
        nodes = nodes.filter((node) => node.connectionId !== connectionId);
    }

    // Handle incoming media call
    const handleMediaCall = (conn: MediaConnection, stream: MediaStream) => {
        nodes.push(conn);

        conn.answer(stream);
        conn.once("close", () => {
            removeNode(conn.connectionId);
        });
    };

    // Handle incoming media connection
    let isStreaming = $state(false);

    navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
            isStreaming = true;

            peer.on("call", (conn: MediaConnection) => {
                handleMediaCall(conn, stream);
            });
        })
        .catch((_) => {
            peer.on("call", (conn: MediaConnection) => {
                handleMediaCall(conn, new MediaStream());
            });
        });

    // Close all connections when peer is disconnected
    peer.on("disconnected", () => {
        nodes.forEach((conn) => {
            conn.close();
        });
        nodes = [];
    });
</script>

<section class="flex h-full items-center justify-center overflow-y-auto w-full">
    <ul class="flex flex-col gap-16">
        <li class="flex flex-col gap-2 min-w-80 md:min-w-md">
            <div
                class="select-none cursor-default duration-300 flex gap-2 items-center hover:bg-zinc-800 hover:text-zinc-200"
            >
                <div
                    class="select-none duration-300 flex items-center justify-center py-3 px-3"
                >
                    <i class="fa-solid fa-cube"></i>
                </div>

                <span>
                    {peer.id}
                </span>
            </div>
            <hr class="border-zinc-600" />
            <div class="flex justify-end">
                <div class="flex gap-2">
                    <button
                        aria-label="microphone"
                        class="select-none cursor-pointer duration-300 flex gap-4 items-center justify-center py-3 px-3 hover:bg-zinc-800 hover:text-zinc-200"
                    >
                        <i
                            class={isStreaming
                                ? "fa-solid fa-microphone"
                                : "fa-solid fa-microphone-slash"}
                        ></i>
                    </button>
                    <button
                        aria-label="video"
                        class="select-none cursor-pointer duration-300 flex gap-4 items-center justify-center py-3 px-3 hover:bg-zinc-800 hover:text-zinc-200"
                    >
                        <i class="fa-solid fa-video-slash"></i>
                    </button>
                </div>
            </div>
        </li>

        {#each Array.from(nodes.values()) as conn}
            <Node {conn} />
        {/each}
    </ul>
</section>

<style lang="postcss">
    @reference "@/app.css";

    :global(section::-webkit-scrollbar) {
        width: 0.6rem;
    }
    :global(section::-webkit-scrollbar-track) {
        @apply bg-zinc-900;
    }
    :global(section::-webkit-scrollbar-thumb) {
        @apply bg-zinc-940;
        border-radius: 0.25rem;
    }
    :global(section::-webkit-scrollbar-thumb:hover) {
        @apply bg-zinc-800;
    }
</style>
