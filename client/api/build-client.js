// Recieves incoming request with headers
// Logic to build an instance of axios that works on current env
// Preconfigured version of axios that just works

import axios from 'axios';

// destructure req property off incoming argument
export default ({ req }) => {
    if (typeof window === 'undefined') {
        // we are on the server
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    } else {
        // we must be on the browser
        return axios.create({
           baseUrl: '/' 
        });
    }
};