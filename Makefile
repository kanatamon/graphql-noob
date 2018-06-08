start:
	docker run --rm -it \
	-v "$(PWD)/storage:/usr/app" \
	-p 3000:3000  \
	--name graphql-noob-app \
	node:10.3-alpine \
	sh -c "cd /usr/app && sh"

sh:
	docker exec -it graphql-noob-app sh -c "cd /usr/app && sh"