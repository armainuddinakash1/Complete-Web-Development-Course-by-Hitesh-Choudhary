// targeting dom elements
const form = document.getElementById("expense-form");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseList = document.getElementById("expense-list");
const totalAmount = document.getElementById("total-amount");

// expense array
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// storing and rendering expenses on submit click
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = expenseName.value.trim();
  const amount = parseFloat(expenseAmount.value.trim());
  if (name && !isNaN(amount) && amount > 0) {
    const id = Date.now();
    const expense = {
      name,
      amount,
      id,
    };
    expenses.push(expense);
    renderData(expense);
    renderSum();
    saveData()
    form.reset();
  }
});

// rendering expense data
function renderData(expense) {
  const newLi = document.createElement("li");
  newLi.innerHTML = `
      <span>${expense.name} - $${expense.amount}</span>
      <button data-id="${expense.id}">Delete</button>
    `;
  expenseList.appendChild(newLi);
  // adding remove functionality on delete button
  newLi.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      // remove expense from expenses
      expenses = expenses.filter((e) => e.id !== expense.id);
      newLi.remove();
      renderSum();
      saveData()
    }
  });
}

// rendering expense on dom load
document.addEventListener("DOMContentLoaded", () => {
  expenses.forEach((expense) => {
    renderData(expense);
    renderSum();
  });
});

// calculates and renders sum of expenses
function renderSum() {
  // let sum = 0;
  // expenses.forEach((expense) => {
  //   sum += expense.amount;
  // });

  let sum = expenses.reduce((sum, expense)=> sum + expense.amount, 0)

  totalAmount.textContent = sum.toFixed(2);
}

// saveing into local storage
function saveData() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  
}

/*
// removing expense on remove click
expenseList.addEventListener('click',(e)=>{
  if(e.target.tagName === "BUTTON"){
    const id = parseInt(e.target.getAttribute('data-id'))
    expenses = expenses.filter(expense => expense.id !== id)
    saveData()
    renderSum()
    clearList()
    expenses.forEach(expense => {

      renderData(expense)
    });
  }
})

// clear list from dom
function clearList(){
  expenseList.innerHTML = ""
}
*/