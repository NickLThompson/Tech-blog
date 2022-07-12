async function loginHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Body-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/homepage');
      } else {
        console.log(err);
      }
    }
  }
  

document.querySelector('#login').addEventListener('submit', loginHandler);