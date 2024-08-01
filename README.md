# Template Astro: starter kit 🫰

```text
pnpm install
```

## TECNOLOGIAS
  - [x] pnpm - instalador de paquetes
  - [x] NodeJS - Server JS
  - [x] Astro - Frontend
  - [x] Typescript - Lenguaje
  - [x] VueJs - Componentes

  - [ ] Drizzle ORM - Base de datos

  - [x] Tailwind - Framework CSS
  - [x] Shadcn - Componentes Tailwind

  - [x] Standard 

### AUTENTIFICACION
  - [x]  lucia auth
    - [x]  GitHub
    - [ ]  Cognito

### Instalacion Shadcn-vue

npx shadcn-vue@latest init

## Fonts & Icons

Fuentes instaladas: 

  - inter
  - montserrat
  - nunito
  - red-hat-display

  Se obtienen de la pag. [Fontsource](https://fontsource.org/ )

Íconos:
  - Lucide - Set de iconos [text](https://lucide.dev/)


# Comandos

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

# Estructura del Proyecto

```text
/
├── .vscode/
│   └── extensions.json
│   └── launch.json
│   └── settings.json
├── public/
│   └── images/
│       └── imagen.png
│   └── favico.ico
├── src/
│   └── components/
│   └── db/
│   └── layouts/
│   └── lib/
│   └── pages/
│       └── index.astro
│   └── styles/
└── .env-example
└── astro.config.mjs
└── components.json
└── package.json
└── tailwind.config.mjs
└── tsconfig.json
```
# CONFIGURACIONES BÁSICAS [astro.config.mjs]
## CAMBIAR PUERTO POR DEFECTO
En el archivo astro.config.mjs agregar la siguiente 
```
export default defineConfig({
  ...
  server: {
    port: 3003
  }
})
```
## CAMBIAR PUERTO POR DEFECTO
En el archivo astro.config.mjs agregar la siguiente 
```
export default defineConfig({
  ...
  server: {
    open: '/login'
  }
})
```

# DBASE
## GENERACION SCRIPT DBASE
```
  pnpm drizzle-kit generate
```  

## PUBLICACION DBASE
```
  pnpm drizzle-kit push
```