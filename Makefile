# Ensure the netlify CLI picks up Node 22 (from nvm) rather than the
# system Node 18, which breaks netlify-cli v24 with a getRandomValues error.
NVM_NODE_BIN := $(HOME)/.nvm/versions/node/v22.22.2/bin
export PATH := $(NVM_NODE_BIN):$(PATH)

.PHONY: dev deploy help

help:
	@echo "make dev     — run netlify dev (local server at http://localhost:8888)"
	@echo "make deploy  — netlify deploy --prod (publish to psidagger.com)"

dev:
	netlify dev

deploy:
	netlify deploy --prod
