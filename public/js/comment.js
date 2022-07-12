async function commentHandler(event) {
    event.preventDefault();

    const comment = document.querySelector('textarea[name="comment-body"]').value.trim();
    const post_id = document.querySelector('input[name="post-id"]').value.trim();
    if(comment) {
        const response = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({
                user_id,
                post_id,
                comment,
            }),
            headers: {
                "Body-Type": "application/json",
            },
        });
        if(response.ok) {
            document.location.reload();
        } else {
            console.log(err)
        }
    }
}

document.querySelector("create-post-btn")
document.addEventListener("submit", commentHandler);