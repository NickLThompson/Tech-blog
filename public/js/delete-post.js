async function deleteHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
      
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          post_id: id
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

document.querySelector('.delete-post-btn').addEventListener('click', deleteHandler);