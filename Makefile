start:
	npx babel-node -- src/bin/gendiff.js __test__/before.json __test__/after.json
publish:
	rm -rf dist
	npm publish --dry-run
	npm link
lint:
	npx eslint .