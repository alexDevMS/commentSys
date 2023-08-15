import {User} from "../../../request.ts";
import {Component} from "../utils/declareComponent.ts";
import {Elements} from "../utils/utils.ts";


type ParentComment = {
    comment: string
    isFavorite: boolean,
    vote: number,
    replies?: ChildComment[],
    parent?: never,
} & User

type ChildComment = {
    comment: string
    isFavorite: boolean,
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

    private readonly _uuid: string;

    constructor(comment: HTMLElement, uuid: string) {
        this._root = comment;
        this._uuid = uuid;
        this.render();
    }


    render() {
        this._root.innerHTML = this._uuid+''
    }
}