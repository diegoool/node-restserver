/* ---------- */
/* --PUERTO-- */
/* ---------- */

process.env.PORT = process.env.PORT || 3000;

/* ---------- */
/* -ENTORNO-- */
/* ---------- */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/* ---------- */
/* ----BD---- */
/* ---------- */

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    // la coneccion URL fue guardada al crear una variable de entorno
    // heroku config:set MONGO_URI="mongodb://..."
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;