FROM node:22-alpine

RUN npm i -g pnpm
# Create app directory

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY prisma/schema.prisma ./prisma/
RUN pnpx prisma generate

# copy everything from current directory to docker build
COPY . . 

EXPOSE 5000

CMD ["pnpm" , "start"]

