export class ControlPanel {
    /**
     * HTML элемент, в который встраивается компонент
     * @private
     */
    private readonly _controlPanel: HTMLElement

    /**
     * Шаблон компонента (неизменяемый)
     * @private
     */
    private static template = `
        <div>CONTROL PANEL</div>
    `


    constructor(controlPanel: HTMLElement) {
        this._controlPanel = controlPanel;
        this.render()
    }

    /**
     * Отрисовывает компонент
     */
    render() {
        this._controlPanel.innerHTML = ControlPanel.template;
    }

}