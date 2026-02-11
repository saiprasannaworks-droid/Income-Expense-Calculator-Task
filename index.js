var state = {
    filter: "all",
    balance: 0,
    income: 0,
    expense: 0,
    transactions: [
        // {   
        //     id:uniqueId(),
        //     name: "Salary",
        //     amount: 8000,
        //     type: "income"
        // }
        // , {
        //     id:uniqueId(),
        //     name: "Rent",
        //     amount: 8000,
        //     type: "expense"
        // },
        // {
        //     id:uniqueId(),
        //     name: "Groceries",
        //     amount: 2000,
        //     type: "expense"
        // }
    ],

}

var balance = document.querySelector("#balance")
var income = document.querySelector("#income")
var expense = document.querySelector("#expense")
var transactions = document.querySelector("#transaction_history")
var incomeBtn = document.querySelector("#income_btn")
var expenseBtn = document.querySelector("#expense_btn")
var nameInput = document.querySelector("#name")
var amountInput = document.querySelector("#amount")
var resetBtn = document.querySelector("#reset_btn");


function init() {
    var localState = JSON.parse(localStorage.getItem("expenseTrackerState"));
    if (localState !== null) {
        state = localState

    }
    updateState();
    initListeners();
    render();

}

function uniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

function initListeners() {

    var filters = document.querySelectorAll('input[name="filter"]');

    filters.forEach(function (radio) {
        radio.addEventListener("change", function (e) {
            state.filter = e.target.value;
            render();
        });
    });


    incomeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        onAddIncome();
    });

    expenseBtn.addEventListener("click", function (e) {
        e.preventDefault();
        onAddExpense();
    });

    resetBtn.addEventListener("click", function (e) {
        e.preventDefault();
        nameInput.value = "";
        amountInput.value = "";
    });

}


function addTransaction(name, amount, type) {
    if (name !== "" && amount !== "") {
        var transaction = {
            id: uniqueId(),
            name: name,
            amount: Number(amount),
            type: type
        }
        state.transactions.push(transaction);
        updateState();
        render();
    }
    else {
        alert("Please enter both name and amount for the transaction.")
    }

    nameInput.value = "";
    amountInput.value = "";

}

function onAddIncome() {
    console.log("Add Income", nameInput.value, amountInput.value)
    addTransaction(nameInput.value, amountInput.value, "income");
}



function onAddExpense() {
    console.log("Add Expense", nameInput.value, amountInput.value)
    addTransaction(nameInput.value, amountInput.value, "expense");

}


function updateState() {
    var balance = 0, income = 0, expense = 0, item;
    for (var i = 0; i < state.transactions.length; i++) {
        var item = state.transactions[i];
        if (item.type === "income") {
            income += item.amount;
        }
        else if (item.type === "expense") {
            expense += item.amount;
        }
    }
    state.income = income;
    state.expense = expense;

    if (income > expense) {
        balance = income - expense;
    } else if (expense > income) {
        balance = expense - income;
    }
    state.balance = balance;
    if (income > expense) {
        state.balanceType = "income";
    } else if (expense > income) {
        state.balanceType = "expense";
    } else {
        state.balanceType = "neutral";
    }

    localStorage.setItem("expenseTrackerState", JSON.stringify(state)); // storing the state in local storage as a string so that it can be retrieved and parsed back to an object when the application is reloaded 

    render();

}



function render() {

    transactions.innerHTML = ""; // used to clear the transaction history list before re-rendering it with updated transactions

    var balanceSign = "₹ ";
    var balanceClass = "text-neutral";

    if (state.balanceType === "income") {
        balanceSign = "+ ₹ ";
        balanceClass = "text-income";
    }
    else if (state.balanceType === "expense") {
        balanceSign = "- ₹ ";
        balanceClass = "text-expense";
    }

    balance.className = "";
    balance.classList.add(balanceClass);
    balance.innerHTML = `${balanceSign}${state.balance}`;


    income.innerHTML = `₹ ${state.income}`
    expense.innerHTML = `₹ ${state.expense}`

    var transactionshistory, containerEl, amountEl, item, buttonEl;
    var filteredTransactions = state.transactions.filter(function (item) {
        if (state.filter === "all") return true;
        return item.type === state.filter;
    });

    for (var i = 0; i < filteredTransactions.length; i++) {
        item = filteredTransactions[i];

        transactionshistory = document.createElement("li");
        transactionshistory.append(item.name);
        transactions.appendChild(transactionshistory)

        containerEl = document.createElement('div')
        amountEl = document.createElement('span')

        if (item.type === "income") {
            amountEl.classList.add("Income_amount")
            amountEl.innerHTML = `+ ₹ ${item.amount}`;
        }
        else if (item.type === "expense") {
            amountEl.classList.add("Expense_amount")
            amountEl.innerHTML = `- ₹ ${item.amount}`;
        }

        var editBtn = document.createElement("button");
        editBtn.className = "action-btn edit-btn";
        editBtn.dataset.id = item.id;

        var editImg = document.createElement("img");
        editImg.src = "/assets/icons/edit.svg";
        editImg.alt = "edit";

        editBtn.appendChild(editImg);
        editBtn.addEventListener("click", onEdit);

        var deleteBtn = document.createElement("button");
        deleteBtn.className = "action-btn delete-btn";
        deleteBtn.dataset.id = item.id;

        var deleteImg = document.createElement("img");
        deleteImg.src = "/assets/icons/trash.svg";
        deleteImg.alt = "delete";

        deleteBtn.appendChild(deleteImg);
        deleteBtn.addEventListener("click", onDelete);
        containerEl.classList.add("action-container");

        containerEl.appendChild(amountEl);
        containerEl.appendChild(editBtn);
        containerEl.appendChild(deleteBtn);

        transactionshistory.appendChild(containerEl);

    }


}


function onDelete(e) {
    var id = e.target.closest("button").dataset.id;

    state.transactions = state.transactions.filter(function (item) {
        return item.id !== id;
    });

    updateState();
}


function onEdit(e) {
    var id = e.target.closest("button").getAttribute("data-id");

    var transaction = state.transactions.find(function (item) {
        return item.id === id;
    });

    nameInput.value = transaction.name;
    amountInput.value = transaction.amount;

    state.transactions = state.transactions.filter(function (item) {
        return item.id !== id;
    });

    updateState();
}


init()

