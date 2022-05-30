# Client Service

## Dependencies

- `npm install react react-dom next`
- `npm install axios`
  - Handles ajax requests to backend service

## Pages

- The `pages` folder contains files that export React components
- NextJS routing is done through files inside the `pages`directory
  - Different from using the React router
- When we start the client, NextJS will interpret the file names as distinct routes that we can visit inside the application

## Development

- We added a custom `dev` script to package.json
- Start the client with `npm run dev`
  - NOTE: This does not run the client inside Kubernetes
