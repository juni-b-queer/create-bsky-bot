.PHONY: *

dev:
	docker compose up jetstream -d && bun run run

build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f

install:
	bun install