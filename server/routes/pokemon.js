const router = require('express').Router();
const Pokedex = require('pokedex-promise-v2');
const pokedex = new Pokedex();

router.get('/:pokemonName', async (req, res) => {
    let { pokemonName } = req.params;
    console.log(pokemonName);
    try {
        let pokemonResults = await getPokemon(pokemonName)
        res.send(pokemonResults);
    }
    catch(err) {
        res.status(400).json({
            msg: "Error! Pokemon not found."
        })
    }
});

async function getPokemon(name) {
    return await pokedex.getPokemonByName(name);
}
module.exports = router;