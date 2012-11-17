//controlo de jogo, num de peças iniciais, etc, etc....
function ControlGame(tab){
	var numInitGreen=12;
	var numInitRed=12;
	var nomePlayer1="";
	var nomePlayer2="";
	var numPlays=0;
	var QuemJoga="";//quem começa ????... deveria ser Math.random()*2
	
	function verifGameOver(){
		if (numInitGreen === 0){
			alert("gameOver!, winner: Red!! xD, numPlays="+numPlays+", restart??");
			
		}else if(numInitRed === 0){
			alert("gameOver!, winner: Green!! xD, numPlays="+numPlays+", restart??");
			
		}
	}
	
	function piscaPeca(ID){
		//funcao para piscar a peca com um dado ID
		var i;
		var trigger=true;
		for (i=0; i<7; i++){
			if (trigger === true){
				setTimeout(function(){
					$("div#peca"+ID).fadeIn();
				},250*i);
			}else{
				setTimeout(function(){
					$("div#peca"+ID).fadeOut();
				},250*i);
			}
			trigger=!trigger;
		}
		$("div#peca"+ID).fadeOut();
	}
	
	function verificarPecas(tipo){
		var Resposta=false;
		//para cada peca que o jogador tem, procurá-la no tabuleiro
		var i;
		var j;
		var h=0;
		for (i=0; i<8; i++){
			for (j=0; j<8; j++){
				var celula=tab[i+1][j+1];//rodar pelas celulas todas
				var peca=celula.getPeca();
				if (peca !== undefined){//é pk tem uma peca na celula, se tiver o tipo que queremos( verde )
					var tipoPCel=peca.getTipo();
					if (tipoPCel === tipo){
						//se a peca tiver o tipo que se pretende, apanhar a celula respectiva
						
						console.log("peca "+h+" em jogo esta na celula: "+celula.getNumID());
						h++;
						
						//para cada celula, ex: verde, verificar se tem ao seu pé celulas vermelhas
						//para cada celula temos de verificar 2 posicoes, direita e esquerda
						var posD=0;
						var posE=0;
						var posD2=0;
						var posE2=0;
						if (tipo === "pecaG"){
							//pecas verdes, direita e esquerda
							posD = ((celula.getNumID())+8)+1;
							posE = ((celula.getNumID())+8)-1;
							//direita e esquerda + 1
							posD2 = ((celula.getNumID())+16)+2;
							posE2 = ((celula.getNumID())+16)-2;
						}else{
							//pecas vermelhas, direita e esquerda
							posD = ((celula.getNumID())-8)+1;
							posE = ((celula.getNumID())-8)-1;
							//direita e esquerda + 1
							posD2 = ((celula.getNumID())-16)+2;
							posE2 = ((celula.getNumID())-16)-2;
							
						}
						var celulaD=undefined;
						var celulaE=undefined;
						var celulaD2=undefined;
						var celulaE2=undefined;
						//sabendo os ID's(posD, posE), procurar as celulas respectivas
						var k;
						var m;
						for (k=0; k<8; k++){
							for (m=0; m<8; m++){
								var celulaTab=tab[k+1][m+1];
								var numID = celulaTab.getNumID();
								if (numID === posD){
									celulaD=celulaTab;
								}
								if (numID === posE){
									celulaE=celulaTab;
								}
								if (numID === posD2){
									celulaD2=celulaTab;
								}
								if (numID === posE2){
									celulaE2=celulaTab;
								}
							}	
						}
						//com as celulas, vamos verificar se tem pecas
						var g;
						for (g=0; g<2; g++){
							var pecaVerif;
							var pecaVerif2;
							if (g === 0){
								pecaVerif=celulaD.getPeca();
								pecaVerif2=celulaD2.getPeca();
							}else{
								pecaVerif=celulaE.getPeca();
								pecaVerif2=celulaE2.getPeca();
							}
							if (pecaVerif !== undefined){
								//como tem peca, verificar se é de outra cor
								if (pecaVerif.getTipo() !== tipo){
									if (pecaVerif2 === undefined){
										//encontrei uma peca que tem de ser comida------ n encontra tudo !!!!!!!
										//piscar a peca
										console.log("vou piscar a peca: "+pecaVerif.getID())
										piscaPeca(pecaVerif.getID());
										Resposta=true;
									}
								}
							}
						}
					}		
				}
			}
		}
		return Resposta;
	}
	
	return {
		
		init: function(){
			var num=Math.random()*2;
			if (num >= 1){
				QuemJoga="red";
			}else{
				QuemJoga="green";
			}
			alert("comeca a jogar o: "+QuemJoga);
		},
		
		getVez: function(){
			return QuemJoga;
		},
	
		updateNumJogadas: function(tipoPeca){
			numPlays++;
			if (tipoPeca === "red"){
				QuemJoga="green";
			}else if(tipoPeca === "green"){
				QuemJoga="red";
			}
			alert("Joga agora o da cor: "+QuemJoga);//alertas os jogadores com uma DIV!!
		},
		
		insertPlay1Name: function(){
			//pedir o nome ao player 1... com uma DIV
		},
		
		insertPlay2Name: function(){
			//pedir o nome ao player 2... com uma DIV
		},
		
		comiPecaRed: function(){
			//diminuir num pecas
			numInitRed--;
			verifGameOver();
		},
		
		comiPecaGreen: function(){
			//diminuir num pecas
			numInitGreen--;
			verifGameOver();
		},
		
		verificarSeTemDeComerOuNao: function(tipoPeca){
			var resposta;
			if (tipoPeca === "green"){
				alert("verificar pecas verdes");
				resposta=verificarPecas("pecaG");
			}else if (tipoPeca === "red"){
				alert("verificar pecas vermelhas");
				resposta=verificarPecas("pecaR");
			}
			return resposta;
		}
	}
}