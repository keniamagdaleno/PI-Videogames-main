const {Sequelize} = require ("sequelize");
const axios = require ("axios");
const {Videogame, Genre} = require ("../db")
const {getAllGames, findVideogameById} = require ("./api_and_db")
const {API_KEY} = process.env;


const showVideogameByName= async (req, res) => {
    const {name}= req.query;
    const totalGames= await getAllGames();
    try{

    if (name){
        let game= await totalGames.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        game.length ?
        res.send(game) :
        res.status(404).json({msg:'No se encontró el juego'});
    } else {
        res.json(totalGames);
    }
}catch(e){
    console.log(e);
}
};


const showVideogameById= async (req, res) => {
    const {id}= req.params;
    try {
        if(id) {
            const matchById= await findVideogameById(id)
            if(matchById) {
                res.send(matchById);
            }else {
                
            res.status(400).json('No se encontró el juego')
        }
        }
    }
    catch (e) {
        console.log(e);
    }
}

const createVideogame = async(req, res) => {
    try{
    let {
        name, 
        description, 
        released, 
        rating, 
        platforms, 
        genres, 
        background_image, 
        createdInDb
    } = req.body

    let videogameCreated = await Videogame.create({
        name,
        description,
        released,
        rating,
        platforms,
        background_image,
        createdInDb
    })

    let genreDb= await Genre.findAll({
        where: {name: genres}
    })
    videogameCreated.addGenre(genreDb)
    res.status(200).send('Videojuego creado con éxito!!!')
} catch (e) {
    console.log(e)
    console.log('Error en la ruta Post')
}
};





module.exports = {
    showVideogameByName,
    createVideogame,
    showVideogameById
};