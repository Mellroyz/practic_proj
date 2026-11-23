import review1 from '../assets/images/Reviews/icon1.jpg';
import review2 from '../assets/images/Reviews/icon2.jpg';
import review3 from '../assets/images/Reviews/icon3.jpg';
import review4 from '../assets/images/Reviews/icon4.jpg';
import review5 from '../assets/images/Reviews/icon5.jpg';
import review6 from '../assets/images/Reviews/icon6.jpg';
import review7 from '../assets/images/Reviews/icon7.jpg';
import review8 from '../assets/images/Reviews/icon8.jpg';
import review9 from '../assets/images/Reviews/icon9.jpg';
import review10 from '../assets/images/Reviews/icon10.jpg';
import review11 from '../assets/images/Reviews/icon11.jpg';
import review12 from '../assets/images/Reviews/icon12.jpg';
import review13 from '../assets/images/Reviews/icon13.jpg';
import review14 from '../assets/images/Reviews/icon14.jpg';
import review15 from '../assets/images/Reviews/icon15.jpg';
import review16 from '../assets/images/Reviews/icon16.jpg';
import review17 from '../assets/images/Reviews/icon17.jpg';
import review18 from '../assets/images/Reviews/icon18.jpg';
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

const reviewNames = [
    'Владимир Завертайлов',
    'Анна Соколова',
    'Михаил Ильин',
    'Елена Морозова',
    'Дмитрий Попов',
    'Ольга Кузнецова',
    'Сергей Волков',
    'Мария Новикова',
    'Алексей Орлов',
    'Наталья Федотова',
    'Игорь Белов',
    'Екатерина Павлова',
    'Андрей Семёнов',
    'Татьяна Михайлова',
    'Роман Григорьев',
    'Юлия Лебедева',
    'Павел Еремин',
    'Ксения Романова',
];

const reviewDates = [
    '15 марта 2021',
    '22 марта 2021',
    '4 апреля 2021',
    '18 апреля 2021',
    '9 мая 2021',
    '27 мая 2021',
    '6 июня 2021',
    '21 июня 2021',
    '3 июля 2021',
    '19 июля 2021',
    '2 августа 2021',
    '16 августа 2021',
    '5 сентября 2021',
    '23 сентября 2021',
    '7 октября 2021',
    '20 октября 2021',
    '11 ноября 2021',
    '29 ноября 2021',
];

const reviewTexts = [
    'Быстро нашли причину поломки стиральной машины и качественно заменили детали. Всё объяснили до ремонта, а результатом остались очень довольны.',
    'Мастер приехал вовремя, аккуратно провёл диагностику и сразу назвал точную стоимость работ. Машинка работает как новая!',
    'Приятно, что ремонт сделали раньше запланированного срока. Работа выполнена грамотно и чисто, остался только готовый результат.',
    'Заказывала срочную замену подшипников. Специалист всё сделал профессионально, проконсультировал по уходу за машинкой.',
    'Цены соответствуют озвученной смете, никаких дополнительных расходов не возникло. Очень надёжный и честный сервис.',
    'Сервис отнял минимум времени: удобная запись, точный выезд мастера и быстрый ремонт прямо на дому.',
    'Понравилась внимательная диагностика. Мастер не стал менять лишнее и помог устранить настоящую причину поломки.',
    'Ремонт выполнен качественно, всё убрали после работы и показали, как проверять машинку после настройки.',
    'Обращалась впервые и осталась очень довольна. Подобрали и установили подходящую запчасть в тот же день.',
    'Машинка перестала сливать воду — мастер приехал через час, быстро устранил засор и дал рекомендации.',
    'Спасибо за чёткую коммуникацию и бережное отношение к технике. Ремонт был завершён в оговорённое время.',
    'Очень понравилось обслуживание: мастер заранее позвонил, приехал точно по адресу и работал аккуратно.',
    'Устранили сильный шум при отжиме. Теперь стиральная машина работает спокойно и не вибрирует.',
    'Профессиональный подход от диагностики до сдачи работы. Все этапы объяснили понятно и без лишних обещаний.',
    'Хорошая цена и высокий уровень сервиса. Буду рекомендовать Fixper знакомым и обязательно обращусь снова.',
    'Запчасть заменили быстро, мастера работали аккуратно. По итогам стиральная машина снова в полном порядке.',
    'Оценил пунктуальность и компетентность специалиста. Неожиданно быстро нашли проблему с электроникой.',
    'Чисто, быстро и по делу. Мастер подробно рассказал о работе и дал гарантию на выполненный ремонт.',
];

const reviews: Review[] = reviewImages.map((image, index) => ({
    image,
    name: reviewNames[index],
    date: reviewDates[index],
    text: reviewTexts[index],
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
        imageElement.alt = `Аватар автора ${review.name}`;
        nameElement.textContent = review.name;
        dateElement.textContent = review.date;
        textElement.textContent = review.text;
    });

    initCarousel(section);
}
