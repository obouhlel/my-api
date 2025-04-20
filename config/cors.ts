import { defineConfig } from '@adonisjs/cors'

/**
 * Configuration options to tweak the CORS policy. The following
 * options are documented on the official documentation website.
 *
 * https://docs.adonisjs.com/guides/security/cors
 */

const allowedOrigin = ['127.0.0.1']

const corsConfig = defineConfig({
  enabled: true,
  origin: (origin) => {
    if (!origin) return false
    return allowedOrigin.includes(origin)
  },
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  headers: true,
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
})

export default corsConfig
