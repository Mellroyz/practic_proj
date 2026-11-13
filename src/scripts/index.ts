import professor1 from '../assets/images/Professors/Cards/professor1.png';
import professor2 from '../assets/images/Professors/Cards/professor2.png';
import professor3 from '../assets/images/Professors/Cards/professor3.png';
import professor4a from '../assets/images/Professors/Cards/professor4-1.png';
import professor4b from '../assets/images/Professors/Cards/professor4-2.png';
import professor4c from '../assets/images/Professors/Cards/professor4-3.png';
import professor5c from '../assets/images/Professors/Cards/professor5-3.png';
import professor6a from '../assets/images/Professors/Cards/professor6-1.png';
import professor6b from '../assets/images/Professors/Cards/professor6-2.png';
import professor6c from '../assets/images/Professors/Cards/professor6-3.png';
import professor7 from '../assets/images/Professors/Cards/professor7.png';
import professor8 from '../assets/images/Professors/Cards/professor8.png';
import professor9a from '../assets/images/Professors/Cards/professor9-1.png';
import professor9b from '../assets/images/Professors/Cards/professor9-2.png';
import professor9c from '../assets/images/Professors/Cards/professor9-3.png';

const professorImages = [
    professor1,
    professor2,
    professor3,
    professor4a,
    professor4b,
    professor4c,
    professor5c,
    professor6a,
    professor6b,
    professor6c,
    professor7,
    professor8,
    professor9a,
    professor9b,
    professor9c,
];

export function setupSite() {
    setupProfessorsCards();
    setupCarousels();
}

function setupProfessorsCards() {
    const section = document.querySelector<HTMLElement>('.professors');
    if (!section) {
        return;
    }

    const list = section.querySelector<HTMLUListElement>('.professors__list');
    const template = section.querySelector<HTMLTemplateElement>('#professors-card-template');

    if (!list || !template) {
        throw new Error('The professors cards markup is incomplete.');
    }

    professorImages.forEach((image, index) => {
        const card = template.content.firstElementChild?.cloneNode(true);

        if (!(card instanceof HTMLLIElement)) {
            throw new Error('The professors carousel card template is invalid.');
        }

        const imageElement = card.querySelector<HTMLImageElement>('.professors__image');
        if (!imageElement) {
            throw new Error('The professors carousel card template is missing its image.');
        }

        card.id = `professor-${index + 1}`;
        imageElement.src = image;
        imageElement.alt = `Мастер Fixper, карточка ${index + 1}`;
        list.append(card);
    });
}

function setupCarousels() {
    document.querySelectorAll<HTMLElement>('[data-carousel]').forEach(setupCarousel);
}

function setupCarousel(root: HTMLElement) {
    const viewport = root.querySelector<HTMLElement>('[data-carousel-viewport]');
    const track = root.querySelector<HTMLElement>('[data-carousel-track]');
    const indicators = root.querySelector<HTMLDivElement>('[data-carousel-indicators]');
    const previousButton = root.querySelector<HTMLButtonElement>('[data-carousel-previous]');
    const nextButton = root.querySelector<HTMLButtonElement>('[data-carousel-next]');

    if (!viewport || !track || !indicators || !previousButton || !nextButton) {
        throw new Error('Carousel markup is incomplete.');
    }

    const cards = Array.from(track.children).filter(
        (element): element is HTMLElement => element instanceof HTMLElement,
    );

    if (cards.length === 0) {
        return;
    }

    let activeIndex = 0;
    let visibleCount = 1;
    let cardStep = 0;
    let indicatorStarts: number[] = [];

    const updateControls = () => {
        const activeIndicator = indicatorStarts.reduce(
            (currentIndicator, start, indicatorIndex) =>
                activeIndex >= start ? indicatorIndex : currentIndicator,
            0,
        );

        Array.from(indicators.children).forEach((indicator, index) => {
            const isActive = index === activeIndicator;
            indicator.classList.toggle('carousel__indicator--active', isActive);
            if (isActive) {
                indicator.setAttribute('aria-current', 'true');
            } else {
                indicator.removeAttribute('aria-current');
            }
        });

        previousButton.disabled = activeIndex === 0;
        nextButton.disabled = activeIndex >= cards.length - visibleCount;
    };

    const goToCard = (index: number) => {
        const maxIndex = Math.max(0, cards.length - visibleCount);
        activeIndex = Math.max(0, Math.min(index, maxIndex));
        viewport.scrollTo({ left: activeIndex * cardStep, behavior: 'smooth' });
        updateControls();
    };

    const updateLayout = () => {
        if (cards.length === 0) {
            return;
        }

        const firstCard = cards[0];
        const secondCard = cards[1] ?? firstCard;
        const gap = cards.length > 1
            ? secondCard.getBoundingClientRect().left - firstCard.getBoundingClientRect().left
            : firstCard.getBoundingClientRect().width;

        cardStep = Math.max(gap, firstCard.getBoundingClientRect().width);
        visibleCount = Math.max(1, Math.min(cards.length, Math.round(viewport.clientWidth / cardStep)));
        activeIndex = Math.min(activeIndex, Math.max(0, cards.length - visibleCount));

        const maxIndex = Math.max(0, cards.length - visibleCount);
        const indicatorCount = Math.min(4, maxIndex + 1);
        indicatorStarts = Array.from({ length: indicatorCount }, (_, index) =>
            indicatorCount === 1 ? 0 : Math.round((index * maxIndex) / (indicatorCount - 1)),
        );

        indicators.replaceChildren(
            ...indicatorStarts.map((start) => {
                const indicator = document.createElement('button');
                indicator.type = 'button';
                indicator.className = 'carousel__indicator';
                indicator.setAttribute('aria-label', `Перейти к элементу ${start + 1}`);
                indicator.addEventListener('click', () => goToCard(start));
                return indicator;
            }),
        );

        viewport.scrollLeft = activeIndex * cardStep;
        updateControls();
    };

    previousButton.addEventListener('click', () => goToCard(activeIndex - 1));
    nextButton.addEventListener('click', () => goToCard(activeIndex + 1));
    viewport.addEventListener('scroll', () => {
        if (cardStep === 0) {
            return;
        }

        activeIndex = Math.max(
            0,
            Math.min(Math.round(viewport.scrollLeft / cardStep), Math.max(0, cards.length - visibleCount)),
        );
        updateControls();
    }, { passive: true });
    viewport.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            goToCard(activeIndex - 1);
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            goToCard(activeIndex + 1);
        }
    });
    window.addEventListener('resize', updateLayout);

    updateLayout();
}
