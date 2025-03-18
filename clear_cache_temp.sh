#!/bin/bash

#stop all docekr
docker compose down --volumes
# Stop all running containers
docker stop $(docker ps -aq)

# Remove all containers
docker rm $(docker ps -aq)
docker rm $(docker ps -aq)

echo "All caches and Docker storage have been cleared."