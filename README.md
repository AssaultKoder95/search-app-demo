# Searchimo

A simple SERN stack app demo - allows users to search through different listings.

The answers are present in the `Questions.md` file itself => can be accessed [here](QUESTIONS.md)

## Project Overview + Setup
We are using Node(v12.18.3) and Npm(v6.14.11) for our project.

In order to run the project, we need to perform the following steps:

1. In the root folder, do `npm install`. 
2. In order to start the backend server, do `npm start`
3. Now, move to client folder, do `npm install`.
4. In order to start the frontend app, do `npm start`.

**Things to note:**  
The frontend application runs on port 3000 & the backend application on port 5600 on localhost. The setup already caters to the integration of backend with frontend. It should work out of box for you.

These steps should enable you to start your server successfully.

## Frontend Overview
The frontend is powered by React, uses hooks for state management.

The folder structure is standard & all components have separate folders with style files.

To reduce the calls to server, debouncing is also implemented with time duration of 500ms.

![Frontend screenshot](https://ik.imagekit.io/lemonbouy/Screenshot_2021-01-31_at_11.28.31_PM_gSbIiVZ-0.png)

## Backend Overview
The backend is powered used NodeJS with the help of the express server.
Currently there is only 1 API endpoint described below:

### Locations API Endpoint

The paginated API enables the user to search the locations & provides latitude & longitude values along name as o/p.

The following are the request query params that can be sent with API

| Params |  Type  |            Descripation            |
| ------ | :----: | :--------------------------------: |
| q      | string |      used to pass search term      |
| skip   | number | used to skip N records from output |
| limit  | number |  used to limit records to count N  |


```bash
curl --location --request GET '<BASE API ENDPOINT>/locations?q=<SEARCH TERM>'
```

The Following are the valid API responses:

| Response              | Status Code |                           Return Value                           |
| --------------------- | :---------: | :--------------------------------------------------------------: |
| Success               |     200     | includes attributes such as count, data, skip & limit in payload |
| Internal Server Error |     500     |                      includes error message                      |

![Backend screenshot](https://ik.imagekit.io/lemonbouy/Screenshot_2021-01-31_at_11.30.42_PM_hxRrelE2N.png)
### Testing

Right now we only support UI testing of the frontend. To run the tests for frontend, go to the `client` folder & run the command `npm run cypress-test`

![Testing screenshot](https://ik.imagekit.io/lemonbouy/Screen_Recording_2021-01-31_at_11.31.12_PM_0SBfcqT0N.gif)
### Future Work 

1. Implement test cases for backend
2. Implement functional test cases for frontend
3. Check test coverage for both frontend & backend 
4. Improve UI & UX - add animations

Another sample app which can be useful for analysis is https://github.com/AssaultKoder95/portfolio-tracker

**PS: Sqlite, Express, React, Node => SERN stack**