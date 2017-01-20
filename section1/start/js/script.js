var o = {
	leadself : 'Me: ',
	leadcomputer : "PC: ",
	aSaid: ["This is a Cyber Chat"],
	msgYes : "Yes, that's a great idea.",
	msgNo : "No, that must be a mistake.",
	aSassyStuff : ["Like mold on books, grow myths on history.",
					"She moved like a poem and smiled like a sphinx.",
					"As long as we don’t die, this is gonna be one hell of a story.",
					"She laughed, and the desert sang.",
					"You’ve got about as much charm as a dead slug."],
	talk: function (msg) {	
		this.echo(this.leadself + msg)
	},
	replayYesNo: function () {
		/*Para decir si o no se usa una variable
		random la cual si es mayor a 5 dice que si
		*/
		var msg = Math.random()>.5 ? this.msgYes : this.msgNo

		this.echo(this.leadcomputer + msg)
	},

	saySassyStuf: function () {
		/*se selecciona un item al azar y se muestra
		con la premisa leadcomputer
		*/
		var msg = this.aSassyStuff[ Math.floor(Math.random()*this.aSassyStuff.length) ]
		echo(this.leadcomputer + msg)
	},

	echo: function (msg) {
		//contiene el mensaje en un array como 
		//una capa.
		this.aSaid.push( "<div>" + msg + "</div>")
		//pone el texto en en div
		$("#talk span").text(msg)

		//setea las variables, para que saque el maximo 
		//de la variable aSaid y muestre todo lo que
		//hay dentro pero no mas de 6 mensajes.
		var start = Math.max(this.aSaid.length - 6,0),
			out = ""

		for (var i = start; i < this.aSaid.length; i++) {
			out += this.aSaid[i]; 
		}

		$(".advert").html(out)
	}

}