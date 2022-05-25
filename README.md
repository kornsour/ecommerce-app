# ecommerce-app

Example application for an e-commerce website

## Dev Env (Linux/Mac)

### Skaffold

- Start with `skaffold dev`

### Kubernetes Troubleshooting

- `kubectl get pods`
- `kubctl describe pod my-pod-name`

### Kubernetes Ingress

- Install ingress-nginx with [Helm](https://kubernetes.github.io/ingress-nginx/deploy/#quick-start)
- Add `127.0.0.1 ticketing.dev` to /etc/hosts
- Check for something other than Docker running on port 80
  - `sudo lsof -i tcp:80`

### Kubernetes Cleanup

- Stop skaffold with `<kbd>Ctrl</kbd> C`
- Stop kubernetes ingress nginx with `helm uninstall ingress-nginx -n ingress-nginx`

### ExpressJS

- [Error Handling](https://expressjs.com/en/guide/error-handling.html_)

### Test

`npm run test`

- NOTE: May not see yout test changes with TypeScript from time to time
  - Simply stop (Ctrl C) and restart jest if this happens

## Services

### Auth

- `npm install express-validator`
  - Helpful validation for user signup
- `npm install express-async-errors`
  - Makes sure that if we throw an error inside an async function, express will listen for it
- `npm install mongoose @types/mongoose`
  - Interacting with mongoDB instance
- `npm install cookie-session @types/cookie-session`
  - Doesn't rely on backend data store
- `npm install jsonwebtoken @types/jsonwebtoken`
  - Generating and verifying jwts
- `npm install --save-dev @types/jest @types/supertest jest ts-jest supertest mongodb-memory-server`
  - Testing dependencies
  - Copy of MongoDB in memory so that we can easily test multiple DBs at same time
  
### Secrets

- Example for creating secret 'asdf'
  - `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf`
  - `kubectl get secrets`
