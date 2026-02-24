# 🧱 NestJS Microservices-Ready Monolith Example

## NestJS Data-Centric Event-Driven -- Gym Management API

## 📖 Resumen del Proyecto

Este proyecto es una API REST desarrollada con **NestJS** siguiendo los
principios de un **Monolito Modular Event-Driven con Kernel de Eventos**.

El objetivo es demostrar:

- Desarrollo rápido como monolito
- Event bus intercambiable (InMemory / Redis / Kafka)
- Split progresivo a microservicios sin reescritura
- Comunicación entre módulos vía eventos tipados
- Contratos de eventos centralizados
- Topologías de despliegue configurables
- Documentación automática con Swagger

La aplicación gestiona:

- Miembros de un gimnasio
- Planes de membresía
- Membresías (asignación miembro ↔ plan)
- Pagos
- Notificaciones automáticas (vía eventos)
- Control de acceso

---

# 🏗️ Arquitectura

El proyecto está organizado en módulos autónomos con un kernel de eventos compartido:

    src/
     ├── modules/
     │    ├── members/          → Gestión de miembros
     │    ├── plans/            → Planes de membresía
     │    ├── memberships/      → Asignación miembro-plan
     │    ├── payments/         → Procesamiento de pagos
     │    ├── notifications/    → Notificaciones automáticas
     │    └── access-control/   → Registro de accesos
     ├── shared/
     │    └── events/
     │         ├── domain/      → EventBus (contrato) y EventContracts
     │         ├── application/ → EventRouter
     │         └── infrastructure/ → InMemoryEventBus, RedisEventBus
     ├── topologies/
     │    ├── monolith/         → Todo en un proceso (InMemory)
     │    └── split-notifications/ → Notifications separado (Redis)
     ├── config.ts
     └── bootstrap.ts

### Principios aplicados

- Cada módulo es autónomo y aislado
- No existen dependencias directas entre módulos
- La comunicación inter-módulo es exclusivamente vía EventRouter
- Los contratos de eventos están tipados centralmente
- La infraestructura del bus es intercambiable por topología
- La configuración de entorno se valida con Zod al iniciar

---

# 🧠 Entidades de Dominio

## 🟢 Member

- `id: string` (UUID)
- `firstName: string`
- `lastName: string`
- `email: string` (unique)
- `active: boolean`
- `createdAt: Date`
- `updatedAt: Date`

---

## 🔵 Plan

- `id: string` (UUID)
- `name: string`
- `durationDays: number`
- `price: number` (decimal)
- `description?: string`
- `active: boolean`

---

## 🟣 Membership

- `id: string` (UUID)
- `memberId: string` (UUID)
- `planId: string` (UUID)
- `startDate: Date`
- `endDate: Date` (calculada automáticamente)
- `active: boolean`
- `createdAt: Date`
- `updatedAt: Date`

### Reglas importantes:

- La fecha de fin se calcula como `startDate + plan.durationDays`
- Al crearse, emite evento `MEMBERSHIP_CREATED`

---

## 🟡 Payment

- `id: string` (UUID)
- `membershipId: string` (UUID)
- `memberId: string` (UUID)
- `amount: number` (decimal)
- `completed: boolean`
- `createdAt: Date`
- `updatedAt: Date`

### Reglas importantes:

- Valida que la membresía exista antes de registrar el pago
- Al completarse, emite evento `PAYMENT_COMPLETED`

---

## 🟠 Notification

- `id: string` (UUID)
- `memberId: string`
- `type: NotificationType` (`membership_assigned` | `payment_completed`)
- `message: string`
- `sent: boolean`
- `createdAt: Date`

### Reglas importantes:

- Se genera automáticamente al escuchar eventos `MEMBERSHIP_CREATED` y `PAYMENT_COMPLETED`
- No tiene controller propio (solo reacciona a eventos)

---

## 🔴 AccessLog

- `id: string` (UUID)
- `memberId: string`
- `membershipId: string`
- `granted: boolean`
- `createdAt: Date`

---

# ⚙️ Flujo de Eventos

## 📤 Eventos Emitidos (fire-and-forget)

### 1️⃣ MEMBERSHIP_CREATED

Emitido al crear una membresía. Payload: `{ planName, durationDays, memberId }`

**Escuchado por:** Notifications → crea notificación de tipo `membership_assigned`

### 2️⃣ PAYMENT_COMPLETED

Emitido al completar un pago. Payload: `{ membershipId, amount, memberId }`

**Escuchado por:** Notifications → crea notificación de tipo `payment_completed`

---

## 📥 Eventos Request/Response (sincrónico vía bus)

### 3️⃣ GET_MEMBER_EXISTS_BY_ID

Verifica si un miembro existe. Usado por Memberships.

### 4️⃣ GET_PLAN_BY_ID

Obtiene nombre y duración de un plan. Usado por Memberships.

### 5️⃣ GET_MEMBERSHIP_BY_ID

Obtiene el `memberId` de una membresía. Usado por Payments.

### 6️⃣ GET_MEMBER_PAYMENTS

Obtiene los pagos de un miembro. Usado por Members.

### 7️⃣ GET_MEMBER_MEMBERSHIPS

Obtiene las membresías de un miembro. Usado por Members.

---

# 🌐 Endpoints

Swagger disponible en:

http://localhost:{PORT}/api

---

# 🟢 Members

## POST /members

```json
{
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan@example.com"
}
```

## GET /members

## GET /members/:id

## GET /members/:id/payments

Obtiene los pagos del miembro (vía evento `GET_MEMBER_PAYMENTS`).

## GET /members/:id/memberships

Obtiene las membresías del miembro (vía evento `GET_MEMBER_MEMBERSHIPS`).

## PATCH /members/:id

```json
{
  "firstName": "Nuevo Nombre",
  "lastName": "Nuevo Apellido",
  "active": false
}
```

---

# 🔵 Plans

## POST /plans

```json
{
  "name": "Plan Mensual",
  "durationDays": 30,
  "price": 5000,
  "description": "Acceso completo por 30 días"
}
```

## GET /plans

## GET /plans/:id

## PATCH /plans/:id

```json
{
  "name": "Plan Actualizado",
  "price": 6000
}
```

## DELETE /plans/:id

Desactiva el plan (soft delete).

---

# 🟣 Memberships

## POST /memberships

```json
{
  "memberId": "uuid",
  "planId": "uuid",
  "startDate": "2026-03-01"
}
```

Valida que el miembro y el plan existan (vía eventos). Calcula `endDate` automáticamente.

---

# 🟡 Payments

## POST /payments

```json
{
  "membershipId": "uuid",
  "amount": 5000
}
```

Valida que la membresía exista (vía evento). Emite `PAYMENT_COMPLETED` al completarse.

---

# 🔴 Access Control

## POST /access-control

```json
{
  "memberId": "uuid",
  "membershipId": "uuid",
  "granted": true
}
```

---

# 🧩 Topologías

## Monolith (por defecto)

Todos los módulos corren en un único proceso. El `EventBus` es `InMemoryEventBus`.

```bash
npm run start.monolith
```

## Split Notifications

Notifications se separa como un servicio independiente. La comunicación entre el monolito y notifications usa `RedisEventBus`, mientras que los eventos internos del monolito siguen usando `InMemoryEventBus`.

### Cómo migrar un módulo a microservicio:

1. Crear una nueva topología en `src/topologies/`
2. Configurar qué eventos usan Redis y cuáles InMemory
3. Crear un archivo de entrada para cada app de la topología
4. Agregar las apps a `nest-cli.json`
5. Ejecutar cada app por separado

El resto del sistema **no necesita reescritura**.

---

# 🔐 Variables de Entorno

Validadas con **Zod** al iniciar la aplicación:

    PORT=<PORT>                   # default: 3000
    DB_HOST=<HOST>
    DB_PORT=<PORT>                # default: 5432
    DB_USERNAME=<USERNAME>
    DB_PASSWORD=<PASSWORD>
    DB_NAME=<DB_NAME>
    DB_SYNCHRONIZE=<true|false>   # default: false
    DB_LOGGING=<true|false>       # default: false
    REDIS_URL=<URL>               # requerido (URL válida)

Se incluye un `.env.example` en el repositorio.

---

# 🚀 Guía de Ejecución en Local

## 1️⃣ Clonar el repositorio

    git clone <repo-url>
    cd microservices-ready-monolith

## 2️⃣ Instalar dependencias

    npm install

## 3️⃣ Crear base de datos

    CREATE DATABASE <DB_NAME>;

## 4️⃣ Configurar variables de entorno

    cp .env.example .env
    # Editar .env con tus valores

## 5️⃣ Ejecutar proyecto

    npm run start:monolith

## 6️⃣ Acceder a Swagger

http://localhost:{PORT}/api

---

# 📦 Tecnologías Utilizadas

- NestJS
- TypeORM
- PostgreSQL
- Redis (ioredis)
- Swagger
- Zod (validación de entorno)
- class-validator / class-transformer
- @nestjs/event-emitter
