import {Elements, getElements} from "../utils/utils.ts";
import {getUser, User} from "../../../request.ts";
import style from "./addCommentForm.module.scss";
import {Component} from "../utils/declareComponent.ts";
import {CommentType} from "../comment/comment.ts";

enum ELEMENTS {
    avatar =  "avatar",
    inputContainer = "inputContainer",
    input = "input",
    send = "send",
    cancel = "cancel",
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
    private readonly _parent: CommentType | null;


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
        <div style="display: flex; justify-content: center">   
            <div data-element="${ELEMENTS.cancel}" class="${style.send}">Отмена</div>
            <div data-element="${ELEMENTS.send}" class="${style.send}">Отправить</div>
        </div>
        
    `

    constructor(form: HTMLElement, updateCounter = ()=>{}, updateComments: () => void, parent:CommentType | null = null) {
        this._root = form;
        this._parent = parent;
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

        if (!this._parent) {
            this._elements[ELEMENTS.cancel].remove();
            delete this._elements[ELEMENTS.cancel];
        }



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
        send.addEventListener("click", this.onSend);
        this._elements[ELEMENTS.cancel]?.addEventListener('click', this.onCancel)
    }

    onSend = () => {
        const input: Input = this._elements[ELEMENTS.input];
        if (!input.value) return; // Error

        const comments = JSON.parse(sessionStorage.getItem("comments")!);


        //костыль.
        // Если использовать только data, переопределение типа в Parent Comment произойдет раньше, чем вставка parent если он есть
        const draftData: any = {
            ...this._user,
            comment: input.value,
            isFavorite: false,
            rating: Math.floor(Math.random() * (101 + 100) - 100),
            timestamp:  new Date(Date.now()),
            vote: 0,
        }
        if(this._parent) {
            draftData["parent"] = this._parent.uuid;
        }

        const data:CommentType = draftData;

        comments.push(data);
        sessionStorage.setItem("comments", JSON.stringify(comments));
        input.value = "";
        this.updateCounter();
        this.updateComments();
        this.render();
    }

    onCancel = () => {
        this._root.remove();
    }

}