import {Elements, getElements} from "../utils/utils.ts";
import style from "./controlPanel.module.scss";
import {Component} from "../utils/declareComponent.ts";

enum ELEMENTS {
    allCommentsFilter = "allCommentsFilter",
    favoriteFilter = "favoriteFilter",
    selectButton = "selectButton",
    selectDropdown = "selectDropdown",
    counter = "counter",
}

export class ControlPanel implements Component {

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

    private static _selectData = [
        {key: "date", value: "По дате"},
        {key: "reply", value: "По ответам"},
        {key: "relevance", value: "По актуальности"},
        {key: "vote", value: "По голосам"},
    ]

    /**
     * Шаблон компонента (неизменяемый)
     * @private
     */
    private static _template = `
        <button data-element="${ELEMENTS.allCommentsFilter}">
            Комментарии <span data-element="${ELEMENTS.counter}" class="${style.commentCounter}">(${0})</span>
        </button>
        <div class="${style.select}">
            <button data-element="${ELEMENTS.selectButton}">По актуальности <img src="/arrow.png" alt="arrow"/></button>
            <ul data-element="${ELEMENTS.selectDropdown}" class=" ${style.dropdown} ${style.hide}">
                ${ControlPanel._selectData.map(item => 
                    `<li  value="${item.key}">${item.value}</li>`).join("")}
            </ul>
        </div>
        <button data-element="${ELEMENTS.favoriteFilter}">
            Избранное <img src="/favorites.png" alt="a filled heart in a circle"/>
        </button>
    `

    constructor(controlPanel: HTMLElement) {
        this._root = controlPanel;
        this.render();
    }

    /**
     * Отрисовывает компонент
     */
    render() {
        this._root.innerHTML = ControlPanel._template;
        getElements(this._root, this._elements);
        this.updateCounter();
        this.addListeners();
    }

    updateCounter() {
        const counter = this._elements[ELEMENTS.counter];
        const commentCount = JSON.parse(sessionStorage.getItem("comments")!).length;
        counter.innerHTML = `(${commentCount})`;
    }

    onAllCommentsFilterClick = () => {
        console.log("All COMS");
    }


    onFavoriteFilterClick = () => {
        console.log("FAVORITE")
    }

    onSelectButtonClick = () => {
        const button = this._elements[ELEMENTS.selectButton];
        const icon = button.firstElementChild!;
        const dropdown = this._elements[ELEMENTS.selectDropdown];

        icon.classList.toggle(style.rotate);

        dropdown.classList.toggle(style.hide);
        if (!dropdown.classList.contains(style.hide)) {
            dropdown.style.top = button.getBoundingClientRect().height + 5 + "px";
        }
    }

    onSelectDropdownClick = (event: MouseEvent) => {
        const dropdown = this._elements[ELEMENTS.selectDropdown];
        if (event.target instanceof HTMLElement)
            sessionStorage.setItem("sort", event.target.getAttribute("value")!)

        dropdown.classList.toggle(style.hide);
    }

    addListeners(){
        const allCommentsFilter = this._elements[ELEMENTS.allCommentsFilter];
        const favoriteFilter = this._elements[ELEMENTS.favoriteFilter];
        const selectButton = this._elements[ELEMENTS.selectButton];
        const selectDropdown = this._elements[ELEMENTS.selectDropdown];

        allCommentsFilter.addEventListener('click', this.onAllCommentsFilterClick);
        favoriteFilter.addEventListener('click', this.onFavoriteFilterClick);
        selectButton.addEventListener('click', this.onSelectButtonClick);
        selectDropdown.addEventListener('click', this.onSelectDropdownClick);
    }

}