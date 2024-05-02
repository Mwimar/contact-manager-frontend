const signupFormElement = document.querySelector("#login form");

async function signUp(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const userData = {};
  formData.forEach((value, key) => {
    userData[key] = value;
  });

  let response;
  try {
    response = await fetch("http://localhost:5001/api/users/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  } catch (error) {
    alert("Something went wrong");
    return;
  }

  if (!response.ok) {
    alert("Something went wrong");
    return;
  }

  const responseData = await response.json();
  console.log(responseData);
  window.location.href = "http://localhost:5500/index.html";
}

signupFormElement.addEventListener("submit", signUp);
