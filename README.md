[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://choosealicense.com/licenses/mit/)
[![Build Status](https://travis-ci.org/QUDUSKUNLE/Ideabox.svg?branch=develop)](https://travis-ci.org/QUDUSKUNLE/Ideabox)
[![Coverage Status](https://coveralls.io/repos/github/QUDUSKUNLE/Ideabox/badge.svg?branch=develop)](https://coveralls.io/github/QUDUSKUNLE/Ideabox?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/07b73613abd04df3abac/maintainability)](https://codeclimate.com/github/QUDUSKUNLE/Ideabox/maintainability)
# Ideabox
Ideabox is a simple application that allows users to create a pool of ideas and promote collaboration.

A live demo of the app can be access on Heroku <b><a href="https://ideaboxng.herokuapp.com/">Ideabox</a></b>

# Feature
IdeaBox allows users to do the following.
 - Register and log into their accounts.
 - Create pool of Ideas
 - Created Ideas can be made `Public` or `Private` at users discretion
   - Users can view other peoples `Public` ideas
   - Users can see the category of an idea
   - Users can search for Ideas
   - Users can comment on Ideas found interesting to him/her
   - Users can share Ideas on social media
   - Users can edit his/her ideas
   - Users can delete ideas
   - Edited are tagged to `edited` ideas
 - Registered users can update their profile
 - Registered users can reset their passwords

# Folder Structure

 The `server` directory houses the back-end implementation in <a href="https://nodejs.org/">node.js</a>, <a href="https://expressjs.com/">express</a> & <a href="https://http://mongoosejs.com/">mongoose</a>
 
 The `client` directory houses the front-end implementation in <a href="https://facebook.github.io/react/">React</a> (Flux Architecture)

# Technology Stack

- Front-end: React/Flux, SCSS, Webpack
- Back-end: Node/Express and Mongoose


# Get Started
  Kindly follow the steps below to setup a local development environment.
  + ```Clone``` this repository from a terminal ```git clone  https://github.com/QUDUSKUNLE/Ideabox/tree/develop```

  + ```cd``` into the project directory

  + install project dependencies ```npm install```

  + Create an account on ```mongoose``` and set up the app

  + Create ```.env``` file and set up the variables in ```.env-sample``` to your specified database connection gotten from ```mongoose```
   + Connet to database local by running `mongod` on terminal

   + and run ```npm run start:dev``` for development and `npm start` for production

   + Go to ```http://localhost:3000/```

## Test
 - This app uses Mocha, Chai-Http for `server test`.
   - Run npm i mocha -g to install Mocha globally and npm i nyc -g to install nyc globally before running npm test to run `server` tests

+ ```git clone https://github.com/QUDUSKUNLE/Ideabox```

+ and run ```npm test``` for ```server test```

## Limitations
+ Users cannot edit and delete comment

+ Users can not delete their account


## Author
+ [Qudus YEKEEN (ABU MUHSINAH)](https://github.com/QUDUSKUNLE)

## FAQ
#### Is IdeaBox a free app?
- Yes, it's free.

#### Is IdeaBox an open source?
- Yes, It's an open source project, and we encourage anyone who wish to contribute to do so.

## Contribution
If you wish to contribute to this Open source project, kindly fork the respository and raise a Pull Request against ```develop branch```.
For every pull request raised, kindly adhere to this best practises <a href="https://github.com/airbnb/javascript">link</a> to conform with the standard to which this project codebase is written.

+ For more clarifications, do contant via this email ```qudus.yekeen@andela.com```.

 ## License
 
This software is licensed under the MIT License. See the <a href="https://github.com/QUDUSKUNLE/Ideabox/blob/develop/LICENSE">LICENSE</a> file in the top distribution directory for the full license text.
