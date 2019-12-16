document.addEventListener('DOMContentLoaded', () => {

    const appData = {
        money: "",
        timeData: "",
        expenses: {},
        optionalExpenses: {},
        income: [],
        savings : false,
        lockDataInput: function(disable, cursor) {
            const btns = document.querySelectorAll(".calculator .calculator__button"),
                calculatorInp = document.querySelectorAll(".calculator .calculator__inp");

            btns.forEach(item => {
                item.disabled = disable;
                item.style.cursor = cursor;
            });

            calculatorInp.forEach(item => {
                item.disabled = disable;
            });
        },
        clearValue: function() {
            const money = document.querySelector(".modal-window .calculator__inp.budget"),
            date = document.querySelector(".modal-window .calculator__inp.date");

            money.value = "";
            date.value = "";
        },
        addInput: function() {
            const addBtn = document.querySelectorAll(".calculator__button.plus");
        
            addBtn.forEach((item, i)=> {           
                item.addEventListener('click', () => {
                    const calculatorBlock = document.createElement('div');
                    
                    calculatorBlock.classList.add('calculator__block');
                    item.parentNode.parentNode.insertBefore(calculatorBlock, item.parentNode);
        
                    if (i % 2 == 0) {
                        const calculatorElemTwo = `
                            <input type="text" class="calculator__inp two" placeholder="Наименование">
                            <input type="text" class="calculator__inp two" placeholder="Цена">
                        `;
                        calculatorBlock.innerHTML = calculatorElemTwo;
                    } else {
                        const calculatorElemThree = `
                            <input type="text" class="calculator__inp three">
                            <input type="text" class="calculator__inp three">
                            <input type="text" class="calculator__inp three">
                        `;
                        calculatorBlock.innerHTML = calculatorElemThree;
                    }

                });
            });
        },
        deleteInput: function() {
            const deleteBtn = document.querySelectorAll(".calculator__button.minus");

            deleteBtn.forEach((item, i )=> { 
                item.addEventListener('click', () => {
                    const calculatorBlock = item.parentNode.previousElementSibling;
                        
                    calculatorBlock.remove();
                    if (i === 0) {
                        appData.countObligatoryExpenses();
                    } else {
                        appData.countOptionalExpenses();
                    }
                });           
            });
        },
        startCalc: function() {
            const startBtn = document.querySelector(".calculator__button.start-calculation"),
                modalWindow = document.querySelector(".modal-window"),
                btnNext = document.querySelector(".modal-window .calculator__button"),
                money = document.querySelector(".modal-window .calculator__inp.budget"),
                date = document.querySelector(".modal-window .calculator__inp.date"),
                moneyValue = document.querySelector(".result-table-element.budget.value"),
                yearValue = document.querySelector(".year.date-value"),
                monthValue = document.querySelector(".month.date-value"),
                dayValue = document.querySelector(".day.date-value"),
                btnClose = document.querySelector(".close-modal"),
                reg = /\d\d\d\d-\d\d-\d\d/;
            
            startBtn.addEventListener('click', () => {
                modalWindow.style.display = "block";
                document.body.style.overflow = "hidden";
            });

            btnNext.addEventListener('click', () => {

                if (money.value.trim() && date.value.trim() && !isNaN(money.value)
                    && reg.test(date.value)) {
                    appData.money = money.value;
                    appData.timeData = date.value;
            
                    modalWindow.style.display = "none";
                    document.body.style.overflow = "";

                    moneyValue.textContent = appData.money;
                    yearValue.textContent = new Date(Date.parse(appData.timeData)).getFullYear();
                    monthValue.textContent = new Date(Date.parse(appData.timeData)).getMonth() + 1;
                    dayValue.textContent = new Date(Date.parse(appData.timeData)).getDate();

                    appData.clearValue();
                    appData.lockDataInput("", "pointer");
                } else {
                    appData.clearValue();
                    money.placeholder = "Введите корректные данные!";
                    date.placeholder = "Введите корректные данные!";

                    modalWindow.style.color = "red";
                }
            });

            btnClose.addEventListener('click', () => {
                modalWindow.style.display = "none";
                document.body.style.overflow = "";

                appData.clearValue();
            });
        },
        countObligatoryExpenses: function() {
            const expensesValue = document.querySelector(".expenses.value"),
                expenses = document.querySelectorAll(".calculator__input-block_obligatory-expenses input");
            let sum = 0;

            for (let i = 0; i < expenses.length; i++) {
                let a = expenses[i].value,
                    b = expenses[++i].value;

                if (a.trim() && b.trim() && !isNaN(b)) {
                    appData.expenses[a] = +b;
                    sum += +b;
                    expensesValue.textContent = sum;
                }
            }
        },
        countOptionalExpenses: function() {
            const expensesValue = document.querySelector(".optional-expenses.value"),
                expenses = document.querySelectorAll(".calculator__input-block_optional-expenses input");
           
            expensesValue.textContent = "";

            expenses.forEach((item, i) => {
                expensesValue.textContent += `${item.value} `;
            });
        },
        dailyBudgetCalc: function() {
            const dailyBudgetValue = document.querySelector(".result-table-element.daybudget.value"),
                wealthLevel = document.querySelector(".result-table-element.level.value");
            
            if (appData.money != undefined) {
                appData.moneyPerDay = +((appData.money / 30).toFixed());
                dailyBudgetValue.textContent = appData.moneyPerDay;

                if (appData.money < 5000) {
                    wealthLevel.textContent = 'Минимальный';
                } else if (appData.money > 5000 && appData.moneyPerDay < 15000) {
                    wealthLevel.textContent = 'Средний';
                } else if (appData.money > 30000) {
                    wealthLevel.textContent = 'Высокий';
                } else {
                    wealthLevel.textContent = "Произошла ошибка";
                }
            } else {
                alert("Произошла ошибка!");
            }
        },
        possibleIncome: function() {
            const possibleIncomeInp = document.querySelector(".calculator__input-block_possible-income .calculator__inp.one"),
                resultIncome = document.querySelector(".result-table-element.income.value");
        
            possibleIncomeInp.addEventListener('change', () => {
                if (possibleIncomeInp.value.trim()) {
                    appData.income = possibleIncomeInp.value.split(',');
                    resultIncome.textContent = appData.income;
                } else {
                    alert("Вы ввели некоректные данные!");
                }
            });
        },
        changingCheckbox: function() {
            const checkbox = document.getElementById("checkbox");

            checkbox.addEventListener('click', function() {
                const sum = document.getElementById('sum'),
                    percent = document.getElementById('percent'),
                    monthSavings = document.querySelector(".result-table-element.month-savings.value"),
                    yearSavings = document.querySelector(".result-table-element.year-savings.value");
    
                if (this.checked) {
                    appData.savings = true;
                    appData.accumulationMoney();
                } else {
                    appData.savings = false;
                    monthSavings.textContent = "";
                    yearSavings.textContent = "";
                    sum.value = "";
                    percent.value = "";
                }
            });
        },
        accumulationMoney: function() {
            const monthSavings = document.querySelector(".result-table-element.month-savings.value"),
                yearSavings = document.querySelector(".result-table-element.year-savings.value");

            const savings = appData.savings,
                sumValue = sum.value,
                percentValue = percent.value;

            if (savings && !isNaN(sumValue) && !isNaN(percentValue)) {
                appData.mounthIncome = sumValue/100/12*percentValue;
                appData.yearIncome = sumValue/100*percentValue;
    
                monthSavings.textContent = appData.mounthIncome.toFixed(1);
                yearSavings.textContent = appData.yearIncome.toFixed(1);
            }
        },
        showResultTable: function() {
            const blockRight = document.querySelector(".block-right"),
                burger = document.querySelector(".burger"),
                closeBtn = document.querySelector(".close-modal-resultTable");

                    
            burger.addEventListener('touchstart', () => {
                blockRight.classList.add('block-right-mobile');
                blockRight.classList.remove('block-right');

                const wrapperBlockRight = document.querySelector(".wrapper-block-right");
                wrapperBlockRight.classList.add('wrapper-result-table');
                
                burger.style.display = 'none';

                closeBtn.style.display = 'block';
            });
        },
        closeResultTable: function() {
            const blockRight = document.querySelector(".block-right"),
                burger = document.querySelector(".burger"),
                closeBtn = document.querySelector(".close-modal-resultTable");              

            closeBtn.addEventListener('touchstart', () => {
                const wrapperBlockRight = document.querySelector(".wrapper-block-right");
                wrapperBlockRight.classList.remove('wrapper-result-table');

                blockRight.classList.remove('block-right-mobile');
                blockRight.classList.add('block-right');

                burger.style.display = 'block';

                closeBtn.style.display = 'none';
            });
        }
    };

    appData.startCalc();
    appData.lockDataInput("true", "default");
    appData.addInput();
    appData.deleteInput();
    appData.possibleIncome();
    appData.changingCheckbox();
    appData.showResultTable();
    appData.closeResultTable();
    
    const obligatoryExpBtn = document.querySelector(".calculator__button.obligatory"),
        optionalExpBtn = document.querySelector(".calculator__button.optional"),
        budgetBtn = document.querySelector(".calculator__button.daily-budget-calculation"),
        sum = document.getElementById('sum'),
        percent = document.getElementById('percent');

    obligatoryExpBtn.addEventListener('click', appData.countObligatoryExpenses);
    optionalExpBtn.addEventListener('click', appData.countOptionalExpenses);
    budgetBtn.addEventListener('click', appData.dailyBudgetCalc);
    sum.addEventListener('input', appData.accumulationMoney);
    percent.addEventListener('input', appData.accumulationMoney);
});








