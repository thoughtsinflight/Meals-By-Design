const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("index")
})
router.get("/login", (req, res) => {
    res.render("login")
})
router.get("/signUp", (req, res) => {
    res.render("signUp")
})
router.get("/dashboard", (req, res) => {
    // sequelize call to the db to get all meals
    // after receiving the meals from the db and assigning them to a variable * meals *
    // inside the function =>  res.render("dashboard", meals)
    var dummyData = {
        "meals": [
            {
                "id": 1,
                "name": "Cake",
                "createdAt": "2019-12-05T16:24:20.000Z",
                "updatedAt": "2019-12-05T16:24:20.000Z",
                "Ingredients": [
                    {
                        "id": 1,
                        "name": "flour",
                        "createdAt": "2019-12-05T16:24:20.000Z",
                        "updatedAt": "2019-12-05T16:24:20.000Z",
                        "MealIngredients": {
                            "MealId": 1,
                            "IngredientId": 1,
                            "createdAt": "2019-12-05T16:24:20.000Z",
                            "updatedAt": "2019-12-05T16:24:20.000Z"
                        }
                    },
                    {
                        "id": 2,
                        "name": "eggs",
                        "createdAt": "2019-12-05T16:24:20.000Z",
                        "updatedAt": "2019-12-05T16:24:20.000Z",
                        "MealIngredients": {
                            "MealId": 1,
                            "IngredientId": 2,
                            "createdAt": "2019-12-05T16:24:20.000Z",
                            "updatedAt": "2019-12-05T16:24:20.000Z"
                        }
                    },
                    {
                        "id": 3,
                        "name": "butter",
                        "createdAt": "2019-12-05T16:24:20.000Z",
                        "updatedAt": "2019-12-05T16:24:20.000Z",
                        "MealIngredients": {
                            "MealId": 1,
                            "IngredientId": 3,
                            "createdAt": "2019-12-05T16:24:20.000Z",
                            "updatedAt": "2019-12-05T16:24:20.000Z"
                        }
                    },
                    {
                        "id": 4,
                        "name": "sugar",
                        "createdAt": "2019-12-05T16:24:20.000Z",
                        "updatedAt": "2019-12-05T16:24:20.000Z",
                        "MealIngredients": {
                            "MealId": 1,
                            "IngredientId": 4,
                            "createdAt": "2019-12-05T16:24:20.000Z",
                            "updatedAt": "2019-12-05T16:24:20.000Z"
                        }
                    }
                ],
                "Day": [
                    {
                        "id": 1,
                        "day": "Monday",
                        "createdAt": "2019-12-05T16:24:20.000Z",
                        "updatedAt": "2019-12-05T16:24:20.000Z",
                        "DayMeals": {
                            "DayId": 1,
                            "MealId": 1,
                            "createdAt": "2019-12-05T16:24:20.000Z",
                            "updatedAt": "2019-12-05T16:24:20.000Z"
                        }
                    }
                ],
                "User": [
                    {
                        "id": 1,
                        "firstName": "Jane",
                        "lastName": "Doe",
                        "email": "jan.doe@email.com",
                        "password": "password123",
                        "createdAt": "2019-12-05T16:24:20.000Z",
                        "updatedAt": "2019-12-05T16:24:20.000Z",
                        "UserMeals": {
                            "UserId": 1,
                            "MealId": "1",
                            "createdAt": "2019-12-05T16:24:20.000Z",
                            "updatedAt": "2019-12-05T16:24:20.000Z"
                        }
                    }
                ]
            },
            {
                "id": 2,
                "name": "Peanut Butter Cookies",
                "createdAt": "2019-12-05T16:24:20.000Z",
                "updatedAt": "2019-12-05T16:24:20.000Z",
                "Ingredients": [
                    {
                        "id": 1,
                        "name": "flour",
                        "createdAt": "2019-12-05T16:24:20.000Z",
                        "updatedAt": "2019-12-05T16:24:20.000Z",
                        "MealIngredients": {
                            "MealId": 2,
                            "IngredientId": 1,
                            "createdAt": "2019-12-05T16:24:20.000Z",
                            "updatedAt": "2019-12-05T16:24:20.000Z"
                        }
                    },
                    {
                        "id": 2,
                        "name": "eggs",
                        "createdAt": "2019-12-05T16:24:20.000Z",
                        "updatedAt": "2019-12-05T16:24:20.000Z",
                        "MealIngredients": {
                            "MealId": 2,
                            "IngredientId": 2,
                            "createdAt": "2019-12-05T16:24:20.000Z",
                            "updatedAt": "2019-12-05T16:24:20.000Z"
                        }
                    },
                    {
                        "id": 3,
                        "name": "butter",
                        "createdAt": "2019-12-05T16:24:20.000Z",
                        "updatedAt": "2019-12-05T16:24:20.000Z",
                        "MealIngredients": {
                            "MealId": 2,
                            "IngredientId": 3,
                            "createdAt": "2019-12-05T16:24:20.000Z",
                            "updatedAt": "2019-12-05T16:24:20.000Z"
                        }
                    },
                    {
                        "id": 4,
                        "name": "sugar",
                        "createdAt": "2019-12-05T16:24:20.000Z",
                        "updatedAt": "2019-12-05T16:24:20.000Z",
                        "MealIngredients": {
                            "MealId": 2,
                            "IngredientId": 4,
                            "createdAt": "2019-12-05T16:24:20.000Z",
                            "updatedAt": "2019-12-05T16:24:20.000Z"
                        }
                    },
                    {
                        "id": 5,
                        "name": "peanut butter",
                        "createdAt": "2019-12-05T16:24:20.000Z",
                        "updatedAt": "2019-12-05T16:24:20.000Z",
                        "MealIngredients": {
                            "MealId": 2,
                            "IngredientId": 5,
                            "createdAt": "2019-12-05T16:24:20.000Z",
                            "updatedAt": "2019-12-05T16:24:20.000Z"
                        }
                    }
                ],
                "Day": [
                    {
                        "id": 1,
                        "day": "Monday",
                        "createdAt": "2019-12-05T16:24:20.000Z",
                        "updatedAt": "2019-12-05T16:24:20.000Z",
                        "DayMeals": {
                            "DayId": 1,
                            "MealId": 2,
                            "createdAt": "2019-12-05T16:24:20.000Z",
                            "updatedAt": "2019-12-05T16:24:20.000Z"
                        }
                    }
                ],
                "User": [
                    {
                        "id": 1,
                        "firstName": "Jane",
                        "lastName": "Doe",
                        "email": "jan.doe@email.com",
                        "password": "password123",
                        "createdAt": "2019-12-05T16:24:20.000Z",
                        "updatedAt": "2019-12-05T16:24:20.000Z",
                        "UserMeals": {
                            "UserId": 1,
                            "MealId": "2",
                            "createdAt": "2019-12-05T16:24:20.000Z",
                            "updatedAt": "2019-12-05T16:24:20.000Z"
                        }
                    }
                ]
            }
        ]
    }
    // once the sequelize call is done, replace this dummyData variable below with the data object from the database
    res.render("dashboard", dummyData)
})

module.exports = router;