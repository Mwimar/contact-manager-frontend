const currentUserElement = document.getElementById("current-user");

async function getCurrent() {
  const token = localStorage.getItem("token");
  let response;
  try {
    response = await fetch("http://localhost:5001/api/users/current", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("fetched current successfully");
  } catch (error) {
    alert("Could not fetch user");
    return;
  }

  if (!response.ok) {
    alert("Unauthorized: Access token invalid or expired");
    return;
  } else {
    const userData = await response.json();
    console.log("Current User Data:", userData);

    //updating username
    currentUserElement.textContent = userData.username;
  }
}

getCurrent();
