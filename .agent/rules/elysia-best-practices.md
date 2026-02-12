---
trigger: glob
globs: backend/**
---

# Elysia — Bonnes pratiques

Référence : [ElysiaJS Best Practice](https://elysiajs.com/essential/best-practice.html)

## Structure des dossiers

Privilégier une structure par feature :

```
src/modules/<feature>/
  index.ts   → controller Elysia (routes, validation HTTP)
  service.ts → logique métier découplée
  model.ts   → schémas de validation (Elysia t) et types
```

## Controller

- **À faire** : une instance Elysia = un controller. Définir les routes directement sur l’instance.
- **À éviter** : passer tout le `Context` à une classe/fonction externe (perte de typage).
- Extraire uniquement ce dont le handler a besoin et le passer au service.

```typescript
// ✅ OK
new Elysia().get('/', ({ stuff }) => featureService.doStuff(stuff))

// ❌ À éviter
abstract class Controller { static root(context: Context) { ... } }
```

## Service

- Logique métier sans dépendance directe à la requête HTTP : **fonctions pures** exportées via un **objet nommé** (pas de classe à membres uniquement statiques).
- Ce qui dépend de la requête (session, cookie, etc.) : macro Elysia ou plugin nommé, pas une classe qui reçoit `Context`.

```typescript
// ✅ OK — objet de fonctions
async function create(userId: string, body: CreateBody) { ... }
async function getById(id: string, userId: string) { ... }
export const orderService = { create, getById, ... }

// ❌ À éviter — classe avec uniquement des static
export class OrderService { static async create(...) { ... } }
```

## Model

- Utiliser le système de validation Elysia (`t.Object`, etc.) comme unique source de vérité.
- Dériver les types avec `typeof schema.static` ; ne pas dupliquer en `interface` ou classe.

```typescript
// ✅ OK
const signInBody = t.Object({ username: t.String(), password: t.String() })
type SignInBody = typeof signInBody.static

// ❌ À éviter : interface ou classe séparée pour le même contrat
```