start-bob: 
	cd client && yarn run start-bob

start-cat: 
	cd client && yarn run start-cat

start-client:
	make -j 2 start-bob start-cat

start-server: 
	cd server && yarn run start

deploy: 
	cd client && yarn install && yarn build 
	mv -a client/build/. server/build