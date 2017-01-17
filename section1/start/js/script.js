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

function talk(msg) {	
	echo(leadself + msg)
}

function replayYesNo() {
	/*Para decir si o no se usa una variable
	random la cual si es mayor a 5 dice que si
	*/
	var msg = Math.random()>.5 ? msgYes : msgNo

	echo(leadcomputer + msg)
}

function saySassyStuf() {
	/*se selecciona un item al azar y se muestra
	con la premisa leadcomputer
	*/
	var msg = aSassyStuff[ Math.floor(Math.random()*aSassyStuff.length) ]
	echo(leadcomputer + msg)
}

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
}






