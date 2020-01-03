// DONE BY TINO 22/10/2019

findEmpresa = (data) => {
	
	resultado = ({ "cnpj": data.replace(/[^\d]+/g,'') });
	console.log(resultado);

	var url = `https://www.receitaws.com.br/v1/cnpj/${resultado.cnpj}`;
	console.log(resultado.cnpj.length);

	if (resultado.cnpj.length<1) {
		
		app.dialog.create({
			title: "Pesquisar Empresa",
			text: "Digite um cnpj válido.",
			buttons: [{
				text:"Fechar"
			}],
			on: {
			    close: function () {
			    	console.log("sim fechado");
			    }
			},
		}).open();

	}else{
		$.ajax({
			type: 'GET',
			url: `https://www.receitaws.com.br/v1/cnpj/${resultado.cnpj}`,
			crossDomain: true,
			beforeSend : function() { app.dialog.preloader("Carregando...", 'blue'); },
			complete   : function() { app.dialog.close(); },
	        data       : {},
	        dataType   : 'json',
			success: function(retorno){
				console.log(retorno);
				if (retorno.status == "ERROR") {
					app.dialog.create({
						title: "Pesquisar Empresa",
						text: "CNPJ inválido! Tente um correto.",
						buttons: [{
							text:"Fechar"
						}],
						on: {
						    close: function () {
						    	console.log("sim fechado");
						    }
						},
					}).open();

				}else{
					swich_tela_details();
					$("#nomeEmpresa").html(retorno.nome);
					$("#situacaoEmpresa").html(retorno.situacao);
					$("#cnpjEmpresa").html(retorno.cnpj);
					$("#natJuridicaEmpresa").html(retorno.natureza_juridica);
					$("#atividadePrincipalEmpresa").html(retorno.atividade_principal[0].text);
					$("#emailEmpresa").html(retorno.email);
					$("#telefoneEmpresa").html(retorno.telefone);
					$("#aberturaEmpresa").html(retorno.data_situacao);
					$("#estadoEmpresa").html(retorno.uf);

					$.each(retorno.atividades_secundarias, function(index, val) {
						$("#atividadesSecundarias").append(`
							<span class="titulo">Atividades:</span>  <span id="">${val.text}</span> <br> 
						`); 
					});

					$("#logradouroEmpresa").html(retorno.logradouro);
					$("#bairroEmpresa").html(retorno.bairro);
					$("#numeroEmpresa").html(retorno.numero);
					$("#tipoUnidadeEmpresa").html(retorno.tipo);
				}
				
	        },
	        error: function(error) {
	        	console.log("tem informacoes com erro");
				console.log(error);
	        }
		});	
	}

}



///////////////////////////////////////////////////////////////////

function primeiroAcessoBtnVoltar(){
	afed('#initApp','#primeiroAcesso','','',1);	
}

function swich_tela_details(){
	afed('#primeiroAcesso','#initApp','','');
}
