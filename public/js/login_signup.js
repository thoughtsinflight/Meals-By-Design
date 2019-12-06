$("#loginForm").on("submit", (event) => {
    event.preventDefault()

    $.ajax({
        url: "/api/login",
        method: "POST",
        data: {
            email: $("#existingEmail").val().trim(),
            password: $("#existingPassword").val()
        }
    });
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
