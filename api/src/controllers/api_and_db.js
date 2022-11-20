const {Sequelize}= require("sequelize");
require ("dotenv").config();
const axios = require("axios");
const {Videogame, Genre} = require("../db")
const {API_KEY}= process.env;

const getVgApi = async () => {
    const videogamesApi= [];
    let url= ` https://api.rawg.io/api/games?key=${API_KEY}`;

    try{

    for (let i = 0; i < 5; i++){
        let apiGames = await axios.get(url);
        

        const videogames = apiGames.data.results?.map(el => {
            const {
                id,
                name,
                description,
                rating,
                released,
                platforms,
                genres,
                background_image,
                createdInDb,

            } = el;
            videogamesApi.push({
                id,
                name,
                description,
                rating,
                released,
                platforms: platforms?.map(el => el.platform.name),
                genres: genres?.map(el=> el.name).join(" | "),
                background_image,
                createdInDb
            });
        });
        url= apiGames.data.next;
    };
    return videogamesApi;
}catch(error){
    console.log(error)
}
   
};

const getVgDb= async () => {
    try{
    const videogameDb= await Videogame.findAll({
        include:{
            model: Genre,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        }
    })
    const videogameMap= videogameDb.map(e => {
        return {
            id: e.dataValues.id,
            name: e.dataValues.name,
            description: e.dataValues.description,
            released: e.dataValues.released,
            rating: e.dataValues.rating,
            background_image: e.dataValues.background_image,
            platforms: e.dataValues.platforms,
            genres: e.dataValues.genres?.map(e => e.name ).join(' | '),
            createdInDb: e.dataValues.createdInDb


        }
    })
    return videogameMap;
}catch(error){
    console.log(error);
}
}

const getAllGames = async() => {
    let videogamesApi= await getVgApi();
    let videogamesDb = await getVgDb();

    const allVideogames = videogamesApi.concat(videogamesDb);
    return allVideogames;
};

const findVideogameById = async (id) => {
    let videogameById;
    if(!id.includes("-")) {
        const videogamesApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        videogameById = {
            background_image: videogamesApi.data.background_image,
            name: videogamesApi.data.name,
            description: videogamesApi.data.description_raw,
            released: videogamesApi.data.released,
            rating: videogamesApi.data.rating,
            platforms: videogamesApi.data.platforms.map(el => el.platform.name),
            genres: videogamesApi.data.genres.map(el => el.name),
        }
    } else {
        videogameById = await Videogame.findOne({
            where: {
                id: id,
            },
    
            include: {
                model: Genre
            }
        })
    }
        return videogameById;
    
    }; 

module.exports= {
    getAllGames,
    findVideogameById
};

