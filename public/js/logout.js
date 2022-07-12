async function logoutHandler(event) {
    event.preventDefault();
    
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Body-Type': 'application/json' }
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
        console.log(err);
    }
  }
  
  document.querySelector('#logout').addEventListener('click', logoutHandler);