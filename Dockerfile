FROM node:16.15.1-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./ 
RUN npm install typescript
RUN npm install --production 
COPY ./ ./
RUN npm run start:dev
# CMD ["npm", "run", "start:prod"]