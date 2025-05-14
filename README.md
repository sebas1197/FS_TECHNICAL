# REE Electric Balance Dashboard

## Overview

This repository contains a complete end-to-end solution for ingesting, storing, and visualizing the Electric Balance data from Red Eléctrica de España (REE). It consists of:

1. **Backend** (Node.js + TypeScript + GraphQL)  
   - Periodically fetches Balance Eléctrico data from REE API  
   - Stores records in MongoDB (historical and real-time)  
   - Exposes a GraphQL API for querying data by date range  
   - Implements schema validation, robust error handling, and fallback logic  
   - Fully containerized with Docker  
   - Unit & integration tests

2. **Frontend** (React + Vite + TypeScript)  
   - Single Page Application (SPA)  
   - Connects to backend via Apollo Client (GraphQL)  
   - Displays data in table and chart (Recharts)  
   - Date-range picker, loading/error states, retry logic  
   - Reusable components & clear folder structure  
   - Unit tests with Jest & React Testing Library

---

## Data Pipeline & Model

1. **Fetch**  
   - A cron job triggers daily at 00:05 UTC (configurable)  
   - Calls REE endpoint:  
     ```
     https://apidatos.ree.es/es/datos/balance/balance-electrico
       ?start_date=<ISO start>
       &end_date=<ISO end>
       &time_trunc=day
     ```

2. **Transform**  
   - Parse JSON payload  
   - Flatten `included` → extract `datetime`, `groupId`, `type`, `value`, `percentage`

3. **Store**  
   - MongoDB collection `balance_records`  
   - Mongoose schema with indexes on `datetime`

4. **Query**  
   - Exposed via GraphQL:  
     ```graphql
     type Query {
       balanceByDateRange(start: Date!, end: Date!): [BalanceRecord!]!
     }
     ```

5. **Model** (`BalanceRecord`):

   | Field        | Type      | Description                          |
   |--------------|-----------|--------------------------------------|
   | `datetime`   | `Date`    | Timestamp of the measurement         |
   | `groupId`    | `String`  | Category (e.g. "Renovable")          |
   | `type`       | `String`  | Specific source (e.g. "Eólica")     |
   | `value`      | `Number`  | Production value (MWh)               |
   | `percentage` | `Number`  | Share relative to total that day     |

---

## Backend

### Prerequisites

- Node.js v18+  
- npm v9+  
- Docker & Docker Compose (optional but recommended)  
- MongoDB (local or Docker)


### Install & Run

1. **Install dependencies**  
   ```bash
   cd backend
   npm install

- dev mode

npm run dev

- build and production

npm run build   # Compiles TypeScript → JavaScript
npm start       # Runs compiled code from dist/


2. **Test Backend**

npm test    

- docker 

docker-compose up --build

- CURL 

curl -X POST http://localhost:4000/graphql \
  -H 'Content-Type: application/json' \
  -d '{"query":"mutation { fetchBalance }"}'


## Frontend

### Prerequisites

- **Node.js** v18+  
- **npm** v9+  
- **Vite** (installed via devDependencies in `package.json`)  
- A running backend at `http://localhost:4000/graphql`  
- Environment file support (`.env` with `VITE_` variables)

---

### Environment

Create a file named `.env` in the `frontend/` folder:

```dotenv
VITE_GRAPHQL_ENDPOINT=http://localhost:4000/graphql

