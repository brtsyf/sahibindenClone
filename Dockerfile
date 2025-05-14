# Base image olarak Node 18 kullan
FROM node:18

# Konteyner içinde çalışma dizini
WORKDIR /src

# Sadece bağımlılık dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Tüm dosyaları kopyala
COPY . .

# Portu dışa aç (uygulamanın dinlediği port)
EXPOSE 3000

# Uygulamayı başlat
CMD ["npm", "run", "dev"]
