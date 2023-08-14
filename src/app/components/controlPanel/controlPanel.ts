export class ControlPanel {
    private readonly _controlPanel: HTMLElement

    private static template = `
        <div>CONTROL PANEL</div>
    `


    constructor(controlPanel: HTMLElement) {
        this._controlPanel = controlPanel;
        this.render()
    }

    render() {
        this._controlPanel.innerHTML = ControlPanel.template;
    }

}