# 🛒 Mini E-commerce – Fullstack Challenge

Mini sistema de compras online.

O projeto contém:

- Backend em Spring Boot
- Frontend em Angular 21
- Banco PostgreSQL via Docker
- Integração com API externa de produtos
- Carrinho em memória utilizando SignalStore

---

# Como Executar o Projeto

O projeto está dividido em duas pastas:

ecommerce-challenge/
 ├── backend/
 └── frontend/

---

# 🔹 Backend

## 1️⃣ Pré-requisitos

- Java 21
- Maven 3.9+
- Docker e Docker Compose

---

## 2️⃣ Subir o banco de dados

Entre na pasta:

cd backend

Suba o PostgreSQL:

docker compose up -d

Isso irá criar:

- Banco: Ecommerce
- Usuário: ecommerce_user
- Senha: ecommerce_pass
- Porta: 5432

---

## 3️⃣ Executar a aplicação

Ainda dentro da pasta `backend`:

mvn clean install  
mvn spring-boot:run  

ou  

./mvnw clean install
./mvnw spring-boot:run

A API ficará disponível em:

http://localhost:8080

Endpoints principais:

GET    /products  
POST   /orders  
GET    /orders/{id}

---

# 🔹 Frontend

## 1️⃣ Pré-requisitos

- Node 20+
- Angular CLI 21

---

## 2️⃣ Instalar dependências

Entre na pasta:

cd frontend/ecommerce-frontend  

Instale:

npm install  

---

## 3️⃣ Executar aplicação

npm start  

O frontend ficará disponível em:

http://localhost:4200

---

# 🧱 Tecnologias Utilizadas

## Backend

- Java 21
- Spring Boot 4
- Spring Data JPA
- WebClient (integração API externa)
- PostgreSQL 16
- Docker
- Maven
- Hibernate

## Frontend

- Angular 21 (Standalone API)
- Angular Signals
- NgRx SignalStore
- PrimeNG 21
- Reactive Forms
- TypeScript

---

# 🏗 Principais Decisões Técnicas

## 🔹 Organização em Camadas (Backend)

O backend foi estruturado seguindo separação clara de responsabilidades:

- controller → exposição REST
- service → regras de negócio
- repository → acesso a dados
- client → integração com API externa
- config → configurações globais (CORS, etc.)
- domain/dto → objetos de entrada e saída

Essa abordagem facilita manutenção, testes e escalabilidade.

---

## 🔹 Integração com API Externa

Foi utilizado WebClient para consumo da API pública de produtos.

Os dados externos são normalizados antes de serem retornados pela API interna, evitando acoplamento direto com o formato externo.

---

## 🔹 Banco de Dados

- PostgreSQL executado via Docker
- Relacionamento 1:N entre orders e order_items
- Uso de chaves estrangeiras com integridade referencial
- Criação automática de tabelas via Hibernate (ddl-auto: update)

---

## 🔹 Gerenciamento de Estado no Frontend

Foi utilizado NgRx SignalStore, baseado em Angular Signals, para:

- Controle do carrinho em memória
- Estado reativo
- Cálculo automático de totais

Essa abordagem evita uso manual de BehaviorSubject e promove código mais declarativo e previsível.

---

## 🔹 Carrinho em Memória

O carrinho é mantido em memória utilizando SignalStore.  
A persistência após refresh não foi implementada.

---

#  Diferenciais Implementados

- Docker Compose para banco de dados
- Separação clara de camadas no backend
- Uso de Angular 21 com Signals
- Estado reativo moderno com SignalStore
- CORS configurado corretamente

---

# Melhorias Futuras

- Autenticação via JWT
- Persistência de carrinho (localStorage ou backend)
- Controle transacional de estoque
- Testes unitários e de integração
- Logs estruturados
- Pipeline CI/CD
- Tratamento global de exceções mais detalhado
- Paginação de produtos
- Melhor refinamento visual

---

# Observações Finais

O objetivo principal foi entregar uma solução clara, organizada e funcional, priorizando boas práticas, separação de responsabilidades e decisões arquiteturais sólidas.
