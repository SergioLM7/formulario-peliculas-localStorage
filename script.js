//Variables
const formulario = document.querySelector("#formPeliculas");
const selectUsuario = document.querySelector("#genero");
const selectFiltro = document.querySelector("#filtro");
const regExpPeliculas = {
    titulo: /^([a-zA-ZÀ-ÖØ-öø-ſ]+)(?=[a-zA-ZÀ-ÖØ-öø-ſ\d]+)([-¡,!\?¿'a-zA-ZÀ-ÖØ-öø-ſ\d]+\s*){1,}$/,
    director: /^([-'a-zA-ZÀ-ÖØ-öø-ſ]+\s?){1,}$/,
    año: /^\d{4}$/
};
const generosPeliculas = ['Terror', 'Accion', 'Comedia', 'Romantica'];
const fragment = document.createDocumentFragment();
let objetoCorrecto = {};
let titulo = document.querySelector('#titulo');
let cuerpoTabla = document.querySelector('#cuerpoTabla');
let arrayPeliculaCorrecto = [];
let errores = '';
let fechaActual = new Date().getFullYear();

//Eventos
formulario.addEventListener(('submit'), (evento)=>{
        evento.preventDefault();
        validarForm();
    });

selectFiltro.addEventListener('change', (evento) => {
        cuerpoTabla.innerHTML = '';
        let optionValue = evento.target.value;
        filtrarPorGenero(arrayPeliculaCorrecto, optionValue);        
});


//Funciones
//Función para crear los options, tanto del selectUsuario, como del selectFiltro
const crearGeneros = (...array) => {
    array.forEach((elemento)=> {
        let option = document.createElement('option');
        option.value = elemento;
        option.textContent = elemento;
        fragment.append(option);
    });
    return fragment;
};

/*const crearOptions = (array, select) => {
    array.forEach((element)=> {
        let option = document.createElement('option');
        option.value = element;
        option.value[0] = '';
        option.innerHTML = element.charAt(0).toUpperCase() + element.slice(1);
        fragment.append(option);
        select.append(fragment);
    });
};*/

//Función validadora del form
const validarForm = () => {
    const objetoPelicula = {
        titulo: formulario.titulo.value,
        director: formulario.director.value,
        año: formulario.año.value,
        genero: formulario.genero.value,
    };

    if (objetoPelicula.titulo) {
        if (!regExpPeliculas.titulo.test(objetoPelicula.titulo)) {
            errores += '<li>Título incorrecto</li>';
        } else {
            objetoCorrecto.titulo = objetoPelicula.titulo;
        }
    };

    if (objetoPelicula.director) {
        if (!regExpPeliculas.director.test(objetoPelicula.director)) {
            errores += '<li>Director incorrecto</li>';
        } else {
            objetoCorrecto.director = objetoPelicula.director
        }
    };
   
    if (objetoPelicula.año) {
        if (!regExpPeliculas.año.test(objetoPelicula.año) || objetoPelicula.año > fechaActual || objetoPelicula.año < 1800) {
            errores += '<li>Año incorrecto</li>';
        } else {
            objetoCorrecto.año = objetoPelicula.año;
        }
    };

    
    if (objetoPelicula.genero === '--selecciona un género--') {
        errores += '<li>Título incorrecto</li>';
    } else {
        objetoCorrecto.genero = objetoPelicula.genero;
    }

    if (errores==='') {
        pintarDatos(objetoCorrecto);
        arrayPeliculaCorrecto.push(objetoCorrecto);
        selectFiltro.removeAttribute('disabled');
        objetoCorrecto={};
        formulario.reset(); 
    } else {
        alert('Alguno de los campos no es válido.');
        errores = '';
    };
    
};

//Función que vuelca los option en cada select
const pintarGeneros = () => {
    selectUsuario.append(crearGeneros('--selecciona un género--', ...generosPeliculas));
    selectFiltro.append(crearGeneros('Todos', ...generosPeliculas));
};

//Función pintadora de los datos en la tabla
const pintarDatos = (objeto) => {

    const filaTabla = document.createElement('tr');
    let correcto = Object.values(objeto);

    correcto.forEach((elemento) => {
       let celdaTabla = document.createElement('td');
       celdaTabla.innerHTML = elemento;
       fragment.append(celdaTabla);
    });
    filaTabla.append(fragment);
    cuerpoTabla.append(filaTabla);
};

//Función pintadora de datos en la tabla para Arrays
const pintarDatosArray = (array) => {

    array.forEach(({titulo, director, año, genero}) => {
        let filaTabla = document.createElement('tr');
        let celdaTabla = document.createElement('td');
        celdaTabla.textContent = ({titulo, director, año, genero});
        fragment.append(celdaTabla);
        filaTabla.append(fragment);
        cuerpoTabla.append(filaTabla);
    });
  
};

//Función para filtrar las películas según los option del select #filtro
const filtrarPorGenero = (array, value) => {
    cuerpoTabla.innerHTML = '';
    let arrayFiltrado = [];

     if (value === 'Todos') {
        arrayFiltrado = array;
        arrayFiltrado.forEach((pelicula) => pintarDatos(pelicula));
     } else {
        arrayFiltrado = array.filter((elemento) => elemento.genero === value); 
        arrayFiltrado.forEach((pelicula) => pintarDatos(pelicula));
     };

     if (arrayFiltrado.length === 0) {
        const generoVacio = document.createElement('td');
        generoVacio.textContent = 'Lo sentimos. No hay ninguna película que mostrar de este género.';
        cuerpoTabla.append(generoVacio);
     };

};
//Invocación funciones
pintarGeneros();


        /*(elemento)=> {
        if (elemento.genero === 'Comedia') {
            arrayPeliculasComedia.push(elemento);
        } else if (elemento.genero === 'Terror') {
            arrayPeliculasTerror.push(elemento);
        } else if (elemento.genero === 'Accion') {
            arrayPeliculasAccion.push(elemento);
        } else {
            arrayPeliculasRomantica.push(elemento);
        }
    });*/

