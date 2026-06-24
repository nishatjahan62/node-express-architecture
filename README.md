# 🚀 Node Server Architecture

This repository contains my practice work while learning **Node.js** and backend architecture patterns with **TypeScript**.

---

## 📁 Project Structure

```
src/
├── config/
│   └── config.ts               # App configuration (env vars, constants)
├── controller/
│   ├── products.controller.ts  # Product request handlers
│   └── users.controller.ts     # User request handlers
├── database/
│   └── db.json                 # Local mock database
├── routes/
│   └── routes.ts               # Route definitions
├── service/
│   ├── products.service.ts     # Product business logic
│   └── users.service.ts        # User business logic
├── types/
│   ├── products.types.ts       # Product type definitions
│   └── users.types.ts          # User type definitions
├── utility/
│   ├── parsedBody.ts           # Request body parser utility
│   └── sendResponse.ts         # Unified response helper
└── server.ts                   # Entry point
coreConcept/
├── CommonJs/                   # require() / module.exports practice
├── ESM/                        # import / export practice
└── IIFE/                       # Immediately Invoked Function Expressions
```

---

## 📚 Learning Areas

### Core Concepts
- **CommonJS** → `require()` and `module.exports`
- **ESM** → `import` and `export`
- **IIFE** → Immediately Invoked Function Expressions

### Backend Architecture
- **MVC Pattern** → Controllers, Services, Routes separation
- **TypeScript** → Typed models, controllers, and services
- **Raw Node.js HTTP** → Routing and request handling without any framework
- **Utility Helpers** → Reusable response sender and body parser
- **Config Management** → Centralized env/config setup

---

## 🛠️ Tech Stack

- Node.js
- TypeScript
- JSON (mock DB)

---

## 🎯 Goal

Build a strong foundation in backend development using **pure Node.js** — no frameworks — implementing clean architecture patterns across controllers, services, routes, types, and utilities through hands-on practice.