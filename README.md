# Sift Proxy
Lightweight Elasticsearch Proxy App in Node.js

- Creates a public proxy endpoint for Elasticsearch without exposing Auth credentials.
- Passes `GET`, `POST` and `OPTIONS` requests/http methods, rejects all others (eg `PUT`, `Delete`).
- [See it in action on Heroku](https://fccpublicsearch.herokuapp.com/)
- Used by [Sift | FNS Search](https://github.com/rveitch/sift)

## Config Variables
If you plan on hosting the proxy on Heroku (or similar) it is recommended you define these config variables in your host dashboard or via console/toolbelt:
- `ELASTIC_URL` - Elasticsearch Cluster URL. Defaults to `http://localhost:9200`.
- `ELASTIC_USER` (Optional: Basic Auth User)
- `ELASTIC_PASS` (Optional: Basic Auth Password)

## Setup
- `$ git clone git@github.com:rveitch/sift-proxy.git`
- `$ npm install`
- `$ npm start`
- Visit http://localhost:3000 in your browser and/or send API requests to the endpoint.
