import express from 'express'
import 'dotenv/config'

console.log('The Node Environment is set to: ', process.env.NODE_ENV)

if (process.env.NODE_ENV === 'production') {
    console.log('Production mode enabled 😎')
}

if (process.env.NODE_ENV !== 'production') {
    console.log('We are not in production mode 👨‍💻')
}

const app = express() 

app.get('/', (req, res) => {
    res.send(`<!doctype html><html><body>Hello Express!</body></html>`)
})

app.listen(8001, ()=>console.log('listening 8000'))


// push on github deploy on render - new web service

// npm ci --omit=dev --build-from-source - build command
// npm start - run command


// add Dockerfile, .dockerignore for docker 

// create docker image -->
// push to docker hub
// render - web service --> existing image. through docker hub get link and put in existing image

// are github and docker having same db