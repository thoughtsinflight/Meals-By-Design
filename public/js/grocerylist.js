//Post request.
$("#addMenuItemForm").on("submit", (event) => {
    event.preventDefault();
    $.ajax({
        url: "/api/meals",
        method: "POST",
        data: newMeal
    }).then(
        function () {
            location.reload();
        })
})


$("#GenerateGroceryList").on("click", (event) => {
    event.preventDefault();
    //get request
    $.ajax({
        url: "/api/ingredients",
        method: "GET",
        data: ingredients
    }).then(
        function () {
            location.reload()
        }
    )
});