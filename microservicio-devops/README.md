# Microservicio DevOps

Este proyecto implementa un microservicio REST con un endpoint `/DevOps` que procesa solicitudes según los requisitos especificados.

## Características

- Endpoint `/DevOps` que acepta solicitudes POST
- Autenticación mediante API Key
- Generación de JWT único por transacción
- Pipeline CI/CD automatizado
- Pruebas automatizadas
- Containerización con Docker
- Balanceo de carga con NGINX
- Escalabilidad dinámica con Kubernetes

# Tecnologias que se usaron 
Node.js con Express para el microservicio
Jest para las pruebas
Docker para containerización
GitHub Actions para el pipeline CI/CD
NGINX como balanceador de carga
ESLint para análisis estático de código

# Instalar dependencias
npm install

# Ejecutar pruebas
npm test

# Iniciar servidor en modo desarrollo
npm run dev