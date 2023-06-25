const express = require( 'express' );
const mongoose = require( 'mongoose' );
const helmet = require( 'helmet' );
const mongoSanitize = require( 'express-mongo-sanitize' );
const app = express();
require( 'dotenv' ).config();
const rateLimit = require( 'express-rate-limit' );
const saucesRoutes = require( './routes/sauces' );
const userRoutes = require( './routes/user' );
const cors = require( 'cors' );
const path = require( 'path' );
require( 'dotenv' ).config()

mongoose.connect( process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } )
    .then( () => console.log( 'Connexion à MongoDB réussie !' ) )
    .catch( () => console.log( 'Connexion à MongoDB échouée !' ) );

app.use( express.json() );
app.use( mongoSanitize() );
app.use( cors() );
// {
//     origin: [ 'http://localhost:3000', 'http://localhost:4200' ]
// }
// app.use( ( req, res, next ) => {
//     // res.setHeader( 'Access-Control-Allow-Origin', 'http://localhost:3000', 'http://localhost:4200 );
//     res.setHeader( 'Access-Control-Allow-Origin', '*' );
//     res.setHeader( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization' );
//     res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS' );
//     res.setHeader( 'Access-Control-Allow -Credentials', 'true' );
//     next();
// } );
const limiter = rateLimit( {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
} );
app.use( helmet( { crossOriginResourcePolicy: { policy: "cross-origin" } } ) );
app.use( limiter );

app.use( '/images', express.static( path.join( __dirname, 'images' ) ) );
app.use( '/api/sauces', saucesRoutes );
app.use( '/api/auth', userRoutes );
module.exports = app;