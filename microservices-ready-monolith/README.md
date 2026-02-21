# 🧱 Modular Monolith → Microservices Ready (NestJS)

Arquitectura base para construir un **monolito modular limpio**, con capacidad de **evolucionar a microservicios** sin reescritura masiva.

Construido sobre **NestJS**, siguiendo principios de:

- Data-centric
- Event-Driven
- Infraestructura intercambiable (In-Memory / Redis / Kafka / etc.)

---

# 🎯 Objetivo

Permitir:

- 🚀 Desarrollo rápido como monolito
- 🔁 Event bus intercambiable
- 📦 Split progresivo a microservicios
- ☁️ Preparado para serverless o contenedores

---

# 🏗 Filosofía Arquitectónica

Este proyecto implementa un:

> **Monolito Modular con Kernel de Eventos clean-architected y desacoplado**

Cada módulo es:

- Autónomo
- Aislado

No existen dependencias ocultas.

---

# 🧠 Principios Clave

## 1️⃣ El Kernel define contratos

El kernel contiene:

- Eventos base
- EventBus abstracto
- EventRouter abstracto
- EventService que recibe el EventRouter
- Implementaciones de EventBus comúnes (InMemory, Redis, Kafka, etc.)

---

## 2️⃣ Infraestructura intercambiable

El EventBus puede tener múltiples implementaciones:

- InMemoryEventBus
- RedisEventBus
- KafkaEventBus
- NestJS ClientProxy Adapter

---

Internamente decide qué implementación usar.

---

# 🧩 Cómo migrar a microservicios

Supongamos que querés separar `payments`.

Pasos:

1. Creas una nueva topologia
2. Configuras la topologia
3. Creas un archivo de entrada para cada app de la topologia
4. Cada app usa la configuracion que la configuracion de la topologia expone
5. Agregas las apps a nest-cli.json para poder ejecutarlas
6. Ejecutas las apps de la topologia, asi de facil

El resto del sistema no necesita reescritura.

---

# 🛠 Stack

- NestJS
- TypeScript
- PostgreSQL
- Redis (opcional)
