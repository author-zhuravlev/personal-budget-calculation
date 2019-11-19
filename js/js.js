window.addEventListener('DOMContentLoaded', () => {
    
    function blockInput(forbid, cursor) {
        const btns = document.querySelectorAll('.calculator .calculator__button'),
            calculatorInp = document.querySelectorAll('.calculator .calculator__inp');
        
        btns.forEach(item => {
            item.disabled = forbid;
            item.style.cursor = cursor;
        });

        calculatorInp.forEach(item => {
            item.disabled = forbid;
        });
    }

    blockInput("true", "default");


    function clearValue() {
        const money = document.querySelector('.modal-window .calculator__inp.budget'),
            date = document.querySelector('.modal-window .calculator__inp.date');

        money.value = "";
        date.value = "";
    }


    function startCalculation() {
        const btnStart = document.querySelector('.start-calculation'),
            modalWindow = document.querySelector('.modal-window'),
            btnNext = document.querySelector('.modal-window .calculator__button'),
            money = document.querySelector('.modal-window .calculator__inp.budget'),
            date = document.querySelector('.modal-window .calculator__inp.date'),
            btnClose = document.querySelector('.close-modal');

        btnStart.addEventListener('click', () => {
            modalWindow.style.display = "block";
            document.body.style.overflow = "hidden";
        });

        btnNext.addEventListener('click', () => {
            if (money.value && date.value) {
                appData.money = money.value;
                appData.timeData = date.value;
    
                modalWindow.style.display = "none";
                document.body.style.overflow = "";

                // добавить вывод данных на страницу

                clearValue();

                blockInput("", "pointer");
                console.log(appData);
            } else {
                money.placeholder = "Введите данные!";
                date.placeholder = "Введите данные!";

                modalWindow.style.color = "red";
            }
        });

        btnClose.addEventListener('click', () => {
            modalWindow.style.display = "none";
            document.body.style.overflow = "";

            clearValue();
        });
    }
    startCalculation();




    const appData = {
        money: "",
        timeData: "",
        expenses: {},
        optionalExpenses: {},
        income: [],
        savings : false
    };


});
