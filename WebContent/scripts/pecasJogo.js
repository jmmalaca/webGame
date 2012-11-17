//objecto peca de jogo
function newPeca(pecaID,celula,tipo){
	var ID=pecaID;
	var cell=celula;
	var tipoClass=tipo;
	
	return {
		//devolve o ID
		getID: function(){
			return ID;
		},

		editCellPeca: function(novaCell){
			cell=novaCell;
		},

		getTipo: function(){
			return tipoClass;
		},

		//desenhar peca na celula inicial
		drawPeca: function(){
			var peca='<div id="peca'+ID+'" class="'+tipoClass+'"></div>';
			$("div#cellT"+cell).append(peca);
			//drag nas pecas de jogo, assim mexe-mos um ghost
			$("div#peca"+ID).draggable({
				helper: 'clone',
			    revert: true,

			    start: function(ev, ui) {
					$("div#peca"+ID).css( 'z-index', '2');
				},

				stop: function(ev, ui) {
					$("div#peca"+ID).css( 'z-index', '1');
				}
				
			});
		}
	}
}