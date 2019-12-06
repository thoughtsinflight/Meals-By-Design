$(document).ready(function () {
    $(document).foundation()
    const allMenuItems = [];
    const allIngredients = [];

    const curDay = moment().weekday(-7);
    $("#navButton").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));

    function clearTodaysMenu() {
        $("ul#todaysMenuSection li").remove();
    }

    $(".day").on("click", (event) => {
        const day = $(event.currentTarget).val();
        clearTodaysMenu();
        $.ajax(`/api/days/${day}/meals`, {
            type: "GET"
        }).then(function (data) {
            console.log(data.meals);
            const recipeName = (name) => (`<p class="recipeName"><strong> Recipe: ${name}</strong></p>`);
            const ingredientList = (list) => {
                let listItemString = '';
                for (let i = 0; i < list.length; i++) {
                    listItemString += `<li>${list[i].name}</li>`;
                }
                return listItemString;
            };
            const recipe = (meal) => (`<li>${recipeName(meal.name)}<ul>${ingredientList(meal.Ingredients)}</ul></li>`);
            const recipeList = (meals) => {
                let mealItemString = '';
                for (let i = 0; i < meals.length; i++) {
                    mealItemString += `${recipe(meals[i])}`;
                }
                return mealItemString;
            }
            $("#todaysMenuSection").html(recipeList(data.meals));
        })

    });

    // Click Listeners for all days of the week
    // $("#mondayButton").on("click", () => {
    //     clearTodaysMenu()
    //     $("<li>").appendTo("ul#todaysMenuSection").prepend("mondays menu placeholder")
    // });

    // $("#tuesdayButton").on("click", () => {
    //     clearTodaysMenu()
    //     $("<li>").appendTo("ul#todaysMenuSection").prepend("Tuesday Menu Placeholder")
    // });

    // $("#wednesdayButton").on("click", () => {
    //     clearTodaysMenu()
    //     $("<li>").appendTo("ul#todaysMenuSection").prepend("Wednesday Menu Placeholder")
    // });

    // $("#thursdayButton").on("click", () => {
    //     clearTodaysMenu()
    //     $("<li>").appendTo("ul#todaysMenuSection").prepend("Thursday Menu Placeholder")
    // });

    // $("#fridayButton").on("click", () => {
    //     clearTodaysMenu()
    //     $("<li>").appendTo("ul#todaysMenuSection").prepend("Friday Menu Placeholder")
    // });

    // $("#saturdayButton").on("click", () => {
    //     clearTodaysMenu()
    //     $("<li>").appendTo("ul#todaysMenuSection").prepend("Saturday Menu Placeholder")
    // });

    // $("#sundayButton").on("click", () => {
    //     clearTodaysMenu()
    //     $("<li>").appendTo("ul#todaysMenuSection").prepend("Sunday Menu Placeholder")
    // })


    // Click listener for more ingredients button
    $("#moreIngredientsButton").on("click", () => {
        $(`<div class="cell ingredientForm">
    <input type="text" name="newIngredient">
  </div>`).prependTo("div#ingredientsButtonDiv")
    });
    // click listener for add menu item button
    $("#addMenuItemButton").on("click", (event) => {
        const ingredientsArray = [];
        $("input[name='newIngredient']").each(function (index, $element) {
            ingredientsArray.push({ name: $element.value })
        });

        const newMeal = {
            dayId: $("#weekdaySelect").val(),
            name: $("#newMenuItem").val(),
            ingredients: ingredientsArray
        }
        console.log(newMeal)

        //Post request.
        $.post("/api/meals", {
            data: newMeal
        }).then(function (data) {
            console.log(data);
        })
    });

    //Not needed
    // $("#generateGroceryList").on("click", (event) => {

    //     $.ajax("/api/ingredients/user/grocery-list ", {
    //         type: "GET"
    //     }).then(function (grocerylist) {
    //        console.log(grocerylist);
    //     })
    // });
});