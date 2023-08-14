import styles from "./skeleton.module.scss";
export class Skeleton {
    private readonly _skeleton: HTMLElement;

    private static template = `
    ${[...Array(8)].map(() => `<div class="${styles.skeleton}"></div>`).join("")}    
    <div class="${styles.bigSkeleton}"></div>
    `

    constructor(skeleton: HTMLElement) {
        this._skeleton = skeleton
        this.render()
    }

    render() {
        this._skeleton.innerHTML = Skeleton.template;
    }

}