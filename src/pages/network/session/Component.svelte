<script lang="ts">
    import Fadein from "@/components/animations/Fadein.svelte";
    import Node from "@/pages/network/components/Node.svelte";

    import type { MediaConnection, Peer } from "peerjs";
    import { onMount } from "svelte";

    interface Props {
        params: {
            id: string;
        };
        peer: Peer;
    }
    const { params, peer }: Props = $props();

    // List of connected nodes
    let nodes: MediaConnection[] = $state([]);

    // Remove node from the list
    function removeNode(connectionId: string) {
        nodes = nodes.filter((node) => node.connectionId !== connectionId);
    }

    // Handle incoming media call
    const handleMediaCall = (conn: MediaConnection, stream: MediaStream) => {
        nodes.push(conn);

        const audio: HTMLAudioElement = new Audio();

        conn.answer(stream);
        conn.once("close", () => {
            audio.remove();
            removeNode(conn.connectionId);
        });

        conn.on("stream", (remoteStream) => {
            audio.srcObject = remoteStream;
            audio.play();
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

            const audio: HTMLAudioElement = new Audio();
            const conn = peer.call(params.id, stream);
            nodes.push(conn);

            conn.once("close", () => {
                removeNode(conn.connectionId);
            });

            conn.on("stream", (remoteStream) => {
                audio.srcObject = remoteStream;
                audio.play();
            });
        })
        .catch((_) => {
            const stream = new MediaStream();

            peer.on("call", (conn: MediaConnection) => {
                handleMediaCall(conn, stream);
            });

            const audio: HTMLAudioElement = new Audio();
            const conn = peer.call(params.id, stream);
            nodes.push(conn);

            conn.once("close", () => {
                removeNode(conn.connectionId);
            });

            conn.on("stream", (remoteStream) => {
                audio.srcObject = remoteStream;
                audio.play();
            });
        });

    // Close all connections when peer is disconnected
    peer.on("disconnected", () => {
        nodes.forEach((conn) => {
            conn.close();
        });
        nodes = [];
    });

    //
    let wakeLock: WakeLockSentinel | null = null;

    async function enableWakeLock() {
        try {
            if ("wakeLock" in navigator) {
                wakeLock = await navigator.wakeLock.request("screen");

                wakeLock.addEventListener("release", () => {
                    enableWakeLock();
                });
            } else {
                console.warn("Wake Lock API not supported in this browser.");
            }
        } catch (err) {
            console.error("Error activating Wake Lock:", err);
        }
    }

    onMount(() => {
        enableWakeLock();
    });
</script>

<Fadein class="flex flex-col h-screen text-zinc-400 w-full">
    <section
        class="flex h-full items-center justify-center overflow-y-auto w-full"
    >
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
</Fadein>

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
