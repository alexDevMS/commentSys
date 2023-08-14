import styles from "./skeleton.module.scss";
export class Skeleton {
    /**
     * HTML элемент, в который встраивается компонент
     * @private
     */
    private readonly _skeleton: HTMLElement;

    /**
     * Объект элементов на текущем уровне
     * @private
     */
    private static template = `
    ${[...Array(8)].map(() => `<div class="${styles.skeleton}"></div>`).join("")}    
    <div class="${styles.bigSkeleton}"></div>
    `

    constructor(skeleton: HTMLElement) {
        this._skeleton = skeleton
        this.render()
    }

    /**
     * Отрисовывает компонент
     */
    render() {
        this._skeleton.innerHTML = Skeleton.template;
    }

}