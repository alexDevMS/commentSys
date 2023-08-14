import {Elements, getElements} from "../utils/utils.ts";
import {ControlPanel} from "../controlPanel/controlPanel.ts";
import {AddCommentForm} from "../addCommentForm/addCommentForm.ts";
import {Comments} from "../comments/comments.ts";

/**
 * Перечисление, созданное для доступа к названиям элементов в одном месте
 */
enum elementsEnum {
    controlPanel = "controlPanel",
    addCommentForm = "addCommentForm",
    comments = "comments"
}

export class CommentsSystem {
    /**
     * HTML элемент, в который встраивается компонент
     * @private
     */
    private readonly _commentsRoot: HTMLElement;

    /**
     * Объект элементов на текущем уровне
     * @private
     */
    private readonly _elements:Elements = {}

    /**
     * Шаблон компонента (неизменяемый)
     * @private
     */
    private static template = `
            <div data-element=${elementsEnum.controlPanel}></div>
            <div data-element=${elementsEnum.addCommentForm}></div>
            <div data-element=${elementsEnum.comments}></div>
    `

    constructor(commentsRoot: HTMLElement) {
        this._commentsRoot = commentsRoot
        this.render()
    }

    /**
     * Отрисовывает компонент
     */
    render() {
        this._commentsRoot.innerHTML = CommentsSystem.template
        getElements(this._commentsRoot, this._elements)
        const controlPanel = new ControlPanel(this._elements[elementsEnum.controlPanel]);
        const addCommentForm = new AddCommentForm(this._elements[elementsEnum.addCommentForm]);
        const comments = new Comments(this._elements[elementsEnum.comments]);
    }
}