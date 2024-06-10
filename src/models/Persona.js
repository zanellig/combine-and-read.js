class Persona {
  constructor(tienda, id, name) {
    this.tienda = tienda;
    this.id = id;
    this.name = name;
  }

  toCsvString() {
    return `${this.tienda},${this.id},${this.name}`;
  }
}

module.exports = Persona;
