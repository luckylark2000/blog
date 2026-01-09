.PHONY: dev build preview gen-menu gen-root-menu generate-sidebar gen-content update-menu help
%:
	@:

help:
	@echo "Available commands:"
	@echo "  make dev              - Start development server"
	@echo "  make build            - Build for production"
	@echo "  make preview          - Preview production build"
	@echo "  make gen-menu         - Generate .menu.json for a category (usage: make gen-menu CATEGORY=folder_name)"
	@echo "  make gen-root-menu    - Generate root menu"
	@echo "  make generate-sidebar - Update sidebar in config.mts"
	@echo "  make gen-content      - Update docs/content.md file"
	@echo "  make update-menu      - Full menu update workflow (generate-sidebar + gen-content)"

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

gen-menu:
	node build/generateMenuForCategory.js $(filter-out $@,$(MAKECMDGOALS))

gen-root-menu:
	npm run gen-root-menu

generate-sidebar:
	npm run generate:sidebar

gen-content:
	npm run gen-content

update-menu: generate-sidebar gen-content
	@echo "Menu update completed!"
