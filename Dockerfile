FROM node:16.15.1-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./ 
RUN yarn global add typescript
RUN yarn install --production 
COPY ./ ./
RUN yarn run start:prod
# CMD ["yarn", "run", "start:prod"]