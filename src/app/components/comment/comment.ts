import {User} from "../../../request.ts";
import {Component} from "../utils/declareComponent.ts";
import {Elements, getElements} from "../utils/utils.ts";
import style from "./comment.module.scss";

enum ELEMENTS {
    avatar = "avatar",
    comment = "comment",
    controls = "controls",
    name = "name",
    timestamp = "timestamp",
    reply = "reply",
    favorite = "favorite",
    vote = "vote",
    title = "title",
    parent = "parent",
    replies = "replies",
}

type ParentComment = {
    comment: string
    timestamp: Date,
    isFavorite: boolean,
    vote: number,
    replies?: ChildComment[],
    parent?: never,
} & User

type ChildComment = {
    comment: string
    isFavorite: boolean,
    timestamp: Date,
    vote: number,
    parent: ParentComment
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
    private readonly _elements:Elements = {}
    get elements(){ return this._elements }

    private readonly _comment: CommentType;

    private static template = `
        <div>
            <img data-element="${ELEMENTS.avatar}" src="" alt="avatar"/>
            <div>
                <div data-element="${ELEMENTS.title}">
                    <span data-element="${ELEMENTS.name}"></span>
                    <div data-element="${ELEMENTS.parent}"></div>
                    <span data-element="${ELEMENTS.timestamp}"></span>
                </div>
                <div data-element="${ELEMENTS.comment}"></div>
                <div data-element="${ELEMENTS.controls}">
                    <div data-element="${ELEMENTS.reply}">Ответить</div>    
                    <div data-element="${ELEMENTS.favorite}"></div>  
                    <div>
                        <div>-</div>    
                        <div data-element="${ELEMENTS.vote}"></div>    
                        <div>+</div>    
                    </div>
                </div>
            </div>
        </div>
        <div data-element="${ELEMENTS.replies}" style="${style.replies}"></div>
    `;

    constructor(comment: HTMLElement, uuid: string) {
        this._root = comment;
        this._comment = [...JSON.parse(sessionStorage.getItem("comments")!)]
            .find((item: CommentType) => item.uuid === uuid);
        this.render();
    }


    render() {
        this._root.innerHTML = Comment.template;
        getElements(this._root, this._elements);

        this.configureComment();

    }
    configureComment() {

        const avatar = this._elements[ELEMENTS.avatar];
        const comment = this._elements[ELEMENTS.comment];
        const name = this._elements[ELEMENTS.name];
        const timestamp = this._elements[ELEMENTS.timestamp];
        const favorite = this._elements[ELEMENTS.favorite];
        const vote = this._elements[ELEMENTS.vote];

        const parent =  this._elements[ELEMENTS.parent];
        const reply =  this._elements[ELEMENTS.reply];
        const replies =  this._elements[ELEMENTS.replies];
        const isParent = !this._comment.parent;


        avatar.setAttribute("src", this._comment.avatar);
        comment.innerHTML = this._comment.comment;
        name.innerHTML = this._comment.name;
        timestamp.innerHTML = this._comment.timestamp.toString();
        favorite.innerHTML = this._comment.isFavorite ? `В избранном` : `Не в избранном`;
        vote.innerHTML = this._comment.vote+'';


        if(isParent) {
            if (this._comment.replies)
                replies.innerHTML =  `${this._comment.replies.map(item => item.uuid)}`
            parent.remove();
        } else {
            parent.innerHTML = this._comment.parent!.name;

            reply.remove();
            replies.remove();
        }




    }
}