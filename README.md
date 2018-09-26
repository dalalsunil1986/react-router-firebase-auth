# React + React Router + Firebase Auth

---

This project is a boilerplate that uses [Firebase Auth](https://firebase.google.com/docs/auth/) to protect routes in a ReactJs application.

The App was Generated using [CRA](https://github.com/facebook/create-react-app) and contains a Login/Register screen that leads you to a protected user route once authenticated.

[Antd](https://ant.design/) is used to style the layout.

[Jsonplaceholder](https://jsonplaceholder.typicode.com/) is used to provide dummy data for us to consume.

It also leverages .env and .env.local to make sure your Firebase config info stay safe.

## How to Run the app locally

### Step 0 - Install a local server with dummy data to consume

1. Make sure to follow the [Jsonplaceholder](https://jsonplaceholder.typicode.com/) to install your local server to mess around with or make sure to change the `apiEndpoint` at the top of the `src/helpers/api.js` file to hit another api.

### Step 1 - Setup Firebase project and enable auth

1. Create a project in your [Firebase console](https://console.firebase.google.com/)
2. In your project, go to `authentication -> sign-in-method`, enable `email/password` provider.
3. Go to `project settings -> service accounts` to retrieve your Firebase config info, you'll need them for step 3 and 5

### Step 2 - Clone this project

```
$ git clone https://
```

### Step 3 - Insert Firebase config values

1. Copy the `.env` file

```
$ cd react-router-firebase-auth
$ cp .env .env.local
```

2. Open .env.local and fill in the config info retrieved in step 1, `.env.local` is never pushed to your Github repo (Keeping your config safe) but is needed to run the app locally. `.env` will hook into your server environment variables and fetch these variables to be able to build/start your app remotely.

3. When you're ready to deploy, see step 5.

### Step 4 - Running locally

```
$ yarn install
$ yarn start
```

### Step 5 - Host and Deploy the app to Firebase (Optional)

```
$ firebase init
```

1. Select `Hosting`
2. Select the project you've created in the Firebase console on Step 1
3. Choose `build` as your public directory
4. Answer Y to configure as a single-page app
5. You're set with Firebase
6. You can deploy with the info below

```
$ yarn build
$ firebase deploy
```

You could also decide to use Travis-CI to deploy to Firebase using the `.travis.yml` file available in this repo.
You'll need to:

1. Add your cloned repo in the Travis-CI environment
2. In Travis-CI (or your remote server), make sure to add an environment variable `$FIREBASE_TOKEN` and set it to be the token generated in your Firebase console.
3. Open the `.env` file and make sure to create the corresponding environment variables using the same naming convention in Travis-CI (or your remote server) to get your app to build successfully.
4. Make sure to fetch the data from `project settings` in your Firebase console.

### Questions

- Do I have to host this project on firebase?
  - Nope, you can host this app anywhere and decide to only use the Auth logic from firebase to protect your routes.
- No tests??
  - Not yet but working on it!
- What if I want to hit a different server for dummy data?
  - No Problem at all, skip step 0 and make sure to change the `apiEndpoint` at the top of the `src/helpers/api.js` file
