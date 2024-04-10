FROM node:alpine
WORKDIR /app
COPY . /app
RUN npm install -g @angular/cli
RUN npm install --force
CMD ["ng", "serve", "--host", "0.0.0.0"]
