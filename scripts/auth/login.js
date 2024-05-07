const loginFormElement = document.querySelector("#login form");

async function login(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const userData = {};

  formData.forEach((value, key) => {
    userData[key] = value;
  });

  try {
    const response = await fetch("http://localhost:5001/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Login failed"); // Throw an error for non-2xx responses
    }

    const data = await response.json();
    const token = data.accessToken;

    // Store token in localStorage
    localStorage.setItem("token", token);

    // Return the token
    return token;
  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed. Please try again.");
    return null;
  }
}

loginFormElement.addEventListener("submit", async (event) => {
  try {
    const token = await login(event); // Call the login function and await the token

    if (token) {
      console.log("Token after login:", token);
      // Perform further actions with the token (e.g., redirect user)
    } else {
      console.log("Login failed or token not available");
    }
  } catch (error) {
    console.error("Login process error:", error);
    // Handle any unexpected errors during the login process
    alert("An unexpected error occurred. Please try again.");
  }
  window.location.href = "http://localhost:5500/views/current.html";
});

// loginFormElement.addEventListener("submit", login);
