function tabs (tabsSelector, tabsContentSelector, tabsPArentSelector, activeClass) {
        // TABS
    const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsPArentSelector);

    // Функция, которая скрывает табы        
    function hideTabContent () {
        // скрываем блоки с контентом
        tabsContent.forEach(item => {
            // item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        // скрываем неактивные табы
        tabs.forEach(tab => {
            tab.classList.remove(activeClass);
        });
    }

    // Функция, которая показывает табы
    function showTabContent (tabIndex = 0) {
        // отображаем контент определенного индекса
        // tabsContent[tabIndex].style.display = 'block';
        tabsContent[tabIndex].classList.add('show', 'fade');
        tabsContent[tabIndex].classList.remove('hide');
        // отображаем активный таб
        tabs[tabIndex].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', e => {
        if (e.target && e.target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((tab, i) => {
                if (e.target === tab) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;