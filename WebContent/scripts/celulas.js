var CELL_SIZE = 30;
//objecto celula
function cellula(cellId,ID,t,l,content_,tipoCell){
	var estado = "EMPTY"; //EMPTY | NOT
	var size = CELL_SIZE;
	var cell_id = cellId;
	var numID = ID;
	var top = t;
	var left = l;
	var content= content_;
	var pecaNaCelula;
	var TipoC=tipoCell;
	
	return {
		//devolve o seu ID
		getId: function(){
			return cell_id;
		},

		getNumID: function(){
			return numID;
		},
		
		getEstado: function(){
			return estado;
		},

		updateEstado: function(my_est){
			estado=my_est;
		},

		addPeca: function(pecaRecebida){
			pecaNaCelula = pecaRecebida;
			estado="NOT";
			pecaNaCelula.drawPeca();
		},

		getPeca: function(){
			return pecaNaCelula;
		},

		apagarPeca: function(){
			pecaNaCelula=undefined;
			estado="EMPTY";
			$("div#"+cell_id).empty();
		},
		
		//desenha a celula
		drawCell: function(){
			var qualCss;
			if (TipoC === "W"){
				qualCss="celulaW";
			}else{
				qualCss="celulaB";
			}
			var celula='<div id="'+cell_id+'" class="'+qualCss+'"><div id="content" class="content">'+content+'</div></div>';
			$("div#tab").append(celula);	
			$("div#"+cell_id).css({
				top: top+"px",
				left: left+"px"
			});

			//propriedades do drop
			$("div#"+cell_id).droppable({
				  drop: function(ev, ui) {
				    //... logic to accept the drop ...
					if (estado === "EMPTY"){
						//alert("Drop on"+cell_id+", estado = "+estado+", peca: "+pecaLevo);
					    var pecaLevo = $(ui.draggable).attr('id');
						var est=stage.movePecaTo(pecaLevo, cell_id);
						if (est === true){
							estado="NOT";
						}
					    //to cancel the revert effect, just remove the helper
					    ui.helper.fadeOut();
					}else if (estado === "NOT"){//problema..... o drop n acontece sempre !!!
					    //alert("dropped failed");
					    //revert effect will be executed (as planned)
					}
				}
			});
		}
	}
}