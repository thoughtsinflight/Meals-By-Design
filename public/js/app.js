$(document).foundation()


const curDay = moment().weekday(-7);
$("#navButton").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));

function clearTodaysMenu(){
    $("ul#todaysMenuSection li").remove();
}
const curDay = 0;

// Click Listeners for all days of the week
$("#mondayButton").on("click", () => {
    clearTodaysMenu()
    $("<li>").appendTo("ul#todaysMenuSection").prepend("mondays menu placeholder")
    return curDay = 1;
});

$("#tuesdayButton").on("click", () => {
    clearTodaysMenu()
    $("<li>").appendTo("ul#todaysMenuSection").prepend("Tuesday Menu Placeholder")
    return curDay = 2;
});

$("#wednesdayButton").on("click", () => {
    clearTodaysMenu()
    $("<li>").appendTo("ul#todaysMenuSection").prepend("Wednesday Menu Placeholder");
    return curDay = 3;
});

$("#thursdayButton").on("click", () => {
    clearTodaysMenu()
    $("<li>").appendTo("ul#todaysMenuSection").prepend("Thursday Menu Placeholder");
    return curDay = 4;
});

$("#fridayButton").on("click", () => {
    clearTodaysMenu()
    $("<li>").appendTo("ul#todaysMenuSection").prepend("Friday Menu Placeholder");
    return curDay = 5;
});

$("#saturdayButton").on("click", () => {
    clearTodaysMenu()
    $("<li>").appendTo("ul#todaysMenuSection").prepend("Saturday Menu Placeholder");
    return curDay = 6;
});

$("#sundayButton").on("click", () => {
    clearTodaysMenu()
    $("<li>").appendTo("ul#todaysMenuSection").prepend("Sunday Menu Placeholder");
    return curDay = 7;
})


// Click listener for more ingredients button
$("#moreIngredientsButton").on("click", () => {
    $(`<div class="cell ingredientForm">
    <input type="text" name="newIngredient">
  </div>`).prependTo("div#ingredientsButtonDiv")
});
// click listener for add menu item button
$("#addMenuItemButton").on("submit", (event) => {
    event.preventDefault();
    const ingredients = $("input[name^=newIngredient]").map(function(idx, elem){
        return $(elem).val().trim();
    }).get();
    const ingredientsObj = ingredients.reduce(function(s, a){
        s.push({name: a});
        return s;
    }, [])
    
    const newMeal = {
        dayId: $(":input#weekdaySelect").val(),
        name: $(":input#newMenuItem").val().trim(),
        ingredients: [
            ingredientsObj
        ]
      }
   console.log(newMeal)

  
});


 
