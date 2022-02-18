'use strict';

import tabs from './modules/tabs';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import calc from './modules/calc';
import timer from './modules/timer';  
import { openModal } from './modules/modal';

const modalTImerId = setTimeout(() => openModal('.modal', modalTImerId), 50000);

tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
cards();
forms('form', modalTImerId);
modal('[data-modal]', '.modal', modalTImerId);
slider({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next', 
    prevArrow: '.offer__slider-prev', 
    slide: '.offer__slide',
    totalCounter: '#total',
    currentCounter: '#current', 
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
});
calc();
timer('.timer', '2022-06-11');









