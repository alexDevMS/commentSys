import {Elements, getElements} from "../utils/utils.ts";
import style from "./controlPanel.module.scss";

enum ELEMENTS {
    allCommentsFilter = "allCommentsFilter",
    favoriteFilter = "favoriteFilter",
    selectButton = "selectButton",
    selectDropdown = "selectDropdown",
}

export class ControlPanel {

    /**
     * HTML элемент, в который встраивается компонент
     * @private
     */
    private readonly _controlPanel: HTMLElement;

    private readonly _elements: Elements = {};

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
            Комментарии <span class="${style.commentCounter}">(${5})</span>
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
        this._controlPanel = controlPanel;
        this.render();
    }

    /**
     * Отрисовывает компонент
     */
    render() {
        this._controlPanel.innerHTML = ControlPanel._template;
        getElements(this._controlPanel, this._elements);
        this.addListeners();
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
        if (event.target instanceof HTMLElement)
            sessionStorage.setItem("sort", event.target.getAttribute("value")!)
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