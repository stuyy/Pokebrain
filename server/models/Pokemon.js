module.exports = class Pokemon {
    constructor(name, id, abilities, baseExp, height, weight, heldItems, moves, stats, types, sprites, weakness) {
        this.name = name;
        this.id = id;
        this.abilities = abilities;
        this.baseExp = baseExp;
        this.height = height;
        this.weight = weight;
        this.heldItems = heldItems;
        this.moves = moves;
        this.stats = stats;
        this.types = types;
        this.sprites = sprites;
        this.weakness = weakness;
    }
}