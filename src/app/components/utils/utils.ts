export interface Elements {
    [k: string]: HTMLElement
}


export function getElements(root: HTMLElement, elements: Elements) {
    [...root.querySelectorAll('[data-element]')]
        .forEach((element: Element) => {
            if (element instanceof HTMLElement)
               elements[element.dataset.element!] = element;
        })
}