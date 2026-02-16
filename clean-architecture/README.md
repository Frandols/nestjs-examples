# 🧱 NestJS Clean Architecture Example

## NestJS Clean Architecture -- Orders & Products API

## 📖 Resumen del Proyecto

Este proyecto es una API REST desarrollada con **NestJS** siguiendo los
principios de **Clean Architecture (Arquitectura Limpia)**.

El objetivo es demostrar:

- Separación clara entre capas (Domain, Application, Infrastructure,
  Presentation)
- Inversión de dependencias
- Independencia del framework
- Uso de casos de uso explícitos
- Persistencia desacoplada con repositorios
- Generación de IDs desacoplada mediante un `IdGenerator`
- Documentación automática con Swagger

La aplicación gestiona:

- Productos
- Órdenes
- Ítems de órdenes
- Control de stock
- Estados de orden

---

# 🏗️ Arquitectura

El proyecto está organizado en capas:

    src/
     ├── domain/           → Entidades y contratos de repositorio
     ├── application/      → Casos de uso
     ├── infrastructure/   → Implementaciones (TypeORM, UUID, etc.)
     ├── presentation/     → Controllers y DTOs
     └── main.ts

### Principios aplicados

- El dominio no depende de NestJS
- Application no conoce infraestructura
- Infrastructure implementa contratos del dominio
- Presentation solo orquesta HTTP

---

# 🧠 Entidades de Dominio

## 🟢 Product

- `id: string`
- `name: string`
- `price: number`
- `stock: number`
- `active: boolean`

### Reglas importantes:

- No se puede vender producto inactivo
- No se puede reducir stock por debajo de 0

---

## 🔵 Order

- `id: string`
- `items: OrderItem[]`
- `status: CREATED | CONFIRMED | CANCELLED`

### Reglas importantes:

- No se puede confirmar una orden sin items
- No se puede modificar una orden confirmada o cancelada

---

## 🟣 OrderItem

- `id: string`
- `product`
- `quantity`

---

# ⚙️ Casos de Uso

## 🟢 Productos

### 1️⃣ CreateProductUseCase

Crea un nuevo producto.

### 2️⃣ UpdateStockUseCase

Actualiza el stock disponible.

### 3️⃣ DeactivateProductUseCase

Desactiva un producto.

---

## 🔵 Órdenes

### 4️⃣ CreateOrderUseCase

Crea una nueva orden.

### 5️⃣ AddItemToOrderUseCase

Agrega un producto a una orden existente.

### 6️⃣ ConfirmOrderUseCase

Confirma la orden y descuenta stock.

### 7️⃣ CancelOrderUseCase

Cancela una orden pendiente.

---

# 🌐 Endpoints

Swagger disponible en:

http://localhost:{PORT}/api

---

# 🟢 Products

## POST /products

```json
{
  "name": "Laptop",
  "price": 1500,
  "stock": 10
}
```

## PATCH /products/:id/stock

```json
{
  "quantity": 5,
  "type": "INCREASE" | "DECREASE"
}
```

## PATCH /products/:id/deactivate

---

# 🔵 Orders

## POST /orders

## POST /orders/:id/items

```json
{
  "productId": "uuid",
  "quantity": 1
}
```

## PATCH /orders/:id/confirm

## PATCH /orders/:id/cancel

---

# 🔐 Variables de Entorno

Ejemplo:

    PORT=<PORT>
    DB_HOST=<HOST>
    DB_PORT=<PORT>
    DB_USERNAME=<USERNAME>
    DB_PASSWORD=<PASSWORD>
    DB_NAME=<DB_NAME>
    DB_SYNCHRONIZE=<true|false>
    DB_LOGGING=<true|false>

Se incluye un `.env.example` en el repositorio.

---

# 🚀 Guía de Ejecución en Local

## 1️⃣ Clonar el repositorio

    git clone <repo-url>
    cd clean-architecture

## 2️⃣ Instalar dependencias

    npm install

## 3️⃣ Crear base de datos

    CREATE DATABASE <DB_NAME>;

## 4️⃣ Ejecutar proyecto

    npm run start:dev

## 5️⃣ Acceder a Swagger

http://localhost:{PORT}/api

---

# 📦 Tecnologías Utilizadas

- NestJS
- TypeORM
- PostgreSQL
- Swagger
- UUID
- Clean Architecture
