//***************************************************************//
CLASE 01
-Tener instalados NodeJS y VS Code
https://code.visualstudio.com/download
https://nodejs.org/es/download/

1- Creamos una nueva carpeta para el proyecto llamada servidor01

2- desde la consola / terminal de VS Code ingresamos a la carpeta y tipeamos

npm init -y

npm es un gestor de paquetes y en este caso crea un nuevo proyecto vacio con una configuracion inicial.
Se crea el archivo package.json que describe al proyecto y permite listar las dependencias

3- creamos tambien una carpeta llamada src dentro del proyecto

4- creamos un archivo llamado index.ts con la siguiente linea

console.log("Hello World!!!!!");

5- si no fue instalado, instalamos typescript: 

npm i typescript -G

6- creamos el archivo de configuracion de typescript dentro de ejemplo01

npx tsc --init

7- 
editamos el archivo tsconfig.json cambiamos target a es6

descomentamos la linea sourcemap que permite rastrear errores del codigo 

descomentamos outdir y apuntamos a ./dist

descomentamos moduleResolution. Luego descomentamos y seteamos baseUrl a ./src para indicar quien es la carpeta base de nuestro proyecto.

A la configuracion del compilador en el archivo tsconfig.json le ponemos una coma separadora y escribimos a continuacion del objeto lo siguiente

"include":["src"],
"exclude":["node_modules"],

8- guardamos los cambios y ejecutamos para que el interprete de TS tome la nueva configuracion.

npx tsc

9- Luego ejecutamos el scrip de index con

node ./dist/index.js

10 - A partir de ahora deseamos ejecutar 2 scripts a la vez. La compilacion y ejecusion del codigo, ya que cada actualizacion del codigo del servidor implica volver a compilar / transpilar. Por ello instalamos el modulo concurrently como dependecia de desarrollo

npm install concurrently -D

Instalamos nodemon para ejecutar luego de que hayan cambios.

npm install nodemon -D

Despues al archivo package.json en la seccion scripts colocamos

"dev":"concurrently \"tsc -w\" \"nodemon ./dist/index.js\"", 

//<== No omitir coma al final de la linea anterior

11- Luego desde consola ejecutamos

npm run dev

Hasta aqui tenemos la configuracion minima para compilar y ejecutar scripts del lado del
servidor.


Ahora debemos crear el servidor que publicara una API REST en la que se basa nuestra aplicacion.

12 - en index.ts escrbimos 
import express from 'express';

Nos indicara que no puede encontrar express y es porque no fue instalado.
13- En otra terminal y en la carpeta principal del proyecto escribimos 

npm install express

La terminal uno, nos marcara un error en express porque typescript necesita descargar el modulo types entonces desde la carpeta server escribimos. Observamos la salida del error.

npm install @types/express --D		y lo instalamos solo para desarrollo.

14- volvemos a index.ts y escribimos la clase para el servidor para mantener el codigo ordenado. Reemplazamos el codigo por el siguiente.

import express, {Application} from 'express';

class Server{
	public app:Application;
	constructor(){
		this.app = express();
		
		//El constructor ejecuta metodos que indicaran configuracion inicial del servidor
		this.config();
		this.routes();
	}
	config():void{
		//Configuraciones
		this.app.set('port',process.env.PORT || 3000);
	}
	routes():void{}
	start():void{
		this.app.listen(this.app.get('port'),() => {
				console.log("Sever escuchando en puerto: "+this.app.get('port'));
			}
		);
	}
}

const server = new Server();
server.start(); //Ejecutamos el metodo start en inica el server

Guardamos los cambios y vamos al navegador, escribimos localhost:3000 veremos un mensaje de express indicando que no se han definido rutas pero el server estara activo.

15 - Si queremos comprobar el servidor instalamos los siguientes modulos desde una terminal

npm i morgan cors

morgan muestra en la consola las peticiones al servidor
cors permite conectar 2 servidores y que estos interactuen. Uno para
node y el otro para angular.

Desde la consola tambien importamos los tipos para desarrollo
npm i @types/morgan @types/cors -D

16- en el metodo config ponemos

//Middlewares
this.app.use(morgan('dev'));

No olvidemos los imports

import morgan from 'morgan';
import cors from 'cors';

ya podemos ver las peticiones que llegan al servidor. Vemos un GET / 404 y es
correcto ya que nos faltan definir rutas para la aplicacion.

17- Antes de crear las rutas agregamos las siguientes configuraciones a config

this.app.use(cors()); //iniciamos cors
this.app.use(express.json()); //habilitamos el intercambio de objetos json entre aplicaciones
this.app.use(express.urlencoded({extended:false}));//habilitamos para recibir datos a traves de formularios html.

//Variables globales


Con shift + ALT +F VS code ordena nuestro codigo

18- Creamos la carpeta routes dentro de src y ponemos el archivo indexRoutes.ts 

Lo importamos en index.ts con
import indexRoutes from './routes/indexRoutes';

El subrayado es porque esta vacio

19- Empezamos con el codigo de indexRoutes.ts 	

import { Router, Request, Response } from 'express';
class IndexRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{
		this.router.get('/',(req:Request,res:Response)=> res.send('Hola Mundo!!!'));
	}
}

//Exportamos el enrutador con 

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;

20- En el archivo index.ts en el metodo routes agregamos

	this.app.use(indexRoutes);
	
Refrescamos el navegador y comprobamos la salida. Ahora es realizada por un servidor web que hemos instanciado y configurado.

21- Si vemos el codigo fuente en el navegador, veremos texto plano y esto no esta bien. Debe estar estructurado en un documento html porque el servidor web intercambia codigo html con el navegador para mostrar contenidos. 

Ahora crearemos el codigo del cliente (front-end) que intercambiara mensajes con el servidor(back-end) para presentar los contenidos que hay en este ultimo.

22- instalamos la linea de comandos de angular de forma global

npm install -g @angular/cli

23- desde la carpeta raiz y en una terminal ponemos

ng new cliente01 --routing

Damos y,  de momento. Luego en la seleccion elegimos CSS y damos enter.
para crear una nueva carpeta de angular. Tarda y depende de la conexion. 
(pueden salir unos warnings de fin de linea si tenemos git instalado)

24- Ingresamos a la carpeta cliente01 en la terminal y ejecutamos el servidor

cd cliente01

ng serve

para publicar el proyecto tambien tarda en cargar asi que paciencia.

25-desde el navegador hacemos localhost:4200 que es el puerto de la aplicacion Angular para desarrollo. O podemos hacer ctrl + click izq en el enlace mostrado en la terminal.

26- Modificamos el archivo app.component.html de cliente01/src/app/ .Borrando todo menos la etiqueta router-outlet. Y arriba de la etiqueta escribimos el hola mundo. Refrescamos luego el navegador.

Hola Mundo En HTML!!!!

27- Podremos comprobar en el navegador la salida del texto envuelto en la extructura base de un documento HTML viendo el codigo fuente. Y desde las herramientas de desarrollador (F12) podremos observar el DOM con el Hola mundo.


TAREA PARA EL HOGAR!!!!
1- Mirar el video para tener un panorama general de tecnologias web al 2020
https://www.youtube.com/watch?v=B-xexrR-tEo

2- Leer los documentos Introduccion a la arquitectura Web e Introduccion a la Wolrd Wide Web para reforzar la teoria vista en clase.

3- Armar grupos y publicar los integrantes en el foro

4- Investigar y realizar el deploy de nuestra app en un live server. (Heroku es pago)

5- Dar una leida a la tabla de contenidos del material bibliografico.

https://docs.microsoft.com/es-es/previous-versions/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-6

Para compartir entre equipos borrar carpeta node_modules fuera de las carpetas de proyectos. Borrar el archivo .json.lock

https://www.youtube.com/watch?v=p6oODCpTTBA Explicacion del archivo package.json

Deploy Heroku
https://www.youtube.com/watch?v=maNWl202vy4
https://www.youtube.com/watch?v=r2S89Hm1Uq0
https://www.youtube.com/watch?v=GDcExsC31hQ
https://www.youtube.com/watch?v=nm7gWyZvdVU


//***************************************************************//
CLASE 02

01-Tomamos el proyecto que mas avanzamos en clase, cliente01, lo copiamos y pegamos. Lo renombramos a cliente02. Puede demorar, se recomienda tener cerrado VSCode.

02- el HTML base deEjecutamos con ng serve y observamossde el codigo fuente y desde la vista de elementos(F12). Prestamos atencion a las secciones Head y Body. Observamos que es el mismo codigo que encotramos en index.html

Tener presente la perspectiva de:
-Usuario
	-Contenido visual(barras de menues, parrafos, formularios, enlaces, etc)
-Desarrollador
	-Contenido estructurado en HTML
	-Objetos del DOM(Document Object Model)

<app-root></app-root> se define como componente dentro de /src/app/app.component.ts y es la componente principal de nuestra app.

<router-outlet> le dice al enrutador dónde mostrar las vistas enrutadas. La navegación por la aplicación consistiría en pasar de una vista a otra sin salir nunca de la página HTML que tuviera la etiqueta “router-outlet”

03-ingresamos a la carpeta cliente02 para crear los componentes de nuestra aplicacion.

cd cliente02

Luego creamos los componentes de nuetro proyecto.
En Angular la pieza fundamental es la 'COMPONENTE'. Debemos pensar siempre que una aplicación se construye a base de un conjunto de componentes (por ejemplo pueden ser componentes: un menú, lista de usuarios, login, tabla de datos, calendario, formulario de búsqueda etc.)

ng generate component components/navigation

ng generate component components/usuarios-ingresar

ng generate component components/usuarios-registrar

ng generate component components/usuarios-listar

ng generate component components/vista

todos se crean dentro de la carpeta src/app/components

Angular CLI nos crea una componente principal llamada 'AppComponent' que se distribuye en 4 archivos:
app.component.ts => codigo de typescrip que enriquece el comportamiento del componente
app.component.html => codigo de HTML que estructura el contenido del componente
app.component.css  => codigo de CSS que enriquece el aspecto del componente
app.component.spec.ts => Utilizado para hacer testing unitario
Todos estos archivos se localizan en la carpeta 'app' y esta carpeta se encuentra dentro de la carpeta 'src'

Hace algo similar con cada componente creada. Un archivo .css, un html, un .ts y un specs.ts

Nosotros trabajaremos en general los 3 primeros archivos.

04- Incorporar el siguiente tag al bloque app.component.html

	<a name="tope"> TOPE </a>
	
05- Agregar el siguiente texto a continuacion

Texto de 60 columnas<BR>
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

06-Agregar el siguiente enlace
<a href="#tope"> Ir arriba </a>

07-Agregar el siguiente texto:

Se enojó la Luna,
se enojó el lucero,
porque esta niñita
riñó con el sueño.
Duérmete, Natacha,
para que la Luna
se ponga contenta
y te dé aceitunas.

08-Corregir si es necesario y agregar la siguiente linea de configuracion en index.html:

<meta charset="utf-8">

(chequear que todos los archivos se guarden con codificacion UTF-8 sin BOM)


Cuando hay dificultades para mostrar caracteres acentuados o la Ñ por ejemplo. Es necesaria esta configuracion.

7-Agregar los siguientes atributos/parametros en el tag/etiqueta body
bgcolor="556677" align="center"

(Recordar que mas adelante seran reemplazados por codigo CSS)

--Elementos / etiquetas orientadas a bloques de texto
09-Agregar los siguientes encabezados en app.component.html
<H1>Encabezado tipo 1</H1>
<H2>Encabezado tipo 2</H2>
<H3>Encabezado tipo 3</H3>
<H4>Encabezado tipo 4</H4>
<H5>Encabezado tipo 5</H5>
<H6>Encabezado tipo 6</H6>

10-Agregar el mismo texto con etiquetas contenedores y ver que pasa
<div>Se enojó la Luna,
se enojó el lucero,</div>
<span>porque esta niñita</span>
<span>riñó con el sueño.</span>
<div>Duérmete, Natacha,
para que la Luna
se ponga contenta
y te dé aceitunas.</div>

11-Tomar el texto de 60 columnas y probar las etiquetas <div>,<span>,<p> y <blockquote>
(Son contenedores)


12-Listas numeradas, sin numerar, y descripciones. Se crean con <ol>, <ul> y <dl>

Agregue a cada lista los siguientes elementos y observe las diferencias
<li> Primer elemento </li>
<li> Segundo elemento </li>
<li> Tercer elemento </li>
<li> Cuarto elemento </li>

Agregue las siguientes definiciones

  <dt>Coffee</dt>
  <dd>Black hot drink</dd>
  <dt>Milk</dt>
  <dd>White cold drink</dd>

--Elementos / etiquetas orientadas a caracter
<strong>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</strong><br>
<em>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</em><br>
<small>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</small><br>
<mark>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</mark><br>
<cite>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</cite><br>
<dfn>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</dfn><br>
<u>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</u><br>
<i>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</i><br>
<b>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</b><br>
<strike>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</strike>

13-Agregar el siguiente enlace y ver donde apunta la barra de estado
<a href="http://www.google.com.ar"> Ir a google </a>

14-Probar los atributos target="_self" y target="_blank" en dicho enlace

16- Crear una imagen con el tag img. No tiene tag de cierre

<img src=".." alt=".." align=".." width="" height="" border="..">

<img src="Ruta_archivo" alt="Texto_descriptivo" align="left|right|center" width="px|%" height="px|%" border="px">

<img src="./assets/media/skyline.jpg">

<img src="./assets/media/skyline.jpg" alt="Nissan Skyline" align="center" width="640" height="480" border="3">

Dentro de la carpeta assets, creamos la carpeta media y arrastramos los archivos de la carpeta media provista con los apuntes de la clase. 

17-Tablas <table>, filas <tr> y celdas <td>

<table>
	<tr>
		<td>1.1</td>
		<td>1.2</td>
	</tr>
	<tr>
		<td>2.1</td>
		<td>2.2</td>
	</tr>
</table>

Agregado de titulo mediante caption y combinacion de celdas mediante colspan y rowspan. Estos
atributos le dicen a td que abarcara tantas columnas o tantas filas.
<table border="1">
<caption>Titulo de la tabla</caption>
	<th>Titulo1</th>
	<th>Titulo2</th>
	<th>Titulo3</th>
	<th>Titulo4</th>	
	<tr>
		<td>1</td>
		<td>2</td>
		<td>3</td>
		<td>4</td>
	</tr>
	<tr>
		<td colspan=2>A</td>
		<td colspan=2>B</td>
	</tr>
	<tr>
		<td rowspan=2>W</td>
		<td>X</td>
		<td>Y</td>
		<td>Z</td>
	</tr>
	<tr>
		<td>1</td>
		<td>2</td>
		<td>3</td>
	</tr>
</table>

--Multimedia audio y video

18-Agregar los siguientes bloques
<audio controls>
  <source src="horse.ogg" type="audio/ogg">
  <source src="horse.mp3" type="audio/mpeg">
  Tu navegador no soporta etiquetas de audio.
</audio>

<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
  Tu navegador no soporta etiquetas de video.
</video>

--Incrustar elementos de otros sitios mediante iframe
19-Agregar el siguiente bloque
<iframe width="640" height="360" src="https://www.youtube.com/embed/ytQ5CYE1VZw" frameborder="0" allowfullscreen>No soporta iframe</iframe>
<iframe width="640" height="360" src="https://www.youtube.com/embed/r0VgFZv7o0k" frameborder="0" allowfullscreen>No soporta iframe</iframe>
<iframe width="640" height="360" src="https://www.youtube.com/embed/V15BYnSr0P8" frameborder="0" allowfullscreen>No soporta iframe</iframe>


--Formularios
Esquema general
<form action="/" method="get | post">
….
….
</form>

20-Crear cliente03 a partir del esquema de cliente02. 

Crear el siguiente componente

ng generate component components/vista

Cambiar el titulo de index html a cliente03. 
Quitar los atributos align y bgcolor de body. 

Luego reemplazar todo el codigo de app.component.html por

<app-vista></app-vista>

y en vista.component.html agregamos

<form action="/" method="get">

</form>

Cuando guardemos los cambios veremos Vista Works!!! indicando que el componente esta listo. Podemos quitar el parrafo ya que colocaremos nuevo contenido.

21-Inlcuir elementos checkbox en el formulario
<input type="checkbox" name="check" value="opcion 1" checked> opcion 1<br>
<input type="checkbox" name="check" value="opcion 2" checked> opcion 2<br>

Forma general del control input
<input tipo, variable, valor>Texto_opcion

22-Incluir los siguienes radiobutton

<input type="radio" name="radio" value="1" checked> opcion 1<br>
<input type="radio" name="radio" value="opcion 2"> opcion 2<br>

--Listas de seleccion simple y combo
23-
<select name="lista" size="">
	<option value="Opcion 1" selected> Opcion 1</option>
	<option value="Opcion 2"> Opcion 2</option>
	<option value="Opcion 3"> Opcion 3</option>
</select>
<br>
<select name="Combo">
	<option value="Opcion 1"> Opcion 1</option>
	<option value="Opcion 2"> Opcion 2</option>
	<option value="Opcion 3"> Opcion 3</option>
</select>
<br>

24-Lista de multiples selecciones
<select name="colores[]" size="4" multiple>
	<option value="1">Rojo</option>
	<option value="2">Verde</option>
	<option value="3">Azul</option>
	<option value="4">Amarillo</option>
	<option value="5">Blanco</option>
	<option value="6">Negro</option>
	<option value="7">Naranja</option>
	<option value="8">Violeta</option>
</select>

25-Lista con grupos de opciones
	Seleccione una fruta o verdura:
	<select name="articulo">
		<optgroup label="Frutas">
			<option value="1">Naranjas</option>
			<option value="2">Manzanas</option>
			<option value="3">Sandía</option>
			<option value="4">Frutilla</option>
			<option value="5">Durazno</option>
			<option value="6">Ciruela</option>
		</optgroup>
		<optgroup label="Verduras">
			<option value="7">Lechuga</option>
			<option value="8">Acelga</option>
			<option value="9">Zapallo</option>
			<option value="10">Papas</option>
			<option value="11">Batatas</option>
			<option value="13">Zanahorias</option>
			<option value="14">Rabanitos</option>
			<option value="15">Calabaza</option>
		</optgroup>
	</select>

26-Cuadros de texto

Simple
<input type="text" name="cuadro" size="40" maxlength="256">

<input type="number" name="cantidad" value="4" size="5" maxlength="5" min="0" step="2">

Tipo password
<input type="password" name="password" size="40" maxlength="256">

Email
<input type="email" name="email" size="40" maxlength="256">

Texto multilineas
<textarea name="textarea" cols="30" rows="5"></textarea>

27-Controles sobre los eventos del formulario

Borrar
<input type="reset" value="Reset">

Enviar
<input type="submit" value="Enviar">

Evento generico.
<input type="button" value="Boton">
111111111111111111111111111111
En este caso los valores seran el texto exhibido por el boton

Ver diferencia entre get y post. Recordar la forma de la URL protocolo://dominio/objeto/metodo/parametro

28-Control tipo hiden
<input type="hidden" name="Escondido" value="hola">

29-Agrupamiento de controles del formulario

<fieldset>+<legend>...</legend> ... </fieldset>
fieldset recuadra el grupo y legend agrega un texto al recuadro



30-Etiqueta label, asocia un texto al control. Visualmente no difiere si esta no estuviera presente, pero es util con sintentizadores de voz para leer el nombre del campo etiquetado.
<label for="nombre_del_control">texto_asociado_al_control</label>

31-Control de foco de los campos del formulario.
La propiedad tabindex en cada control determina el orden que recorre el cursor al presionar TAB

uso  <etiqueta_control tabindex="valor_numerico"> 

32-La propiedad disabled en un control deshabilita este. Por default son todos enabled

Los siguientes elementos pueden inhabilitarse:
button, input, optgroup, option, select y textarea.


Hasta aqui vemos los controles de los formularios. Queda pendiente obtener los datos y trabajar con ellos.

Tarea para el hogar
1-Crear una tabla que liste 5 provincias argentinas y sus capitales. Por ejemplo:
Buenos Aires, La Plata
Chaco, Resistencia
Chubut, Rawson
Formosa, Formosa
Entre Ríos, Paraná

2-Generar un favicon desde el enlace siguiente. Descargar la imagen, copiar y pegar el codigo de insercion
http://www.genfavicon.com/es/ en la cabecera

3-Poner en practica los elementos HTML vistos y hacer una presentacion interesante.

4-Tomar un proyecto angular terminado hasta ahora. Borrar la carpeta node_modules. Enviar a los compañeros el proyecto comprimido con 7zip en el maximo nivel de compresion.
Luego los compañeros deben descomprimir el proyecto en la carpeta de trabajo, ejecutar desde la terminal el comando npm install dentro de la carpeta del proyecto. El comando tomara el archivo package.json e instsalara todas las dependencias que fueron borradas cuando borramos la carpeta node_modules. Luego compilar y ejecutar con ng serve. Deberiamos ver el proeyecto en ejecusion en el navegador al hacer click en 
http://localhost:4200/

//***************************************************************//
CLASE 03

01-Tomamos el proyecto que mas avanzamos en clase, cliente02, lo copiamos y pegamos. Lo renombramos a cliente03. Si no lo hicimos previamente. Puede demorar, se recomienda tener cerrado VSCode.

03-ingresamos a la carpeta cliente03 para crear los componentes de nuestra aplicacion. Si no lo hicimos previamente.

cd cliente03

En Angular la pieza fundamental es la 'COMPONENTE'. Debemos pensar siempre que una aplicación se construye a base de un conjunto de componentes (por ejemplo pueden ser componentes: un menú, lista de usuarios, login, tabla de datos, calendario, formulario de búsqueda etc.)

ng generate component components/vista

Angular CLI nos crea una componente principal llamada 'AppComponent' que se distribuye en 4 archivos:
app.component.ts
app.component.html
app.component.css
app.component.spec.ts

Todos estos archivos se localizan en la carpeta 'app' y esta carpeta se encuentra dentro de la carpeta 'src'

Hace algo similar con cada componente creada. Un archivo .css, un html, un .ts y un specs.ts

Nosotros en general trabajaremos los 3 primeros.


04-desde el navegador hacemos localhost:4200 que es el puerto de la aplicacion Angular para desarrollo.

05- Borramos el contenido de vista.component.html

06-Al principio del archivo app.component.html colocamos la etiqueta <app-navigation></app-navigation>

y quitamos <app-vista></app-vista>

Probamos los cambios en el navegador. Recordar que un componente es un elemento de la pantalla del navegador o incluso toda la pantalla. En el se vincula elementos estructurales (HTML), aspecto (CSS) y comportamiento (JavaScript / typescript).

vamos a navigation.component.html colocaremos una barra de menues.

07- Para ello tomamos bootstrap 4.6 desde 

https://getbootstrap.com/docs/4.6/getting-started/introduction/

Se trata de un framework desarrollado por Twitter para crear sitios responsive (que adaptan su aspecto al dispotivo que lo usa).

Pegamos el siguiente bloque en el archivo index.html en la seccion head.
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">

Luego debajo de <app-root></app-root> antes de cerrar body colocamos

<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js" integrity="sha384-+YQ4JLhjyBLPDQt//I+STsc9iw4uQqACwlvpslubQzn4u2UU2UFM80nGisd026JF" crossorigin="anonymous"></script>

Con esto integramos bootstrap a nuestra app cliente. Notaremos que en este punto se ingnoran los atributos establecidos en BODY por lo que quitamos bgcolor.

08-En la pagina de bootstrap 4.6 copiamos el ejemplo de navegacion navbar a nuestro poryecto, en la seccion Components/nav elegiremos el primero y lo ponemos en navigation.component.html. Lo modificamos para que quede de la siguiente manera.

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Principal</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
            <li class="nav-item active">
                <a class="nav-link" href="#">Iniciar sesión<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Vista</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Listar usuarios</a>
            </li>			
        </ul>
    </div>
</nav>

09-Los enlaces no dirigen a ningun lado. Porque no hemos establecido rutas en angular. Para ello buscamos el archivo app-routing.module.ts en el hay un arreglo donde colocamos las rutas de nuestra app. Aqui decimos para cada ruta que componente se debe renderizar.

Agregamos los siguientes import

import { UsuariosListarComponent } from "./components/usuarios-listar/usuarios-listar.component";
import { VistaComponent } from "./components/vista/vista.component";

El patron es pasamos los objetos a utilizar entre llaves y la ubicacion entre comillas "
Tener cuidado que el asistente de VSCode autocompleta con comilla simple '

Luego el array del enrutador queda como sigue 

const routes: Routes = [
	{
		path: 'usuarios/listar',
		component: UsuariosListarComponent
	},
	{
		path: 'usuarios/vista',
		component: VistaComponent
	},
];

Con esto ahora cuando visitemos por ejemplo localhost:4200/usuarios/listar se listaran los usuarios creados.

Agregamos usuarios/listar, usuarios/vista como atributo href de nuestro menu en navigation.component.html


10-Si prestamos atencion cuando hacemos click en los enlaces veremos que se realizan peticiones al servidor que refrescan la pantalla del navegador. Cosa que no deberia suceder en aplicaciones angular, react, etc. Nos esta faltando el router link, la parte de angular que captura el click y actualiza zonas especificas de la aplicacion y no toda la pantalla del navegador. Similar a las peticiones con AJAX. Es decir, que la propia aplicacion procesa las peticiones y solo interactua con el servidor cuando es necesario. Necesitamos editar en el componente navigation.comoponent.html las etiquetas <a>. En lugar de usar atributos href debemos usar routerLink.
	
Podemos notar que ahora toda la parte visual se ejecuta en el navegador. Es decir, se descargan los componentes necesarios para renderizar las vistas de la app y luego el navegador se encarga de presentarlas segun sea necesario. Sin hacer nuevas peticiones al servidor. Se pierde el concepto de redireccion. Ya que de acuerdo a las peticiones, Angular carga el componente acorde. Estamos en presencia de lo que se conoce como SPA(Single Page Aplication). Ahora todo ocurre como si sucediera en la misma pagina.

Por otra parte, el patrón de diseño single-page application (SPA) es una evolución del patrón de diseño MPA + AJAX, pero llevando al extremo el uso de AJAX. Hasta el punto de que en el cliente se carga una única página que se modifica desde el propio cliente (navegador) según las acciones de usuario. Por tanto, toda la navegación por las distintas pantallas o interfaces de la aplicación se realizará sin salir de esa única página.
Una de las principales ventajas de las aplicaciones SPA respecto las MPA es la mejora de experiencia de usuario debido a la reducción en el tiempo de respuesta ante las acciones del usuario. Esto se consigue gracias a que:
• Ya no se crean páginas completas por cada acción del usuario.
• Solo se intercambia la información necesaria con el servidor.


OneWayDataBinding
11- Creamos una nueva carpeta en app/ para el modelo llamada models

dentro creamos el archivo usuarioModel.ts con el siguiente contenido

export interface Usuario{
	id?: number;
	nombre?: string;
	email?: string;
	password?: string;
	rol?: string;
	alta?:Date;
	activado?: string;
	perfil?: string;
}

Asi quedara definida en el modelo la estructura de datos de un Usuario. Recordar el patron MVC (Modelo-Vista-Controlador)

12- Definamos a continuacion los atributos del objeto vista en vista.component.ts

Es de notar que uno es una variable de tipo string y el otro es un array de objetos definido en Usuario. Cada elemento del array es un objeto de tipo Usuario y esta escrito en notacion JSON siguiendo la estructura. 

Objeto => { 
	"Atributo1":"Valor1",
	"Atributo2":"Valor2",
	"Atributo3":"Valor3"
}

Notar que la ultima sentencia no lleva coma

titulo:String ="Vista formulario";

usuarios:Usuario[] = [{
    "id": "1",
    "nombre": "Pedro",
    "email": "pedro@email.net",
    "password": "123456",
    "rol": "admin"
  }, {
    "id": "2",
    "nombre": "Juan",
    "email": "juan@email.net",
    "password": "123456",
    "rol": "usuario"
  }, {
    "id": "3",
    "nombre": "Hugo",
    "email": "hugo@email.net",
    "password": "123456",
    "rol": "usuario"
  }, {
    "id": "4",
    "nombre": "Carlos",
    "email": "carlos@email.net",
    "password": "123456",
    "rol": "admin"
  },{
    "id": "5",
    "nombre": "Maria",
    "email": "maria@email.net",
    "password": "123456",
    "rol": "admin"
  }];

Se pueden validar la sintaxis en
https://jsonlint.com/

No olvidar el import

import { Usuario } from "src/app/models/usuarioModel";

Luego en el template vista.comoponent.html colocamos

<div><h1>{{titulo}}</h1></div> Any

Veremos el valor del atributo en el template. La operacion es conocida como interpolacion y forma parte del binding de datos en un sentido (OneWayDataBinding). Desde la clase del componente hacia su template o hacia el DOM.

Si a la definicion del atributo le agregamos el modificador private, no podremos accederlo si no es a traves de un metodo. Por defecto todos los atributos definidos en Angular son public

Si en el metodo ngOnInit ponemos la siguiente linea 

this.titulo=2.3;

veremos que TypeScript protesta porque la definicion dice string. Si ponemos el numero entre comillas no dara error. Si cambiamos :String por :any tendremos una variable que puede aceptar cualquier tipo que se indique a la derecha de la asignacion. Si no especificamos tipo, TypeScript adopta el tipo de la primera asignacion, no pudiendo cambiarse con una nueva asignacion. Especificar el tipo ayuda a la lectura de la clase por parte del equipo de desarrollo y se recomienda hacerlo como buena practica.
Volvemos el atributo a su forma original.

13- Uso de la directiva ngFor. 
Puede ser tentador interpolar el atributo usuarios y de hecho lo vamos a hacer. Pero hay que recordar que usuarios en un array.
Agregamos las siguientes dos lineas al constructor para ver que todo sigue alli
tal y como declaramos

    console.log(this.titulo);
    console.log(this.usuarios)
	
Para ver los objetos en el template de nuestro componente vista usaremos la directiva *ngFor como sigue

<div class="col-md-4" *ngFor =" let usuario of usuarios">
    <!--{{usuario.nombre}}-->
    {{usuario.nombre}}
    
</div>

Notemos el atributo *ngFor de la etiqueta div. *ngFor en angular se lo conoce como directiva para que angular pueda hacer algo.

En este caso la directiva permite insertar bloques de código de ngFor HTML forma dinámica, basándose en una lista de elementos (en general, arrays). La sintaxis general es la siguiente:
<tag *ngFor=”let elemento of elementos”></tag>

Tambien si es necesario podemos averiguar el número del elemento que se está
tratando si añadimos let i=index, tal y como se muestra
a continuación:

<tag *ngFor=”let elemento of elementos ; let i=index “></tag>

por ejemplo agregamos a nuestro template

<div class="col-md-4" *ngFor =" let usuario of usuarios; let i=index" >
    <!--{{usuario.nombre}}-->
    {{i}} {{usuario.nombre}}
    
</div>

Si hacemos click secundario y damos ver codigo fuente. Ya no veremos las etiquetas html dibujadas. Esto es porque no viene nada estaticamente del servidor. O mejor dicho, es angular quien se encarga de dibujar todo en el navegador cuando angular es descargado del servidor.

Si vemos la consola de desarrollador en el navegador, vamos a la seccion elements para ver el DOM(Document Object Model). Buscamos body y desplegamos app-root veremos las etiquetas HTML que conforman nuestro DOM. Veremos que se ha creado dinamicamente un div por cada elemento del array. 

Notemos el valor de *ngFor es "let usuario of usuarios". Usuario es el objeto iterador y usuarios el array de elementos que iteramos. 

Es de notar tambien que usuarios es la variable declarada en la clase y nunca se la pasamos al template del componente usuarios-listar.component.html esto ocurre porque angular hizo un binding entre la propiedad declarada en el componente y la nombrada en el template entre {{}}. El binding es un mecanismo que permiten la comunicación entre un componente y su template. Este binding es simple o unidireccional. Despues existe el binding bidireccional que sirve para que una propiedad enlazada en el template pueda comunicar datos al componente. Luego estaremos viendo ejemplos de esa situacion. Ver imagen adjunta de binding.


14- Ahora dentro del *ngFor luego de listar el usuario pondremos lo siguiente

<div *ngIf="usuario.rol=='admin'">{{usuario.nombre}} <b>es el admin ;)</b></div>

La directiva *ngIf permite añadir comportamiento dinámico a HTML mediante
una etiqueta o selector. Si se cumple la condicion se puede agregar esa etiqueta al DOM. Si no, no se agrega. Ver salida en el navegador y en la seccion elements se destaca false para uno de los usuarios. Si solo tiene admins o users de mas esta decir que podemos editar las filas de la tabla user segun necesitemos.

Supongamos que ahora queremos destacar a los admin de una forma y a los users de otra entonces tenemos 2 salidas posibles, bastara una sentencia if else. La estructura *ngIf es como a continuación.

    <div *ngIf="usuario.rol=='admin'; else user">{{usuario.nombre}} <b>es el admin ;)</b></div>
    <ng-template #user>{{usuario.nombre}} <em>es el user :D</em></ng-template>

En general las directivas estructurales: alteran la estructura del DOM añadiendo,
sustituyendo o eliminando elementos. Empiezan por asterisco (*).
• ngFor: permite iterar sobre una lista de elementos y realizar diversas
acciones en un HTML como, por ejemplo, fabricar listas.
• ngIf: en base a una evaluación, crea o elimina elementos en el DOM.
• ngSwitch: gestiona conjuntos de tags eliminando los que no cumplan
una condición.

Queda de tarea para la proxima actividad ejemplificar la directiva ngSwitch.

15- Supongamos que queremos utilizar los datos de los usuarios desde diferentes componentes. Con lo que sabemos hasta ahora deberiamos copiar y pegar el objeto usuarios en cada componente. Podriamos preguntarnos si no seria mejor instanciar el objeto en cada componente que lo vaya a utilizar. Para ello nos vamos a valer de un servicio. De esta forma podremos disponer de los mismos datos en cualquier componente. Y no solo eso. Estaremos preparados para obtener datos desde el back end que es como lo planteamos hace algunas clases.

Creamos un servicio en app desde la terminal llamado services/usuarios, este se comunicara mas tarde con la app servidor.

ng generate service services/usuarios

se crea una nueva carpeta dentro de app.

16- Para conectar con el servidor de nodejs(backend) necesitamos de la capa de servicio. Para indicarle a Angular que utilizara servicios en el archivo app.module.ts ponemos

import {UsuariosService} from "./services/usuarios.service";

Luego en el array providers ponemos UsuariosService y trabajamos en usuarios.service.ts 

17- En usuarios.service.ts ponemos
import {HttpClient} from '@angular/common/http' 

Es una interfaz que nos permitira hacer peticiones http al servidor de node. Luego la clase nos queda

export class UsuariosService{
	API_URI = 'http://localhost:3000/user';
	usuarios: Usuario[];
	
	constructor(/*private http: HttpClient*/){}

	listarUsuarios(){
		//para expandir/especializar las variables usamos ` y no ' o "
		//Las variables salen pintadas de otro color diferente del de texto
		//return this.http.get(`${this.API_URI}/list`);
		//si no funciona usar 
		//return this.http.get(this.API_URI+'/list');
	}
	
	buscarUsuario(id:string){
		//return this.http.get(`${this.API_URI}/find/${id}`);
	}
}

Agregamos el import de Usuario que nos debe estar faltando

import { Usuario } from "src/app/models/usuarioModel";

18- Ahora el atributo usuarios del servicio lo inicializamos en su constructor de la siguiente forma

    this.usuarios = [{
      "id": "1",
      "nombre": "Pedro",
      "email": "pedro@email.net",
      "password": "123456",
      "rol": "admin"
    }, {
      "id": "2",
      "nombre": "Juan",
      "email": "juan@email.net",
      "password": "123456",
      "rol": "usuario"
    }, {
      "id": "3",
      "nombre": "Hugo",
      "email": "hugo@email.net",
      "password": "123456",
      "rol": "usuario"
    }, {
      "id": "4",
      "nombre": "Carlos",
      "email": "carlos@email.net",
      "password": "123456",
      "rol": "admin"
    }, {
      "id": "5",
      "nombre": "Maria",
      "email": "maria@email.net",
      "password": "123456",
      "rol": "admin"
    }];
	
Luego al metodo listarUsuarios le agregamos la siguiente linea que devolvera los usuarios instanciados en el servicio.

return this.usuarios;
	
Hasta aqui nos hemos centrado en crear el servicio y notificar a Angular de su existencia.

19- Ahora utilizaremos el servicio en el componente vista de forma que muestre los usuarios de la misma forma que inicialmente declaramos.
Al constructor de nuestro componente vista lo cambiamos por

  constructor(private usuariosService:UsuariosService) {
    this.usuarios = usuariosService.listarUsuarios();
    console.log(this.titulo);
    console.log(this.usuarios)
  }
  
  Que simplemente instancia el servicio en el constructor e inicializa luego el atributo usuarios con el objeto array de tipo Usuario declarado en el servicio.
  
Si todo esta bien reemplazamos la declaracion del atributo usuarios del componente por la siguiente linea

usuarios: Usuario[];

En el navegador deberiamos seguir viendo lo mismo. Solo que ahora se simplifica el codigo del componente desacoplandolo de los datos que pueden ser usados desde mas de un componente. Por supuesto cada componete puede tener las instancias locales que necesite.


20-Ahora escribamos el siguiente contenedor en el template 

<div class="component">
    
</div>

agreguemos el atributo *ngIf="revelar" y pongamos dentro un bloque *ngFor como sigue

<div class="component" *ngIf="revelar">
    <div class="col-md-4" *ngFor =" let usuario of usuarios">
        <!--{{usuario.nombre}}-->
        {{usuario.nombre}}
        <div *ngIf="usuario.rol=='admin'; else user">{{usuario.nombre}} <b>es el admin ;)</b></div>
        <ng-template #user>{{usuario.nombre}} <b>es el user :D</b></ng-template>
    </div>
</div>

Angular protestara porque en nuestro componente usuarios-listar.component.ts  no hemos declarado 

revelar:boolean=false;

Lo colocamos dentro de la clase a continuación de usuarios. Guardamos los cambios
angular deberia dejar de protestar y ocultarnos los usuarios. De hecho la sentencia *ngFor del template no existe en el DOM en tanto no se cumpla la condicion. Es decir que revelar sea true.

21-Ahora veamos las tablas.La idea es adaptar las tablas para que funcionen en angular. Deberemos aplicar las directivas vistas previamente. 

La estructura base de una tabla en angular y que vamos a agregar es 

<table>
    <thead></thead>
    <tbody></tbody>
</table>

-El primer cambio es incorporar thead en las etiquetas como sigue.

    <thead>
        <th>ID</th>
        <th>Nombre</th>
        <th>password</th>
        <th>Accion</th>
    </thead>
	
-Luego colocamos tbody condicional como sigue para cambiar el cuerpo de la tabla segun una condicion. Si la condicion se cumple iteramos con *ngFor y dibujamos las celdas

    <tbody *ngIf="usuarios.length > 0; else fila">
        <tr *ngFor=" let usuario of usuarios">
            <td>{{usuario.id}}</td>
            <td>{{usuario.nombre}}</td>
            <td>{{usuario.password}}</td>
        </tr>
    </tbody>
	
Notamos el *ngFor en la etiqueta tr, quiere decir que se genera una nueva fila por cada elemento en usuarios. Siendo usuarios el array de filas obtenidas desde el servidor o cargado estaticamente. Tambien hemos introducido la etiqueta tbody para completar nuestra tabla. Al estar condicionada por *ngIf, el array tiene filas la etiqueta tbody se imprime con las filas del array. Caso contrario se imprime la etiqueta con el atributo o marcador #fila. Y es lo que nos falta para completar nuestra tabla, por lo que agregamos. Tengamos presente que la proxima etiqueta que sigue a *ngIf, por el lado del falso(else) ,
se coloca a continuacion y nunca dentro de *ngIf. Para hacer el else, deben estar al mismo nivel. Por lo tanto luego de tbody, colocamos:

    <ng-template #fila>
        <tbody>
            <tr>
                <td colspan="4">No hay mas filas</td>
            </tr>
        </tbody>
    </ng-template>
	
Observamos los cambios y cambiamos la condicion para que no se impriman filas y corroborar el else funciona como esperamos poniendo en el constructor:

this.usuarios = [];

Luego comentar esa linea nuevamente para disponer de los datos



22-Ahora vamos a agregar un formulario pero que funcione en Angular. El mismo se declara a continuacion

<form  (submit)="procesar()" method="get">

</form>

En su cuerpo agregamos agregamos el boton

<button type="submit" class="btn btn-success btn-block">Enviar</button>

Angular es un framework y tiene su forma particular de trabajar como habiamos adelantado y que hacen en general los frameworks. En este caso se cambio action de HTML tradicional por la captura del evento (submit) con el metodo a ejecutar cuando se envie el formulario.

Un evento es una notificación de que alguna característica interesante acaba de ocurrir, generalmente relacionada con el usuario que navegar un sitio.

Dichas características pueden ser muy variadas:

-Click de ratón del usuario sobre un elemento de la página
-Pulsación de una tecla específica del teclado
-Reproducción de un archivo de audio/video
-Scroll de ratón sobre un elemento de la página
-El usuario ha activado la opción «Imprimir página»

Como desarrolladores, nuestro objetivo es preparar nuestro código para que cuando ocurra un determinado evento, se lleve a cabo una funcionalidad asociada mejorando el comportamiento de la aplicacion. De esta forma, podemos preparar nuestra aplicación para que cuando ocurran ciertos eventos esta reaccione a ellos ejecutando el codigo manejador del evento.

En javascript nativo se solia asociar eventos mediante atributos de HTML, mediante propiedades de javascript o bien usando el metodo addEventListener(). Angular utiliza lo que se conoce como Event Binding (binding de eventos). Vincula un elemento HTML del template o vista con el codigo manejador de eventos a ejecutar. El manejador es un metodo de la clase del componente al que pertenece la vista. Su sintaxis es:

(evento)=manejador([parametros]);

Si guardamos los cambios angular nos dara un error de compilacion indicando que no existe el metodo procesar.

A la clase VistaComponent le agregamos el metodo procesar.

  procesar(): void {
    console.log("Uso de procesar");
  }


23- Para que el formulario se pueda usar y la aplicacion capture el evento click debemos importarlo a angular. En app.module.ts  hacemos el import.

import {FormsModule} from '@angular/forms'

despues en la seccion imports agregamos una , y luego 

FormsModule

En este punto si damos click en enviar podemos ver que es capturado y se imprime el mensaje en la consola del navegador.



////////////////////////



24- Ahora repetimos de forma similar la estructura para imprimir el formulario con la tabla anidada.

<form (submit)="procesar()" method="post">
    <fieldset>
        <legend>Seleccion multiple</legend>
        <table border="2">
            <thead>
                <th>ID</th>
                <th>Nombre</th>
                <th>password</th>
                <th>Accion</th>
            </thead>
            <tbody *ngIf="usuarios.length > 0; else fila">
                <tr *ngFor=" let usuario of usuarios">
                    <td>{{usuario.id}}</td>
                    <td>{{usuario.nombre}}</td>
                    <td>{{usuario.password}}</td>
                </tr>
            </tbody>
            <ng-template #fila>
                <tbody>
                    <tr>
                        <td colspan="4">No hay mas filas</td>
                    </tr>
                </tbody>
            </ng-template>
        </table>
        <button class="">Enviar</button>
    </fieldset>
</form>


No olvidar declarar el metodo manejador de eventos (en este caso procesar) antes de guardar y compilar. Colocamos luego del metodo ngOnInit

procesar():void{}

25-Agregamos un control checkbox en la cuarta columna de nuestra tabla / formulario

<td><input type="checkbox" value="{{usuario.id}}" (click)="addRemoveItem($event)"></td>

y el metodo correspondiente dentro de la clase luego de procesar()

addRemoveItem($event:any):void{}

En este caso estamos haciendo binding unidireccional (OneWayDataBinding) desde el template hacia la clase a traves de $event. Capturamos el evento click. Es de notar que en la cabecera de addRemoveItem $event es de tipo any. Si no lo colocamos, typescript nos dara error de tipo.

Es de notar que el checkbox no tiene el atributo name o ngModel que vermos mas adelante. Ante una selaccion multiple lo logico es poner un array como atributo name de HTML y que este guarde las opciones indicadas por value. El caso es que al trabajar con angular, el resultado no es un array con las opciones si no un array con el estado de las opciones del tipo true / false. Nuestro enfoque se basara en construir el array a partir de las selecciones del usuario capturando el evento click. Si bien angular recomienda usar la clase reactive forms con sus metodos propios, por simplicidad en la lectura del codigo usaremos otro enfoque que realiza operaciones similares.

26- Colocamos las siguientes lineas, una en el metodo procesar y la otra en addRemoveItem

console.log("Capturando el formulario");

console.log("Capturando el checkbox");

y comprobaremos que se capturan los eventos click y submit en la consola del desarrollador

27- Agregamos el siguiente atributo a la clase

seleccionMult:any[] = [];

y al metodo addRemoveItem le agregamos

    //Si checked es verdadero agregamos un item al array seleccionMult. Sino, remover 
    if($event.target.checked){
      //push agrega un nuevo elemento al array
      this.seleccionMult.push($event.target.value);
    }
    else{
      //splice quita elementos del array. Recibe splice(inicio, cuantos)
      //indexOf devuelve la posicion en el array del valor pasado por parametro
      this.seleccionMult.splice(this.seleccionMult.indexOf($event.target.value),1);
    }
	//el metodo sort mantiene el orden del array. Es conveniente porque las acciones del usuario no lo son
    this.seleccionMult.sort();
    console.log(this.seleccionMult);    
	
El codigo utiliza metodos nativos que el dia de mañana podrian no estar disponibles. Si bien trabajar en angular nos independiza de algunos metodos nativos y las particularidades que pueden tener los navegadores, angular es un framework que se actualiza constantemente y muchas veces lo que funciona en determinadas versiones, deja de funcionar en otras. La decicion de que metodo es mejor queda bajo la responsabilidad exclusiva del desarrollador, debiendo realizar los ajustes necesarios segun sea necesario.

TAREA PARA EL HOGAR:

Tomar el proyecto previo de provincias y capilates para aplicar todos los elementos vistos hoy.
1- Incluir Bootstrapp y colocar una barra de navegacion acorde a ese proyecto.
2- Configurar el enrutador para que permita navegar la aplicacion
3- Crear un modelo para los datos de provincias y capitales. En este punto asegurarse de contar con por lo menos 10.
4- Crear un servicio donde se instancie la estructura del modelo con los datos acordes a las provincias y capitales elegidas
5- Utilice el servicio para que el componente muestre provincias y capitales
6- Utilice una tabla que liste dinamicamente en sus filas los datos del servicio. Tal y como vimos en 21.
7- Cree un formulario que muestre algunos campos de la tabla como en 22 debe permitir seleccionar filas e imprimir la seleccion en la consola del navegador


//***************************************************************//
CLASE 05 (en realidad es clase 04)

01-Tomamos el proyecto que mas avanzamos en clase, cliente03, lo copiamos y pegamos. Lo renombramos a cliente04. Tenga en cuenta que la operacion puede demorar y que para renombrar la carpeta VS code no debe estar ejecutando ya que aveces blockea las carpetas que tiene cargadas en el workspace.

02-Previamente habiamos logrado una seleccion multiple de objetos. Ahora pondremos atencion en crearnos una lista de usuarios a partir de esa seleccion. Disponemos de el array de usuarios. Deberiamos recorrer la seleccion y buscar si el id seleccionado existe en el array de usuarios. Si es correcto lo guardamos en la lista. Nuestro codigo del componente procesar sera el siguiente.

    let listaUsuarios:Usuario[]=[];
    console.log("Uso de procesar");
    console.log("Capturando el formulario");

    //Por cada elemento de la seleccion buscamos uno a uno en el array de usuarios
    this.seleccionMult.forEach(valorArray => {
      for(let i=0;i<this.usuarios.length;i++){
        //si econtramos el id, ponemos el registro usuario en listaUsuarios y pasamos al siguiente id
        if(valorArray==this.usuarios[i].id){
          listaUsuarios.push(this.usuarios[i]);
          break;
        }
      }
    });
	//Corroboramos que se guardo en lista.	
    console.log(listaUsuarios);


Notese el uso del metodo forEach (objeto => {/*bloque de instrucciones*/}). Este metodo
ejecuta sobre cada elemento de seleccionMult el bloque de instrucciones que se encuentra
a la derecha de la flecha. Esta forma de escribir se conoce como funcion lambda. La funcion lambda se aplica sobre cada valor que recibe por parametro, en este caso valorArray. El codigo del bloque es una busqueda recorriendo el array de usuarios hasta encontrar la primera coincidencia del id. Cuando lo encuentra lo coloca en listaUsuarios.
Cuando lo encuentra no es necesario seguir iterando el ciclo for por lo que la instruccion break lo interrumpe y se pasa al siguiente elemento del array.

03- Ahora vamos a suponer que deseamos actualizar el listado en el servicio.
Deberiamos disponer de un metodo guardar en el. Actualizamos la lista de metodos del servicio con

  guardarUsuarios(usuariosGuardar:Usuario[]) {
    //Recibe un array de usuarios y lo guarda. Sobreescribe el contenido previo.
    this.usuarios=usuariosGuardar;
	//console.log(this.usuarios);
  }

luego en el metodo procesar ponemos

  this.usuariosService.guardarUsuarios(listaUsuarios);
  
04- Supongamos que queremos redirigir la salida componente usuarios/listar  a nuestro
metodo procesar como ultimo paso le colocamos.

  this.router.navigate(['usuarios/listar']);

por supuesto debemos importar el enrutador en el componete vista para ello el encabezado
del constructor lo modificamos de la siguiente manera agregando el enrutador

  constructor(private usuariosService: UsuariosService,
    private router:Router) {

y agregamos el import si hiciera falta

import { Router } from '@angular/router';

luego en el componete usuarios/listar ponemos en el constructor lo siguiente

  constructor(private usuariosService:UsuariosService) { 
    this.usuarios = this.usuariosService.listarUsuarios();
    console.log("Usuarios listar");
    console.log(this.usuarios);
  }

Podemos ver la redireccion y la salida por consola del componente que se carga con los datos que existen en el servicio. Es de notar de que como ya existe una instancia del servicio, no se vuelve a inicializar el array con los valores por default. Sin embargo si recargamos el componente con crtl+F5, en ese caso se reinicia con lo valores iniciales del servicio.

05- Ahora vamos a suponer que deseamos guardar la seleccion mas alla del componente. Como no disponemos todavia de BD, vamos a utilizar el almacenamiento local del navegador. Para ello trabajaremos con el localStorage. LocalStorage
que viene a sustituir a las antiguas cookies y que, en definitiva, se trata de un espacio
que ofrecen los navegadores para almacenar entre 2,5 y 5 Mb de información. Su sintaxis es la siguiente

localStorage.setItem("atributo",valor);
localStorage.getItem("atributo");

Debemos destacar que todo lo que se almacene en el localStorage se guarda en formato texto.

Si bien localStorage es un objeto global y se puede llamar desde cualquier parte del codigo, nosotros lo vamos a enmascarar en el servicio. A traves de los metodos

  guardarUsuariosLocal() {
    //Guarda los usuarios del objeto en el LocalStorage
    localStorage.setItem("Usuarios", JSON.stringify(this.usuarios));
  }

  cargarUsuariosLocal() {
    //Carga los usuarios desde el objeto en el LocalStorage
    this.usuarios = JSON.parse(localStorage.getItem("Usuarios") || '{}');
  }

Cuando hacemos el setItem, trasformamos el objeto JSON en una cadena que puede ser almacenada en el localStorage mediante el metodo stringify.

Cuando recuperamos con getItem debemos hacer el proceso opuesto con el metodo parse. Sin embargo el metodo get nos puede devolver null en caso de que no exista "Usuarios" en ese caso se reemplaza por el objeto JSON vacio '{}' mediante el operador ||.

Tenemos nuestros metodos para colocar y extraer desde localStorage

06- Vamos a poner los metodos a prueba.
En nuestro metodo procesar del componente vista, ponemos

    this.usuariosService.guardarUsuarios(listaUsuarios);
    this.usuariosService.guardarUsuariosLocal();

luego en el componente usuarios-listar ponemos 

  usuarios: Usuario[];

  constructor(private usuariosService:UsuariosService) { 
    this.usuariosService.cargarUsuariosLocal(); //forzamos el uso de la carga local a modo de prueba.
    this.usuarios = this.usuariosService.listarUsuarios();
    console.log("Usuarios listar");
    console.log(this.usuarios);
  }

no olvidemos los imports 

import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuarioModel';

Ejecutamos probando desde vista seleccionar usuarios en el ultimo formulario y luego enviando para que usuarios-listar se cargue con el grupo almacenado en localStorage.
Para ver los datos almacenados entramos en modo desarrolaldor en la pestaña Application -> LocalStorage o almacenamiento local y desplegamos. Cuando damos click vemos en el panel de la derecha la clave Usuarios y su valor almacenado un array de objetos en notacion JSON que fueron almacenados como texto. Es de recordar que se debe luego hacer la conversion con el metodo JSON.parse para poder tratarlo com objeto, caso contrario typescrip entendera que es un string pese a que visiblemente vemos que tiene forma de JSON.

07- Vamos a copiar y pegar la que tenemos en vista y la pegamos en usuarios-listar.component.html de forma de ver en el navegador lo que vimos por consola.

<table border="1">
    <thead>
        <th>ID</th>
        <th>Nombre</th>
        <th>password</th>
        <th>Accion</th>
    </thead>
    <tbody *ngIf="usuarios.length > 0; else fila">
        <tr *ngFor=" let usuario of usuarios">
            <td>{{usuario.id}}</td>
            <td>{{usuario.nombre}}</td>
            <td>{{usuario.password}}</td>
			<td></td>
        </tr>
    </tbody>
    <ng-template #fila>
        <tbody>
            <tr>
                <td colspan="4">No hay mas filas</td>
            </tr>
        </tbody>
    </ng-template>
</table>
<br>

08- Supongamos que deseamos actualizar alguno de los usuarios. Primero elegimos cual y luego procedemos a realizar los cambios. Podriamos valernos de un formulario y un control de tipo select

<form (submit)="actualizar()" method="post">
    <fieldset>
        <legend>Seleccione un usuario para modificar</legend>
        <select class="form-control" required [(ngModel)]="id_select" name="id_select">
            <option class="dropdown-item" disabled selected value="undefined">Seleccione ID</option>
            <option *ngFor="let usuario of usuarios" [value]="usuario.id">{{usuario.id}}</option>
        </select>
        <button class="btn btn-success">Actualizar</button>
    </fieldset>
</form>

Agregamos el atributo 

  id_select:string="1";
  
y el metodo. Si no, no deja compilar

  actualizar(){
    console.log("Elige: " + this.id_select)
  }
  
En este punto el metodo actualizar muestra que fue seleccionado cuando se envia el form.
El control select se vale de una opcion que no se puede seleccionar (disabled) y luego de una directiva ngFor para agregar los id que se pueden seleccionar. Notese la directiva 
[(ngModel)] permite hacer Two Way Binding o binding bidireccional. Esto permite asignar valores desde la clase y se muestren en el template y a la inversa si se selecciona un valor o se escribe en el template, este pueda sar visto desde la clase para procesarlo.

Luego de que vemos el formulario agregamos a la clase el metodo 

  seleccionaValor($event:any){
    console.log("Elige: " + this.id_select)
  }

y al control select agregamos el evento 

(change)="seleccionaValor($event)" 

De esta forma podemos ver en la consola cada vez que se elige un nuevo valor.

09-Agreguemos los siguientes controles imput al formulario

        <input type="text" placeholder="Nombre">
        <input type="email" placeholder="Email">
        <input type="password" placeholder="Contraseña">
        <input type="text" placeholder="Rol">
		
Nos proponemos llenar los campos con los valores del array. Para ello necesitamos buscar el indice del id seleccionado dentro del array por lo que al metodo seleccionaValor agregamos

    for(let i=0;i<this.usuarios.length;i++){
      if(this.id_select==this.usuarios[i].id){
        this.indice=i;
        break;
      }
    }
	console.log(this.indice);
	
antes de probar declaramos el atributo faltante

	indice:number=0;
	
Comprobamos	el id elegido y el indice o posicion en el array que este ocupa. Luego completamos los controles imput de la siguiente manera

        <input type="text" [(ngModel)]="usuarios[indice].nombre" name="usuarios[indice].nombre" placeholder="Nombre">
        <input type="email" [(ngModel)]="usuarios[indice].email" name="usuarios[indice].email" placeholder="Email">
        <input type="password" [(ngModel)]="usuarios[indice].password" name="usuarios[indice].password" placeholder="Contraseña">
        <input type="text" [(ngModel)]="usuarios[indice].rol" name="usuarios[indice].rol" placeholder="Rol">

Notese que se agrega el atributo ngModel y name. Es obligatorio escribir sus valores de la misma manera. Caso contrario no habra binding bidireccional. En este punto cuando seleccionamos obtenemos indice y se actualiza usuarios[indice].atributo. El campo puede ser modificado luego y se cargan los valores inmediatamente en el array. Podemos ver los resultados en la consola o en la tabla que colocamos previamente.

Podemos guardar los cambios en la clase con el metodo actualizar y las lineas siguientes

    this.usuariosService.guardarUsuarios(this.usuarios);
    this.usuariosService.guardarUsuariosLocal();
	
10- Ahora supondremos que deseamos agregar a nuestro array un nuevo usuario. Definimos entonces el atributo de la clase 

	nuevo:Usuario={};
	
un nuevo metodo
	
  agregar(){
	console.log(this.nuevo);
    console.log(this.usuarios);
  }
	
y definimos un nuevo formulario como sigue

<br>
<form (submit)="agregar()" method="post">
    <fieldset>
        <legend>Nuevo usuario</legend>
        <input type="text" [(ngModel)]="nuevo.nombre" name="nuevo.nombre" placeholder="Nombre">
        <input type="email" [(ngModel)]="nuevo.email" name="nuevo.email" placeholder="Email">
        <input type="password" [(ngModel)]="nuevo.password" name="nuevo.password" placeholder="Contraseña">
        <input type="text" [(ngModel)]="nuevo.rol" name="nuevo.rol" placeholder="Rol">
        <button class="btn btn-success">Agregar</button>
    </fieldset>
</form>

Nuevamente disponemos de la directiva ngModel para actualizar los datos de la clase. Podemos ver que cuando se captura el evento submit y se han cargado datos, los mismos son vistos en la consola.

Ahora vamos a colocar el codigo para agregar el nuevo usuario al array. Y el metodo agregar queda como sigue.

  agregar(){
    this.nuevo.id=(this.usuarios.length+1).toString();//Id artificial. Debe ser de BD.
    console.log(this.nuevo);
    this.usuarios.push(this.nuevo);
    console.log(this.usuarios);
  }
  
finalmente para guardar los cambios y actualizar al servicio usamos

    this.usuariosService.guardarUsuarios(this.usuarios);
    this.usuariosService.guardarUsuariosLocal();

11- Supongamos ahora que deseamos eliminar un elemento del array de usuarios. Agregamos a la cuarta columna de la tabla y visualizamos un boton como sigue.

<button class="btn btn-danger">Eliminar</button>

Agregamos el metodo a nuestra clase

  eliminar($event:any){
    console.log($event.target.value);
  }

Luego al boton le agregamos los atributos 
(click)=eliminar($event) value="{{usuario.id}}"

De esta forma al hacer click podemos ver que ID se selecciona y que sera candidato a eliminar. Luego al metodo eliminar agregamos el ciclo de busqueda y eliminacion.

    let id:string = $event.target.value; //Guardamos el id del boton
    for (let i = 0; i < this.usuarios.length; i++) { //recorremos el array.
      if (this.usuarios[i].id == id) {//buscamos coincidencia de id.
        this.usuarios.splice(i, 1);//Cuando encuentra, elimina y sale del ciclo.
        break;
      }
    }
    console.log(this.usuarios);//imprime en consola el objeto resultante
	//this.usuariosService.guardarUsuarios(this.usuarios);
    //this.usuariosService.guardarUsuariosLocal();
	
Por supuesto falta actualizar en el servicio.	

Hasta ahora hemos visto las operaciones CRUD(Create-Read-Update-Delete) que podemos hacer en nuestros objetos del array y que representaran las filas en nuestras tablas de la BD luego del primer parcial.

//////////////////////////////////////////////////////////////////

12- Necesitamos nuevos componentes entonces en otra terminal igresamos a la carpeta de nuestro proyecto

cd cliente04

y ejecutamos

ng generate component components/usuarios-principal

ng generate component components/usuarios-home

13- Ahora debemos hacerlos alcanzables desde angular. Vamos al componente navigation y editamos su html.

El elace a principal cambiamos por 

<a class="navbar-brand" routerLink="usuarios/principal">Principal</a>

y agregamos un nuevo item al principio de nuestra lista de menu

            <li class="nav-item active">
                <a class="nav-link" routerLink="usuarios/home">Home<span class="sr-only">(current)</span></a>
            </li>  
			
14- Y para que sean clickeables tenemos que modificar las rutas. En el archivo app-routing.module.ts agregamos los imports.

import { UsuariosPrincipalComponent } from "./components/usuarios-principal/usuarios-principal.component";
import { UsuariosHomeComponent } from "./components/usuarios-home/usuarios-home.component";

Y a la lista de rutas agregamos como primera ruta

	{
		path: '',
		redirectTo: 'usuarios/principal',
		pathMatch: 'full'
	},

y luego al final ponemos , y el bloque siguiente

	{
		path: 'usuarios/principal',
		component: UsuariosPrincipalComponent
	},
	{
		path: 'usuarios/home',
		component: UsuariosHomeComponent
	}
	
Los nuevos componentes ya deberian ser clickeables y ver sus mensajes provisorios. Ademas cuando visitamos la ruta del servidor http://localhost:4200 somos redirigidos a ..../usuarios/principal.


Ver teoria de expresiones regulares en Clase10-2020.txt provisto la clase previa.
Visitar http://www.regexpal.com/

Proteccion del sitio. Primero guardamos un token en el localStorage como sigue. A nuestro servicio agregamos.

  setToken(){
    	//localStorage.setItem('token',result.token);
	  localStorage.setItem('token','LogInOK');
  }

Luego desde el constructor del metodo usuarios ingresar lo invocamos provisoriamente

  constructor(private usuariosService:UsuariosService) { 
    this.usuariosService.setToken();
  }

Antes de probar debemos actualizar el enrutador como sigue

	{
		path:'usuarios/ingresar',
		component: UsuariosIngresarComponent
	},
	
Recordar el import de UsuariosIngresarComponent

import { UsuariosIngresarComponent } from './components/usuarios-ingresar/usuarios-ingresar.component';

Luego probamos ejecutar desde la barra de navegacion. Podemos observar el local storage desde la consola del desarrolaldor, en la pestaña Application -> LocalStorage vemos el par key-value almacenados.


15- Ahora deberiamos testear el token en cada ruta protegida de la app. Para eso vamos a utilizar una clase guard llamada auth en la que delegaremos el monitoreo del token.

ng generate guard auth

Seleccionamos el metodo canActivate en el menu al generar el guard. Veremos que se crean nuevos archivos en la carpeta app y trabajaremos luego modificando el auth.guard.ts 

16- En usuarios.service.ts agregamos el metodo isLoggedIn como sigue

	isLoggedIn():Boolean{
		return !!localStorage.getItem('token'); //Si existe token retorna true
		//es el equivalente de testearlo con if pero ahora en una sola linea.
	}

17- Volvemos al auth.guard.ts y colocamos el import del servicio y el enrutador

import { UsuariosService } from './services/usuarios.service';
import {Router} from '@angular/router';

creamos el constructor 


	constructor(
		private authService:UsuariosService,
		private router:Router
	){}


y el metodo canActivate queda como sigue.

	canActivate(){
		if(this.authService.isLoggedIn()){
			return true;
		}
		this.router.navigate(['usuarios/ingresar']);
		return false;
	}

Podemos quitar el import de rxjs y tambien de las otras clases que ya no se utilizan. Solo dejamos el canActivate

18- Para usar el guard en Angular debemos importarlo en app.module.ts

import {AuthGuard} from './auth.guard';

y lo colocamos en la lista de providers

providers:[
	.....
	..,
	AuthGuard
],

19- Ahora lo importamos en el enrutador para que pueda evaluar las rutas por lo que en app-routing.module.ts

import {AuthGuard} from './auth.guard';

luego en la ruta que deseamos proteger ponemos el guard en una propiedad llamada canActivate

	{
		path: 'usuarios/listar',
		component: UsuariosListarComponent,
		canActivate: [AuthGuard]
	},
	{
		path:'usuarios/home',
		component: UsuariosHomeComponent,
		canActivate: [AuthGuard]
	}

Ahora para probar si no existe el token en el local storage iniciamos sesion. Y nos redirigira al home. Cuando borremos el token no podremos acceder a las rutas protegidas del front-end.

20-Nos falta cerrar la sesion del lado del front-end. Para ello lo vamos a hacer muy simple. Agregamos a usuariosService el metodo logout como sigue

	logOut(){
		localStorage.removeItem('token');
	}

38- Para usar el metodo y hacerlo clickeable tenemos que importar el servicio en el componente de navegacion. Tambien el enrutador para redirigir la salida. Por ello importamos.

import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

E instanciamos en el constructor

constructor(private usuariosService:UsuariosService, private router:Router) { }

Agregamos el metodo a la clase

  logout(){
	/*Es de notar que el metodo logOut podria haberse hecho en un componente y mantener la sintaxis usuarios/salir pero nos vamos a ahorrar ese paso*/ 
    this.usuariosService.logOut();
	console.log("Cerrando sesion!!!");
	this.router.navigate(['usuarios/principal']);
  }

Y en el html del componete de navegacion agregamos al final de la lista de nuestro menu

<li class="nav-item">
	<a class="nav-link" id="logout" (click)="logout()">Cerrar sesion</a>
</li>

Con esto podemos probar el cierre de sesion con token eliminacion del token.

39- Si ponemos el cursor sobre cerrar sesion notaremos que el puntero no se muestra clickeable. Para lograrlo disponemos del atributo id="logout" eso nos permitira referirnos a un unico objeto en el DOM y aplicarle estilos. Si recordamos nuestros componentes tienen archivos de hojas de estilos .css por lo que podemos agregar al archivo la siguiente regla.

#logout{
    cursor: pointer;
}

En general la regla es 

selector{
	atributo: valor;
}

En nuestro caso particular nos referimos al cursor que cambie a pointer para mostrar la mano indicando que el enlace es clickeable. El enlace no se muestra clickeable por la ausencia de atributos href o routerLink.


//***************************************************************//
CLASE 06 (en realidad es clase 05)

01-Tomamos el proyecto que mas avanzamos en clase, cliente04 y en esta oportunidad no haremos copia del mismo ya que lo que vamos a incorporar son mejoras sobre los objetos existentes.

02-Trabajaremos sobre el componente usuarios-listar y los formularios que permiten actualizar y agregar un nuevo usuario. Sabemos que cuando damos click a los botones Actualiar y Agregar, se producen 2 eventos. Click sobre el boton y posteriormente submit sobre el formulario. Este ultimo cuando se produce invoca a los metodos actualizar() y agregar() segun sea el caso. Pero no hacemos ninguna verificacion de los datos ingresados. Los mismos debebrian ser compatibles con los atributos de los objetos usuario al guardarlos y por sobretodo deberian ser compatibles con lo que espera el back end para almacenar en la BD. Incluso si damos click en agregar si haber llenado los campos se agrega un registro vacio excepto por el campo ID.

Creamos el siguiente metodo en la clase del componente

  validarCampos():Boolean{
    console.log("Validando los campos del formulario!!!");
    return false;
  }
  
Luego actualizamos en el tempalte el boton Agregar incorporando el evento click

	<button (click)="validarCampos()" class="btn btn-success">Agregar</button>  
	
Ahora cuando damos click, se muestra el mensaje en consola y la sentencia return false evita el envio del formulario (es decir, no se produce el submit). Para logar que se envie, debemos lograr que el metodo devuelva true. Eso debe suceder cuando los campos cumplan con la validacion de datos. Es decir, el metodo deberia quedar a grandes rasgos como sigue:

//  validarCampos():Boolean{
//    console.log("Validando los campos del formulario!!!");
//	  if(no_cumple_validacion){
//		return false;
//	  }
//    return true;
//  }

Entonces haremos lo siguiente

03-Incluir a la clase usuarios-listar los siguientes atributos

  errorNombre=0;
  errorPassword=0;
  errorRol=0;
  errorEmail=0;

El metodo validarCampos queda como sigue

  validarCampos():Boolean{
    console.log("Validando los campos del formulario!!!");
    this.errorNombre=this.verificarNombre(this.nuevo.nombre);
    this.errorPassword=this.verificarPassword(this.nuevo.password);
    this.errorRol=this.verificarRol(this.nuevo.rol);
    this.errorEmail=this.verificarEmail(this.nuevo.email);
    if(  (this.errorNombre+this.errorPassword+this.errorRol+this.errorEmail)>0){
      return false;
    }
    return true;
  }
  
Tambien agregamos los metodos necesarios.

  private verificarNombre(nombre: any): number {
    const patron = /^[A-Z][A-z,a-z\s]+$/; //Primer caracter en mayuscular alternando luego
    if (nombre === undefined)
      return 1;
    if (nombre.length > 20)
      return 2;
    if (!patron.test(nombre))
      return 3;
    return 0;
  }

  private verificarPassword(password: any): number {
    const patron = /^[A-Za-z0-9@]{5,20}$/; //mayus, minus, digitos y @ entre 5 y 20
    if (password === undefined)
      return 1;
    if (password.length > 20)
      return 2;
    if (!patron.test(password))
      return 3;
    return 0;
  }

  private verificarRol(rol: any): number {
    const patron = /^user$|^admin$/g; //exactamente user o admin
    if(patron === undefined)
      return 2;
    if (!patron.test(rol))
      return 1;
    return 0;
  }

  private verificarEmail(email: any): number {
    const patron = /^[a-z0-9]{1,10}@[a-z0-9]{1,10}.[a-z]{2,3}$/;// email: alfanum @ alfanum . alfab
    if (email=== undefined)
      return 1;
    if (email.length > 20)
      return 2;
    if (!patron.test(email))
      return 3;
    return 0;
  }
  
Notamos que los parametros estan definidos de tipo any para evitar errores en tiempo de complilacion ya que los campos de usuario estan definidos con el tipo y el simbolo ? indicando que el campo puede no estar definido para evitar que nos pida completar todos los campos .

04- Luego actualizamos el template debajo del formulario que agrega, colocamos

<div>
    <div [ngSwitch]="errorNombre">
		<div *ngSwitchCase="1">Debes completar el campo</div>
		<div *ngSwitchCase="2">Nombre muy largo</div>
		<div *ngSwitchCase="3">Nombre debe ser alfabetico</div>
	</div>

    <div [ngSwitch]="errorPassword">
        <div *ngSwitchCase="1">Debes completar el campo</div>
        <div *ngSwitchCase="2">Contraseña muy larga</div>
        <div *ngSwitchCase="3">Contraseña debe ser alfanumerica, admite mayusculas y @.</div>
    </div>    

    <div [ngSwitch]="errorEmail">
        <div *ngSwitchCase="1">Debes completar el campo</div>
        <div *ngSwitchCase="2">Email muy largo</div>
        <div *ngSwitchCase="3">Email debe ser nombre@dominio.algo .</div>
    </div>                       
    <div [ngSwitch]="errorRol">
        <div *ngSwitchCase="1">El rol es <b>user</b> o <b>admin</b></div>
    </div>       
	
	
La directiva ngSwitch permite elegir entrte opciones multiples e imprimir un elemento de acuerdo al caso seleccionado con *ngSwitchCase. La directiva *ngSwitchDefault permite establecer un comportamiento para aquellos casos no contemplados por ningun *ngSwitchCase, no utilizado en nuestro caso.

	
Ahora estamos en posicion de probar el codigo correspondiente. Si hay error el envio del formulario se detiene y se muestra el mensaje debajo del formulario. Si todo esta ok, veremos el mensaje en consola y el nuevo usuario creado.

Debemos notar el uso de la variable patron y su metodo test. Al definir patron pusimos lo que se conoce como expresion regular. Nos permite dada una cadena pasada como argumento en el metodo test, saber si cumple con el patron definido. En caso afirmativo, el metodo devuelve true. Y false en caso contrario.

Ver teoria de expresiones regulares en provisto con los apuntes.
Visitar http://www.regexpal.com/

06-Vamos a dar una ultima mejora a la presentacion de mensajes. Al codigo del componente agregamos los siguientes metodos.

  limpiarNombre() {
    if (this.errorNombre > 0) {
      console.log("Limpiar nombre");
      this.nuevo.nombre = "";
      this.errorNombre = 0;
    }
  }

  limpiarPassword() {
    if (this.errrorPassword > 0) {
      console.log("Limpiar password");
      this.nuevo.password = "";
      this.errrorPassword = 0;
    }
  }

  limpiarRol() {
    if (this.errorRol > 0) {
      console.log("Limpiar rol");
      this.nuevo.rol = "";
      this.errorRol = 0;
    }

  }

  limpiarEmail() {
    if(this.errorEmail>0){
      console.log("Limpiar email");
      this.nuevo.email = "";
      this.errorEmail = 0;
    }
  }
  
y en el HTML a cada control input le agregamos los siguientes atributos.

(focus)="limpiarNombre()"

(focus)="limpiarEmail()"

(focus)="limpiarPassword()"

(focus)="limpiarRol()"



De esta forma cuando se detecte un error y se muestre el mensaje, nos permitira limpiar el mensaje y el contenido al hacer focus en el control.

(blur) es el evento que se dispara cuando el control pierde el foco.


Completar la actividad validando los datos de la actualizacion. Si bien se esta usando la directiva ngModel y el array se actualiza ni bien editamos los campos se puede aplicar una estrategia similar con el metodo actualizar antes de enviar los datos al servicio. Como alternativa, se podria desacoplar el objeto a actualizar creando un objeto nuevo referenciado en el template con ngModel y a la hora de actualziar usar un ciclo de busqueda para encontrar el mismo id dentro del array y copiar solo los campos a actualizar en una estructura similar a como sigue

usuarios[indice].nombre= nuevo.nombre;
usuarios[indice].password= nuevo.password

Logicamente el ciclo de busqueda usara a nuevo.id donde id fue obtenido del control select e indice es obtenido a partir del ciclo de busqueda. help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
