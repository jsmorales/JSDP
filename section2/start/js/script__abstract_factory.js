//PATRON DE DISEÑO FACTORY abstracto
(function(win, $){

	//esta fabrica abstracta permite añadir propiedades al objeto 
	//creado sin necesidad de modificar la fabrica.
	//al crearlo de esta forma se sabra si lleva o no el metodo
	//create.

	function RedCircle(){

	}

	RedCircle.prototype.create = function(){
		this.item = $('<div class="circle"></div>');
		return this;
	}

	function BlueCircle(){
		
	}

	BlueCircle.prototype.create = function(){
		this.item = $('<div class="circle" style="background:blue"></div>');
		return this;
	}

	CircleFactory = function(){//
		this.types = {};

		this.create = function(type){
			//retorna la instancia y seguido ejecuta la funcion crear de cada
			//elemento.
			return new this.types[type]().create();			
		}

		//estafuncion permite que no se deba crear varias fabricas
		//para crear otros varios elementos.
		this.register = function(type, cls){
			//primero se testea si la instancia tiene el metodo create
			//ya que es obligatorio para que pueda funcionar
			if (cls.prototype.create) {
				// registra el tipo
				this.types[type] = cls;
			}

			console.log(this.types)
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
				_stage = $('.advert'),//en donde va a ocurrir todo
				_cf = new CircleFactory();//referencia a la fabrica de circulos
				//luego se registran mas items con el metodo register
				//de la instancia de CircleFactory
				_cf.register('red',RedCircle);
				_cf.register('blue',BlueCircle);			

			//proceso de poscicionamiento de la capa
			//necesita la capa, la posicion en x y en y
			function _position(circle, left, top){
				circle.css('left',left);
				circle.css('top',top);
			}

			//proceso de creacion, solo crea la capa y la retorna
			function create(left, top, type){
				//var circle = $('<div class="circle"></div>'); sin cf
				//con cf
				var circle = _cf.create(type).item;
				_position(circle, left, top);
				return circle;	
			}

			//proceso de adicion del elemento
			function add(circle){
				_stage.append(circle)
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

		$('.advert').click(function(e){

			//en el evento click del stage/escenario se hace la instancia
			//esto hace que solo al hacer click puedo crear la instancia
			var circleGenerator = CircleGeneratorSingleton.getInstance();
			//ya creada la instancia puedo crear el circulo
			var circle = circleGenerator.create(e.pageX-25,e.pageY-25,"red")
			//console.log(circle)
			circleGenerator.add(circle);
		});

		$(document).keypress(function(e) {
			//al presionar a
			if (e.key == 'a') {
				var circleGenerator = CircleGeneratorSingleton.getInstance();				
				var circle = circleGenerator.create(Math.floor(Math.random()*600),
													Math.floor(Math.random()*600),
													"blue")
				circleGenerator.add(circle);
			}
		});

	});

})(window, jQuery);