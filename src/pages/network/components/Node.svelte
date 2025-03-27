<script lang="ts">
    import Fadein from "@/components/animations/Fadein.svelte";

    import type { MediaConnection } from "peerjs";

    interface Props {
        conn: MediaConnection;
    }
    const { conn }: Props = $props();
</script>

<Fadein>
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
                {conn.connectionId}
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
                        class={true
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
</Fadein>
