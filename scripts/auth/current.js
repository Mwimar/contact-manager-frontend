async function getCurrent() {
  let response;
  try {
    response = await fetch("http://localhost:5001/api/users/current");
  } catch (error) {
    alert("Could not fetch user");
    return;
  }

  if (!response.ok) {
    alert("NO response");
    return;
  }
}
