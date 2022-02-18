// Функция отправки данных на сервер
const postData = async (url, data) => {
    // дожидаемся получения данных с сервера
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: data,
    });
    // дожидаемся выполнения метода .json()
    return await res.json();
};

// Функция получения данных с сервера
const getData = async (url) => {
    // дожидаемся получения данных с сервера
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }
    // дожидаемся выполнения метода .json()
    // возвращает объект
    return await res.json();
};

export {postData, getData};
    