import {Elements, getElements} from "../utils/utils.ts";
import {getUser, User} from "../../../request.ts";
import style from "./addCommentForm.module.scss";

enum ELEMENTS {
    avatar =  "avatar",
    input = "input",
    send = "send",
}


export class AddCommentForm {
    /**
     * HTML элемент, в который встраивается компонент
     * @private
     */
    private readonly _form: HTMLElement;

    private _user!: User;

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
        <img data-element="${ELEMENTS.avatar}" class="${style.image}" alt="avatar" />
        <div data-element="${ELEMENTS.input}" class="${style.inputContainer}">
            <textarea class="${style.input}" maxlength="1000" placeholder="Введите комментарий..." ></textarea>
        </div>
        <div data-element="${ELEMENTS.send}" class="${style.send}">Отправить</div>
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
        getElements(this._form, this._elements);

        //TODO: offline Mock
        // setTimeout(()=>
        //     getUserMock()
        //     .then((user)=>this._user = user)
        //     .then(()=>{
        //         console.log(this._user);
        //         this.updateImage()}),100);

        getUser()
            .then(user=>this._user = user)
            .then(()=>this.updateImage())
    }

    updateImage() {
        this._elements[ELEMENTS.avatar].setAttribute("src", this._user.avatar)
    }

}