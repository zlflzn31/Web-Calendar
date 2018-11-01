// ajax.js



function loginAjax(event) {
    let username = document.getElementById("username").value; // Get the username from the form
    let password = document.getElementById("password").value; // Get the password from the form

    // Make a URL-encoded string for passing POST data:
    let data = { 'username': username, 'password': password};

    fetch("login.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
        .then(response => response.json())
        .then((data) => {
            if (data.success) {
                alert("welcome! " + data.username);
                document.getElementById("logined_user").innerHTML = "<strong>" +"Hello : "+data.username+"</strong>";
                document.getElementById("register").style.display="none";
                document.getElementById("login").style.display="none";
                document.getElementById("logout").style.display="inline";
                document.getElementById("addEvent").style.display="inline";
                document.getElementById("deleteEvent").style.display="inline";
                token = data.token;
            }
            else {
                alert("Incorrect username or password!");                
            }
        });
}

document.getElementById("login_btn").addEventListener("click", loginAjax, false); // Bind the AJAX call to button click

/* RELOAD 

document.addEventListener("DOMContentLoaded", function(event) {
    let username = document.getElementById("username").value; // Get the username from the form
    let password = document.getElementById("password").value; // Get the password from the form
    let data = { 'username': username, 'password': password };   
    fetch("debug.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
        .then(response => response.json())
        .then((data) => {
            alert("Incorrect username or password!");                
        });        
    }, false);
    
    */