//funcio modulo que sirve para restringir el acceso
//a las funciones principales de nuestra clase.

var chatModule = (function(){
	//estas variables son privadas, porque solo las puede utilizar
	//lo que esta dentro del scope
	var leadself = 'Me: ',
		leadcomputer = "PC: ",
		aSaid= ["This is a Cyber Chat"],
		msgYes = "Yes, that's a great idea.",
		msgNo = "No, that must be a mistake.",
		aSassyStuff = ["Like mold on books, grow myths on history.",
						"She moved like a poem and smiled like a sphinx.",
						"As long as we don’t die, this is gonna be one hell of a story.",
						"She laughed, and the desert sang.",
						"You’ve got about as much charm as a dead slug."];
	//esta es una funcion publica porque solo esta declarada dentro del
	//scope de la funcion o clase en este caso

	function echo(msg) {
		//contiene el mensaje en un array como 
		//una capa.
		aSaid.push( "<div>" + msg + "</div>")
		//pone el texto en en div
		$("#talk span").text(msg)

		//setea las variables, para que saque el maximo 
		//de la variable aSaid y muestre todo lo que
		//hay dentro pero no mas de 6 mensajes.
		var start = Math.max(aSaid.length - 6,0),
			out = ""

		for (var i = start; i < aSaid.length; i++) {
			out += aSaid[i]; 
		}

		$(".advert").html(out)
	};

	//estas funciones son publicas ya que se retornan
	//fuera del escope al instanciar esta clase.

	return {
		talk: function (msg) {	
			echo(leadself + msg)
		},
		replayYesNo: function () {
			/*Para decir si o no se usa una variable
			random la cual si es mayor a 5 dice que si
			*/
			var msg = Math.random()>.5 ? msgYes : msgNo

			echo(leadcomputer + msg)
		},

		saySassyStuf: function () {
			/*se selecciona un item al azar y se muestra
			con la premisa leadcomputer
			*/
			var msg = aSassyStuff[ Math.floor(Math.random()*aSassyStuff.length) ]
			echo(leadcomputer + msg)
		},
	};

})();

//console.log(echo)
//console.log(leadself)
//console.log(chatModule)
$(function(){
	//solo se pueden ejecutar los metodos publicos.
	chatModule.talk("Hi Chat!")
	chatModule.replayYesNo()
	chatModule.saySassyStuf()
});
