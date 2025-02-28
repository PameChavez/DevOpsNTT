# Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

#RUN npm ci --only=production
RUN npm install --production

COPY . .

ENV NODE_ENV=production
ENV PORT=3000
ENV JWT_SECRET=your_jwt_secret

EXPOSE 3000

CMD ["node", "src/server.js"]