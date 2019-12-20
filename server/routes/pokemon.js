const router = require('express').Router();
const Pokedex = require('pokedex-promise-v2');
const pokedex = new Pokedex();
router.get('/:pokemonName', async (req, res) => {
    let { pokemonName } = req.params;
    let pokemonResults = await getPokemon(pokemonName);
    res.send(pokemonResults);
});

async function getPokemon(name) {
    return await pokedex.getPokemonByName(name);
}
module.exports = router;