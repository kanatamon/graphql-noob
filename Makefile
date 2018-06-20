image:
	docker build -t kanatamon/node:10.3-alpine . 

start:
	docker run --rm -it \
	-v "$(PWD)/storage:/usr/app" \
	-p 3000:3000  \
	--name graphql-noob-app \
	kanatamon/node:10.3-alpine \
	sh

sh:
	docker exec -it graphql-noob-app sh