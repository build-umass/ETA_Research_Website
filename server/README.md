# Server Setup
Run yarn install

Install docker

## MongoDB

Create volume. You should only need to run this once.
```
docker volume create eta-mongo
```

Create MongoDB container. You should only need to run this once.
```
docker run --name mongodb -d -p 27017:27017 -v eta-mongo mongodb/mongodb-community-server
```
The MongoDB container should already be running. If it shuts down later, run
```
docker start mongodb
```

Stop MongoDB container
```
docker stop mongodb
```

View logs
```
docker logs mongodb
or 
docker logs mongodb -f
```

# Running the Server
Run yarn dev
