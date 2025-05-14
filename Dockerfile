# Node 18 imajını kullan
FROM node:18

# Uygulama çalışma dizini
WORKDIR /src

# package.json ve lock dosyasını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Kod ve Prisma dosyalarını kopyala
COPY . .
COPY prisma ./prisma

# Prisma Client'ı oluştur
RUN npx prisma generate

# Migration'ları uygula (TABLOLARI OLUŞTURUR)
RUN npx prisma migrate deploy

# Portu aç
EXPOSE 3000

# Uygulamayı başlat
CMD ["npm", "run", "dev"]
