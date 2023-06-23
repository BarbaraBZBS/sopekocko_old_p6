const express = require( 'express' );
const mongoose = require( 'mongoose' )
const app = express();

mongoose.connect( 'mongodb+srv://bun:hoTsauCe@sopekocko.otmpw7w.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } )
    .then( () => console.log( 'Connexion à MongoDB réussie !' ) )
    .catch( () => console.log( 'Connexion à MongoDB échouée !' ) );

app.use( express.json() );
app.use( ( req, res, next ) => {
    res.setHeader( 'Access-Control-Allow-Origin', 'http://localhost:4200' );
    // res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS' );
    next();
} );
// app.use( ( req, res, next ) => {
//     console.log( 'Requête reçue !' );
//     next();
// } );
// app.use( ( req, res, next ) => {
//     res.status( 201 );
//     next();
// } );
// app.use( ( req, res, next ) => {
//     res.json( { message: 'Votre requête a bien été reçue !' } );
//     next();
// } );
// app.use( ( req, res, next ) => {
//     console.log( 'Réponse envoyée avec succès !' );
// } );
app.get( '/api/sauces', ( req, res, next ) => {
    const sauces = [
        {
            _id: '2',
            name: 'chilli',
            manufacturer: 'bibi',
            description: 'so caliente',
            heat: 2,
            likes: 3,
            dislikes: 1,
            imageUrl: 'image.jpg',
            mainPepper: 'tomato',
            usersLiked: [ 'jj4h42jl', 'e6f4rf', 'krekj45' ],
            usersDisliked: [ '5cevr6r', '54rev5' ],
            userId: 'julia'
        },
        {
            _id: '7',
            name: 'hot manag',
            manufacturer: 'jeppetto',
            description: 'so spicy',
            heat: 3,
            likes: 5,
            dislikes: 2,
            imageUrl: 'image2.jpg',
            mainPepper: 'cauliflower',
            usersLiked: [ 'r12rvr2', 'e6f4rf', 'krekj45' ],
            usersDisliked: [ 'r2rere455', '54rev5' ],
            userId: 'bill'
        },
    ];
    res.status( 200 ).json( sauces );
} );
app.post( '/api/sauce', ( req, res, next ) => {
    console.log( req.body );
    res.status( 201 ).json( {
        message: 'Objet créé !'
    } );
} );
module.exports = app;