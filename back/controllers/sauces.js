const Sauce = require( '../models/sauce' );
const fs = require( 'fs' );

exports.createSauce = ( req, res, next ) => {
    const sauceObject = JSON.parse( req.body.sauce );
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce( {
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${ req.protocol }://${ req.get( 'host' ) }/images/${ req.file.filename }`,
        like: req.body.likes,
        dislike: req.body.dislikes,
        usersLiked: [],
        usersDisliked: []
    } );
    sauce.save()
        .then( () => res.status( 201 ).json( { message: 'post saved' } ) )
        .catch( ( error ) => res.status( 400 ).json( { error } ) );
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
    const sauceObject = req.file ? {
        ...JSON.parse( req.body.sauce ),
        imageUrl: `${ req.protocol }://${ req.get( 'host' ) }/images/${ req.file.filename }`,
    } : {
        ...req.body
    };
    delete sauceObject._userId;
    Sauce.findOne( { _id: req.params.id } )
        .then( ( sauce ) => {
            const oldFile = sauce.imageUrl.split( '/images/' )[ 1 ];
            if ( sauce.userId != req.auth.userId ) {
                res.status( 401 ).json( { message: 'Not authorized' } );
            }
            else {
                if ( req.file ) {
                    fs.unlinkSync( `images/${ oldFile }` )
                }
                Sauce.findOneAndUpdate( { _id: req.params.id }, { ...sauceObject, _id: req.params.id } )
                    .then( () => res.status( 200 ).json( { message: 'sauce updated' } ) )
                    .catch( error => res.status( 401 ).json( { error } ) )
            }
        } )
        .catch( ( error ) => res.status( 400 ).json( { error } ) );
};
exports.deleteSauce = ( req, res, next ) => {
    Sauce.findOne( { _id: req.params.id } )
        .then( ( sauce ) => {
            if ( sauce.userId != req.auth.userId ) {
                res.status( 401 ).json( { message: 'Not authorized' } );
            }
            else {
                const filename = sauce.imageUrl.split( '/images/' )[ 1 ];
                fs.unlink( `images${ filename }`, () => {
                    Sauce.findOneAndDelete( { _id: req.params.id } )
                        .then( () => { res.status( 200 ).json( { message: 'Sauce deleted' } ) } )
                        .catch( error => res.status( 401 ).json( { error } ) );
                } );
            }
        } )
        .catch( error => res.status( 500 ).json( { error } ) )
};
exports.likeDislikeSauce = ( req, res, next ) => {
    Sauce.findOne( { _id: req.params.id } )
        .then( ( sauce ) => {
            if ( req.body.like == 1 ) {
                if ( !sauce.usersLiked.includes( req.body.userId ) ) {
                    sauce.likes++;
                    sauce.usersLiked.push( req.body.userId );
                    // sauce.save()
                    //     .then( () => res.status( 200 ).json( { message: 'sauce liked' } ) )
                    //     .catch( error => res.status( 400 ).json( { error } ) );
                }
            }
            else if ( req.body.like == 0 ) {
                if ( sauce.usersLiked.includes( req.body.userId ) ) {
                    sauce.likes--;
                    sauce.usersLiked.splice( sauce.usersLiked.indexOf( req.body.userId ) );
                    // sauce.save()
                    //     .then( () => res.status( 200 ).json( { message: 'sauce like removed' } ) )
                    //     .catch( error => res.status( 400 ).json( { error } ) )
                }
                else if ( sauce.usersDisliked.includes( req.body.userId ) ) {
                    sauce.dislikes--;
                    sauce.usersDisliked.splice( sauce.usersDisliked.indexOf( req.body.userId ) );
                    // sauce.save()
                    //     .then( () => res.status( 200 ).json( { message: 'sauce dislike removed' } ) )
                    //     .catch( error => res.status( 400 ).json( { error } ) )
                }
            }
            else if ( req.body.like == -1 ) {
                if ( !sauce.usersDisliked.includes( req.body.userId ) ) {
                    sauce.dislikes++;
                    sauce.usersDisliked.push( req.body.userId );
                    // sauce.save()
                    //     .then( () => res.status( 200 ).json( { message: 'sauce disliked' } ) )
                    //     .catch( error => res.status( 400 ).json( { error } ) )
                }
            }
            sauce.save()
            res.status( 200 ).json( { message: "Sauce like/dislike updated" } )


            // if (sauce.usersLiked.includes(req.auth.userId)) {
            //     console.log("liked?: ", sauce.usersLiked)
            //     console.log("already liked ! disliking")
            //     // newLike = sauce.likes - 1
            //     sauce.usersLiked.remove(req.auth.userId)
            //     Sauce.updateOne({id_: req.params.id}, {likes: 0})
            //     .then(()=>res.status(200).json({message: 'likes updated'}))
            //     .catch(error => res.status(400).json({error}))
            //     // const newArray = sauce.usersLiked.filter(ele=> {ele == req.auth.userId})
            //     // sauce.usersLiked = newArray
            // } else if(sauce.usersDisliked.includes(req.auth.userId)){
            //     console.log("disliked?: ", sauce.usersDisliked)
            //     console.log("liking !")
            //     sauce.likes + 1
            //     sauce.usersLiked.remove(req.auth.userId)
            //     Sauce.updateOne({id_: req.params.id}, {likes: - 1})
            //     .then(()=>res.status(200).json({message: 'likes updated'}))
            //     .catch(error => res.status(400).json({error}))

            // }
        } )
        .catch( error => res.status( 400 ).json( { error } ) )
};