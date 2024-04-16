.DEFAULT_GOAL := run

run:
	@docker compose up -d --build

stop:
	@docker compose down -v

main:
	@docker compose -f docker-compose.main-service.yml up -d --build

main-stop:
	@docker compose -f docker-compose.main-service.yml down -v
