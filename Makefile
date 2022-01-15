install:
	npm ci
push:
	git push origin main

gendiff:
	node bin/gendiff.js