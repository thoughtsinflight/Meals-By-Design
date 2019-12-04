$("#loginButton").on("click", () => {
    const existingUser ={
    email: $(":input#existingEmail").val(),
    password: $(":input#existingPassword").val(),
    }
console.log(existingUser);
});
 
$("#signupButton").on("click", () => {
    const newUser ={    
    firstName: $("#newFirstName").val(),
    lastName: $("#newLastName").val(),
    email: $("#newEmail").val(),
    password: $("#newPassword").val(),
}
     
    if (newUser.password !== $("#newPasswordConfirm").val()){
        alert("Confirm password must match password")
    }
    console.log(newUser)
});
