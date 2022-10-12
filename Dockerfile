FROM node:16.15.1-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./ 
RUN npm install typescript -g
RUN npm install --production 
RUN npm run build
COPY ./ ./
RUN yarn run start:prod
# CMD ["yarn", "run", "start:prod"]