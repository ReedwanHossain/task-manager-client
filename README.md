# TaskManagerClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.0.

## Description

# Text Manager Application

This repository contains the Frontend app for a Task Manager Application. Follow the instructions below to set up and run the application locally using Docker.

## Prerequisites

- Docker version 24.0.7
- Docker Compose version 2.27.1

### Backend Setup (task-manager-api)

_You can skip 1-3 if you already have the backend app running_

1. Clone the (this) backend repository:

```bash

  git clone https://github.com/ReedwanHossain/task-manager-api.git
  cd task-manager-api

```

2. Create .env based on .env.example:

```bash
  touch .env
  cp .env.example .env


```

3. Run Docker Compose to build and start the backend services:

   ```bash
   docker compose up -d --build
   ```

4. Open another terminal tab or window. Clone the frontend repository::

   ```bash

   git clone https://github.com/ReedwanHossain/task-manager-client.git
   cd task-manager-client

   ```

5. Run Docker Compose to build and start the frontend app:

   ```bash
   docker compose up -d --build
   ```

6. Access the application

   ```bash
   http://localhost:4200
   ```

7. Access the API Docs

   ```bash
   http://localhost:3000/docs
   ```

## License

Nest is [MIT licensed](LICENSE).

```

```
