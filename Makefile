install:
	npm install
start:
	npx babel-node -- src/bin/gendiff.js __fixtures__/before.json __fixtures__/after.json
	npx babel-node -- src/bin/gendiff.js __fixtures__/before.yml __fixtures__/after.yml
	npx babel-node -- src/bin/gendiff.js __fixtures__/before.ini __fixtures__/after.ini
publish:
	rm -rf dist
	npm publish --dry-run
	npm link
lint:
	npx eslint .
test:
	npx jest
test-coverage:
	npm test -- --coverage
watch:
	npx jest --watch