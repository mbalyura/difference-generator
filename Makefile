start:
	npx babel-node -- src/bin/gendiff.js __fixtures__/before.json __fixtures__/after.json
	npx babel-node -- src/bin/gendiff.js __fixtures__/before.yml __fixtures__/after.yml
publish:
	rm -rf dist
	npm publish --dry-run
	npm link
lint:
	npx eslint .
test:
	npx jest
watch:
	npx jest --watch