let cashFlow = (function () {
  let Expense, Income;
  Expense = Income = function (id, comments, value, person) {
    this.id = id;
    this.comments = comments;
    this.value = value;
    this.person = person;
  };
  let totalCash = function (type) {
    let finalCash = 0;
    numbers.flowingData[type].forEach(function (showNumberDisplay) {
      finalCash += showNumberDisplay.value;
    });
    numbers.finalResults[type] = finalCash;
  };
  let numbers = {
    flowingData: {
      exp: [],
      inc: [],
    },
    finalResults: {
      exp: 0,
      inc: 0,
    },
    cashflowCalculator: 0,
  };
  return {
    addItem: function (type, des, val, per) {
      let newItem;
      if (numbers.flowingData[type].length > 0) {
        personID =
          numbers.flowingData[type][numbers.flowingData[type].length - 1].id +
          1;
      } else {
        personID = 0;
      }

      if (type === "exp") {
        newItem = new Expense(personID, des, val, per);
      } else if (type === "inc") {
        newItem = new Income(personID, des, val, per);
      }
      numbers.flowingData[type].push(newItem);
      return newItem;
    },
    calcCash: function () {
      totalCash("exp");
      totalCash("inc");
      numbers.cashflowCalculator =
        numbers.finalResults.inc - numbers.finalResults.exp;
    },
    getData: function () {
      return {
        cashflowCalculator: numbers.cashflowCalculator,
        mathIncome: numbers.finalResults.inc,
        mathPayments: numbers.finalResults.exp,
      };
    },
  };
})();
let refresh = document.getElementById("refreshing");
refresh.addEventListener("click", function (e) {
  e.preventDefault();
  location.reload();
});

let domShow = (function () {
  let references = {
    inputBtn: "enterBtn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
  };
  return {
    insertData: function () {
      return {
        type: document.getElementById("type").value,
        comments: document.getElementById("title").value,
        value: parseFloat(document.getElementById("amount").value),
        person: document.getElementById("person").value,
      };
    },
    insertDataItems: function (extension, type) {
      let html, htmlSecond, element;
      if (type === "inc") {
        element = references.incomeContainer;
        html = `
					<div class="fieldsAll item flex" id="inc-%id%">
					<div class="item__person"> %person% &nbsp</div>
					<div class="item__description"> -- %comments%  &nbsp</div>
					<div class="item__value"> -- %value% </div>
					</div>
					`;
      } else if (type === "exp") {
        element = references.expensesContainer;
        html = `
					<div class="fieldsAll item-two flex" id="exp-%id%">
					<div class="item__person">%person% &nbsp</div>
					<div class="item__description"> -- %comments%  &nbsp</div>
					<div class="item__value"> -- %value%</div>
					</div>
					`;
      }
      htmlSecond = html.replace("%id%", extension.id);
      htmlSecond = htmlSecond.replace("%comments%", extension.comments);
      htmlSecond = htmlSecond.replace("%value%", extension.value);
      htmlSecond = htmlSecond.replace("%person%", extension.person);
      document
        .querySelector(element)
        .insertAdjacentHTML("beforeend", htmlSecond);
    },
    eraseData: function () {
      let fields, fieldsArr;
      fields = document.querySelectorAll(
        "#person" + ", " + "#amount" + ", " + "#title"
      );
      fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function (current) {
        current.value = "";
      });
      fieldsArr[0].focus();
    },
    cashflowDom: function (extension) {
      document.querySelector(".finalValue").textContent =
        extension.cashflowCalculator;
      document.querySelector(".liveIncome").textContent = extension.mathIncome;
      document.querySelector(".livePayment").textContent =
        extension.mathPayments;
    },
    getFields: function () {
      return references;
    },
  };
})();

let flow = (function (cashDom, flowDom) {
  let setupEventListeners = function () {
    let enterBtn = document.getElementById(flowDom.getFields().inputBtn);
    enterBtn.addEventListener("click", ctrlAddItem);
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13) {
        ctrlAddItem();
      }
    });
  };
  let newCash = function () {
    cashDom.calcCash();
    let cashflowCalculator = cashFlow.getData();
    console.log(cashflowCalculator);
    flowDom.cashflowDom(cashflowCalculator);
  };
  let ctrlAddItem = function () {
    let input, newItem;
    input = flowDom.insertData();
    console.log(input);
    if (input.comments !== "" && !isNaN(input.value) && input.value > 0) {
      newItem = cashDom.addItem(
        input.type,
        input.comments,
        input.value,
        input.person
      );
      flowDom.insertDataItems(newItem, input.type);
      flowDom.eraseData();
      newCash();
    }
  };
  return {
    startApp: function () {
      setupEventListeners();
    },
  };
})(cashFlow, domShow);
flow.startApp();
