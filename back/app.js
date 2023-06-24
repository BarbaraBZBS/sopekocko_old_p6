const express = require( 'express' );
const mongoose = require( 'mongoose' );
const app = express();
const saucesRoutes = require( './routes/sauces' );
const userRoutes = require( './routes/user' );
const cors = require( 'cors' );
const path = require( 'path' );

mongoose.connect( 'mongodb+srv://bun:hoTsauCe@sopekocko.otmpw7w.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } )
    .then( () => console.log( 'Connexion à MongoDB réussie !' ) )
    .catch( () => console.log( 'Connexion à MongoDB échouée !' ) );

app.use( express.json() );
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

app.use( '/images', express.static( path.join( __dirname, 'images' ) ) );
app.use( '/api/sauces', saucesRoutes );
app.use( '/api/auth', userRoutes );
module.exports = app;