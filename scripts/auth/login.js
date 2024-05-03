const signupFormElemnt = document.querySelector("#login form");

async function login(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const userData = {};
  formData.forEach((value, key) => {
    userData[key] = value;
  });

  let response;
  try {
    response = await fetch("http://localhost:5001/api/users/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  } catch (error) {
    alert("something went wrong");
    return;
  }

  if (!response.ok) {
    alert("Something Went Wrong");
    return;
  }
  window.location.href = "http://localhost:5500/views/current.html";
}

signupFormElemnt.addEventListener("submit", login);
