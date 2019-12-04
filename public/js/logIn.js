$("#loginButton").on("click", () => {
    const existingUser ={
    email: $(":input#existingEmail").val(),
    password: $(":input#existingPassword").val(),
    }
console.log(existingUser);
});
 
$("#signupButton").on("click", () => {
    const newUser ={
    newEmail: $(":input#newEmail").val(),
    newFirstName: $(":input#newFirstName").val(),
    newLastName: $(":input#newLastName").val(),
    newPassword: $(":input#newPassword").val(),
    newPasswordConfirm: $(":input#newPasswordConfirm").val(),
    }
    console.log(newUser)
});