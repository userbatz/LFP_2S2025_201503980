const readline = require("readline");
const fs = require("fs");
const { loadData } = require("./utils/FileManager");

// Variable global para almacenar los datos cargados
let data = null;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ======= Reportes =======

function callsHistory() {
    if (!data) return console.log("⚠️ Primero carga los registros.");
    let html = `
    <html>
    <head><title>Historial de Llamadas</title></head>
    <body>
    <h2><center>Historial de Llamadas</center></h2>
    <table border="1" cellpadding="5">
    <tr>
        <th>ID OPERADOR</th>
        <th>NOMBRE DEL OPERADOR</th>
        <th>ID DEL CLIENTE</th>
        <th>NOMBRE DEL CLIENTE</th>
        <th>ESTRELLAS OBTENIDAS</th>
        <th>CLASIFICACION DE LA LLAMADA</th>
    </tr>
    `;
    data.calls.forEach(ll => {
       
        html += `
        <tr>
            <td>${ll.operator.id}</td>
            <td>${ll.operator.name}</td>
            <td>${ll.client.id}</td>
            <td>${ll.client.name}</td>
            <td>${ll.stars}</td>
            <td>${ll.classifyCall()}</td>
        </tr>`;
    });
    html += "</table></body></html>";
   
    fs.writeFileSync("./reports/callsHistory.html", html);
    console.log("✅ Historial exportado en reports/historial.html");
}









function operatorList() {
    if (!data) return console.log("⚠️ Primero carga los registros.");
    let html = `
    
    <html>
    <head>
        <title>
        Listado de Operadores
        </title>
    </head>

    <body><center>
    <h2>Listado de Operadores</h2>
    <table border="1" cellpadding="5">
    <tr>
        <th>ID</th>
        <th>Nombre</th>
    </tr>
    `;
   
    Object.values(data.operators).forEach(op => {
        html += `
            <tr>
                <td>${op.id}</td>
                <td>${op.name}</td>
            </tr>`;
    });
    html += '</table></center></body></html>';

    fs.writeFileSync("./reports/operators.html", html);
    console.log("✅ Operadores exportados en reports/operators.html");
}












function clientList() {
    if (!data) return console.log("⚠️ Primero carga los registros.");
    let html = `
    <html>
    <head>
        <title>
        Listado de Clientes
        </title>
    </head>
    <body>
        <center>
        <h2>Listado de Clientes</h2>
        <table border="1" cellpadding="5">
        <tr>
            <th>ID</th>
            <th>Nombre</th>
        </tr>
    `;
    Object.values(data.clients).forEach(cl => {
        html += `<tr><td>${cl.id}</td><td>${cl.name}</td></tr>`;
    });
    html += "</table></center></body></html>";

    fs.writeFileSync("./reports/clients.html", html);
    console.log("✅ Clientes exportados en reports/clients.html");
}









function operatorPerformance() {
    if (!data) return console.log("⚠️ Primero carga los registros.");
    let totalCalls = data.calls.length;
    let html = `
    <html>
    <head>
        <title>
            Rendimiento de Operadores
        </title>
    </head>
    <body>
    <center>
        <h2>Rendimiento de Operadores</h2>
        <table border="1" cellpadding="5">
        <tr>
            <th>ID</th>
            <th>Nombre del operador</th>
            <th>Porcentaje de atención</th>
        </tr>
            `;
            Object.values(data.operators).forEach(op => {
                let percentage = ((op.calls.length / totalCalls) * 100).toFixed(3);
                html += `<tr><td>${op.id}</td><td>${op.name}</td><td>${percentage}%</td></tr>`;
            });
    html += "</table></center></body></html>";
    fs.writeFileSync("./reports/performance.html", html);
    console.log("✅ Rendimiento exportado en reports/performance.html");
}










function percentageClassification() {
    if (!data) return console.log("⚠️ Primero carga los registros.");
    let total = data.calls.length;

    let buenas = data.calls.filter(l => l.classifyCall() === "Buena").length;
    let medias = data.calls.filter(l => l.classifyCall() === "Media").length;
    let malas = data.calls.filter(l => l.classifyCall() === "Mala").length;

    console.log('----------------------------------');
    console.log("\n📊 Porcentaje de Clasificación:");
    console.log(`Buenas: ${(buenas / total * 100).toFixed(2)}%`);
    console.log(`Medias: ${(medias / total * 100).toFixed(2)}%`);
    console.log(`Malas: ${(malas / total * 100).toFixed(2)}%`);
    console.log('----------------------------------')
}







function quantityCalls() {
    if (!data) return console.log("⚠️ Primero carga los registros.");
    let conteo = [0,0,0,0,0,0]; // índice = cantidad de estrellas
    data.calls.forEach(l => conteo[l.stars]++);
    
    console.log("\n📞 Cantidad de Llamadas por Calificación:");
    for (let i = 1; i <= 5; i++) {
        console.log(`${i} estrella(s): ${conteo[i]}`);
    }
}








// ======= Menú =======
function mostrarMenu() {
    console.log("\n=== SIMULADOR CALLCENTER ===");
    console.log("1. Cargar Registros de Llamadas");
    console.log("2. Exportar Historial de Llamadas");
    console.log("3. Exportar Listado de Operadores");
    console.log("4. Exportar Listado de Clientes");
    console.log("5. Exportar Rendimiento de Operadores");
    console.log("6. Mostrar Porcentaje de Clasificación de Llamadas");
    console.log("7. Mostrar Cantidad de Llamadas por Calificación");
    console.log("8. Salir");

    rl.question("Elige una opción: ", opcion => {
        switch (opcion) {
            case "1":
                data = loadData("./data/archivo.txt");
                if (data) {
                    console.log("⚠️ Error al cargar los registros.");
                }
                break;
            case "2":
                callsHistory();
                break;
            case "3":
                operatorList();
                break;
            case "4":
                clientList();
                break;
            case "5":
                operatorPerformance();
                break;
            case "6":
                percentageClassification();
                break;
            case "7":
                quantityCalls();
                break;
            case "8":
                console.log("👋 Saliendo...");
                rl.close();
                return;
            default:
                console.log("⚠️ Opción no válida.");
        }
        mostrarMenu();

    });
}

mostrarMenu();
