//objecto tabuleiro
function tabuleiro(){
	//vars
	var tab = [0];
	var x;
	for(x=0;x<9;x++){
		tab[x]= [0];
	}
	tab[0][0] = cellula();
	//controlar o jogo... num pecas no tabuleiro, verif se o jogo acaba... etc...
	var controlo=ControlGame(tab);
	
	//funcao para verificar se o num esta no array
	function posicaoInicial(array, num){
		var i;
		for (i=0; i<24; i++){
			if (num === array[i]){
				return true;
			}
		}
		return false;
	}
	
	//mover a peca
	function verifSeAndarPossivel(numCelOndVou, numCelOndVeio, tipoPeca){
		//para se mover tem de ser a sua vez, e tem de ser uma jogada valida, pode ser obrigado a comer
		if (tipoPeca === "pecaG" && controlo.getVez() === "green"){//pecas andam para baixo
			var andarEsqDeCima = (numCelOndVeio+8)-1;
			var andarDirDeCima = (numCelOndVeio+8)+1;
			if ( controlo.verificarSeTemDeComerOuNao("green") === false){//antes de o jogador jogar, verificar o que pode fazer
				if (numCelOndVou === andarEsqDeCima || numCelOndVou === andarDirDeCima){
					//pode andar 1 casa
					controlo.updateNumJogadas("green");
					return true;
				}
			}else{
				var i;
				var andarEsqDeCimaEComer = (numCelOndVeio+16)-2;
				var andarDirDeCimaEComer = (numCelOndVeio+16)+2;
				if(numCelOndVou === andarEsqDeCimaEComer){//andar 2 casa.... tem de comer....
					//apagar a peca comida do tabuleiro que vem da direita
					var numCelldaPecaApagar=andarEsqDeCima;
					//alert("dir e pos="+numCelldaPecaApagar);
					//procurar na tab[][], o I e J da celula onde esta a peca a apagar e apaga-la
					for (i=0; i<8; i++){
						for (j=0; j<8; j++){
							var celulaTab=tab[i+1][j+1];
							var ID = celulaTab.getNumID();
							if (ID === numCelldaPecaApagar){
								//alert("encontrei: ID:"+ID);
								celulaTab.apagarPeca();
								controlo.comiPecaGreen();
							}
						}
					}
					controlo.updateNumJogadas("green");
					return true;
				}else if(numCelOndVou === andarDirDeCimaEComer){//andar 2 casa.... tem de comer....
					//apagar a peca comida do tabuleiro que vem da esquerda
					var numCelldaPecaApagar=andarDirDeCima;
					//alert("dir e pos="+numCelldaPecaApagar);
					//procurar na tab[][], o I e J da celula onde esta a peca a apagar e apaga-la						
					for (i=0; i<8; i++){
						for (j=0; j<8; j++){
							var celulaTab=tab[i+1][j+1];
							var ID = celulaTab.getNumID();
							if (ID === numCelldaPecaApagar){
								//alert("encontrei: ID:"+ID);
								celulaTab.apagarPeca();
								controlo.comiPecaGreen();
							}
						}
					}
					controlo.updateNumJogadas("green");
					return true;
				}
			}
		}else if (tipoPeca === "pecaR" && controlo.getVez() === "red"){//pecas andam para cima
			var andarEsqDeBaixo = (numCelOndVeio-8)-1;
			var andarDirDeBaixo = (numCelOndVeio-8)+1;
			if ( controlo.verificarSeTemDeComerOuNao("red") === false){//antes de o jogador jogar, verificar o que pode fazer e depois dizer quem pode jogar
				if (numCelOndVou === andarDirDeBaixo || numCelOndVou === andarEsqDeBaixo){
					//pode andar 1 casa
					controlo.updateNumJogadas("red");
					return true;
				}
			}else{
				var i;
				var andarEsqDeBaixoEComer = (numCelOndVeio-16)-2;
				var andarDirDeBaixoEComer = (numCelOndVeio-16)+2;
				if(numCelOndVou === andarDirDeBaixoEComer){
					//apagar a peca comida do tabuleiro que vem da direita
					var numCelldaPecaApagar=andarDirDeBaixo;
					//alert("dir e pos="+numCelldaPecaApagar);
					//procurar na tab[][], o I e J da celula onde esta a peca a apagar e apaga-la
					for (i=0; i<8; i++){
						for (j=0; j<8; j++){
							var celulaTab=tab[i+1][j+1];
							var ID = celulaTab.getNumID();
							if (ID === numCelldaPecaApagar){
								//alert("encontrei: ID:"+ID);
								celulaTab.apagarPeca();
								controlo.comiPecaRed();
							}
						}
					}
					controlo.updateNumJogadas("red");
					return true;
					
				}else if(numCelOndVou === andarEsqDeBaixoEComer){
					//apagar a peca comida do tabuleiro que vem da esquerda
					var numCelldaPecaApagar=andarEsqDeBaixo;
					//alert("dir e pos="+numCelldaPecaApagar);
					//procurar na tab[][], o I e J da celula onde esta a peca a apagar e apaga-la
					for (i=0; i<8; i++){
						for (j=0; j<8; j++){
							var celulaTab=tab[i+1][j+1];
							var ID = celulaTab.getNumID();
							if (ID === numCelldaPecaApagar){
								//alert("encontrei: ID:"+ID);
								celulaTab.apagarPeca();
								controlo.comiPecaRed();
							}
						}
					}
					controlo.updateNumJogadas("red");
					return true;
				}
			}
		}
		
		return false;
	}

	//procurar obj da celula pelo cell_id
	function procuraObjCel(cellOndVou){
		var i;
		var j;
		for (i=0; i<8; i++){
			for (j=0; j<8; j++){
				var celula = tab[i+1][j+1];//celula onde esta a peca no momento
				if (celula.getId() === cellOndVou){
					var num=celula.getNumID();
					return num;
				}
			}
		}
		return false;
	}
	
	return {
		//criar numeracao do tabuleiro
		numeros: function(){
			var i;
			var j=0;
			for (i=0; i<8; i++){
				tab[i+1][0]=cellula("cellN"+i,i,(j+33*(i+1)),0,i+1,"W");
				tab[i+1][0].drawCell();
			}
		},

		//criar alfabeto do tabuleiro
		letras: function(){
			var i;
			var j=0;
			for (i=0; i<8; i++){
				tab[0][i+1]=cellula("cellL"+i,i,0,(j+33*(i+1)),String.fromCharCode(65+i),"W");
				tab[0][i+1].drawCell();
				
			}
		},

		//criar o tabuleiro de jogo
		tabuleiro: function(){
			var i=0;
			var j=0;
			var k=0;
			var contaC=0;
			var contaP=0;
			var posicoesIniciais = [0,2,4,6,9,11,13,15,16,18,20,22,41,43,45,47,48,50,52,54,57,59,61,63];
			var tipoC="B";//W- white, B- Black
			
			//add celulas ao tabuleiro
			for (i=0; i<8; i++){
				if (tipoC === "W"){
					tipoC="B";
				}else{
					tipoC="W";
				}
				for (j=0; j<8; j++){
					//add celula ao tabuleiro de jogo
					if (tipoC === "W"){
						tipoC="B";
					}else{
						tipoC="W";
					}
					tab[i+1][j+1]=cellula("cellT"+contaC,contaC,(k+33*(i+1)),(k+33*(j+1)),"",tipoC);
					tab[i+1][j+1].drawCell();
					//add peca de jogo na sua celula de jogo inicial
					if (posicaoInicial(posicoesIniciais, contaC)){
						var tipo="pecaG";
						if (contaP > 11){
							tipo="pecaR";
						}
						var nova = newPeca(contaP,posicoesIniciais[contaP],tipo);
						tab[i+1][j+1].addPeca(nova);
						//incrementar contador de pecas iniciais, max=24
						contaP++;
					}
					//incrementar o contador de celulas, max=64
					contaC++;
				}
			}
			setTimeout(controlo.init, 500);
		},

		movePecaTo: function(pecaLevo, cellOndVou){
			var i;
			var j;

			var objPecaLevo;
			//alert("remove peca !!");
			
			//mover a peça, procurar a peca que levo na tab[][], o seu I e J para remover a peca da celula
			for (i=0; i<8; i++){
				for (j=0; j<8; j++){
					var celula = tab[i+1][j+1];//verificar celula
					var peca=celula.getPeca();
					if (peca !== undefined){
						var ID = ("peca"+peca.getID());
						if (ID === pecaLevo){//encontrar a peca
							objPecaLevo=celula.getPeca();

							var numCelOndVou=procuraObjCel(cellOndVou);
							var numCelOndVeio=celula.getNumID();
							var tipoPeca=objPecaLevo.getTipo();

							if ( verifSeAndarPossivel(numCelOndVou, numCelOndVeio, tipoPeca) ){
								//apagar a peca tanto na tab -> celula como na div celula
								celula.apagarPeca();
								//procurar na tab[][], o I e J da celula para onde a peca vai e coloca-la lá
								for (i=0; i<8; i++){
									for (j=0; j<8; j++){
										var celula=tab[i+1][j+1];
										var ID = celula.getId(); 
										if (ID === cellOndVou){
											objPecaLevo.editCellPeca((celula.getNumID()));
											celula.addPeca(objPecaLevo);
											return true;
										}
									}
								}
							}
							
						}
					}
				}
			}
		}



				
	}
}