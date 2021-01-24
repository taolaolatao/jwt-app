FROM node:15-alpine

ENV path /www/sites

WORKDIR ${path}
# RUN chmod 755 ${path}

COPY package*.json ./

RUN npm install --production

COPY . ${path}

# EXPOSE 5000/tcp
EXPOSE 3000

CMD [ "npm", "start" ]
