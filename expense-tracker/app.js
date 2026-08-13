document.addEventListener("DOMContentLoaded", function () {
  let expenseName = document.getElementById("expense-name");
  let expenseAmount = document.getElementById("expense-amount");
  let addExpenseButton = document.getElementById("add-expense-button");
  let displayExpense = document.getElementById("display-expense");

  var expenseList = [];

  expenseAmount.addEventListener("input", function () {
    setTimeout(() => {
      if (isNaN(expenseAmount.value)) {
        expenseAmount.classList.add("outline-red-400");
      }
    }, 500);
    expenseAmount.classList.remove("outline-red-400");
  });

  addExpenseButton.addEventListener("click", function () {
    if (expenseName.value === "" || expenseAmount.value === "") {
      return;
    }

    if (isNaN(expenseAmount.value)) {
      return;
    }
    let expense = {
      name: expenseName.value,
      amount: expenseAmount.value,
    };

    expenseList.push(expense);
    renderExpense(expense);

    expenseAmount.value = "";
    expenseName.value = "";
  });

  function renderExpense(expenseObj) {
    let li = document.createElement("li");
    let alignDiv = document.createElement("div");
    let spanName = document.createElement("span");
    let spanAmount = document.createElement("span");
    let removeButton = document.createElement("button");

    let removeIcon = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="#fe3939" stroke-width="3" stroke-linecap="round"
                stroke-linejoin="round" class="lucide lucide-x-icon lucide-x">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
            </svg>
        `;

    li.classList =
      "flex items-start justify-between bg-neutral-900 rounded-sm px-2 py-1 hover:bg-neutral-800/80 transition duration-100";

    spanName.classList = "text-white/90 text-[16px]";
    spanName.innerText = `${expenseObj.name}`;

    alignDiv.classList = "flex";

    spanAmount.classList = "text-white/90 text-[16px]";
    spanAmount.innerText = `${expenseObj.amount} Rs`;

    removeButton.classList =
      "text-rose-800 font-bold cursor-pointer hover:bg-neutral-800 px-1 rounded-xl transition duration-100";
    removeButton.innerHTML = `${removeIcon}`;
    removeButton.addEventListener("click", function () {
      expenseList = expenseList.filter((each) => each !== expenseObj);
      li.classList.add("fade-out");
      setTimeout(() => {
        li.remove();
      }, 202);
    });

    li.appendChild(spanName);
    alignDiv.appendChild(spanAmount);
    alignDiv.appendChild(removeButton);

    li.appendChild(alignDiv);
    displayExpense.appendChild(li);

    let template = `
        <li class="flex items-start justify-between bg-neutral-900 rounded-sm px-2 py-1">
                        <span class="text-white/90 text-[16px] ">Laptop</span>
                        <div class="flex">
                            <span class="text-white/90 text-[16px] ">100Rs&nbsp;</span>
                            <button class="text-rose-800 font-bold cursor-pointer hover:bg-neutral-800 px-1 rounded-xl transition duration-100">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="#fe3939" stroke-width="3" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-x-icon lucide-x">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>

                            </button>
                        </div>
                    </li>
        `;
  }
});
