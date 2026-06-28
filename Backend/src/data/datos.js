//usar de base de datos temporal o testear
//array de objetos para las instituciones de prueba
const instituciones = [
  { id: 1, nombre: "Colegio Industrial", ciudad: "Formosa", CUE: "123" },
  { id: 2, nombre: "E.P.E.T N° 5", ciudad: "Formosa", CUE: "456" }
];
//enviar pedido en resultados.html al js para leer este array y filtrar
// capaz con un filter de js limpiar el array y mostrar solo la coincidencia.
//resultados.html va a hacer un pedido a server.js, el servidor va a buscar los datos de este array y filtrar las coincidencias en el backend y va a devolver al front solo los resultados limpios en json.
// el front lo recibe y lo rellena
// Crear una ruta en el servidor, para que el html pida las instituciones por ahí

//exportar el array para que sea modular.
module.exports = instituciones;
// Se utiliza module.exports para que el array 'instituciones' sea accesible 
// desde otros archivos mediante 'require'.

