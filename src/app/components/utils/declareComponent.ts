import {Elements} from "./utils.ts";

export declare interface Component {
    readonly root: HTMLElement;
    readonly elements: Elements;

    render(): void;
}