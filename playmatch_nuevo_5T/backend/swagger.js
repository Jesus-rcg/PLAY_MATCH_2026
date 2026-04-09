import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';

const endPointsFiles = ['./index.js'];

const doc = {
    info: {
       title: 'API de Play Match',
       description: 'Sistema de Gestion de Torneos'
    },
    host: 'localhost:3000',
    schemes: ['http']
}

swaggerAutogen()(outputFile, endPointsFiles, doc);