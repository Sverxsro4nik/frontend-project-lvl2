install: install-deps
				npx simple-git-hooks

install-deps:
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
	npm test
	
test-coverage:
	npm test -- --coverage --coverageProvider=v8

push-branch:test lint
	git push origin stylish
	
push: test lint
	git push origin main