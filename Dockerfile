FROM node:lts

COPY . .
RUN npm install --ignore-scripts
RUN npx prisma generate
RUN npm run build
CMD ["npm", "start"]
