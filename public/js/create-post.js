async function createHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const body = document.querySelector('input[name="body"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
        user_id
      }),
      headers: {
        'Body-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace("/homepage")
    } else {
      alert(response.statusText);
    }
  }
  
document.querySelector('#create-post').addEventListener('submit', createHandler);