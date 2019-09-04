source ~/.bash_profile

docker network create grademypaper_network || true

cd ~/docker-compose
docker-compose up -d

cd ~
$(aws ecr get-login --region eu-west-2 --no-include-email)

# PULL BACKEND IMAGE
docker stop grademypaper-backend || true
docker rm grademypaper-backend || true
docker image rm 647399693225.dkr.ecr.eu-west-2.amazonaws.com/grademypaper-backend:latest || true
docker pull 647399693225.dkr.ecr.eu-west-2.amazonaws.com/grademypaper-backend:latest
docker run --env-file .env-backend --network grademypaper_network -d -p 4000:4000 --name grademypaper-backend 647399693225.dkr.ecr.eu-west-2.amazonaws.com/grademypaper-backend:latest

# PULL FRONTEND IMAGE
docker stop grademypaper-frontend || true
docker rm grademypaper-frontend || true
docker image rm 647399693225.dkr.ecr.eu-west-2.amazonaws.com/grademypaper-frontend:latest || true
docker pull 647399693225.dkr.ecr.eu-west-2.amazonaws.com/grademypaper-frontend:latest
docker run -d -p 3000:3000 --name grademypaper-frontend 647399693225.dkr.ecr.eu-west-2.amazonaws.com/grademypaper-frontend:latest