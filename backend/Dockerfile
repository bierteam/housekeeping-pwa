# --- Release with Alpine ----
FROM node:alpine
ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
USER node
CMD ["node", "server.js"]
