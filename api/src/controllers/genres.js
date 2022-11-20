const {Sequelize} = require ("sequelize");
const axios = require ("axios");
const {Genre} = require ("../db")
const {API_KEY} = process.env;


    
const showVideogamesGenres = async(req, res) => {
    const genresApi= await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const{results}= genresApi.data
//    console.log(results);

for(i= 0; i<results.length; i++) {
    const {name}=results[i];

    await Genre.findOrCreate({
        where: {name: name}
    });
}
let allGenres= await Genre.findAll();
res.status(200).send(allGenres);

};




module.exports= {
    showVideogamesGenres
};