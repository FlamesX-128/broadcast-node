/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module "markdown-it-katex" {
    import type { KatexOptions } from "katex";

    import type { PluginSimple } from "markdown-it";
    import mi from "markdown-it";

    declare const PluginSimple: PluginSimple;

    export default (md: mi, options?: KatexOptions) => PluginSimple;
}