async function signUp() {
  let response;
  try {
    response = await fetch("http://localhost:5001/api/users/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });
  } catch (error) {
    alert("Something went wrong");
    return;
  }
}
