FROM node:22-alpine

WORKDIR /app
RUN npm install -g serve
COPY . .
RUN npm install
RUN npx update-browserslist-db@latest
RUN npm run build

ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT
RUN echo "Server will run on port $PORT"

CMD ["sh", "-c", "serve --no-clipboard -s build/ -p $PORT"]
