// src/server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));

// Middleware para validar API Key
const validateApiKey = (req, res, next) => {
  const apiKey = req.header('X-Parse-REST-API-Key');
  
  if (!apiKey || apiKey !== '2f5ae96c-b558-4c7b-a590-a501ae1c3f6c') {
    return res.status(401).send('ERROR');
  }
  
  next();
};

// Endpoint DevOps
app.post('/DevOps', validateApiKey, (req, res) => {
  try {
    const { message, to, from, timeToLifeSec } = req.body;
    
    // Validar campos requeridos
    if (!message || !to || !from || !timeToLifeSec) {
      return res.status(400).send('ERROR');
    }
    
    // Generar JWT único por transacción
    const token = jwt.sign(
      { message, to, from, timestamp: new Date().toISOString() },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: `${timeToLifeSec}s` }
    );
    
    // Incluir JWT en la respuesta
    res.setHeader('X-JWT-KWY', token);
    
    // Devolver respuesta
    return res.status(200).json({
      message: `Hello ${to} your message will be sent`
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).send('ERROR');
  }
});

// Para cualquier otro método HTTP
app.all('/DevOps', (req, res) => {
  res.status(405).send('ERROR');
});

// Para cualquier otra ruta
app.use('*', (req, res) => {
  res.status(404).send('ERROR');
});

// Iniciar servidor
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;