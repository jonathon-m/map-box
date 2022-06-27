# Getting Started with Create React App and Redux

This project provides an express server with a single endpoint at the base URL, and a react app interface with it. 
The react app uses Mapbox to display a full page map, and provides some controls to generate random points on the map. 

## Available Scripts

Inside both `react` and `server`, run `npm i` and then `npm start`.
The React app will be served at `http://localhost:3000`, and the express server at `http://localhost:3001`

## What's missing?

Given I only spent a couple hours on this project, I've forgone some of the trimmings that I'd usually include in a project like this. 

1. Typescript - extremely useful for maintainablility, but properly building types takes time. 
2. Automated testing - cypress is a great tool for end to end testing, and for node projects I've mostly used jest
3. ES lint - automatic style linting & fixing
4. There are still some left over files from generating the initial project with create-react-app
5. I would have liked to allow area selection using some kind of drawing tool, but I'm using the current in-frame map