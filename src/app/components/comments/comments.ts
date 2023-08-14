export class Comments {
    /**
     * HTML элемент, в который встраивается компонент
     * @private
     */
    private readonly _comments: HTMLElement;

    /**
     * Шаблон компонента (неизменяемый)
     * @private
     */
    private static template = `
        <div>COMMMENTS LIST</div>
    `


    constructor(comments: HTMLElement) {
        this._comments = comments;
        this.render()
    }

    /**
     * Отрисовывает компонент
     */
    render() {
        this._comments.innerHTML = Comments.template
    }
}