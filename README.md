# Electro Store — Site boutique

Front Next.js de la boutique **Electro Store** (catalogue, panier, compte client, contact).

## Stack

- Next.js 15 (App Router)
- React, TypeScript, Tailwind / SCSS
- Axios → API `opportune-backend`

## Prérequis

- Node.js **22** (`nvm use 22`)
- API backend démarrée (défaut : `http://127.0.0.1:3000/api`)

## Installation

```bash
npm install --legacy-peer-deps
cp .env.example .env
npm run dev -- -p 3001
```

Ouvrir : http://localhost:3001

## Variables d’environnement

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | URL de l’API (ex. `http://127.0.0.1:3000/api`) |
| `NEXT_PUBLIC_SITE_URL` | URL publique du site (SEO / sitemap) |

## Fonctionnalités

- Accueil, boutique, fiches produit, services, contact
- Panier, checkout, compte client, favoris
- Formulaire contact → enregistrement en base (`POST /contact`)
- SEO : metadata, sitemap, robots, JSON-LD (magasin + produit)
- Headers de sécurité (CSP, X-Frame-Options, etc.)

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Dev (utiliser le port **3001** pour éviter le conflit avec l’API) |
| `npm run build` | Build production |
| `npm start` | Serveur production |

## Structure utile

```
src/app/           # Pages (App Router)
src/components/    # UI boutique
src/services/      # Appels API
src/context/       # Auth, panier, favoris, toast
```
