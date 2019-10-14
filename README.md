# FaceBook Social Authentication in Node/Express Js with Passport
## Introduction
Almost all applications today, require users to create accounts in their websites in order to use certain services. This repititive process of setting up new profiles and creating new passwords for every application is not only time consuming but also frustrating, and over time, account management becomes hard since one has to remember their credential details  in every application. 

Thanks to OAuth, we can use popular social media applications such as Google, Facebook and Twitter to authenticate users. This process is faster and familiar to the users hence a high chance of most of them agreeing to use your services. So why not integrate it into your application? In this tutorial I will take you through on how to integrate FaceBook into your Node Js application.

 #explain more about OAuth

## Prerequisites
1. [Node](https://nodejs.org/en/)
2. [Facebook Developer account](https://developers.facebook.com/)
3. [Mongo Db](https://docs.mongodb.com/manual/installation/)

## Getting Started
Follow the instructions below in your prefered terminal in order to setup your development environment:
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

In order to understand how our project is setup, we will go through the individual folder structures which follow the MVC (Model View Controller) pattern. Just a recap of the MVC pattern, the model defines the schema of the data in the database and how it will be stored. Controllers hold the business logic of the application while view holds all our routes.

Inside the `app` folder, we have ` user` and `utils` folders which are responsible for the user resource and database configuration respecively. The `index.js` file, which is the entry point of our app, is responsible for express setup. In this project, I will use ES6 then use Babel to compile the code. I have also configured nodemon to listen to any changes made to the app then reload the server.

## OAuth 2
[OAuth 2](https://oauth.net/2/) is an authorization framework that allows third party applications to obtain limited access to HTTP services, either on behalf of the resource owner without having them provide their login cedentials to the third party app or by allowing these third party applications to obtain access on thier on behalfs. Case in example here would be the application we are building acting as the third party application, facebook being our HTTP service and the end user as the resource owner. These three fall under the following OAuth roles:

1. Resource Owner/ End user - this is the user authorizing a third party application to access certain protected resources from a resource server. 
2. Client - This is the third party application making protected resource requests to a resource server on behalf of the resource owner
3. Resource Server -  Hosts the protected resources e.g user profile
4. Authorization Server - Responsible for authenticating the resource owner and providing access token to clients 

In order for a successful user authentication to happen, a series of steps need to be followed:

1. The client,(which is our application in this case),requests authorization from the end user. 
2. Once the end user authorizes the client, an application grant is issued.
3. Our client then requests an access token from the authorization server using the authorization grant. 
4. The authorization server validates the grant and authenticates the client. If the two processes are successful an access token is granted to the client. 
5. Our client then uses the access token to request the protected resource
6. The resources server then validates the access token and if successful, the requested protected resources is shared with the client. 

Note: OAuth2 has different types of grant types. To learn more about OAuth2, you can have a look [here](https://tools.ietf.org/html/rfc6749)
