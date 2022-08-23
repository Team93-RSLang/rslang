import createElement from '../../utils/createElement';
import { BUTTON_NAMES, HEADER_LINKS } from '../../constants/constants';
import burger from '../../logic/main/burger';

export default function createHeader(parent: HTMLElement): void {
    const header = createElement({
        type: 'header',
        parentElement: parent,
        classes: ['header', 'hero__container'],
    });

    const wrapper = createElement({
        type: 'div',
        parentElement: header,
        classes: ['header__wrapper'],
    });

    const burgerIcon = createElement({
        type: 'button',
        parentElement: wrapper,
        classes: ['menu__icon', 'icon-menu'],
    });

    createElement({
        type: 'span',
        parentElement: burgerIcon,
    });

    createElement({
        type: 'div',
        parentElement: wrapper,
        classes: ['header__logo'],
    });

    const nav = createElement({
        type: 'nav',
        parentElement: wrapper,
    });

    const navList = createElement({
        type: 'ul',
        parentElement: nav,
        classes: ['header__nav'],
    });

    BUTTON_NAMES.forEach((value, index) => {
        const navLink = createElement({
            type: 'li',
            parentElement: navList,
            classes: ['header__link'],
        });
        createElement({
            type: 'a',
            parentElement: navLink,
            text: value,
            attributes: [['href', HEADER_LINKS[index]]],
        });
    });

    const login = createElement({
        type: 'a',
        parentElement: header,
        classes: ['header__login'],
        attributes: [['href', '#']],
    });

    createElement({
        type: 'div',
        parentElement: login,
        classes: ['header__icon'],
    });

    createElement({
        type: 'div',
        parentElement: login,
        classes: ['header__text'],
        text: 'Log in / Register',
    });

    burger();
}