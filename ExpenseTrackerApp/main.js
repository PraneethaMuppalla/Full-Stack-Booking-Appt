const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

let listEl = document.getElementById("expensesList");
let formEl = document.querySelector("form");
let expensesEl = document.getElementById("expenses");
let descriptionEl = document.getElementById("description");
let categoryEl = document.getElementById("category");

listEl.addEventListener("click", deleteUser);

window.addEventListener("DOMContentLoaded", getExpenses);

function getExpenses() {
  axiosInstance
    .get("/expenses")
    .then((res) => {
      //console.log(res.data);
      res.data.map((each) => renderExpense(each));
    })
    .catch((e) => {
      if (e.response) {
        if (e.response.status === 404) {
          alert("Something went wrong");
        }
      } else if (e.request) {
        console.log(e.request);
      } else {
        console.log(e);
      }
    });
}

function renderExpense(each) {
  const li = document.createElement("li");
  li.id = each.id;
  li.textContent = `${each.expenses}  ${each.description}  ${each.category}`;
  li.className = "list-group-item fw-bold  align-items-center";
  let delButton = document.createElement("button");
  delButton.style.display = "inline";
  delButton.className = "del-btn btn btn-danger float-right del-btn";
  delButton.appendChild(document.createTextNode("Delete"));

  let editButton = document.createElement("button");
  //editButton.style.display = "inline";
  editButton.className = "edit-btn btn btn-info float-right edited";
  editButton.appendChild(document.createTextNode("Edit"));
  li.appendChild(delButton);
  li.appendChild(editButton);
  listEl.appendChild(li);
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  let newItem = {
    category: categoryEl.value,
    expenses: expensesEl.value,
    description: descriptionEl.value,
  };
  axiosInstance
    .post("/expenses", newItem)
    .then((res) => {
      renderExpense(res.data);
      expensesEl.value = "";
      descriptionEl.value = "";
      categoryEl.value = "";
    })
    .catch((e) => {
      if (e.response) {
        if (e.response.status === 404) {
          alert("Something went wrong");
        }
      } else if (e.request) {
        if (e.request.status === 404) {
          alert("Something went wrong");
        }
      } else {
        console.log(e);
      }
    });
});

function deleteUser(e) {
  if (e.target.classList.contains("del-btn")) {
    console.log("hit");
    if (confirm("Are you sure?")) {
      const liItem = e.target.parentElement;
      console.log(liItem);
      axiosInstance
        .delete(`/expenses/${liItem.id}`)
        .then((res) => {
          console.log(res);
          listEl.removeChild(liItem);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  } else if (e.target.classList.contains("edited")) {
    if (confirm("Are you sure?")) {
      const liItem = e.target.parentElement;
      console.log("hit ============================>>>>>>>>>>>>>>>>>>>>>");
      axiosInstance
        .get(`/expenses/${liItem.id}`)
        .then((res) => {
          console.log(res.data.category);
          expensesEl.value = +res.data.expenses;
          descriptionEl.value = res.data.description;
          categoryEl.value = res.data.categoty;
          listEl.removeChild(liItem);
          axiosInstance.delete(`/expenses/${liItem.id}`).then((res) => {
            console.log(res);
          });
        })
        .catch((error) => console.log(error));
    }
  }
}
