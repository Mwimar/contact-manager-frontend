async function loadContacts() {
  let response;

  try {
    response = await fetch("https://localhost:5001/api/contacts");
  } catch (error) {
    alert("Something went wrong");
    return;
  }

  if (!response.ok) {
    alert("Something went wrong");
    return;
  }
}
