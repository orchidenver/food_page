import {getData} from '../services/services';

function cards () {
        // Классы для карточек
    class MenuCard {
        constructor (src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.exRate = 27;
            this.changeToUAH();
        }

        changeToUAH () {
            return this.price *= this.exRate;
        }

        render () {
            // если вместо insertAdjacentHTML использовать innerHTML, 
            // то можно классы из рест оператора прогнать через фор ич и добавить к диву
            // а див добавить к this.parent 
            // const element = document.createElement('div');

            //     if (this.classes.length === 0) {
            //         this.classes = "menu__item";
            //         element.classList.add(this.classes);
            //     } else {
            //         this.classes.forEach(className => element.classList.add(className));
            //     }

            //     element.innerHTML = `
            //         <img src=${this.src} alt=${this.alt}>
            //         <h3 class="menu__item-subtitle">${this.title}</h3>
            //         <div class="menu__item-descr">${this.descr}</div>
            //         <div class="menu__item-divider"></div>
            //         <div class="menu__item-price">
            //             <div class="menu__item-cost">Цена:</div>
            //             <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            //         </div>
            //     `;
            //     this.parent.append(element);
            // }

            this.parent.insertAdjacentHTML('beforeend', `
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
            `);
        }

    }

    // Рендерим карточки - СПОСОБ 1
    getData('http://localhost:3000/menu')
    // {img, altimg, title, descr, price} - деструктуризация
    .then(data => data.forEach(({img, altimg, title, descr, price}) => new MenuCard(img, altimg, title, descr, price, '.menu .container').render()));
    // Рендерим карточки - СПОСОБ 2
    // getData('http://localhost:3000/menu')
    // .then(data =>createCard(data));

    // function createCard (data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         document.querySelector('.menu .container').insertAdjacentHTML('beforeend', `
    //         <div class="menu__item">
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         </div>
    //         `);
    //     });
    // }

    // Рендерим карточки - СПОСОБ 3
    // axios.get('http://localhost:3000/menu')
    // .then(data => data.forEach(({img, altimg, title, descr, price}) => new MenuCard(img, altimg, title, descr, price, '.menu .container').render()));



    // new MenuCard(
    //     'img/tabs/vegy.jpg', 
    //     'vegy',
    //     'Меню "Фитнес"',
    //     'uuweuewfiufweuifewuewf',
    //     9, 
    //     '.menu .container',
    // ).render();

    // new MenuCard(
    //     'img/tabs/elite.jpg', 
    //     'elite',
    //     'Меню “Премиум”',
    //     'uuweuewfiufweuifewuewf',
    //     12, 
    //     '.menu .container',
    // ).render();

    // new MenuCard(
    //     'img/tabs/post.jpg', 
    //     'post',
    //     'Меню "Постное"',
    //     'uuweuewfiufweuifewuewf',
    //     8, 
    //     '.menu .container',
    // ).render();

}

export default cards;