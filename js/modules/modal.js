function openModal (modalSelector, modalTImerId) {
    const modal = document.querySelector(modalSelector);
    // modal.classList.toggle('show');
    modal.classList.add('show');
    modal.classList.remove('hide');
    // Фиксируем фон модалки, чтобы он не скроллился
    document.body.style.overflow = 'hidden';
    // если пользователь уже открывал модалку
    // то нужно очистить таймаут]
    if (modalTImerId) clearInterval(modalTImerId);
}
        
function closeModal (modalSelector) {
    const modal = document.querySelector(modalSelector);
    // modal.classList.toggle('show');
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal (triggerSelector, modalSelector, modalTImerId) {
    // Модальные окна

    const modalTriggers = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector);
            // modalCloseBtn = document.querySelector('[data-close]');

    function showModalByScroll () {
        // если высота пролистаного документа + высота документа в окне браузера больше
        // скролла - 1 пиксель - будет поп-ап
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTImerId);
            window.removeEventListener('scroll', showModalByScroll);
        }

    }

    modalTriggers.forEach(modalTrigger => {
        modalTrigger.addEventListener('click', () => openModal(modalSelector, modalTImerId));
    });       

    // Закрываем окно кликом на оверлей через всплытие
    modal.addEventListener('click', (e) => {
        // делегируем событие модальному окну или крестику в модалке
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        // Закрываем окно клавишей Escape
        if (e.code === 'Escape' && modal.classList.contains('show')) 
        closeModal(modalSelector);
    });

    // Реалузовываем скролл (после прокрутки появляется модалка)
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};