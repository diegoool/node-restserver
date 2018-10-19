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
    urlDB = 'mongodb://cafe-user:abc123@ds235833.mlab.com:35833/cafe';
}

process.env.URLDB = urlDB;