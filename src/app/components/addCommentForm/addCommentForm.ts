import {Elements, getElements} from "../utils/utils.ts";
import {getUser, User} from "../../../request.ts";
import style from "./addCommentForm.module.scss";
import {Component} from "../utils/declareComponent.ts";

enum ELEMENTS {
    avatar =  "avatar",
    inputContainer = "inputContainer",
    input = "input",
    send = "send",
}

type Input = HTMLElement & {value?: string};


export class AddCommentForm implements Component{
    /**
     * HTML элемент, в который встраивается компонент
     * @private
     */
    private readonly _root: HTMLElement;
    get root(){ return this._root }
    /**
     * Объект элементов на текущем уровне
     * @private
     */
    private readonly _elements:Elements = {}
    get elements(){ return this._elements }

    private _user!: User;

    private readonly updateCounter: () => void;
    private readonly updateComments: () => void;

    /**
     * Шаблон компонента (неизменяемый)
     * @private
     */
    private static template = `
        <img data-element="${ELEMENTS.avatar}" class="${style.image}" alt="avatar" />
        <div data-element="${ELEMENTS.inputContainer}" class="${style.inputContainer}">
            <textarea data-element="${ELEMENTS.input}" class="${style.input}" maxlength="1000" placeholder="Введите комментарий..." ></textarea>
        </div>
        <div data-element="${ELEMENTS.send}" class="${style.send}">Отправить</div>
    `

    constructor(form: HTMLElement, updateCounter: ()=>void, updateComments: () => void) {
        this._root = form;
        this.updateCounter = updateCounter;
        this.updateComments = updateComments;
        this.render();
    }


    /**
     * Отрисовывает компонент
     */
    render() {
        this._root.innerHTML = AddCommentForm.template;
        getElements(this._root, this._elements);


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

        this.addListeners()
    }

    updateImage() {
        this._elements[ELEMENTS.avatar].setAttribute("src", this._user.avatar)
    }

    addListeners() {
        const send = this._elements[ELEMENTS.send];
        send.addEventListener("click", this.onSend)
    }

    onSend = () => {
        const input: Input = this._elements[ELEMENTS.input];
        if (!input.value) return; // Error

        const comments = JSON.parse(sessionStorage.getItem("comments")!);
        const data = {
            ...this._user,
            comment: input.value,
        }
        comments.push(data);
        sessionStorage.setItem("comments", JSON.stringify(comments));
        input.value = "";
        this.updateCounter();
        this.updateComments();
    }

}