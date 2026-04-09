const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Playmatch',
      version: '1.0.0',
      description: 'Documentación de la API para el sistema de torneos Playmatch',
    },
    servers: [
      {
        url: 'http://localhost:3000', // La URL de tu servidor local
      },
    ],
  },
  // Rutas donde Swagger buscará los comentarios para documentar
  apis: ['./routes/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};