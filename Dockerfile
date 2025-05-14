# Node image
FROM node:18

WORKDIR /src

# Bağımlılıkları yükle
COPY package*.json ./
RUN npm install

# Kodları kopyala
COPY . .
COPY prisma ./prisma

# Prisma client'ı oluştur
RUN npx prisma generate

# Uygulamanın portu
EXPOSE 3000

# Production başlatma: migrate + dev çalıştırma
CMD npx prisma migrate deploy && npm run dev
