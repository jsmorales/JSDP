/*
Patron de diseño de acceso global

Este modelo sugiere como controlar el alcance global

todo se define dentro de un ()() para que quede privado

*/
//estos parámetros se reciben desde la definición final.
(function(win, doc, $){

	var chatModule = (function(){
		//estas variables son privadas, porque solo las puede utilizar
		//lo que esta dentro del scope
		var _leadself = 'Me: ',
			_leadcomputer = "PC: ",
			_aSaid= ["This is a Cyber Chat"],
			_msgYes = "Yes, that's a great idea.",
			_msgNo = "No, that must be a mistake.",
			_aSassyStuff = ["Like mold on books, grow myths on history.",
							"She moved like a poem and smiled like a sphinx.",
							"As long as we don’t die, this is gonna be one hell of a story.",
							"She laughed, and the desert sang.",
							"You’ve got about as much charm as a dead slug."];
		
		//esta es una funcion privada porque solo esta declarada dentro del
		//scope de la funcion o clase en este caso

		function _echo(msg) {
			//contiene el mensaje en un array como 
			//una capa.
			_aSaid.push( "<div>" + msg + "</div>")
			//pone el texto en en div
			$("#talk span").text(msg)

			//setea las variables, para que saque el maximo 
			//de la variable _aSaid y muestre todo lo que
			//hay dentro pero no mas de 6 mensajes.
			var start = Math.max(_aSaid.length - 6,0),
				out = ""

			for (var i = start; i < _aSaid.length; i++) {
				out += _aSaid[i]; 
			}

			$(".advert").html(out)
		};

		function talk (msg) {	
			_echo(_leadself + msg)
		}
		function replayYesNo () {
			/*Para decir si o no se usa una variable
			random la cual si es mayor a 5 dice que si
			aca se esta utilizando una operacion ternaria.
			https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Conditional_Operator
			*/
			var msg = Math.random()>.5 ? _msgYes : _msgNo

			_echo(_leadcomputer + msg)
		}

		function saySassyStuf() {
			/*se selecciona un item al azar y se muestra
			con la premisa leadcomputer
			*/
			var msg = _aSassyStuff[ Math.floor(Math.random()*_aSassyStuff.length) ]
			_echo(_leadcomputer + msg)
		}

		//estas funciones son publicas ya que se retornan
		//fuera del escope al instanciar esta clase.

		return {
			talk:talk,
			replayYesNo:replayYesNo,
			saySassyStuf:saySassyStuf
		};

	})();

	$(function(){
		//solo se pueden ejecutar los metodos publicos.
		chatModule.talk("Hi Chat!")
		chatModule.replayYesNo()
		chatModule.saySassyStuf()

		console.log(win)
		console.log(doc)
		console.log($)
	});

	//public API inside of the window

	//si chatModule no existe se define dentro del
	//window para poder acceder y crear una especie de API
	if (!win.chatModule) win.chatModule = chatModule;
/*
La definición final significa que envía dentro del mismo objeto
estos parametros, estos se pueden utilizar tomándolos en una 
definición inicial.
*/
})(window, document, jQuery);

console.log(window.chatModule)
