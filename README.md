Reg-APP
# Getting Started with Reg app

You need to install all npm packages with `npm i` in main directory and in `client` directory too, then

Configure `.env` file :

DB_CONNECTION_URI= `your data base link here`

// Gmail config //

SMTP_HOST=`your host here`

SMTP_PORT =`port here`

SMTP_USER = `your email adress`

SMTP_PASSWORD = ` email password`

API_URL = http://localhost:5000

JWT_ACCESS_SECRET = jwt-secret-key-string

JWT_REFRESH_SECRET = jwt-refresh-secret-key-string

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Stars with concurrently your app:
- Frontend runs on [http://localhost:3000]
- Backend runs on [http://localhost:5000]

### `npm client`

Runs frontend in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm server`

Runs backend in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


I worked with PostgreSQL, for me it was convenient to use PGadmin for database manage. 
Database was created on https://www.elephantsql.com/ it postgreSQL service.



