artifact_name       := ch-node-utils
version             := "unversioned"

.PHONY: clean
clean:
	rm -f ./$(artifact_name)-*.zip
	rm -rf ./build-*
	rm -rf ./lib
	rm -f ./build.log

.PHONY: build
build:
	GIT_SSH_COMMAND="ssh" npm i
	#npm run lint
	npm run build

.PHONY: lint
lint:
	#npm run lint

.PHONY: dependency-check
dependency-check:
	npm audit

.PHONY: test-unit
test-unit:
	npm run coverage

.PHONY: test
test: test-unit

.PHONY: sonar
sonar:
#	npm run analyse-code

.PHONY: package
package: build
ifndef version
	$(error No version given. Aborting)
endif
	$(info Packaging version: $(version))
	$(eval tmpdir := $(shell mktemp -d build-XXXXXXXXXX))
	cp -r ./lib/* $(tmpdir)
	cp -r ./templates/ $(tmpdir)/templates/
	cp -r ./package.json $(tmpdir)
	cp -r ./package-lock.json $(tmpdir)
	cd $(tmpdir) && GIT_SSH_COMMAND="ssh" npm i --production
	rm $(tmpdir)/package.json $(tmpdir)/package-lock.json
	cd $(tmpdir) && zip -r ../$(artifact_name)-$(version).zip .
	rm -rf $(tmpdir)

.PHONY: dist
dist: lint test clean package
