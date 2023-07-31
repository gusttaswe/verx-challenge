import { config } from 'dotenv'
config()

export type API = {
  auth: string
}

export type DATABASE = {
  auth: string
}

export type EnvVariables = {
  API: API
  DATABASE: DATABASE
}

export default () => ({
  API: {
    auth: process.env.API_AUTH
  },
  DATABASE: {
    host: process.env.POSTGRES_HOST || 'postgres',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || 'admin',
    password: process.env.POSTGRES_PASSWORD || 'admin',
    database: process.env.POSTGRES_DB || 'verx-project'
  }
})
