class Persona {
  constructor(tienda, id, name) {
    this.tienda = tienda;
    this.id = id.trim();
    this.name = name.trim();
  }

  toCsvString() {
    return `${this.tienda},${this.id},${this.name}`;
  }
}

module.exports = Persona;
