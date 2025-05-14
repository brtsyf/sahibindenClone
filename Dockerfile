# Base image olarak resmi Node imajı kullanılır
FROM node:18

# Konteynerin içinde çalışılacak klasör
WORKDIR /src

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama dosyalarını kopyala
COPY . .

# Uygulama hangi portu dinliyorsa onu belirt
EXPOSE 3000

# Uygulamayı başlat
CMD ["npm", "run","dev"]
