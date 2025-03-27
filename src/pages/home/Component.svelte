<script lang="ts">
    import Fadein from "@/components/animations/Fadein.svelte";

    import Node from "@/pages/home/components/Node.svelte";
    import Navbar from "@/pages/home/components/Navbar.svelte";

    import type { DataConnection, MediaConnection } from "peerjs";
    import { Peer } from "peerjs";

    import { onMount } from "svelte";
    import { SvelteMap } from "svelte/reactivity";

    interface Props {
        peer: Peer;
    }
    const { peer } = $props() as Props;

    interface NodeInfo {
        peer: string;
    }

    interface NodeConnection extends DataConnection {
        info?: NodeInfo;
        mediaConnection?: MediaConnection;
        send<T extends MessageType>(data: Message<T>): Promise<void> | void;
    }

    const MessageType = {
        NodeInfo: "NodeInfo" as const,
    };
    type MessageType = (typeof MessageType)[keyof typeof MessageType];

    interface MessageMap {
        [MessageType.NodeInfo]: NodeInfo;
    }
    interface Message<T extends MessageType = MessageType> {
        type: T;
        data: MessageMap[T];
    }
    type MessageHandler = {
        [T in MessageType]: (this: DataConnection, data: MessageMap[T]) => void;
    };

    const nodes = $state(new SvelteMap<string, NodeConnection>());

    const messageHandler: MessageHandler = {
        [MessageType.NodeInfo](node: NodeInfo) {
            if (node.peer === peer.id) {
                return;
            }

            if (nodes.has(node.peer)) {
                return;
            }

            const conn: NodeConnection = peer.connect(node.peer);
            conn.info = node;

            setupConnection(conn).then(() => {
                setupMediaConnection(conn);
            });
        },
    };

    function processMessage(this: DataConnection, message: unknown) {
        if (typeof message !== "object") {
            return;
        }
        if (!message) {
            return;
        }

        const { type, data }: Partial<Message> = message;

        if (!type || !(type in messageHandler)) {
            return;
        }
        if (!data) {
            return;
        }

        messageHandler[type].call(this, data);
    }

    function setupConnection(conn: NodeConnection): Promise<void> {
        conn.on("data", (data) => {
            processMessage.call(conn, data);
        });

        conn.once("close", () => {
            nodes.delete(conn.peer);
        });

        function handleConnectionOpen() {
            nodes.forEach((node) => {
                const message: Message = {
                    type: MessageType.NodeInfo,
                    data: {
                        peer: node.peer,
                    },
                };

                conn.send(message);
            });

            nodes.set(conn.peer, conn);
        }

        return new Promise((resolve) => {
            conn.once("open", () => {
                handleConnectionOpen();
                resolve();
            });
        });
    }

    async function setupMediaConnection(node: NodeConnection) {
        if (node.mediaConnection !== undefined) {
            return;
        }

        let stream: MediaStream;
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    autoGainControl: false,
                    echoCancellation: true,
                    noiseSuppression: true,
                },
            });
        } catch (err) {
            stream = new MediaStream();
        }

        const audio = new Audio();
        const media = peer.call(node.peer, stream);

        media.once("close", () => {
            audio.remove();
        });

        media.on("stream", (remoteStream) => {
            audio.srcObject = remoteStream;
            audio.play();
        });

        node.mediaConnection = media;
    }

    peer.on("connection", (conn: DataConnection) => {
        if (conn.peer === peer.id) {
            return conn.close();
        }

        if (nodes.has(conn.peer)) {
            return conn.close();
        }

        setupConnection(conn);
    });

    peer.on("disconnected", () => {
        nodes.forEach((node) => {
            node.close();
        });
    });

    function handleMediaCall(conn: MediaConnection, stream?: MediaStream) {
        const node = nodes.get(conn.peer);

        if (!node) {
            return conn.close();
        }

        const audio: HTMLAudioElement = new Audio();
        node.mediaConnection = conn;

        conn.once("close", () => {
            audio.remove();
        });

        conn.on("stream", (remoteStream) => {
            audio.srcObject = remoteStream;
            audio.play();
        });

        conn.answer(stream);
    }

    async function onConnect(nodeId: string) {
        if (nodeId === peer.id) {
            return;
        }

        if (nodes.has(nodeId)) {
            return;
        }

        const conn = peer.connect(nodeId);

        setupConnection(conn).then(() => {
            setupMediaConnection(conn);
        });
    }

    onMount(async () => {
        let stream: MediaStream;
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    autoGainControl: false,
                    echoCancellation: true,
                    noiseSuppression: true,
                },
            });
        } catch (_) {}

        peer.on("call", (conn: MediaConnection) => {
            handleMediaCall(conn, stream);
        });
    });
</script>

<Fadein class="flex flex-col w-full">
    <Navbar {onConnect} />

    <div class="flex items-center justify-center w-full">
        <ul
            class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8 justify-center"
        >
            <Node id={peer.id} />

            {#each nodes as [id]}
                <Fadein>
                    <Node {id} />
                </Fadein>
            {/each}
        </ul>
    </div>
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
