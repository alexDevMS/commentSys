import {Elements, getElements} from "../utils/utils.ts";

export class AddCommentForm {
    private readonly _form: HTMLElement;
    private readonly _elements: Elements = {};

    private static template = `
        <div>FORM</div>
    `

    constructor(form: HTMLElement) {
        this._form = form
        this.render();
    }

    render() {
        this._form.innerHTML = AddCommentForm.template;
        getElements(this._form, this._elements)
    }

}