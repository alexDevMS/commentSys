import {Elements, getElements} from "../utils/utils.ts";

export class AddCommentForm {
    /**
     * HTML элемент, в который встраивается компонент
     * @private
     */
    private readonly _form: HTMLElement;

    /**
     * Объект элементов на текущем уровне
     * @private
     */
    private readonly _elements: Elements = {};

    /**
     * Шаблон компонента (неизменяемый)
     * @private
     */
    private static template = `
        <div>IMAGE</div>
        <div>INPUT</div>
        <div>BUTTON</div>
    `

    constructor(form: HTMLElement) {
        this._form = form
        this.render();
    }

    /**
     * Отрисовывает компонент
     */
    render() {
        this._form.innerHTML = AddCommentForm.template;
        getElements(this._form, this._elements)
    }

}