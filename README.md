Red Hat Mobile Parse Server
===========================

This application serves as an example of how you can run Parse Server on Red
Hat Mobile.

## Prerquisites

* MongoDB running locally on the default port (27017).
* Node.js v4.4.3

## Usage

First clone this repo to your machine. Then inside the cloned folder run.

```
npm install
```

Once the install completes run:

```
npm start
```

Congratulations, you have a ParseServer running locally. Navigate to
http://localhost:8001/app/?url=http://localhost:8001 on your machine to try it
out.

This exact code can also be deployed on Red Hat Mobile Application Platform too.
