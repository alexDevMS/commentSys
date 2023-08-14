import {Skeleton} from "./components/skeleton/skeleton.ts";
import {CommentsSystem} from "./components/commentsSystem/commentsSystem.ts";
import {Elements, getElements} from "./components/utils/utils.ts";
import styles from "./app.module.scss"
import '../assets/styles/global.scss'

/**
 * Перечисление, созданное для доступа к названиям элементов в одном месте
 */
enum ELEMENTS {
    navigation= "navigation",
    skeleton = "skeleton",
    commentsSystem = "commentsSystem"
}

export class App {
    /**
     * HTML элемент, в который встраивается компонент
     * @private
     */
    private readonly _root: HTMLElement;

    /**
     * Объект элементов на текущем уровне
     * @private
     */
    private readonly _elements: Elements = {};

    /**
     * Шаблон компонента (неизменяемый)
     * @private
     */
    private static template  = `
        <header>
            <nav data-element="${ELEMENTS.navigation}"></nav>
        </header>
        <aside></aside>
        <main>
            <section data-element="${ELEMENTS.skeleton}" class="${styles.skeletonContainer}"></section>
            <section data-element="${ELEMENTS.commentsSystem}"></section>
        </main>`

    constructor(root: HTMLElement) {
        this._root = root
    }


    /**
     * Отрисовывает компонент
     */
    render() {
        this._root.innerHTML = App.template;
        getElements(this._root,this._elements);
        const skeleton = new Skeleton(this._elements[ELEMENTS.skeleton]);
        const commentsModule = new CommentsSystem(this._elements[ELEMENTS.commentsSystem]);
    }
}
