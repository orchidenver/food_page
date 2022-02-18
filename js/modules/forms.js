import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms (formSelector, modalTImerId) {
        // ФОРМЫ
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'spinner.svg',
        success: 'Thanks for your request we will call you back ASAP',
        failure: 'Something went wrong',
    }

    // подвязываем функцию к каждой форме
    forms.forEach(form => bindPostFormData(form));

    // Функция отправки формы
    function bindPostFormData (form) {
        form.addEventListener('submit', (e) => {
            // отменяем перезагрузку страницы
            e.preventDefault();

            // создаем сообщение для пользователя
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage)

            // const request = new XMLHttpRequest();
            // request.open(
            //     'POST',
            //     'server.php',
            // );
            
            // request.setRequestHeader('Content-type', 'application/json');
            // сохраняем данные формы
            const formData = new FormData(form);

            //конвертируем formData в JSON
            // const obj = {};
            // formData.forEach((key, value) => obj[key] = value);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // request.send(json);

            // fetch('server.php', {
            //     method: 'POST',
            //     headers: {
            //         'Content-type': 'application/json',
            //     },
            //     body: JSON.stringify(obj),
            // })
            postData('http://localhost:3000/requests', json)
            // .then(data => data.text())
            .then(data => {
                console.log(data);
                showModalGratitude(message.success);
                statusMessage.remove();
            }).catch(() => {
                showModalGratitude(message.failure);
            }).finally(() => {
                // очищаем форму
                form.reset();
            });

            // отслеживаем загрузку запроса
            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showModalGratitude(message.success);
            //         // очищаем форму
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showModalGratitude(message.failure);
            //     }
            // });
        });
    }

    // Оповещение пользователя через модальное окно
    // function showModalGratitude (message) {
    //     const previousModalDialog = document.querySelector('.modal__dialog');

    //     previousModalDialog.classList.add('hide');
    //     openModal();

    //     const modal = document.querySelector('.modal.show');
    //     const div = document.createElement('div');
    //     div.insertAdjacentHTML('afterbegin', `
    //         <div class="modal__dialog">
    //                 <div class="modal__content">
    //                     <div data-close class="modal__close">&times;</div>
    //                     <div class="modal__title">${message}</div>
    //                 </div>
    //         </div>
    //     `);
    //     modal.append(div);

    //     setTimeout(() => {
    //         div.remove();
    //         previousModalDialog.classList.add('show');
    //         previousModalDialog.classList.remove('hide');
    //         closeModal();
    //     }, 4000);
    // }

    function showModalGratitude(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTImerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        // document.querySelector('.modal').append(thanksModal);
        // thanksModal.remove();
        // prevModalDialog.classList.add('show');
        // prevModalDialog.classList.remove('hide');
        // closeModal();

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 1000);
    }
}

export default forms;