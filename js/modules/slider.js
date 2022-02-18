function slider ({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
        // SLIDER
    const slides = document.querySelectorAll(slide);
    const slider = document.querySelector(container);
    const prev = document.querySelector(prevArrow);
    const next = document.querySelector(nextArrow);
    const total = document.querySelector(totalCounter);
    const current = document.querySelector(currentCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
    const width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0;

    /// СПОСОБ 1
    // Преобразуем слайды в одно горизонтальное поле
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    // Сворачиваем количество слайдов при показе
    slidesWrapper.style.overflow = 'hidden';
    // Задаяем каждому слайду ширину
    slides.forEach(slide => slide.style.width = width);

    // Устанавливаем слайдеру podition relative
    slider.style.position = 'relative';

    // Создаем точки для переключения
    const dots = document.createElement('ol');
    const dotsArray = [];
    dots.classList.add('carousel-dots');
    dots.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(dots);
    slides.forEach((slide, i) => {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `;
        // Фокусируемся на 1 точке
        if (i === 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        dotsArray.push(dot);
    });


    total.textContent = String(slides.length).padStart(2, '0');
    current.textContent = String(slideIndex).padStart(2, '0');

    next.addEventListener('click', () => {
        offset === parseInt(width) * (slides.length - 1) ? offset = 0 : offset += parseInt(width);
        // if (offset === parseInt(width) * (slides.length - 1)) {
        //     offset = 0;
        // }
        slidesField.style.transform = `translate(-${offset}px)`;

        slideIndex === slides.length ? slideIndex = 1 : slideIndex++;
        current.textContent = String(slideIndex).padStart(2, '0');

        // Изменяем вид точен при переключении слайдов
        dotsArray.forEach(dot => dot.style.opacity = '0.5');
        dotsArray[slideIndex - 1].style.opacity = '1';
    });

    prev.addEventListener('click', () => {
        offset === 0 ? offset = parseInt(width) * (slides.length - 1) : offset -= parseInt(width);
        // if (offset === parseInt(width) * (slides.length - 1)) {
        //     offset = 0;
        // }
        slidesField.style.transform = `translate(-${offset}px)`;
        
        slideIndex === 1 ? slideIndex = slides.length : slideIndex--;
        current.textContent = String(slideIndex).padStart(2, '0');
        // Изменяем вид точен при переключении слайдов
        dotsArray.forEach(dot => dot.style.opacity = '0.5');
        dotsArray[slideIndex - 1].style.opacity = '1';
    });

    // Делаем точки кликабельными
    dotsArray.forEach(dot => {
        dot.addEventListener('click', e => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = parseInt(width) * (slideTo - 1);
            slidesField.style.transform = `translate(-${offset}px)`;
            current.textContent = String(slideIndex).padStart(2, '0');
            dotsArray.forEach(dot => dot.style.opacity = '0.5');
            dotsArray[slideIndex - 1].style.opacity = '1';
        });
    });

    /// СПОСОБ 2
    // showSlides(slideIndex);
    // total.textContent = String(slides.length).padStart(2, '0');

    // function showSlides (n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(slide => slide.style.display = 'none');
    //     slides[slideIndex - 1].style.display = 'block';

    //     current.textContent = String(slideIndex).padStart(2, '0');
    // }

    // function changeSlides (n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', () => {
    //     changeSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     changeSlides(1);
    // });

}

export default slider;