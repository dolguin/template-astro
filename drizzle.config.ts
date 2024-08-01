// import { defineConfig } from 'drizzle-kit'
import dotenv from 'dotenv'
import type { Config } from 'drizzle-kit'
import { CouldNotTransformImage } from 'node_modules/astro/dist/core/errors/errors-data'

dotenv.config({
  path: '.env'
})

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  console.log('ERROR DE CONFIGURACIÓN')
  throw new Error('DATABASE_URL no está configurado!')
}

export default {
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL
  }
} satisfies Config
