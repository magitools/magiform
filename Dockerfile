FROM node:lts

COPY . .
RUN npm install
RUN npx prisma generate
RUN npm run build
CMD ["npm", "start"]
