# Usa uma imagem do Node.js
FROM node:14

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência e instala as dependências
COPY package*.json ./
RUN npm install

# Copia os arquivos da aplicação
COPY . .

# Expõe a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
