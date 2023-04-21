# Server Setup
Run yarn install

Install docker

## MongoDB

Start MongoDB container
```
docker run --name mongodb -d -p 27017:27017 -v $(pwd)/data:/data/db mongodb/mongodb-community-server
```

Stop MongoDB container
```
docker stop mongodb
docker rm mongodb
```

View logs
```
docker logs mongodb
or 
docker logs mongodb -f
```

# Running the Server
Run yarn dev
