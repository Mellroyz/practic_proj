import professor1 from '../assets/images/Professors/Cards/professor1.jpg';
import professor2 from '../assets/images/Professors/Cards/professor2.jpg';
import professor3 from '../assets/images/Professors/Cards/professor3.jpg';
import professor4a from '../assets/images/Professors/Cards/professor4-1.jpg';
import professor4b from '../assets/images/Professors/Cards/professor4-2.jpg';
import professor4c from '../assets/images/Professors/Cards/professor4-3.jpg';
import professor5c from '../assets/images/Professors/Cards/professor5-3.jpg';
import professor6a from '../assets/images/Professors/Cards/professor6-1.jpg';
import professor6b from '../assets/images/Professors/Cards/professor6-2.jpg';
import professor6c from '../assets/images/Professors/Cards/professor6-3.jpg';
import professor7 from '../assets/images/Professors/Cards/professor7.jpg';
import professor8 from '../assets/images/Professors/Cards/professor8.jpg';
import professor9a from '../assets/images/Professors/Cards/professor9-1.jpg';
import professor9b from '../assets/images/Professors/Cards/professor9-2.jpg';
import professor9c from '../assets/images/Professors/Cards/professor9-3.jpg';
import { initCarousel } from './carousel';
import { renderCards } from './cardRenderer';

interface Professor {
    image: string;
    name: string;
    role: string;
    details: string[];
}

const professors: Professor[] = [
    {
        image: professor1,
        name: 'Мастер Fixper №1',
        role: 'Специалист по ремонту',
        details: ['398 ремонтных работ', '3 года в Fixper', 'Рейтинг Fixper 4,9'],
    },
    {
        image: professor2,
        name: 'Мастер Fixper №2',
        role: 'Специалист по ремонту',
        details: ['276 ремонтных работ', '4 года в Fixper', 'Рейтинг Fixper 4,8'],
    },
    {
        image: professor3,
        name: 'Мастер Fixper №3',
        role: 'Специалист по ремонту',
        details: ['512 ремонтных работ', '6 лет в Fixper', 'Рейтинг Fixper 5,0'],
    },
    {
        image: professor4a,
        name: 'Мастер Fixper №4',
        role: 'Специалист по ремонту',
        details: ['341 ремонтная работа', '2 года в Fixper', 'Рейтинг Fixper 4,7'],
    },
    {
        image: professor4b,
        name: 'Мастер Fixper №5',
        role: 'Специалист по ремонту',
        details: ['427 ремонтных работ', '5 лет в Fixper', 'Рейтинг Fixper 4,9'],
    },
    {
        image: professor4c,
        name: 'Мастер Fixper №6',
        role: 'Специалист по ремонту',
        details: ['365 ремонтных работ', '3 года 6 месяцев в Fixper', 'Рейтинг Fixper 4,8'],
    },
    {
        image: professor5c,
        name: 'Мастер Fixper №7',
        role: 'Специалист по ремонту',
        details: ['589 ремонтных работ', '7 лет в Fixper', 'Рейтинг Fixper 5,0'],
    },
    {
        image: professor6a,
        name: 'Мастер Fixper №8',
        role: 'Специалист по ремонту',
        details: ['472 ремонтные работы', '4 года 8 месяцев в Fixper', 'Рейтинг Fixper 4,9'],
    },
    {
        image: professor6b,
        name: 'Мастер Fixper №9',
        role: 'Специалист по ремонту',
        details: ['318 ремонтных работ', '2 года 6 месяцев в Fixper', 'Рейтинг Fixper 4,7'],
    },
    {
        image: professor6c,
        name: 'Мастер Fixper №10',
        role: 'Специалист по ремонту',
        details: ['643 ремонтные работы', '8 лет в Fixper', 'Рейтинг Fixper 5,0'],
    },
    {
        image: professor7,
        name: 'Мастер Fixper №11',
        role: 'Специалист по ремонту',
        details: ['504 ремонтные работы', '5 лет 4 месяца в Fixper', 'Рейтинг Fixper 4,8'],
    },
    {
        image: professor8,
        name: 'Мастер Fixper №12',
        role: 'Специалист по ремонту',
        details: ['291 ремонтная работа', '1 год 11 месяцев в Fixper', 'Рейтинг Fixper 4,9'],
    },
    {
        image: professor9a,
        name: 'Мастер Fixper №13',
        role: 'Специалист по ремонту',
        details: ['556 ремонтных работ', '6 лет 3 месяца в Fixper', 'Рейтинг Fixper 4,7'],
    },
    {
        image: professor9b,
        name: 'Мастер Fixper №14',
        role: 'Специалист по ремонту',
        details: ['389 ремонтных работ', '3 года 9 месяцев в Fixper', 'Рейтинг Fixper 5,0'],
    },
    {
        image: professor9c,
        name: 'Мастер Fixper №15',
        role: 'Специалист по ремонту',
        details: ['731 ремонтная работа', '9 лет в Fixper', 'Рейтинг Fixper 4,8'],
    },
];

export function setupProfessors() {
    const section = document.querySelector<HTMLElement>('.professors');
    if (!section) {
        return;
    }

    const list = section.querySelector<HTMLUListElement>('.professors__list');
    const template = section.querySelector<HTMLTemplateElement>('#professors-card-template');

    if (!list || !template) {
        throw new Error('The professors cards markup is incomplete.');
    }

    renderCards(professors, list, template, (card, professor, index) => {
        const imageElement = card.querySelector<HTMLImageElement>('.professors__image');
        const nameElement = card.querySelector<HTMLElement>('.professors__name');
        const roleElement = card.querySelector<HTMLElement>('.professors__role');
        const detailsList = card.querySelector<HTMLUListElement>('.professors__details');

        if (!imageElement || !nameElement || !roleElement || !detailsList) {
            throw new Error('The professors card template is incomplete.');
        }

        card.id = `professor-${index + 1}`;
        imageElement.src = professor.image;
        imageElement.alt = professor.name;
        nameElement.textContent = professor.name;
        roleElement.textContent = professor.role;
        detailsList.replaceChildren(
            ...professor.details.map((detail) => {
                const item = document.createElement('li');
                item.textContent = detail;
                return item;
            }),
        );
    });

    initCarousel(section);
}