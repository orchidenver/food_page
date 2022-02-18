function timer (id, deadLine) {
        // TIMER

    // Создаем дедлайн
    const deadline = deadLine;

    function getTimeRemaining (endtime) {
        // расчитываем разницу в милисекундах
        const t = new Date(endtime) - new Date(),
                // считаем дни
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                // считаем часы как остаток от дней
                hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                // считаем минуты
                minutes = Math.floor((t / 1000 / 60) % 60),
                // считаем секунды
                seconds = Math.floor((t / 1000) % 60);
        
        return {
            'total': t,
            days,
            hours, 
            minutes, 
            seconds,
        }

    }

    // Устанавливаем таймер на страницу

    function setClock (selector, endtime) {
        const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);
            // Обнуляем часы из верстки
            updateClock();

        function zeroStart (num) {
            return String(num).padStart(2, '0');
        }
        
        function updateClock () {
            const time = getTimeRemaining(endtime);
            // помещаем данные в ДОМ
            days.textContent = zeroStart(time.days);
            hours.textContent = zeroStart(time.hours);
            minutes.textContent = zeroStart(time.minutes);
            seconds.textContent = zeroStart(time.seconds);
            // если таймер истек - обнуляем счетчик
            if (time.total <= 0) clearInterval(timeInterval);
        }
    }

    setClock(id, deadline);
}

export default timer;