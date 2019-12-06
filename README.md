# [MealsByDesign](https://mealsbydesign.herokuapp.com/)

## Description
MealsByDesign is an application for those who want to create structure in their grocery and spending habits on food. It corresponds to the following user story:

> AS A person with a hectic schedule of many commitments,
> 
> I WANT to organize what I'm eating for the week ahead of time,
> 
> SO THAT I can buy the necessary groceries to make my meals and avoid overspending on food by constantly eating out.

This interactive, mobile-responsive application addresses a problem of our choosing but at minimum, it required the use of
- A Node and Express server
- A MySQL database and the Sequelize ORM
- RESTful API routes for retrieving and adding new data (GET & POST)
- Deployment via Heroku (with seed data)
- A CSS framework other than *Bootstrap*
- The MVC paradigm (Model-View-Controller)

We used the following tools:
- CSS framework: Foundation
- Database creation: Sequelize ORM and MySQL
- User authorization: Passport NPM
- Password encryption: Bcryptjs NPM

**MealsByDesign** is a collaborative creation from the minds of [Christie](https://github.com/TwoByteKitty), [Laurie](https://github.com/lbernadel), [Mike](https://github.com/MikeZanercik), and [Thomas](https://github.com/thoughtsinflight).

## Challenges
- Creating the user login/signup feature with authentication
- Getting the login to go to the dashboard of the corresponding user
- Figuring out how to associate our database models correctly
- Making sure to properly follow the MVC structure
- Spacing and styling with Foundation


### Sources
1. [Foundation Framework Docs](https://get.foundation/sites/docs/index.html)
2. Sequelize Models: [Sequelize Docs](https://sequelize.org/master/manual/getting-started.html), [migrations & associations](https://codeburst.io/sequelize-migrations-setting-up-associations-985d29b61ee7), [data validation](https://github.com/validatorjs/validator.js), various posts on StackOverflow
3. User Sign Up & Login Feature
   * User Authentication: [Passport Docs](http://www.passportjs.org/docs/),[a code tutorial](https://code.tutsplus.com/tutorials/using-passport-with-sequelize-and-mysql--cms-27537)
   * Password Encryption: [helpful article](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/), [documentation](https://www.npmjs.com/package/bcryptjs)
   * Sessions 
4. For everything else that made us want to flip a table....we picked the wonderful minds of our instructor, Jeff, our TAs (Alex, Cassidy & Max), and Allison Payne.


### Future Development Ideas
* Displaying up to a full month of meals
* Capability to email or text the list to someone else
* A count of how many meals need a certain ingredient
* A recipe builder that can account for how much of an ingredient is needed when generating a grocery list
* The ability to connect accounts to member(s) of the same household
* An area for notes on meals such as meal ideas, ratings, future modifications