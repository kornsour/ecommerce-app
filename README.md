# ecommerce-app

Example application for an e-commerce website

## Dev Env (Linux/Mac)

### Skaffold

- Start with `skaffold dev`

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

## Services

### Auth

- `npm install express-validator`
  - Helpful validation for user signup
- `npm install express-async-errors`
  - Makes sure that if we throw an error inside an async function, express will listen for it
  