const usuario = {
  id: 0,
  nombre: "",
  apellido: "",
  telefono: 0,
  email: "",
  ciudad: "",
  pais: "",
};

let arrayUsario = [];

function guardarContacto(event) {
  usuario.nombre = document.forms["contactoForm"]["nombre"].value;
  usuario.apellido = document.forms["contactoForm"]["apellido"].value;
  usuario.telefono = document.forms["contactoForm"]["telefono"].value;
  usuario.email = document.forms["contactoForm"]["email"].value;
  usuario.ciudad = document.forms["contactoForm"]["ciudad"].value;
  usuario.pais = document.forms["contactoForm"]["pais"].value;

  if(usuario.id <= 0){
    //Crea un id unico para los contactos basado en la fecha del sistemas , toma la fecah y la convierte a milisegundos.
    usuario.id = new Date().valueOf();
  }

  //convierte un objeto a formato json (estructura de datos de clave valor)
  let personaJson = JSON.stringify(usuario);
  //guarda el objeto en formato json en el localstorage del navegador (la informacion del contacto)
  localStorage.setItem(usuario.id, personaJson);

  event.preventDefault();
  alert("Datos guardados con éxito");
  listaContactos();  
  resetform();
}

function listaContactos() {
  let dinamicTable = "";
  dinamicTable += "<table>";
  dinamicTable += "<tr>";
  dinamicTable += "<th>ID</th>";
  dinamicTable += "<th>Nombre</th>";
  dinamicTable += "<th>Apellido</th>";
  dinamicTable += "<th>Telefono</th>";
  dinamicTable += "<th>Email</th>";
  dinamicTable += "<th>Detalles</th>";
  dinamicTable += "</tr>";

  let usuariosGuardados = [];
  usuariosGuardados = allStorage();

  for (let i = 0; i < usuariosGuardados.length; i++) {
    dinamicTable += "<tr>";
    let personaObjeto = JSON.parse(usuariosGuardados[i]);

    dinamicTable += "<td>";
    dinamicTable += personaObjeto.id;
    dinamicTable += "</td>";

    dinamicTable += "<td>";
    dinamicTable += personaObjeto.nombre;
    dinamicTable += "</td>";

    dinamicTable += "<td>";
    dinamicTable += personaObjeto.apellido;
    dinamicTable += "</td>";

    dinamicTable += "<td>";
    dinamicTable += personaObjeto.telefono;
    dinamicTable += "</td>";

    dinamicTable += "<td>";
    dinamicTable += personaObjeto.email;
    dinamicTable += "</td>";

    dinamicTable += "<td>";
    //tomar el url
    dinamicTable +=
      '<a href="desgloseContacto.html?id=' + personaObjeto.id + '">Ver</a>';
    dinamicTable += "</td>";

    dinamicTable += "<td>";
    dinamicTable +=
      '<a href="javascript:editarContacto(' +
      personaObjeto.id +
      ')">Editar</a>';
    dinamicTable += "</td>";

    dinamicTable += "<td>";
    dinamicTable +=
      '<a href="javascript:eliminarUsuario(' +
      personaObjeto.id +
      ')">Eliminar</a>';
    dinamicTable += "</td>";

    dinamicTable += "</tr>";
  }

  dinamicTable += "</table>";
  document.getElementById("tablaContacto").innerHTML = dinamicTable;
}

function allStorage() {
  var values = [], // Inicializa un arreglo vacío para almacenar los valores
    keys = Object.keys(localStorage), // Obtiene todas las claves almacenadas en localStorage
    i = keys.length; // Obtiene la longitud del arreglo de claves
  while (i--) {
    // Decrementa el índice desde la longitud hasta 0
    values.push(localStorage.getItem(keys[i])); // Obtiene el valor de cada clave y lo agrega al arreglo values
  }
  return values; // Devuelve el arreglo de valores
}

function verDetalles() {
  //tomar el id asociado al usuario
  let contactoID = obtenerParametroUrl();
  //tomar el item del localStorage que corresponda al id
  let contacto = localStorage.getItem(contactoID);
  // si hay elementos almacenados en el localStorage
  if (contacto.length > 0) {
    console.log("Entramos en el if");
    let personaObjeto = JSON.parse(contacto);
    document.getElementById("Dnombre").innerText = personaObjeto.nombre;
    console.log(personaObjeto.nombre);
    document.getElementById("Dapellido").innerText = personaObjeto.apellido;
    document.getElementById("Dtelefono").innerText = personaObjeto.telefono;
    document.getElementById("Demail").innerText = personaObjeto.email;
    document.getElementById("Dciudad").innerText = personaObjeto.ciudad;
    document.getElementById("Dpais").innerText = personaObjeto.pais;
  }
}

function obtenerParametroUrl() {
  // Obtiene la URL completa de la página actual
  let url = window.location.href;

  // Divide la URL por el carácter '?' y toma la segunda parte que contiene los parámetros
  let paramString = url.split("?")[1];

  // Crea un objeto URLSearchParams con la cadena de parámetros para facilitar su manipulación
  let queryString = new URLSearchParams(paramString);

  // Inicializa la variable parameterID en 0, que almacenará el valor del parámetro
  let parameterID = 0;

  // Itera sobre todas las entradas (parámetros) del objeto URLSearchParams
  for (let pair of queryString.entries()) {
    // Imprime en la consola la clave (nombre del parámetro)
    console.log("Key is:" + pair[0]);

    // Imprime en la consola el valor del parámetro
    console.log("Value is:" + pair[1]);

    // Actualiza parameterID con el valor del parámetro convertido a número
    parameterID = Number(pair[1]);
  }

  // Devuelve el valor del parámetro extraído
  return parameterID;
}

function editarContacto(id) {
  let contacto = localStorage.getItem(id);
  if (contacto.length > 0) {
    let personaObjeto = JSON.parse(contacto);
    document.getElementById("nombre").value = personaObjeto.nombre;
    document.getElementById("apellido").value = personaObjeto.apellido;
    document.getElementById("telefono").value = personaObjeto.telefono;
    document.getElementById("email").value = personaObjeto.email;
    document.getElementById("ciudad").value = personaObjeto.ciudad;
    document.getElementById("pais").value = personaObjeto.pais;
    usuario.id = id
  }
  listaContactos();
}

function eliminarUsuario(id){
  let contacto = localStorage.getItem(id);
  if (contacto.length > 0) {
    localStorage.removeItem(id);
    alert("Contacto eliminado con exito");
  }
  listaContactos();
}



function resetForm(){
  document.forms["contactoForm"].reset();
  usuario.id = 0;
}