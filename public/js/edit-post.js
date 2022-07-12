async function editHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const body = document.querySelector('input[name="body"]').value.trim();
    console.log(title);
    console.log(body);

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
      
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          post_id: id,
          title,
          body
        }),
        headers: {
          'Body-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/homepage/');
      } else {
        console.log(err);
      }

}

document.querySelector('.edit-post').addEventListener('submit', editHandler);