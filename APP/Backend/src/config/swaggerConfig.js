import swaggerJSDoc from "swagger-jsdoc"

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de ejemplo',
    version: '1.0.0',
    description: 'Documentación de la API con Swagger',
  },
  servers: [
    {
      url: 'http://localhost:8000', 
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', 
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  explorer: true,
}

const options = {
  swaggerDefinition,
  apis: ['./src/routes/**/*.js']
}

const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec