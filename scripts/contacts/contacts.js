async function loadContacts() {
  const token = localStorage.getItem("token");

  let response;

  try {
    response = await fetch("http://localhost:5001/api/contacts/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    alert("Something went wrong");
    console.log("FAILED TO FETCH DATA");
    return;
  }

  if (!response.ok) {
    alert("Something went wrong");
    console.log("failed to give response");
    return;
  }

  try {
    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.log("Error Parsing JSON");
  }
}

loadContacts();
