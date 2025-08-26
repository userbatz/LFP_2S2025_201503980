//comenzamos con la clase operador, 


//esta clase tiene un id, un nombre y una lista de llamadas
class Operator {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.calls = [];

    }

    //en este metodo agregamos una llamada a la lista de llamadas del operador
    addCall(call) {
        this.calls.push(call);
    }
}

module.exports = Operator;