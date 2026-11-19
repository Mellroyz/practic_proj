import review1 from '../assets/images/Reviews/icon1.png';
import review2 from '../assets/images/Reviews/icon2.png';
import review3 from '../assets/images/Reviews/icon3.png';
import review4 from '../assets/images/Reviews/icon4.png';
import review5 from '../assets/images/Reviews/icon5.png';
import review6 from '../assets/images/Reviews/icon6.png';
import review7 from '../assets/images/Reviews/icon7.png';
import review8 from '../assets/images/Reviews/icon8.png';
import review9 from '../assets/images/Reviews/icon9.png';
import review10 from '../assets/images/Reviews/icon10.png';
import review11 from '../assets/images/Reviews/icon11.png';
import review12 from '../assets/images/Reviews/icon12.png';
import review13 from '../assets/images/Reviews/icon13.png';
import review14 from '../assets/images/Reviews/icon14.png';
import review15 from '../assets/images/Reviews/icon15.png';
import review16 from '../assets/images/Reviews/icon16.png';
import review17 from '../assets/images/Reviews/icon17.png';
import review18 from '../assets/images/Reviews/icon18.png';
import { initCarousel } from './carousel';
import { renderCards } from './cardRenderer';

interface Review {
    image: string;
    name: string;
    date: string;
    text: string;
}

const reviewImages = [
    review1,
    review2,
    review3,
    review4,
    review5,
    review6,
    review7,
    review8,
    review9,
    review10,
    review11,
    review12,
    review13,
    review14,
    review15,
    review16,
    review17,
    review18,
];

const reviewTexts = [
    'Знаю AXIS, как опытных экспертов в области создания визуализаций любой сложности. Умеют четко, грамотно и по делу формулировать мысли. Исследовать вопросы. Копают — глубоко. В 3D визуализации стремятся не заработать на клиенте, а решить проблемы и преподнести проект в выгодном свете!',
    'Хочу выразить свою признательность в решении ремонта стиральной машины Самсунг A600FN, смогли сделать раньше срока и качественно, спасибо большое. Вы лучшие! Всегда буду обращаться к Вам, ваш клиент.',
];

const reviews: Review[] = reviewImages.map((image, index) => ({
    image,
    name: 'Владимир Завертайлов',
    date: '15 марта 2021',
    text: `${reviewTexts[index % reviewTexts.length]} #${index + 1}`,
}));

export function setupReviews() {
    const section = document.querySelector<HTMLElement>('.reviews');
    if (!section) {
        return;
    }

    const list = section.querySelector<HTMLUListElement>('.reviews__list');
    const template = section.querySelector<HTMLTemplateElement>('#reviews-card-template');

    if (!list || !template) {
        throw new Error('The reviews cards markup is incomplete.');
    }

    renderCards(reviews, list, template, (card, review, index) => {
        const imageElement = card.querySelector<HTMLImageElement>('.reviews__avatar');
        const nameElement = card.querySelector<HTMLElement>('.reviews__name');
        const dateElement = card.querySelector<HTMLElement>('.reviews__date');
        const textElement = card.querySelector<HTMLElement>('.reviews__text');

        if (!imageElement || !nameElement || !dateElement || !textElement) {
            throw new Error('The reviews card template is incomplete.');
        }

        card.id = `review-${index + 1}`;
        imageElement.src = review.image;
        imageElement.alt = review.name;
        nameElement.textContent = review.name;
        dateElement.textContent = review.date;
        textElement.textContent = review.text;
    });

    initCarousel(section);
}
