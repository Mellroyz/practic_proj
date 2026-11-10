export function initCarousel(root: HTMLElement) {
    const viewport = root.querySelector<HTMLElement>('[data-carousel-viewport]');
    const track = root.querySelector<HTMLElement>('[data-carousel-track]');
    const indicators = root.querySelector<HTMLDivElement>('[data-carousel-indicators]');
    const previousButton = root.querySelector<HTMLButtonElement>('[data-carousel-previous]');
    const nextButton = root.querySelector<HTMLButtonElement>('[data-carousel-next]');

    const missingParts: string[] = [];
    if (!viewport) missingParts.push('viewport');
    if (!track) missingParts.push('track');
    if (!indicators) missingParts.push('indicators');
    if (!previousButton) missingParts.push('previous button');
    if (!nextButton) missingParts.push('next button');

    if (missingParts.length > 0) {
        console.warn(`Carousel markup is incomplete. Missing: ${missingParts.join(', ')}.`, root);
    }

    if (!viewport || !track) {
        return;
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

        if (indicators) {
            Array.from(indicators.children).forEach((indicator, index) => {
                const isActive = index === activeIndicator;
                indicator.classList.toggle('carousel__indicator--active', isActive);
                if (isActive) {
                    indicator.setAttribute('aria-current', 'true');
                } else {
                    indicator.removeAttribute('aria-current');
                }
            });
        }

        if (previousButton) previousButton.disabled = activeIndex === 0;
        if (nextButton) nextButton.disabled = activeIndex >= cards.length - visibleCount;
    };

    const goToCard = (index: number) => {
        const maxIndex = Math.max(0, cards.length - visibleCount);
        activeIndex = Math.max(0, Math.min(index, maxIndex));
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth';
        viewport.scrollTo({ left: activeIndex * cardStep, behavior });
        updateControls();
    };
    
    const updateLayout = () => {
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

        if (indicators) {
            if (indicators.childElementCount !== indicatorCount) {
                indicators.replaceChildren(
                    ...indicatorStarts.map((start, index) => {
                        const indicator = document.createElement('button');
                        indicator.type = 'button';
                        indicator.className = 'carousel__indicator';
                        indicator.setAttribute('aria-label', `Перейти к элементу ${start + 1}`);
                        indicator.addEventListener('click', () => goToCard(indicatorStarts[index]));
                        return indicator;
                    }),
                );
            }

            Array.from(indicators.children).forEach((indicator, index) => {
                indicator.setAttribute('aria-label', `Перейти к элементу ${indicatorStarts[index] + 1}`);
            });
        }

        viewport.scrollLeft = activeIndex * cardStep;
        updateControls();
    };

    previousButton?.addEventListener('click', () => goToCard(activeIndex - 1));
    nextButton?.addEventListener('click', () => goToCard(activeIndex + 1));
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