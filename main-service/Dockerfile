FROM node:18

RUN apt-get update && apt-get install -y build-essential gcc libpq-dev make 

WORKDIR /backend
COPY . .
RUN npm install
CMD npm run start

EXPOSE 5000
