install: install-deps
				npx simple-git-hooks

install-deps:
	npm ci

gendiff:
	node bin/gendiff.js

stylish-json: 
	node bin/gendiff.js  __fixtures__/file1.json __fixtures__/file2.json

stylish-yaml: 
	node bin/gendiff.js  __fixtures__/filepath1.yml __fixtures__/filepath2.yml

plain-json:
	node bin/gendiff.js --format plain  __fixtures__/file1.json __fixtures__/file2.json

plain-yaml:
	node bin/gendiff.js --format plain  __fixtures__/filepath1.yml __fixtures__/filepath2.yml

json:
	node bin/gendiff.js --format json  __fixtures__/file1.json __fixtures__/file2.json

json-yaml:
	node bin/gendiff.js --format json  __fixtures__/filepath1.yml __fixtures__/filepath2.yml

run:
	node bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint . --fix

test:
	npm test
	
test-coverage:
	npm test -- --coverage --coverageProvider=v8

push-branch: lint
	git push origin stylish
	
push: test lint
	git push origin main