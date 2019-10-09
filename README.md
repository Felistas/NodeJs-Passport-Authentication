# FaceBook Social Authentication in Node/Express Js with Passport
## Introduction
Almost all applications today, require users to create accounts in their websites in order to use certain services. This repititive process of setting up new profiles and creating new passwords for every application is not only time consuming but also frustrating, and over time, account management becomes hard since one has to remember their credential details  in every application. 

Thanks to OAuth, we can use popular social media applications such as Google, Facebook and Twitter to authenticate users. This process is faster and familiar to the users hence a high chance of most of them agreeing to use your services. So why not integrate it into your application? In this tutorial I will take you through on how to integrate FaceBook into your Node Js application.

 #explain more about OAuth

## Prerequisites
1. Node Version 10.16.0 or higher
2. Facebook Developer account
3. Mongo Db

## Getting Started
Follow the instructions below in your prefered terminal in order to setup your development environment:

1. mkdir demo
2. cd demo
3. Clone this repo `git clone https://github.com/Felistas/NodeJs-Passport-Authentication.git`
4. cd NodeJs-Passport-Authentication
5. Run `npm install` to install all the dependancies required to run the project
6. Run `npm start` to start the API.

To confirm everything is working as expected, open your preferred REST Client (Insomnia is my preference), make a request to the following endpoint `http://localhost:3000/users` and cofirm the response is as below:

