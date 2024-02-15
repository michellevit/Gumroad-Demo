# GR Product Engineering Challenge 

![React Version](https://img.shields.io/badge/react-18.2.0-blue.svg)
![Rails Version](https://img.shields.io/badge/rails-7.1.3-red.svg)
![Ruby Version](https://img.shields.io/badge/ruby-3.2.3-red.svg)

This project is a simplified replication of the GR Discover and Product Page user experience, developed using Rails and React. It incorporates core features of the original interface with several enhancements to improve user interaction and engagement. Key features include:
- **Discover Page 'Liked' Section:** A new section on the 'Discover' page to display products that the user has liked.
- **Product Page 'Like' Button:** An interactive heart icon allowing users to 'like' or 'unlike' products. 
- **Product Page 'Bundle' Section:** A section that appears if the product is part of a 'bundle', offering users the option to purchase related products together at a discounted rate. 


<a href="https://gr-demo.michellef.dev/" target="_blank"><img src="https://img.shields.io/badge/Demo-Frontend-blue?style=for-the-badge&logo=react"></a>
<a href="https://gr-demo.michellef.dev/api" target="_blank"><img src="https://img.shields.io/badge/Demo-Backend-red?style=for-the-badge&logo=ruby"></a>




## Table of Contents
- [Technologies Used](#technologies-used)
- [Feature Overview](#feature-overview)
- [Architectural Decisions](#architectural-decisions)
- [What I Learned](#what-i-learned)
- [Basic Usage](#basic-usage)
  - [How to Interact with the Database in Development](#interact-db)
  - [How to Modify Database Schema](#modify-db)
  - [How to Seed the Database](#seed-db)
  - [How To Reset the Database](#reset-db)
  - [How To Update the App](#update-app)
  - [Heroku Troubleshooting](#heroku-troubleshooting)
- [Features To Add](#features-to-add)
- [Credits](#credits)


## Technologies Used<a name="technologies-used"></a>


## Feature Overview<a name="feature-overview"></a>
<div style="display: flex; justify-content: space-between;">
  <img src="screenshots/GR-Demo-Screenshot-Discover-Page.png" style="width: 45%; margin-right: 10px;" alt="Discover Page Screenshot" />
  <img src="screenshots/GR-Demo-Screenshot-Product-Page.png" style="width: 45%;" alt="Product Page Screenshot" />
</div>


## Architectural Decisions<a name="architectural-decisions"></a>



## What I Learned<a name="what-I-learned"></a>


## Basic Usage<a name="basic-usage"></a>

### How to Interact with the Database in Development<a name="interact-db"></a>
- **Rails Console:** Use rails console to interact directly with your application's database.
  - **View All Entries:** Execute Product.all to list all products.
  - **View First Entry:** Use Product.first to see the first product entry.
  - **Create New Entry:** To add a new product, use Product.create(name: "New Product", price: 100).
  - **Delete All Entries:** Clear the database with Product.delete_all.


### How To Modify Database Schema<a name="modify-db"></a>
  - Generate a migration
    - e.g. `rails generate migration ChangeFieldTypeInProducts`
  - Open the newly created migration file in db/migrate
  - Inside the migration file's 'def change' section, add the command needed to make the change
    - e.g. `rename_column :products, :creator_name, :user`
  - Run the migration
    - Development: `rails db:migrate`
    - Production: `heroku run rake db:migrate -a gr-demo`


### How to Seed the Database<a name="seed-db"></a>
- *This command will seed the database with mock data from the JSON files in lib/seeds*
- In the terminal, navigate to the project's root directory
  - Run the seed command
    - Development: `rail db:seed`
    - Production: `heroku run rake db:seed --app gr-demo`


### How To Reset the Database<a name="reset-db"></a>
- *This script will clear the entries from all tables (i.e. Product, User, Bundle) then reseed the database with the mock data from the JSON files in lib/seeds*
- In the terminal, navigate to the project's root directory
  - Run: `.\reset-db.bat`


### Updating the Heroku App<a name="update-app"></a>
- *This script will rebuild the reactapp in the correct folder and push the changes to GitHub, and every push to main will deploy a new version of the app on Heroku.*
  - Navigate into the Gumroad-Demo directory in the powershell terminal
  - Make sure you are logged into heroku from terminal (run: `heroku login`)
  - Run: `.\update-app.bat "Your commit message here`


### Heroku Troubleshooting<a name="heroku-troubleshooting"></a>
- Reminders:
  - After updating routes.rb file: 
    - Make sure to restart the Heroku server after modifying the routes.rb file 
  - If the frontend isn't working
    - Check if the public folder has the index.html file (if not the reactapp build has failed due to compile error)
- Error Logging: 
  - To log errors in backend (e.g. controllers) - add this line: 
    - Add this line: `Rails.logger.info "log message here"`
    - Example: `Rails.logger.info "Parameters: #{params.inspect}"`
    - This will be printed in the Heroku logs
- Commands:
  - **Error Logs:** `heroku logs --tail -a gr-demo`
  - **Restart Server:** `heroku ps:restart -a gr-demo`



## Features To Add <a name="features-to-add"></a>
- DB: Add recently_viewed field to users
- Backend: Add recently_viewed functionality
- SingleProduct Page: Add recently_viewed section
- DB: Add Cart field for users
- Nav: Add to Cart functionality
- SingleProduct Page: Add to Cart functionality
- DB: Add 'Staff Picks' table (or assign users staff status and implement star button w/ before_action)
- AllProducts Page: Add Staff Picks
- AllProducts Page: Add profile pics for users
- SingleProduct Page: Add profile pics for users
- DB: Add profile pics for users
- SingleProduct Page: Rating bar chart + accurate star ratings
- SingleProduct Page: rating bar chart, fix rating stars, if 0 ratings -> 'no ratings'
- SingleProduct Page: image carousel sizing when multiple images
- User authentification (liked_products, recently_viewed)
- CSS: define global variables for colors and other properties
- CSS: clean/reorganize


## Credits <a name="credits"></a>
Michelle Flandin