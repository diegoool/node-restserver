/* ---------- */
/* --PUERTO-- */
/* ---------- */

process.env.PORT = process.env.PORT || 3000;

/* ---------- */
/* -ENTORNO-- */
/* ---------- */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


/* ------------------------- */
/* ----Vencimiento Token---- */
/* ------------------------- */
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


/* ----------------------------- */
/* ----SEED de autenticacion---- */
/* ----------------------------- */
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


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



/* --------------- */
/* -GOOGLE CLIENT- */
/* --------------- */

process.env.CLIENT_ID = process.env.CLIENT_ID || '44014013875-57b6f7qraqqf5cnuqf931h0nbac97gl2.apps.googleusercontent.com';