## Simple Real Chat App

This is an example of a simple real chat app made with the Firebase Real-Time DB and React as a frontend framework.

We are going to use Firebase as is a suite of tools used frequently for building client apps,reporting analytics and hosting services.We are going to be mainly interested in the realtime database that it provides a is a NoSQL db capable to update in real time.We are also going to use the authentication service to let users the option to sign in with their email and password or with other ways such as with their Facebook,Twitter or Google account.
In Firebase we'll create a project and after it finishes creating it we'll register firebase to an web app giving it a name and register it.Then we'll have to copy the Firebase SDK to enable the Firebase service.
For the authentication part we'll enable the authentication option from the Authentication tab in the Firebase dashboard and we'll select the email/password(later on we'll implement another authentication using Google or Github).

# Setting the structure of our web app

For this particular web app we'll be using React and NodeJS.
We'll use the `create-react-app` module to create the structure of a functional React app.
Command: `npx create-react-app simple-chat`
This command we'll create the basic structure and install all the necessary dependencies in our package.json file.
We'll also need some addtional packages like Firebase for our authentication system and React-router-dom because our web app we'll be using multiple pages(views).
Command: `yarn add react-router-dom firebase`

To start the application we'll use: `yarn start`.
This starts a development server and opens a default React page in your default browser.The page will open in: `localhost:3000`.

For our web app will have the following structure in our src directory:
- /components: contains reusable widgets used in different pages
- /helpers: contains some reusable functions
- /pages: will contain the application views
- /services: third-party services that we’re using ~ Firebase
- App.js: the root component

We'll start adding the firebase service creating an firebase.js file in our services directory import firebase and then adding the firebase configuration,initializing firebase and then exporting the authentication and database modules.
Then we'll import the dependencies in our App.js file. We'll import React and other modules necessary especially for the page-flow(routing) of our web application and then importing the pages of our application that we'll later implement.

# Application routing

We'll have to create some high-order components in order to mantain the public and private routes separate.
This component will wrap a <Route>,pass props from the router to the <Route>, render the component depending on the authenticated state and redirect the user to another route if he doesn't pass the conditions.
The PrivateRoute component will receive three props,the first being the component to render, the authenticated state and the rest of th e parameters passed to the router. It will check if the authenticated state is true and render the component or else will redirect the user to the login view.
The PublicRoute component is similar to the other one,it will render the component if the authentication is set to false or else will redirect it to the chat view.
Then will set the logic routing to our app.We'll use our previously defined methods to set the routing of our app,creating private route components for our chat view and public route components for our signup and signin views,the home view will also be public.

Then we'll have to write the logic to see if a user is authenticated or not.At first we'll set the initial state of our application and then we'll use the componentDidMount hook to keep checking if the user is authenticated or not.We'll also use the getDerivedStateFromError to register any error that can occur.
Firebase provides a method: onAuthStateChanged that keeps records of the authentication state.If the user exists we'll register authenticated as true.

To register the users will provide a series of methods that will be located in our helpers directory.We will,at first, have two methods: signup and signin,the first one will create a new user using its email and password and the second one will log in an existing user with the email and password.
Next thing we need to do is creating the Sign up page adding a simple form with two fields: email and password.
To handle the change or submit of the form we need set the initial state of the component and bind the methods to the components scope.
For the handleChange method used for the modifications on the forms fields we use computed properties to pair up state variables to their values.

