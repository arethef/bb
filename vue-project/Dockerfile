FROM node:16 as build-stage
WORKDIR /app
COPY package.json ./
RUN npm i
COPY . .
EXPOSE 5173
CMD [ "npm", "run", "dev" ]
# RUN npm run build

# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/nginx/default.conf /etc/nginx/default.conf
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]