//objecto barra loading
function progressBar(){
	var percentagem=0;
	
	return {
		start: function(){
			//init progress Bar
			$('div#progressBar').progressbar({ value: percentagem });
		},

		update: function(){
			percentagem = percentagem + 50;
			setTimeout(function(){
				//update Bar
				$('div#progressBar').progressbar( 'value', percentagem );
				//percentagem = 100, mostrar botao Start
				if(percentagem===100){
					$('div#but').show();
				}
			},2000);
		}
	}
}