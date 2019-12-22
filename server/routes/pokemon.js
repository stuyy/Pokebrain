const router = require('express').Router();
const Pokedex = require('pokedex-promise-v2');
const pokedex = new Pokedex();
const Pokemon = require('../models/Pokemon');

router.get('/:pokemonName', async (req, res) => {
    let { pokemonName } = req.params;
    console.log(pokemonName);
    try {
        let pokemonResults = await getPokemon(pokemonName);
        res.send(pokemonResults);
    }
    catch(err) {
        res.status(400).json({
            msg: "Error! Pokemon not found."
        })
    }
});

async function getPokemon(name) {
    let results = await pokedex.getPokemonByName(name);
    return parseData(results);
}
function parseData(data) {
    const { id, height, weight } = data;
    const baseExp = data.base_experience;
    const name = data.name.charAt(0).toUpperCase() + data.name.substring(1).toLowerCase();
    const abilities = data.abilities
        .map(ability => {
            let abilityName = ability.ability.name
                .split("-")
                .map(token => token.charAt(0).toUpperCase() + token.substring(1).toLowerCase()).join(" ");
            ability.ability.name = abilityName;
            return ability;
        });
    
    const moves = data.moves.map(move => {
        let moveName = move.move.name.split("-").map(token => capitalize(token)).join(" ");
        move.move.name = moveName;
        return move;
    });
    const stats = data.stats.map(stat => {
        let statName = stat.stat.name.split("-").map(token => capitalize(token)).join(" ");
        stat.stat.name = statName;
        return stat;
    });
    const types = data.types.map(type => type.type.name = capitalize(type.type.name));
    const heldItems = data.held_items.map(item => {
        let itemName = item.item.name.split("-").map(token => capitalize(token)).join(" ");
        item.item.name = itemName;
        return item;
    })
    return new Pokemon(
        name, id, abilities, baseExp, height, weight, heldItems, moves, stats, types
    )

}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}
module.exports = router;