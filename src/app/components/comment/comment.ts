import {User} from "../../../request.ts";
import {Component} from "../utils/declareComponent.ts";
import {_, Elements, getElements, sortBy} from "../utils/utils.ts";
import style from "./comment.module.scss";
import {AddCommentForm} from "../addCommentForm/addCommentForm.ts";

enum ELEMENTS {
    avatar = "avatar",
    comment = "comment",
    controls = "controls",
    name = "name",
    timestamp = "timestamp",
    reply = "reply",
    favorite = "favorite",
    rating = "rating",
    title = "title",
    parent = "parent",
    replies = "replies",
    decrement = "decrement",
    increment = "increment",
    addCommentForm = "addCommentForm",
}

export type ParentComment = {
    comment: string
    timestamp: Date,
    isFavorite: boolean,
    rating: number,
    vote: number,
    replies?: ChildComment[],
    parent?: never,
} & User

export type ChildComment = {
    comment: string
    isFavorite: boolean,
    timestamp: Date,
    rating: number,
    vote: number,
    parent: string
    replies?: never
} & User

export type CommentType = ParentComment | ChildComment

export class Comment implements Component {

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
    private readonly _elements:Elements = {};
    get elements(){ return this._elements }

    private readonly _comment: CommentType;
    private _repliesData: ChildComment[];

    private readonly _updateComments: ()=> void;
    private readonly _patchCommentData: (data: CommentType)=>void;

    private static template = `
        <div class="${style.commentContainer}">
            <img data-element="${ELEMENTS.avatar}" alt="avatar" class="${style.avatar}"/>
            <div class="${style.dataContainer}">
                <div data-element="${ELEMENTS.title}" class="${style.title}">
                    <span data-element="${ELEMENTS.name}"></span>
                    <div data-element="${ELEMENTS.parent}"></div>
                    <span data-element="${ELEMENTS.timestamp}"></span>
                </div>
                <div data-element="${ELEMENTS.comment}"></div>
                <div data-element="${ELEMENTS.controls}" class="${style.controls}">
                    <div data-element="${ELEMENTS.reply}">Ответить</div>    
                    <div data-element="${ELEMENTS.favorite}"></div>  
                    <div class="${style.voteSystem}">
                        <div data-element="${ELEMENTS.decrement}" class="${style.voteButton} ${style.red}">-</div>    
                        <div data-element="${ELEMENTS.rating}"></div>    
                        <div data-element="${ELEMENTS.increment}" class="${style.voteButton} ${style.green}">+</div>    
                    </div>
                </div>
            </div>
        </div>
    `;

    constructor(comment: HTMLElement, uuid: string, updateComments: ()=> void, patchCommentData: (data: CommentType)=>void) {
        this._root = comment;
        const storageComms = [...JSON.parse(sessionStorage.getItem("comments")!)];
        this._comment = storageComms.find((item: CommentType) => item.uuid === uuid);
        this._repliesData = storageComms.filter((item: CommentType) => item.parent === this._comment.uuid);

        this._updateComments = updateComments;
        this._patchCommentData = patchCommentData;
        this.render();
    }

    render() {
        this._root.innerHTML = Comment.template;
        getElements(this._root, this._elements);
        this.configureComment();
        if (this._repliesData.length) {
            this._root.insertAdjacentHTML("beforeend",
                `<div data-element="${ELEMENTS.replies}" class="${style.replies}">
                            <div class="${style.replyLine}"></div> 
                      </div>`)
            this._elements[ELEMENTS.replies] = this._root.querySelector(`[data-element=${ELEMENTS.replies}]`)!;
            this.renderReplies();
        }
        this.addListeners();

    }

    renderReplies = () => {
        const replies = this._elements[ELEMENTS.replies];

        replies.insertAdjacentHTML("beforeend", sortBy(this._repliesData, false)
            .map(reply => `<div data-element="${reply.uuid}"></div>`).join(""));

        const repliesInstances: Elements = {};

        getElements(replies, repliesInstances);

        Object.entries(repliesInstances).forEach(([id, element])=>
            new Comment(element, id, this._updateComments, this._patchCommentData))
    }

    configureComment() {
        //TODO: оптимизнуть подвязку к элементам
        const avatar = this._elements[ELEMENTS.avatar];
        const comment = this._elements[ELEMENTS.comment];
        const name = this._elements[ELEMENTS.name];
        const timestamp = this._elements[ELEMENTS.timestamp];
        const favorite = this._elements[ELEMENTS.favorite];
        const rating = this._elements[ELEMENTS.rating];

        const parent =  this._elements[ELEMENTS.parent];
        const reply =  this._elements[ELEMENTS.reply];
        const isParent = !this._comment.parent;


        avatar.setAttribute("src", this._comment.avatar);
        comment.innerHTML = this._comment.comment;
        name.innerHTML = this._comment.name;
        timestamp.innerHTML = new Date(this._comment.timestamp)
            .toLocaleString("ru-RU",{day:"2-digit", month: "2-digit", hour:"2-digit", minute: "2-digit"});

        favorite.innerHTML = this._comment.isFavorite ? `В избранном` : `Не в избранном`;
        rating.innerHTML = this._comment.rating+this._comment.vote+'';
        if (this._comment.rating < 0) {
            rating.classList.add(style.red);
            rating.classList.remove(style.green);
        } else {
            rating.classList.add(style.green);
            rating.classList.remove(style.red);
        }

        if(isParent) {
            parent.remove();
            delete this._elements[ELEMENTS.parent];
        } else {
            const parentData:CommentType = [...JSON.parse(sessionStorage.getItem("comments")!)]
                .find((item:CommentType) => item.uuid === this._comment.parent)

            parent.innerHTML = parentData.name!;
            reply.remove();
            delete this._elements[ELEMENTS.reply];
        }


    }

    addListeners() {
        const decrement = this._elements[ELEMENTS.decrement];
        const increment = this._elements[ELEMENTS.increment];
        const favorite = this._elements[ELEMENTS.favorite];
        const reply = this._elements[ELEMENTS.reply];

        decrement.addEventListener('click', this.onDecrement);
        increment.addEventListener('click', this.onIncrement);
        favorite.addEventListener('click', this.onFavorite);
        reply?.addEventListener('click',this.onReply);

    }

    onDecrement = () => {
        this._comment.vote === -1
            ? this._comment.vote = 0
            : this._comment.vote = -1;
        this._patchCommentData(this._comment);
        this._updateComments();
    }

    onIncrement = () => {
        this._comment.vote === 1
            ? this._comment.vote = 0
            : this._comment.vote = 1;
        this._patchCommentData(this._comment);
        this._updateComments();
    }

    onFavorite = () => {
        console.log("favoriteeeee")
    }

    onReply = () => {
        if (!this._elements[ELEMENTS.replies]) {
            this._root.insertAdjacentHTML("beforeend",
                `<div data-element="${ELEMENTS.replies}" class="${style.replies}">
                            <div class="${style.replyLine}"></div> 
                      </div>`)
            this._elements[ELEMENTS.replies] = this._root.querySelector(`[data-element=${ELEMENTS.replies}]`)!;
        }

        const replies = this._elements[ELEMENTS.replies];
        replies.insertAdjacentHTML("afterbegin", `<div data-element="${ELEMENTS.addCommentForm}" class="${style.addCommentForm}"></div>`);
        getElements(this._root, this._elements);
        const form = this._elements[ELEMENTS.addCommentForm];

        new AddCommentForm(form, _, this.updateReplies, this._comment);
    }

    updateReplies = () => {
        const storageComms = [...JSON.parse(sessionStorage.getItem("comments")!)];
        this._repliesData = storageComms.filter((item: CommentType) => item.parent === this._comment.uuid);
        this._elements[ELEMENTS.addCommentForm].remove();
        this.renderReplies();
    }

}