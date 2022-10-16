FROM node:16.15.1-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./ 
RUN npm install -g npm@8.19.2 --location=global
RUN npm install typescript
RUN npm install --omit=dev
COPY ./ ./
CMD ["npm", "run", "start:prod"]
# CMD ["npm", "run", "start:prod"]