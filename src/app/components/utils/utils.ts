import {CommentType} from "../comment/comment.ts";

export interface Elements {
    [k: string]: HTMLElement
}

/**
 * Формирует объект элементов для текущего компонента
 * @param root - HTML элемент, в который встраивается компонент
 * @param elements - объект элементов
 */
export function getElements(root: HTMLElement, elements: Elements) {
    [...root.querySelectorAll('[data-element]')]
        .forEach((element: Element) => {
            if (element instanceof HTMLElement)
               elements[element.dataset.element!] = element;
        })
}

export const _ = undefined;


export function sortBy(comments: CommentType[], isParent = true) {
    const sortAttr = sessionStorage.getItem("sort")!;

    switch (sortAttr) {
        case "date":
            return comments.sort((a,b) =>
                new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

        case "relevance":
            return comments.sort((a,b) =>
                new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        case "rating":
            return comments.sort((a,b)=>
                (b.rating+b.vote) - (a.rating+a.vote))

        case "replies":
            console.log(isParent)
            return comments;
        default:
            return comments;
    }
}