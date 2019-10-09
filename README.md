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

To confirm everything is working as expected, open your preferred REST Client (Insomnia is my preference), make a request to the following endpoint `http://localhost:3000/users` and cofirm the response is as below:


![Home](https://github.com/Felistas/NodeJs-Passport-Authentication/blob/master/Screen%20Shot%202019-10-09%20at%2017.28.04.png)



