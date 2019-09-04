# Commercial App QuickStarter

## A starter kit for commercial web apps, built on Node.

---

##### This starter kit is useful if your product / service:

- Requires users to log in and out
- Requires a backend to power your app
- Requires user payment to unlock features

---

## Frameworks / Technologies used

#### Frontend

- React
- Apollo Client

#### Backend

- Prisma
- Apollo Server

#### Third party services

- **[Auth0](https://auth0.com/)** for user authentication
- **[Stripe](https://stripe.com/)** for payments

---

## Getting Started

- `cd` into the `scripts` directory, create a copy of `config.example.yml` and name it `config.yml`
- Populate the `appName` field (alphanumeric only)

### Setup Auth0 account

- If you do not have one already, create an [Auth0](https://auth0.com/) account (the free tier will be sufficient for most small apps)
- Create a new `tenant` (you can access this feature from your profile menu).
- In the `Applications` section, create a new `Machine to Machine` application named `Management`
- Grant your app access to the `Auth0 Management API` with the following permissions:
  - `create:clients`
  - `read:clients`
  - `update:clients`
  - `read:client_keys`
- In the `config.yml` file, populate the following fields (you can find these values in your newly created `Management` app, under `settings`):
  - `auth0.domain`
  - `auth0.management_client_secret`
  - `auth0.management_client_id`

### Setup Stripe account

- If you do not have one already, create a [Stripe](https://stripe.com/) account
- Go to the `Developers` tab, and click `API keys`
- In the `config.yml` file, populate the following fields:
  - `stripe.publishable_key`
  - `stripe.api_secret`
- Add desired products or services

### Setup ngrok

### Deploy settings

- Make sure you are in the `scripts` directory
- Run `npm i`
- Run `npm run deploy`

### Set up Prisma

- Install [Docker](https://docs.docker.com/v17.09/engine/installation/#supported-platforms)
- `cd` into the `backend` directory
- Run `npm i`
- Run `npm run generate:prisma`
- Run `npm run start:prisma`
- Run `npm run deploy:prisma`
- and finally, `npm start`

### Start React

- `cd` into the `frontend` directory
- Run `npm i`
- Run `npm start`

#### TODO

- Use yarn workspaces

TODOs

- Refactor scripts
- Implement ESLint
- Implement Husky
- Refactor auth function in server.js
- Refactor script to add ngrok tunnel url to auth0 and stripe
- Rename env file on server from .env-backend to .env
- Generalize app data in starter
- Figure out how to deploy prisma schema to remote
- Accommodoate for the different responses back from stripe (cancelled)
- Allow auth0 to skip consent
- Include dynamic endpoints in appspec.yml
