function registerAjax(event) { 
    let username = document.getElementById("new_username").value; // Get the username from the form
    let password = document.getElementById("new_password").value; // Get the password from the form
    // Make a URL-encoded string for passing POST data:
    let data = { 'username': username, 'password': password };
    fetch("register.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }        
    }).then(response => response.json())
    .then((data) => {
        if (data.success){
            document.getElementById("new_username").value="";
            document.getElementById("new_password").value="";        
            alert("You successfully created a new user!!");
            
        }
        else {
            alert("Entered username already exists");
        }
    });
}
document.getElementById("register_btn").addEventListener("click", registerAjax, false); // Bind the AJAX call to button click