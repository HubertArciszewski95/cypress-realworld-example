# ![RealWorld Example App](logo.png)
This is exemplary project of E2E tests written in Cypress, using Page Object pattern. Application under test is a Medium.com colne (called [Conduit](https://demo.realworld.io/#/)) 

Frontend and backend was done by [TonyMckes](https://github.com/TonyMckes/conduit-realworld-example-app).

## **Test strategy**
Visual documentation of the application most important areas ([Conduit mind map](https://miro.com/app/board/uXjVPyTICs0=/?share_link_id=723710348292)).

![Condiut mind map](conduit-mind-map.png)

### Capability test charters
Before writing any E2E tests, I documented the various capabilities of the application that I plan to cover with tests.
- [Authentication](test-charters\authentication.md)
- [Settings]
- [Article]

## **Set up development env**
## Prerequisites

- Make sure your have a Node.js (v14 or newer) installed.
- Make sure you have your database setup (postgreSQL).

## Installation

Install all the npm dependencies with the following command:

```bash
npm install
```

## Configuration

In the [`backend`](backend/) directory, duplicate and remane the`.env.example` file, name it `.env`, and modify it to set all the required private development environment variables.

> Optionally you can run the following command to populate your database with some dummy data:

> ```bash
> npx -w backend sequelize-cli db:seed:all
> ```

### Starting the development server

Start the development environment with the following command:

```bash
npm run dev
```

- The frontend website should be available at [http://localhost:3000/](http://localhost:3000).

- The backend API should be available at [http://localhost:3001/api](http://localhost:3001/api).

### Testing (TODO)

To run the tests, run the following command:

```bash
npm test
```