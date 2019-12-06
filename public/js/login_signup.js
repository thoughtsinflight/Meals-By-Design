$("#loginButton").on("click", (event) => {
    const userData = {
        email: $("#existingEmail").val(),
        password: $("#existingPassword").val()
    }

    if(userData.email === "" || userData.password === "") {
        event.preventDefault()
        $("#errMsg").text("Email and/or password field cannot be blank.")
    }

});

$("#signUpForm").on("submit", (event) => {
    event.preventDefault()

    let newUser = {    
        firstName: $("#newFirstName").val().trim(),
        lastName: $("#newLastName").val().trim(),
        email: $("#newEmail").val().trim(),
        password: $("#newPassword").val(),
        passwordConfirm: $("#newPasswordConfirm").val()
    };

    function passwordCheck(input) {
        
        if (newUser.password !== newUser.passwordConfirm){
            $("#passwordError").show()
            return
        }else {
            $("#passwordError").hide()
            return input
        }
    }
     

    $.ajax({
        url: "/api/signup",
        method: "POST",
        data: {
            firstName: $("#newFirstName").val().trim(),
            lastName: $("#newLastName").val().trim(),
            email: $("#newEmail").val().trim(),
            password: $("#newPassword").val()    
        }
    });
});
