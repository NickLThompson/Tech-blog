async function signupHandler(event) {
    event.preventDefault();


    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Body-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('success');


            document.location.replace('/homepage');

        } else {
            console.log(err);
        }
    }
}

document.querySelector('#signup').addEventListener('submit', signupHandler);