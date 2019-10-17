# FaceBook Social Authentication in Node/Express Js with Passport
## Introduction
Almost all applications today, require users to create accounts on their websites in order to use certain services. This repetitive process of setting up new profiles and creating new passwords for every application is not only time consuming but also frustrating, and over time, account management becomes hard since one has to remember their credential details in every application. 

Thanks to OAuth, we can use popular social media applications such as Google, Facebook and Twitter to authenticate users. This process is faster and familiar to the users hence a high chance of most of them agreeing to use your services. So why not integrate it into your application? In this tutorial, I will take you through on how to integrate FaceBook into your Node Js application.

 #explain more about OAuth

## Prerequisites
You will need the following dependencies to complete this tutorial:

1. [Node](https://nodejs.org/en/)
2. [Facebook Developer account](https://developers.facebook.com/)
3. [Mongo Db](https://docs.mongodb.com/manual/installation/)

## Getting Started
Follow the instructions below in your preferred terminal in order to set up your development environment:
```
mkdir demo
cd demo
git clone https://github.com/Felistas/NodeJs-Passport-Authentication.git
cd NodeJs-Passport-Authentication
```

Next run:
```
npm install
npm start
```

To confirm everything is working as expected, open your preferred REST Client (Insomnia is my preference) then make a GET request to the following endpoint `http://localhost:3000/users` and confirm the response is as below:


![Home](https://github.com/Felistas/NodeJs-Passport-Authentication/blob/master/Screen%20Shot%202019-10-09%20at%2017.28.04.png)


## Project Setup

In order to understand how our project is set up, we will go through the individual folder structures which follow the MVC (Model View Controller) pattern. As a recap of the MVC pattern, the model defines the schema of the data in the database and how it will be stored. Controllers hold the business logic of the application while the view holds all our routes.

Inside the `app` folder, we have ` user` and `utils` folders which are responsible for the user resource and database configuration respectively. The `index.js` file, which is the entry point of our app, is responsible for express setup. In this project, we will use ES6 and Babel to compile the code. I have also configured [nodemon](https://nodemon.io/) to listen to any changes made to the app then reload the server.

## OAuth 2
[OAuth 2](https://oauth.net/2/) is an authorization framework that allows third-party applications to obtain limited access to HTTP services, either on behalf of the resource owner without having them provide their login credentials to a third-party app or by allowing these third-party applications to obtain access on their own behalfs. Case in example here would be the application we are building acting as a third party application, facebook being our HTTP service and the end user as the resource owner. These three fall under the following OAuth roles:

1. Resource Owner/ End user - this is the user authorizing a third-party application to access certain protected resources from a resource server. 
2. Client - This is the third party application making protected resource requests to a resource server on behalf of the resource owner
3. Resource Server -  Hosts the protected resources e.g user profile
4. Authorization Server - Responsible for authenticating the resource owner and providing access token to clients 

In order for successful user authentication to happen, a series of steps need to be followed:

1. The client,(which is our application in this case), requests authorization from the end-user. 
2. Once the end-user authorizes the client, an application grant is issued.
3. Our client then requests an access token from the authorization server using the authorization grant. 
4. The authorization server validates the grant and authenticates the client. If the two processes are successful an access token is granted to the client. 
5. Our client then uses the access token to request the protected resource
6. The resources server then validates the access token and if successful, the requested protected resources are shared with the client. 

Note: OAuth2 has different types of grant types. For this tutorial, we will use the Authorization code grant type. To learn more about OAuth2, you can have a look [here](https://tools.ietf.org/html/rfc6749)

## Passport
According to the official documentation, passport an authentication middleware for Node Js and supports a number of strategies including Facebook, Google, Twitter, etc. Now, lets get our hands dirty and get the FaceBook authentication up and running. To start us off, run the following commands to install the various dependencies needed:

```
npm install passport passport-facebook --save 
```
The `passport-facebook` package enables us to authenticate users using Facebook. In `app/user/user.controller.js` replace the existing code with the following lines of code:

```
import passport from "passport";
import dotenv from "dotenv";
import strategy from "passport-facebook";

import userModel from "../user/user.model";

const FacebookStrategy = strategy.Strategy;

dotenv.config();
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["email", "name"]
    },
    function(accessToken, refreshToken, profile, done) {
      const { email, first_name, last_name } = profile._json;
      const userData = {
        email,
        firstName: first_name,
        lastName: last_name
      };
      new userModel(userData).save();
      done(null, profile);
    }
  )
);

```
Next, in `app/user/user.router.js` replace the existing code with:

```
import express from "express";
import passport from "passport";
import userController from "./user.controller";


const userRouter = express.Router();

userRouter.get("/auth/facebook", passport.authenticate("facebook"));

userRouter.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/fail"
  })
);

userRouter.get("/fail", (req, res) => {
  res.send("Failed attempt");
});

userRouter.get("/", (req, res) => {
  res.send("Success");
});
export default userRouter;


```

Here, we have defined our callback URLs and specified successful and failure routes in case authentication fails i.e the `/` and `/fail` routes for success and failure respectively.  

In `app/index.js` add the following code snippet.

```
import express from "express";
import { json } from "body-parser";
import passport from "passport";

import { connect } from "./utils/db";
import userRouter from "./user/user.routes";

const app = express();
const port = 3000;

app.use(passport.initialize());

app.use(json());
app.use("/", userRouter);

app.listen(port, async () => {
  await connect();
  console.log(`Server listening on ${port}`);
});

```

For successful authentication, we need to register our application callback URL and obtain the client secret and client id from the Facebook app developer console. Navigate to `https://developers.facebook.com/` and create an app. 

![App](https://github.com/Felistas/NodeJs-Passport-Authentication/blob/master/create-app.png)

You will be then redirected to the app's dashboard which should be as shown below:

![Dashboard](https://github.com/Felistas/NodeJs-Passport-Authentication/blob/master/dashboard.png)

Next, let's configure our callback URL by adding a platform under the basic tab in settings: 
Note: Ensure to select a `website` as your platform type.

![callback](https://github.com/Felistas/NodeJs-Passport-Authentication/blob/master/dashboard-platform.png)

Next, create a `.env` file and add the following:

```
FACEBOOK_CLIENT_ID=XXXXXXX
FACEBOOK_CLIENT_SECRET=XXXXXXX
FACEBOOK_CALLBACK_URL=http://localhost:3000/auth/facebook/callback

```
Ensure to obtain the keys from the app console. 



## Testing
In your browser, paste the following URL `http://localhost:3000/auth/facebook` and you should see the resulting screen below prompting you to enter your Facebook credential details. 
![Facebook](https://github.com/Felistas/NodeJs-Passport-Authentication/blob/master/facebook-login.png)

Upon successful validation of your credentials, you will be redirected to a success screen as shown below:

![Success](https://github.com/Felistas/NodeJs-Passport-Authentication/blob/master/success.png)

To understand the process flow, a number of steps need to be followed:
1. Our app (i.e the client) through Passport, creates a link to our authorization server i.e Facebook's authorization server. The link is simillar to https://www.facebook.com/login.php?skip_api_login=1&api_key=604879570044749&kid_directed_site=0&app_id=604879570044749&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fv3.2%2Fdialog%2Foauth%3Fresponse_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3000%252Fauth%252Ffacebook%252Fcallback%26client_id%3D604879570044237824749%26ret%3Dlogin%26fbapp_pres%3D0%26logger_id%3D9cdcc3d6-80fc-432c-aa6f-ede4b45eee43&cancel_url=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Ffacebook%2Fcallback%3Ferror%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied%23_%3D_&display=page&locale=en_GB which is displayed on the browser. This is the facebook authentication screen as you have seen from above.

2. The end user then enters their Facebook credentials.
3. The authorization server authenticates the user and sends the user back to the client with an authorization code. 
4. The client then exchanges the authorization code with the authorization server in order to get an access token.
5. The client then requests for resources from the resource server using this access token. The resources here include the email and the name as specified in the `profileFields` in our controller file. 

Once we obtain this, we can now use our user model to save data in the database configured as shown above. 

## Conclusion
In this tutorial, we learned how to authenticate users using Facebook in a Node Js application. For the full working project, you can have a look at it [here](https://github.com/Felistas/NodeJs-Passport-Authentication/tree/complete-social-authentication). The process should also be similar and straight forward for other platforms like Google, Github and Twitter. I would love to hear from you! You can reach me on [Twitter](https://twitter.com/WaceeraN),  [LinkedIn](https://www.linkedin.com/in/felistas-ngumi-b6063192/LinkedIn) or drop me an [email](felistaswaceera@gmail.com). Happy hacking!
