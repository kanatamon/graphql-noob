## **Start Development**

1. Start container then shell into it
```
make start
```

2. Install dependencies
```
npm install
```



## **Development Process Using Docker As Environment**
### Bootstrap project from scratch

1. Start docker container of **node:10.3-alpine** then run shell by calling **sh**
```
docker run --rm -it -v "$PWD":/usr/app node:10.3-alpine- sh
```

2. Now we should be placed in **sh** mode of the container, we can start initializing project using **npm**
```
npm init -y && npm install --save graphql express express-graphql
```



## **References**
- [4 เทคนิคง่ายๆ เพื่อจัดการ Dev Environment แบบเนี๊ยบๆ ทันใจวัยทีน](https://medium.com/@phoomparin/4-%E0%B9%80%E0%B8%97%E0%B8%84%E0%B8%99%E0%B8%B4%E0%B8%84%E0%B8%87%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B9%86-%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%88%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%B2%E0%B8%A3-dev-environment-%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B9%80%E0%B8%99%E0%B8%B5%E0%B9%8A%E0%B8%A2%E0%B8%9A%E0%B9%86-%E0%B8%97%E0%B8%B1%E0%B8%99%E0%B9%83%E0%B8%88%E0%B8%A7%E0%B8%B1%E0%B8%A2%E0%B8%97%E0%B8%B5%E0%B8%99-%EF%B8%8F-bf06f5a58a6e)
- [Learn Docker](https://www.youtube.com/watch?v=RyxXe5mbzlU&list=PLbG4OyfwIxjEe5Y3hQCiQjYnSgRH051iJ)



## **Issues**
- Using **GitBash** but no **make**'s utility installed on **Windows** then [How to add more to Git Bash on Windows](https://gist.github.com/evanwill/0207876c3243bbb6863e65ec5dc3f058)
- Add a slash to fix [Error response from daemon: Mount denied.](https://github.com/dduportal-dockerfiles/docker-compose/issues/1)

- Restart docker to fix [Error starting userland proxy: mkdir /port/tcp:0.0.0.0:3000:tcp:172.17.0.2:3000: input/output error](https://github.com/docker/for-win/issues/573)

- Use the ```npx nodemon -L index.js``` to fix [Application isn't restarting](https://github.com/remy/nodemon#application-isnt-restarting) due to some problem in networked environments (container running nodemon reading across a mounted drive)

- Add ```testEnvironment: 'node'``` to Jest's configuration to fix [Cross origin null forbidden: Axios tries to make an xhr request in a Node environment, instead of an http request](https://github.com/axios/axios/issues/1418). It's issue due to Jest default environment is a browser-like but this app is builded in Node environment