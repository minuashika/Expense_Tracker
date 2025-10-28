document.addEventListener("DOMContentLoaded", function() {
    const expenseForm = document.getElementById("expenseForm");
    const expenseLog = document.getElementById("expenseLog");
    const totalAmount = document.getElementById("totalAmount");
    const expenseChartCtx = document.getElementById("expenseChart").getContext("2d");
    const monthDescriptions = document.getElementById("monthDescriptions");

    let expenses = {};
    let chart;

    expenseForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const type = document.getElementById("expenseType").value;
        const amount = parseFloat(document.getElementById("amount").value);
        const month = document.getElementById("month").value;

        if (!expenses[month]) {
            expenses[month] = [];
        }

        expenses[month].push({ type, amount });
        updateLog();
        updateTotal(month);
        updateChart();

        expenseForm.reset();
    });

    function updateLog() {
        expenseLog.innerHTML = '';
        for (let month in expenses) {
            const monthHeader = document.createElement("li");
            monthHeader.textContent = month;
            monthHeader.style.fontWeight = "bold";
            monthHeader.style.color = "yellow";
            expenseLog.appendChild(monthHeader);

            expenses[month].forEach(expense => {
                const listItem = document.createElement("li");
                listItem.textContent = `${expense.type}: ₹${expense.amount.toFixed(2)}`;
                expenseLog.appendChild(listItem);
            });

            const total = expenses[month].reduce((sum, expense) => sum + expense.amount, 0);
            const totalItem = document.createElement("li");
            totalItem.textContent = `Total: ₹${total.toFixed(2)}`;
            totalItem.style.fontWeight = "bold";
            totalItem.style.color = "lightgreen";
            expenseLog.appendChild(totalItem);
        }
    }

    function updateTotal(month) {
        let total = expenses[month].reduce((sum, expense) => sum + expense.amount, 0);
        totalAmount.textContent = total.toFixed(2);
    }

    function updateChart() {
        const months = Object.keys(expenses);
        const data = months.map(month => {
            return expenses[month].reduce((sum, expense) => sum + expense.amount, 0);
        });

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(expenseChartCtx, {
            type: 'pie',
            data: {
                labels: months,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
                        '#9966FF', '#FF9F40', '#FF6384', '#36A2EB',
                        '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
                        '#9966FF', '#FF9F40', '#FF6384', '#36A2EB',
                        '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                    ]
                }]
            }
        });

        monthDescriptions.innerHTML = months.map((month, index) => {
            return `<p><span style="color: ${chart.data.datasets[0].backgroundColor[index]}">&#9679;</span> ${month}</p>`;
        }).join('');
    }
});
