/**
 * Provas.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    numero: 'integer',

    distancia: {
      type: 'integer',
      enum: [25, 50, 100, 200, 400, 800, 1500]
    },

    estilo: {
      type: 'string',
      enum: ['borboleta', 'costas', 'peito', 'livre', 'medley']
    },

    categoria: 'string',

    sexo: {
      type: 'string',
      enum: ['masculino', 'feminino']
    },

    atletas: {

      collection: 'inscricoes',
      via: 'numProva'

    }

  }
};

