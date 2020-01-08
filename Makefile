start:
	npx babel-node src/bin/gendiff.js
publish:
	rm -rf dist
	npm publish --dry-run
	npm link
lint:
	npx eslint .