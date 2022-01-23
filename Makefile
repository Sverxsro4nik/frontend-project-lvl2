install:
	npm ci
gendiff:
	node bin/gendiff.js

run:
	node bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .
test:
	npx jest

push: test lint
	git push origin main