FROM node:16.15.1-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./ 
RUN npm install typescript
RUN npm install --production 
COPY ./ ./
CMD ["npm", "run", "start:prod"]
# CMD ["npm", "run", "start:prod"]