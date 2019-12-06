$(document).ready( function() {
$(document).foundation()
const allMenuItems = [];
const allIngredients = [];

const curDay = moment().weekday(-7);
$("#navButton").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));

function clearTodaysMenu(){
    $("ul#todaysMenuSection li").remove();
}


// Click Listeners for all days of the week
$("#mondayButton").on("click", () => {
    clearTodaysMenu()
    $("<li>").appendTo("ul#todaysMenuSection").prepend("mondays menu placeholder")
});

$("#tuesdayButton").on("click", () => {
    clearTodaysMenu()
    $("<li>").appendTo("ul#todaysMenuSection").prepend("Tuesday Menu Placeholder")
});

$("#wednesdayButton").on("click", () => {
    clearTodaysMenu()
    $("<li>").appendTo("ul#todaysMenuSection").prepend("Wednesday Menu Placeholder")
});

$("#thursdayButton").on("click", () => {
    clearTodaysMenu()
    $("<li>").appendTo("ul#todaysMenuSection").prepend("Thursday Menu Placeholder")
});

$("#fridayButton").on("click", () => {
    clearTodaysMenu()
    $("<li>").appendTo("ul#todaysMenuSection").prepend("Friday Menu Placeholder")
});

$("#saturdayButton").on("click", () => {
    clearTodaysMenu()
    $("<li>").appendTo("ul#todaysMenuSection").prepend("Saturday Menu Placeholder")
});

$("#sundayButton").on("click", () => {
    clearTodaysMenu()
    $("<li>").appendTo("ul#todaysMenuSection").prepend("Sunday Menu Placeholder")
})


// Click listener for more ingredients button
$("#moreIngredientsButton").on("click", () => {
    $(`<div class="cell ingredientForm">
    <input type="text" name="newIngredient">
  </div>`).prependTo("div#ingredientsButtonDiv")
});
// click listener for add menu item button
$("#addMenuItemButton").on("click", (event) => {
    const ingredients = $("input[name^=newIngredient]").map(function(idx, elem){
        return $(elem).val();
    }).get();
    const ingredientsObj = ingredients.reduce(function(s, a){
        s.push({name: a});
        return s;
    }, [])
    
    const newMeal = {
        dayId: $(":input#weekdaySelect").val(),
        name: $(":input#newMenuItem").val(),
        ingredients: [
            ingredientsObj
        ]
      }
   console.log(newMeal)

   //Post request.
   $.ajax("/api/ingredients", {
       type: "POST",
       data: newMeal
   }).then(
    function() {
        location.reload();
    }
   )
});

$("#GenerateGroceryList").on("click", (event) => {

    $.ajax("/api/ ", {
        type: "GET"
    }).then(
        function () {
            location.reload()
        }
    )
});
});