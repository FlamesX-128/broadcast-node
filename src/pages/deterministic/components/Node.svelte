<script lang="ts">
    interface Props {
        id: string;
    }

    const { id }: Props = $props();

    function onClick(e: Event) {
        e.preventDefault();

        navigator.clipboard
            .writeText(id)
            .then(() => {
                console.log("ID copiado:", id);
            })
            .catch((err) => {
                console.error("Error al copiar:", err);
            });
    }
</script>

<li>
    <div
        class="bg-zinc-940 relative duration-300 gap-2 flex items-center max-h-64 max-w-64 min-h-64 min-w-64 rounded-lg"
    >
        <button
            aria-label="copy"
            class="cursor-pointer duration-300 flex items-center justify-center w-full"
            onclick={onClick}
        >
            <i class="fa-solid fa-cube text-8xl"></i>
        </button>

        <div
            class="absolute bottom-0 flex gap-2 items-center justify-center p-2"
        >
            <div
                class="flex items-center justify-center cursor-pointer duration-300 transform-gpu will-change-transform w-8 h-8"
            >
                <i class="fa-solid fa-microphone fa-xl"></i>
            </div>
        </div>
    </div>
</li>
