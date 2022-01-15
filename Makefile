install:
	npm ci
push:
	git push origin main

gendiff:
	node bin/gendiff.js

run:
	node bin/gendiff.js
publish:
	npm publish --dry-run