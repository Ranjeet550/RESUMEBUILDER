.PHONY: help build up down logs clean rebuild restart ps shell-server shell-client shell-mongo

help:
	@echo "Resume Builder Docker Commands"
	@echo "=============================="
	@echo "make build          - Build all Docker images"
	@echo "make up             - Start all services"
	@echo "make down           - Stop all services"
	@echo "make restart        - Restart all services"
	@echo "make logs           - View logs from all services"
	@echo "make ps             - Show running containers"
	@echo "make clean          - Stop and remove all containers and volumes"
	@echo "make rebuild        - Rebuild all images without cache"
	@echo "make shell-server   - Access server container shell"
	@echo "make shell-client   - Access client container shell"
	@echo "make shell-mongo    - Access MongoDB shell"

build:
	docker-compose build

up:
	docker-compose up -d
	@echo "Services started. Access the app at http://localhost:3000"

down:
	docker-compose down

restart:
	docker-compose restart

logs:
	docker-compose logs -f

ps:
	docker-compose ps

clean:
	docker-compose down -v
	@echo "All containers and volumes removed"

rebuild:
	docker-compose build --no-cache

shell-server:
	docker-compose exec server sh

shell-client:
	docker-compose exec client sh

shell-mongo:
	docker-compose exec mongodb mongosh -u admin -p

# Development commands
dev-build:
	docker-compose build --no-cache

dev-up:
	docker-compose up

dev-logs-server:
	docker-compose logs -f server

dev-logs-client:
	docker-compose logs -f client

dev-logs-mongo:
	docker-compose logs -f mongodb
