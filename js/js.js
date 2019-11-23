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


    function clearValue() {
        const money = document.querySelector('.modal-window .calculator__inp.budget'),
            date = document.querySelector('.modal-window .calculator__inp.date');

        money.value = "";
        date.value = "";
    }

    function addInput() {
        const add = document.querySelectorAll('.calculator__add');

        add.forEach((item, i) => {            
            item.addEventListener('click', () => {
                const calculatorBlock = item.previousElementSibling,
                    newCalculatorBlock = calculatorBlock.cloneNode(true);
                   
                for (let i = 0; i < newCalculatorBlock.childNodes.length; i++) {
                    if (i % 2 != 0) {
                        newCalculatorBlock.childNodes[i].value = "";
                    } 
                }
                item.parentNode.insertBefore(newCalculatorBlock, item);
            });
        });
    }

    function startCalculation() {
        const btnStart = document.querySelector('.start-calculation'),
            modalWindow = document.querySelector('.modal-window'),
            btnNext = document.querySelector('.modal-window .calculator__button'),
            money = document.querySelector('.modal-window .calculator__inp.budget'),
            date = document.querySelector('.modal-window .calculator__inp.date'),
            moneyValue = document.querySelector(".result-table-element.budget.value"),
            // dateValue = document.querySelector(),
            btnClose = document.querySelector('.close-modal');

        btnStart.addEventListener('click', () => {
            modalWindow.style.display = "block";
            document.body.style.overflow = "hidden";
        });

        btnNext.addEventListener('click', () => {

            if (money.value.trim() && date.value.trim() && !isNaN(money.value)) {
                appData.money = money.value;
                appData.timeData = date.value;
        
                modalWindow.style.display = "none";
                document.body.style.overflow = "";

                moneyValue.textContent = money.value;
                // добавить вывод/проверку даты
                clearValue();

                blockInput("", "pointer");
                console.log(appData);
            } else {
                clearValue();
                money.placeholder = "Введите корректные данные!";
                date.placeholder = "Введите корректные данные!";

                modalWindow.style.color = "red";
            }
        });

        btnClose.addEventListener('click', () => {
            modalWindow.style.display = "none";
            document.body.style.overflow = "";

            clearValue();
        });
    }


    function countObligatoryExpenses () {
        const expensesBtn = document.querySelector('.calculator__input-block_obligatory-expenses .calculator__button'),
            expensesValue = document.querySelector('.expenses.value');

        expensesBtn.addEventListener('click', () => {
            let sum = 0;
            const expenses = document.querySelectorAll('.calculator__input-block_obligatory-expenses input');

            for (let i = 0; i < expenses.length; i++) {
                let a = expenses[i].value,
                    b = expenses[++i].value;


                if (a.trim() && b.trim()) {
                    appData.expenses[a] = +b;
                    sum += +b;
                    expensesValue.textContent = sum;
                }
            }
        });
    }



    const appData = {
        money: "",
        timeData: "",
        expenses: {},
        optionalExpenses: {},
        income: [],
        savings : false
    };


    blockInput("true", "default");
    addInput();
    startCalculation();
    countObligatoryExpenses();

});
