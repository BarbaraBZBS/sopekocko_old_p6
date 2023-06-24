const Sauce = require( '../models/sauce' );

exports.createSauce = ( req, res, next ) => {
    const sauce = new Sauce( {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        heat: req.body.heat,
        mainPepper: req.body.mainPepper,
        imageUrl: req.body.imageUrl,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        usersLiked: req.body.usersLiked,
        usersDisliked: req.body.usersDisliked,
        userId: req.body.userId,

    } );
    sauce.save()
        .then( () => res.status( 201 ).json( { message: 'post saved' } ) )
        .catch( ( error ) => res.status( 400 ).json( { error: error } ) )
};
exports.getAllSauces = ( req, res, next ) => {
    Sauce.find()
        .then( ( sauces ) => res.status( 200 ).json( sauces ) )
        .catch( ( error ) => res.status( 404 ).json( { error: error } ) )
};
exports.getOneSauce = ( req, res, next ) => {
    Sauce.findOne( { _id: req.params.id } )
        .then( ( sauce ) => res.status( 200 ).json( sauce ) )
        .catch( ( error ) => res.status( 404 ).json( { error: error } ) )
};
exports.modifySauce = ( req, res, next ) => {
    const sauce = new Sauce( {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        heat: req.body.heat,
        mainPepper: req.body.mainPepper,
        imageUrl: req.body.imageUrl,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        usersLiked: req.body.usersLiked,
        usersDisliked: req.body.usersDisliked,
        userId: req.body.userId,

    } )
    sauce.updateOne( { _id: req.params.id }, sauce )
        .then( () => res.status( 201 ).json( { message: 'sauce updated' } ) )
        .catch( ( error ) => res.status( 400 ).json( { error: error } ) )
};
exports.deleteSauce = ( req, res, next ) => {
    Sauce.findOneAndDelete( { _id: req.params.id } )
        .then( () => res.status( 200 ).json( { message: 'sauce deleted' } ) )
        .catch( ( error ) => res.status( 400 ).json( { error: error } ) )
}