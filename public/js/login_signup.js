$("#loginButton").on("click", (event) => {
    const userData = {
        email: $("#existingEmail").val(),
        password: $("#existingPassword").val()
    }

    if(userData.email === "" || userData.password === "") {
        event.preventDefault()
        $("#errMsg").text("ERROR: Email and/or password field cannot be blank.")
        setTimeout(() => {
            $(".errMsg").text("")
        }, 1500)
    }
});

$("#signupButton").on("click", (event) => {
    const newUser = {    
        firstName: $("#newFirstName").val().trim(),
        lastName: $("#newLastName").val().trim(),
        email: $("#newEmail").val().trim(),
        password: $("#newPassword").val(),
        passwordConfirm: $("#newPasswordConfirm").val()
    };

    if(newUser.firstName === "" || newUser.lastName === "" || newUser.email === "" || newUser.password === ""){
        event.preventDefault()
        $(".errMsg").text("ERROR: Form fields cannot be blank!")
        setTimeout(() => {
            $(".errMsg").text("")
        }, 1500)
    } else if(newUser.password.length < 8 || newUser.password.length > 120){
        event.preventDefault()
        $("#newPassword").val("")
        $("#newPasswordConfirm").val("")

        $("#passErr").text("ERROR: Password must be between 8 and 120 characters.")
        setTimeout(() => {
            $("#passErr").text("")
        }, 2000)
    }
        
    if(newUser.password !== newUser.passwordConfirm){
        event.preventDefault()
        $("#newPassword").val("")
        $("#newPasswordConfirm").val("")

        $("#confirmErr").text("Password confirmation must match password.")
        setTimeout(() => {
            $("#confirmErr").text("")
        }, 2000)
    }
});
