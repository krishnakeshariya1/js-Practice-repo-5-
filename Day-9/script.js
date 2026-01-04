let allExpense = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpenses(item, amount , category) {
    if(Number.isNaN(amount) || amount <= 0)return false;

    allExpense.push({item : item, amount: amount, category : category});
    localStorage.setItem("expenses",JSON.stringify(allExpense));
}
function TotalExpense() {
    let total = 0;
    for(let expense of allExpense){
        total += expense.amount;
    }
    return total
}
function largestExpense() {
    if (allExpense.length === 0) return null;

    let largestExp = allExpense[0];

    for (let i = 1; i < allExpense.length; i++) {
        if (allExpense[i].amount > largestExp.amount) {
            largestExp = allExpense[i];
        }
    }
    return largestExp;
}
function averageExpense() {
    if (allExpense.length === 0) return 0;
    
    let total = TotalExpense();
    return total / allExpense.length;
}

