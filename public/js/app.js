$(document).ready(function () {
    $(document).foundation()

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

        //Post meal to db.
        $.post("/api/meals", {
            data: newMeal
        }).then(function () {
            location.reload()
        })
    });
});