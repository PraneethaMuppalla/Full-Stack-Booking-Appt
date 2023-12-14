// AXIOS INSTANCE
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});
// axiosInstance.get('/comments').then(res => showOutput(res));

const myForm = document.querySelector("#my-form");
const btn = document.querySelector(".btn");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const msg = document.querySelector(".msg");
const uLEl = document.querySelector("#users");

//delete user
//uLEl.addEventListener("click", deleteUser);
window.addEventListener("DOMContentLoaded", getAppointments);

function getAppointments() {
  axiosInstance
    .get("/users")
    .then((res) => {
      //console.log(res.data);
      res.data.map((each) => renderEachAppointment(each));
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

function renderEachAppointment(each) {
  const li = document.createElement("li");
  li.id = each.id;
  li.appendChild(document.createTextNode(`${each.name}: ${each.email}`));

  let delButton = document.createElement("button");
  delButton.className = "del-btn";
  delButton.appendChild(document.createTextNode("X"));
  delButton.onclick = () => {
    deleteUser(li.id);
  };
  let editButton = document.createElement("button");
  editButton.className = "edit-btn";
  editButton.appendChild(document.createTextNode("Edit"));
  editButton.onclick = () => {
    editUser(li.id);
  };
  li.appendChild(delButton);
  li.appendChild(editButton);
  uLEl.appendChild(li);
}

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (nameInput.value === "" || emailInput.value === "") {
    msg.textContent = "Please fill all the fields";
    msg.classList.add("error");
    setTimeout(() => {
      msg.classList.remove("error");
      msg.textContent = "";
    }, 3000);
  } else {
    let newAppointment = {
      name: nameInput.value,
      email: emailInput.value,
    };
    // appointments.push(newAppointment);
    // localStorage.setItem("appointments", JSON.stringify(appointments));
    axiosInstance
      .post("/users", newAppointment)
      .then((res) => {
        renderEachAppointment(res.data);
        nameInput.value = "";
        emailInput.value = "";
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
  }
});

function deleteUser(id) {
  if (confirm("Are you sure?")) {
    const liItem = document.getElementById(id);
    axiosInstance
      .delete(`/users/${id}`)
      .then((res) => {
        console.log(res);
        uLEl.removeChild(liItem);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

function editUser(id) {
  if (confirm("Are you sure?")) {
    const liItem = document.getElementById(id);
    axiosInstance
      .get(`/users/${id}`)
      .then((res) => {
        nameInput.value = res.data.name;
        emailInput.value = res.data.email;
        uLEl.removeChild(liItem);
        axiosInstance.delete(`/users/${id}`).then((res) => {
          console.log(res);
        });
      })
      .catch((error) => console.log(error));
  }
}
