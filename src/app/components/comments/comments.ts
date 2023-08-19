import {Comment, CommentType} from "../comment/comment.ts";
import {Elements, getElements, sortBy} from "../utils/utils.ts";
import {Component} from "../utils/declareComponent.ts";

export class Comments implements Component{
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

    private _comments: CommentType[];

    /**
     * Шаблон компонента (неизменяемый)
     * @private
     */
    private static template = `
        <div class="">EMPTY LIST</div>
    `

    constructor(comments: HTMLElement) {
        this._root = comments;
        this._comments = JSON.parse(sessionStorage.getItem("comments")!);
        this.render()
    }

    /**
     * Отрисовывает компонент
     */
    render() {
        if (!this._comments.length) {
            this._root.innerHTML = Comments.template;
            return
        }
        const parentComments = this._comments.filter(item => !item.parent);
        this._root.innerHTML = sortBy(parentComments)
            .map(comment => `<div data-element="${comment.uuid}"></div>`)
            .join("");
        getElements(this._root, this._elements);

        Object.entries(this._elements).forEach(([id, element])=>
        new Comment(element, id, this.updateComments, this.patchCommentData))
    }


    updateComments = () => {
        this._comments = JSON.parse(sessionStorage.getItem("comments")!);
        this.render();
    }

    patchCommentData = (data: CommentType) => {
        this._comments = JSON.parse(sessionStorage.getItem("comments")!);
       const patchedData = this._comments.map((comment) =>
           comment.uuid  === data.uuid
           ? data : comment);
       sessionStorage.setItem("comments",JSON.stringify(patchedData));
    }

}