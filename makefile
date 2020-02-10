start-bob: 
	cd client && yarn run start-bob

start-cat: 
	cd client && yarn run start-cat

client:
	make -j 2 start-bob start-cat

server: 
	node server.js