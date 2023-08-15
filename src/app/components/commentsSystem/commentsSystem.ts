import {Elements, getElements} from "../utils/utils.ts";
import {ControlPanel} from "../controlPanel/controlPanel.ts";
import {AddCommentForm} from "../addCommentForm/addCommentForm.ts";
import {Comments} from "../comments/comments.ts";
import styles from "./commentsSystem.module.scss";
import {Component} from "../utils/declareComponent.ts";

/**
 * Перечисление, созданное для доступа к названиям элементов в одном месте
 */
enum ELEMENTS {
    controlPanel = "controlPanel",
    addCommentForm = "addCommentForm",
    comments = "comments"
}

export class CommentsSystem implements Component {
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


    /**
     * Шаблон компонента (неизменяемый)
     * @private
     */
    private static template = `
            <div data-element=${ELEMENTS.controlPanel} class="${styles.controlPanel}"></div>
            <div data-element=${ELEMENTS.addCommentForm} class="${styles.addCommentForm}"></div>
            <div data-element=${ELEMENTS.comments} class="${styles.comments}"></div>
    `

    constructor(commentsRoot: HTMLElement) {
        this._root = commentsRoot
        this.render()
    }

    /**
     * Отрисовывает компонент
     */
    render() {
        this._root.innerHTML = CommentsSystem.template
        getElements(this._root, this._elements)

        if (!sessionStorage.getItem("comments"))
            sessionStorage.setItem("comments", "[]");
        if(!sessionStorage.getItem("sort"))
            sessionStorage.setItem("sort", "relevance");

        const controlPanel = new ControlPanel(this._elements[ELEMENTS.controlPanel]);
        const addCommentForm = new AddCommentForm(this._elements[ELEMENTS.addCommentForm]);
        const comments = new Comments(this._elements[ELEMENTS.comments]);
    }
}