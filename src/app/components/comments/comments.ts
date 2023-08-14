export class Comments {
    private readonly _comments: HTMLElement;

    private static template = `
        <div>COMMMENTS LIST</div>
    `


    constructor(comments: HTMLElement) {
        this._comments = comments;
        this.render()
    }

    render() {
        this._comments.innerHTML = Comments.template
    }
}