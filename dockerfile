FROM node:18-alpine
WORKDIR /app
COPY . /app
RUN npm cache clean --force && \
    npm install --legacy-peer-deps
CMD ["npm", "start"]
