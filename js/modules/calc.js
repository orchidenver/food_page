function calc () {
        // Калькулятор калорий
    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    // Устанавливаем значение по умолчанию
    localStorage.getItem('sex') ? sex = localStorage.getItem('sex') : (sex = 'female' && localStorage.setItem('sex', 'female'));
    localStorage.getItem('ratio') ? ratio = localStorage.getItem('ratio') : (ratio = 1.375 && localStorage.setItem('ratio', 1.375));

    // При загрузке сайта выделяем активные элементы, значение которых сохранено в ЛС
    function initialSettings (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(el => {
            el.classList.remove(activeClass);
            if (el.getAttribute('id') === localStorage.getItem('sex')) {
                el.classList.add(activeClass);
            }

            if (el.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                el.classList.add(activeClass);
            }
        });
    }

    initialSettings('#gender div', 'calculating__choose-item_active');
    initialSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    // Функция расчета
    function calcTotal () {
        // Если какое-то из значений не выбрано - делаем сброс
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "???";
            return;
        }

        if (sex === 'female') {
            // Если женский пол, то формула:
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            // Если мужской пол, то формула:
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    // Получаем инфо со статических блоков страницы
    function getStaticInfo (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(el => {
            el.addEventListener('click', e => {
                // Если у элемента есть атрибут, то. Если нет, то берем айди
                if (e.target.getAttribute('data-ratio')) {
                    ratio = Number(e.target.getAttribute('data-ratio'));
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }
        
                elements.forEach(el => {
                    el.classList.remove(activeClass);
                });
        
                e.target.classList.add(activeClass);

                // Делаем расчет
                calcTotal();
            });
            
        });
    }
    // Вызываем функцию для id
    getStaticInfo('#gender div', 'calculating__choose-item_active');
    // Вызываем функцию для data-attribute
    getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

    // Получаем инфо с динамических блоков страницы
    function getDynamicInfo (selector) {
        const input = document.querySelector(selector);

        // Получаем данные из разных инпутов по айди
        input.addEventListener('input', () => {
            // Проверяем ввод пользователя
            input.value.match(/\D/g) ? input.style.border = '1px solid red' : input.style.border = 'none';

            switch (input.getAttribute('id')) {
                case 'height': 
                    height = Number(input.value);
                    break;
                case 'weight':
                    weight = Number(input.value);
                    break;
                case 'age':
                    age = Number(input.value);
                    break;
            }

                // Делаем расчет
                calcTotal();
        });

    }

    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');
}

export default calc;