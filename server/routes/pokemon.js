const router = require('express').Router();
const Pokedex = require('pokedex-promise-v2');
const pokedex = new Pokedex();
const Pokemon = require('../models/Pokemon');
const fetch = require('node-fetch')
router.get('/:pokemonName', async (req, res) => {
    let { pokemonName } = req.params;
    try {
        let pokemonResults = await getPokemon(pokemonName);
        console.log(pokemonResults.weakness)
        res.status(200).send(pokemonResults);
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

async function parseData(data) {
    const { id, height, weight, sprites } = data;
    const baseExp = data.base_experience;
    const name = data.name.charAt(0).toUpperCase() + data.name.substring(1).toLowerCase();
    const abilities = data.abilities
        .map(ability => {
            let abilityName = ability.ability.name
                .split("-")
                .map(token => capitalize(token)).join(" ");
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
    });
    const multipliers = await getMultipliers(data.types);
    return new Pokemon(
        name, id, abilities, baseExp, height, weight, heldItems, moves, stats, types, sprites, Array.from(multipliers[0]).map(mult => [capitalize(mult[0]), mult[1]]), Array.from(multipliers[1]).map(mult => [capitalize(mult[0]), mult[1]])
    )
}

async function getMultipliers(types) {
    let urls = types.map(type => fetch(type.type.url));
    let results = await Promise.all(urls).catch(err => console.log(err));
    
    let weakTo = [];
    let strongTo = [];
    let resistant = [];
    let weakAgainst = [];
    for(var x = 0; x < results.length; x++) {
        let r = await results[x].json();
        r.damage_relations.double_damage_from.forEach(w => weakTo.push(w));
        r.damage_relations.double_damage_to.forEach(w => strongTo.push(w));
        r.damage_relations.half_damage_from.forEach(w => resistant.push(w));
        r.damage_relations.half_damage_to.forEach(w => weakAgainst.push(w));
    }
    const weaknessMap = new Map();
    weakTo.forEach(weak => {
        if(weaknessMap.has(weak.name)) {
            let w = weaknessMap.get(weak.name) * 2;
            weaknessMap.set(weak.name, w);
        }
        else
            weaknessMap.set(weak.name, 2)
    });
    const strongAgainst = new Map();
    strongTo.forEach(strong => {
        if(strongAgainst.has(strong.name)) {
            let w = strongAgainst.get(strong.name) * 2;
            strongAgainst.set(strong.name, w);
        }
        else
            strongAgainst.set(strong.name, 2);
    });
    const resistantMap = new Map();
    resistant.forEach(resistant => {
        if(resistantMap.has(resistant.name)) {
            let w = resistantMap.get(resistant.name) * 2;
            resistantMap.set(resistant.name, w);
        }
        else
            resistantMap.set(resistant.name, 2);
    });
    const weakAgainstMap = new Map();
    weakAgainst.forEach(weak => {
        if(weakAgainstMap.has(weak.name)) {
            let w = weakAgainstMap.get(weak.name) * 2;
            weakAgainstMap.set(weak.name, w);
        }
        else
            weakAgainstMap.set(weak.name, 2);
    });
    return [weaknessMap, strongAgainst, resistantMap, weakAgainstMap]
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}
module.exports = router;