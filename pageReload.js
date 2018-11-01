function reload(event) {
    let data = { 'username': username, 'password': password};
    fetch("pageReload.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
    .then(response => response.json())
    .then((data) => {
        if (data.success) {
            alert("You succesfully logged in after reload");
            document.getElementById("logined_user").innerHTML = "<strong>" +"Hello : "+data.username+"</strong>";
            document.getElementById("register").style.display="none";
            document.getElementById("login").style.display="none";
            document.getElementById("logout").style.display="inline";
            document.getElementById("addEvent").style.display="inline";
            document.getElementById("deleteEvent").style.display="inline";
            token = data.token;
        }
        else {
            alert("You reloaded wthiout even logging in ! ");
        }
    });
}

document.addEventListener("DOMContentLoaded", reload, false);