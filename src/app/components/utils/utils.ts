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