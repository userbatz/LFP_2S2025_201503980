// ...existing code...
const fs = require('fs');
const Operator = require('../models/Operator');
const Client = require('../models/Client');
const Calls = require('../models/Calls');

function loadData(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n').map(l => l.trim()).filter(l => l);

    const operators = {};
    const clients = {};
    const callsArr = [];

    lines.forEach(line => {
        const [idOperator, nameOperator, starsCount, IdClient, NameCliente] = line.split(',');
        const stars = starsCount.split(';').filter(s => s === 'x').length;

        if (!operators[idOperator]) {
            operators[idOperator] = new Operator(idOperator, nameOperator);
        }
        if (!clients[IdClient]) {
            clients[IdClient] = new Client(IdClient, NameCliente);
        }

        const call = new Calls(operators[idOperator], clients[IdClient], stars);
        callsArr.push(call);
        operators[idOperator].calls.push(call); // <- usa 'calls', no 'newCalls'
    });

    return {operators, clients, calls: callsArr};
}

// Ejemplo de uso:
const resultado = loadData('archivo.txt');
console.log(resultado);
console.log(resultado.operators.Calls)
