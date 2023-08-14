import {Elements, getElements} from "../utils/utils.ts";

enum ELEMENTS {
    allCommentsFilter = "allCommentsFilter",
    sortingSelect = "sortingSelect",
    favoriteFilter = "favoriteFilter",
}

export class ControlPanel {

    /**
     * HTML элемент, в который встраивается компонент
     * @private
     */
    private readonly _controlPanel: HTMLElement;

    private readonly _elements: Elements = {};

    /**
     * Шаблон компонента (неизменяемый)
     * @private
     */
    private static template = `
        <div data-element="${ELEMENTS.allCommentsFilter}">ALL COMMS</div>
        <div data-element="${ELEMENTS.sortingSelect}">SORT SELECT</div>
        <div data-element="${ELEMENTS.favoriteFilter}">FAVORITES</div>
    `


    constructor(controlPanel: HTMLElement) {
        this._controlPanel = controlPanel;
        this.render();
    }

    /**
     * Отрисовывает компонент
     */
    render() {
        this._controlPanel.innerHTML = ControlPanel.template;
        getElements(this._controlPanel, this._elements);
        this.addListeners()
    }

    onAllCommentsFilterClick = (event: MouseEvent) => {
        console.log("All COMS");
    }
    onSortingSelectClick = (event: MouseEvent) => {
        console.log("SELECT MODAL OPEN HERE");
    }
    onFavoriteFilterClick = (event: MouseEvent) => {
        console.log("FAVORITE")
    }

    addListeners(){
        const allCommentsFilter = this._elements[ELEMENTS.allCommentsFilter];
        const sortingSelect = this._elements[ELEMENTS.sortingSelect];
        const favoriteFilter = this._elements[ELEMENTS.favoriteFilter];

        allCommentsFilter.addEventListener('click', this.onAllCommentsFilterClick);
        sortingSelect.addEventListener('click', this.onSortingSelectClick);
        favoriteFilter.addEventListener('click', this.onFavoriteFilterClick);
    }
}