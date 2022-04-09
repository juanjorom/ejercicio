
# Ejercicio

Un simple ejercicio para una evaluacion




## Deployment

Para correr el proyecto primero hay que duplicar y renombrar el archivo .env.example

```bash
  cp .env.example .env
```
Definir el usuario, password, host y base de datos de la misma

```bash
  #En el archivo .env
  DB_HOST=<nombre_host>
  DB_USER=<username>
  DB_PASSWORD=<passord>
  DB_DATABASE=<database>
```

Por ultimo instalarlo y correrlo:

```bash
  npm install
  npm start
```


## Running Tests

Para ejecutar los test

```bash
  npm test
```

