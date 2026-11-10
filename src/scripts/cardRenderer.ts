export function renderCards<T>(
    items: readonly T[],
    list: HTMLUListElement,
    template: HTMLTemplateElement,
    populateCard: (card: HTMLLIElement, item: T, index: number) => void,
) {
    const cards = items.map((item, index) => {
        const card = template.content.firstElementChild?.cloneNode(true);

        if (!(card instanceof HTMLLIElement)) {
            throw new Error('The card template must contain a list item.');
        }

        populateCard(card, item, index);
        return card;
    });

    list.replaceChildren(...cards);
}