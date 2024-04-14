.DEFAULT_GOAL := run

run:
	@docker compose up -d --build

stop:
	@docker compose down -v