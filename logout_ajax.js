function logoutAjax(event) {
    //    if (token) {
    //        console.log("wtf");    
    //    }
        let username = document.getElementById("username").value; // Get the username from the form
        let password = document.getElementById("password").value; // Get the password from the form
    
        // Make a URL-encoded string for passing POST data:
        let data = { 'username': username, 'password': password };
        fetch("logout.php", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'content-type': 'application/json' }
            })
            .then(response => response.json())
            .then((data) => {
                alert("You successfully logged out !");
                document.getElementById("username").value="";
                document.getElementById("password").value="";
                document.getElementById("login").style.display="";
                document.getElementById("register").style.display="";
                document.getElementById("logout").style.display="none";
                document.getElementById("logined_user").style.display="none";
    //          updateCalendar();
            });
    }
    
    document.getElementById("logout").addEventListener("click", logoutAjax, false); // Bind the AJAX call to button click