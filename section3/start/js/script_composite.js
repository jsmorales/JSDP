//PATRON DE DISEÑO prototype
(function(win, $){

	/*
	método para clonar las propiedades de un elemento--------------
	*/
	function clone(src, out){
		//itera por el source 'src' dentro del prototype
		for(var attr in src.prototype){
			//se duplica lo que hay dentro del src en el out
			out.prototype[attr] = src.prototype[attr]
		}
	}
	//-------------------------------------------------------------

	//esta fabrica abstracta permite añadir propiedades al objeto 
	//creado sin necesidad de modificar la fabrica.
	//al crearlo de esta forma se sabra si lleva o no el metodo
	//create.

	/*Definimos que pueden hacer todos los circulos
	*/
	function Circle(){
		this.item = $('<div class="circle"></div>');
	}
	
	//puede mover o posicionar
	Circle.prototype.move = function(left, top){
		this.item.css('left',left);
		this.item.css('top',top);
	}

	//puede dar un color
	Circle.prototype.color = function(color){
		this.item.css('background',color);
	}

	Circle.prototype.get = function(){
		return this.item;
	}

	self.circ = new Circle();

	//nueva clase rectangulo+++++++++++++++++++++++++

	function Rect(){
		this.item = $('<div class="rect"></div>');
	}
	//se conan los metodos de la clase cirlce en rect
	clone(Circle, Rect);

	//-----------------------------------------------
	//decorator
	function selfDestructDecorator(objt){
		//se añade el evento click para autodestruir en esta accion
		objt.item.click(function(event) {
			objt.kill()
		});
		//añade al objeto que se le pase la funcion kill
		objt.kill = function(){
			objt.item.remove()
		}
	}
	//-----------------------------------------------

	//-----------------------------------------------
	//Builder circulo rojo
	function RedCircleBuilder(){
		this.item = new Circle();
		console.log(this.item)
		this.init()
	}

	RedCircleBuilder.prototype.init = function(){
		/*ya esta inicializado y es de color rojo
		*/
	}

	RedCircleBuilder.prototype.get = function(){
		return this.item;
	}
	//+++++++++++++++++++++++++++++++++++++++++++++++
	//Builder circulo azul
	function BlueCircleBuilder(){
		this.item = new Circle();
		this.init()
	}

	BlueCircleBuilder.prototype.init = function(){
		this.item.color('blue');
		//---------------------------------------
		/**/
		var rect = new Rect();
		rect.color("yellow");
		rect.move(40,40);

		selfDestructDecorator(rect)

		this.item.get().append(rect.get())
		//---------------------------------------
	}

	BlueCircleBuilder.prototype.get = function(){
		return this.item;
	}
	//-----------------------------------------------
	ShapeFactory = function(){//
		this.types = {};

		this.create = function(type){
			//retorna la instancia y seguido ejecuta la funcion crear de cada
			//elemento.
			return new this.types[type]().get();			
		}

		//estafuncion permite que no se deba crear varias fabricas
		//para crear otros varios elementos.
		this.register = function(type, cls){
			//primero se testea si la instancia tiene el metodo init y get
			//ya que es obligatorio para que pueda funcionar
			if (cls.prototype.init && cls.prototype.get) {
				// registra el tipo
				this.types[type] = cls;
			}

			console.log(this.types)
		}
	}

	//adaptador para añadir elementos
	function StageAdapter(selector){
		//indicador del elemento
		this.index = 0;
		//el contexto en el que se va a trabajar es jquery
		this.context = $(selector);
	}
	//se añade un tipo de firma para identificar elementos
	//de este tipo.
	StageAdapter.prototype.SIG = 'stageItem_';

	StageAdapter.prototype.add = function(item){
		++this.index;
		//se añade la clase al elemento que se pasa
		//sea circulo o rectangulo
		item.addClass(this.SIG+this.index)
		//se añade el elemento al contexto 
		//al que se le esta adaptando esta clase
		this.context.append(item)
	}

	StageAdapter.prototype.remove = function(index){
		//se remueve el elemento dentro del contexto
		//que lleva la clase dicha
		this.context.remove('.'+this.SIG.index);
	}
	//----------------------------------------------------------------
	//el controlador composite nos va a permitir trabajar con varios
	//elementos al mismo tiempo.
	function CompositeController(a){
		//array de los elementos a manejar
		this.a = a;
	}

	//funciones en prototype------------------------------------------
	//esta funcion pretende identificar la accion se quiere ejecutar 
	//para la lista de elementos
	CompositeController.prototype.action = function(act){
		//para poder trabajar os argumentos se crea un array
		var args = Array.prototype.slice.call(arguments);
			args.shift();

		//se recorren los elementos para validar la accion a ejecutar
		for (var item in this.a) {
			//para cada item del array se ejecuta la accion
			//que se parametrizo
			this.a[item][act].apply(this.a[item], args);
		}
	}
	//----------------------------------------------------------------

	var CircleGeneratorSingleton = (function(){
		//crear un inicializador para que solo se
		//pueda crear la instancia hasta que este listo
		//(methods or vars whit _ are private) esto es solo para 
		//diferenciar de modo visual
		var instance;

		function init(){

			//variables del metodo
			var _aCircle = [],//array que almacena los circulos
				_stage,//en donde va a ocurrir todo
				_sf = new ShapeFactory(),//referencia a la fabrica de formas
				_cc = new CompositeController(_aCircle);
									
			//proceso de poscicionamiento de la capa
			//necesita la capa, la posicion en x y en y
			function _position(circle, left, top){
				circle.move(left, top);
			}

			function registerShape(name, cls){
				//luego se registran mas items con el metodo register
				//de la instancia de CircleFactory
				_sf.register(name,cls);		
			}

			function setStage(stg){
				_stage = stg;
			}

			//proceso de creacion, solo crea la capa y la retorna
			function create(left, top, type){
				//var circle = $('<div class="circle"></div>'); sin cf
				//con cf
				self.circle = _sf.create(type);
				circle.move(left, top);
							
				return circle;	
			}

			function tint(clr){
				_cc.action('color', clr);
			}

			function move(left, top){
				_cc.action('move', left, top);
			}

			//proceso de adicion del elemento
			function add(circle){
				_stage.add(circle.get())
				//se llena este array para tener una refencia de los 
				//circulos creados.
				_aCircle.push(circle)
			}

			//esta funcion informara en que index del array estamos
			function index(){
				return _aCircle.length
			}

			//al requerir la instancia solo va a retornar
			//el API disponible
			return{
				//el API disponible sera el siguiente
				index:index,
				create:create,
				add:add,
				register:registerShape,
				setStage:setStage,
				tint:tint,
				move:move,
			};
		}

		//solo se va a retornar metodos y funciones publicas
		return {
			//esta funcion hace que se cree el objeto solo
			//cuando es instanciado, y no antes.
			//si es requerido se retorna la instancia
			getInstance : function(){
				//esta la intancia disponible?
				if(!instance){
					//si no lo esta crea la instancia
					instance = init();
				}
				//retorna en cualquier caso
				return instance;
			}
		}

	})();

	//uso de nuestro patron, NOTA: este patrón es solo útil en caso de 
	//la creacion de un solo elemento de forma repetitiva ahorrando la 
	//necesidad de hacer un instancia previa que espera se ejecutada, 
	//esta solo se instancia y ejecuta cada vez que es requerida.

	$(win.document).ready(function(){

		self.circleGenerator = CircleGeneratorSingleton.getInstance();
		//se setea el stage con el adaptador para jquery
		circleGenerator.setStage(new StageAdapter('.advert'));
		circleGenerator.register('red', RedCircleBuilder)
		circleGenerator.register('blue', BlueCircleBuilder)

		$('.advert').click(function(e){

			//ya creada la instancia puedo crear el circulo
			var circle = circleGenerator.create(e.pageX-25,e.pageY-25,"red")
			//console.log(circle)
			circleGenerator.add(circle);
		});

		$(document).keypress(function(e) {

			console.log(e.key)

			//al presionar a
			if (e.key == 'a') {
				var circleGenerator = CircleGeneratorSingleton.getInstance();				
				var circle = circleGenerator.create(Math.floor(Math.random()*600),
													Math.floor(Math.random()*600),
													"blue")
				circleGenerator.add(circle);
			} else if (e.key === 't'){

				var circleGenerator = CircleGeneratorSingleton.getInstance();

				circleGenerator.tint('blue');
			} else if (e.key === 'e'){

				var circleGenerator = CircleGeneratorSingleton.getInstance();

				circleGenerator.move("+=5px","+=0px");
			} else if (e.key === 'w'){

				var circleGenerator = CircleGeneratorSingleton.getInstance();

				circleGenerator.move("-=5px","+=0px");
			}
		});

		//-------------------------------------------------
		//prueba apply call bind
		/**/
		var persona = {
			nombre:"Johan",
			saludar:function(apell1,apell2){
				console.log("El nombre es "+this.nombre+" "+apell1+" "+apell2)
			}
		}

		//en esta variable solo se llama la funcion saludar
		//la cual queda sin contexto
		var saluda = persona.saludar;
			
		//call define el contexto de la función
		saluda.call(persona, 'Morales', 'Rodríguez');
		//saluda('Morales', 'Rodríguez')

		//-------------------------------------------------

	});

})(window, jQuery);