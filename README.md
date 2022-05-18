# ecommerce-app

Example application for an e-commerce website

## Dev Env (Linux/Mac)

### Kubernetes Ingress

- Install ingress-nginx with Helm
- Add '127.0.0.1 ticketing.dev' to /etc/hosts
- Check for something other than Docker running on port 80
  - `sudo lsof -i tcp:80`
  