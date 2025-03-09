#!/bin/bash

#stop all docekr
docker compose down --volumes
# Stop all running containers
docker stop $(docker ps -aq)

# Remove all containers
docker rm $(docker ps -aq)

# Remove all images
docker rmi $(docker images -q)

# Remove all volumes
docker volume rm $(docker volume ls -q)

# Prune all unused Docker objects (containers, images, volumes, and networks)
docker system prune -a --volumes -f

echo "All caches and Docker storage have been cleared."