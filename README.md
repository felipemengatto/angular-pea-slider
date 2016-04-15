
Pea Slider - Image Slider para AngularJS
===========

	Demo: http://peaslider.felipemengatto.com/

Requisitos:

    AngularJS

Instalação Manual:
	
	Html:

		JS:
		<script src="../dist/angular-pea-slider.min.js"></script>
		
		CSS:
		<link rel="stylesheet" href="../dist/css/style-pea.min.css"/>

Instalação Bower:

	bower install angular-pea-slider --save

Module:

	var app = angular.module('appSite', ['pea-slider']);

	

CSS ( src/css/style-pea.min.css ):
	
	/* pea slider*/

	peaslider{
		width: 100%; 
		height: 300px;
		z-index: 1000;
		position: relative;
		float: left;
	}

	slide-content{
		-webkit-animation: fadein 1s both;
		-o-animation: fadein 1s both;
		-moz-animation: fadein 1s both;
		animation: fadein 1s both;
	}

	slide-content img {
		width: 100%;
		height: 300px;
	}

	pea-desc{
		width: 393px;
		padding: 50px;
		text-align: right;
		top: 0px;
		left: 0px;
		font-size: 18px;
		color: #FFF;
		background: rgba(0, 0, 0, 0.8) none repeat scroll 0% 0%;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		position: absolute;
	}

	.pea-slider-loading{
		background: url(pea-imagem/loading.gif) no-repeat bottom right;
	}

	.is-hidden-img{
		display: none;
	}

	peaslider button{
		outline: none;
		border: none;
		cursor: pointer;
		position: absolute;
		top: 40%;
	}

	.fadeout{
		-webkit-animation: fadeout 1s both;
		-o-animation: fadeout 1s both;
		-moz-animation: fadeout 1s both;
		animation: fadeout 1s both;
	}

	/* normal */
	@keyframes fadein{
		from{
			opacity: 0;
		}

		to{
			opacity: 0.1;
		}
		to{
			opacity: 0.2;
		}
		to{
			opacity: 0.4;
		}
		to{
			opacity: 0.6;
		}
		to{
			opacity: 0.8;
		}
		to{
			opacity: 1;
		}
	}

	@keyframes fadeout{
		to{
			opacity: 0;
		}
	}

	/* Chrome, Safari, Opera */
	@-webkit-keyframes fadein{
		from{
			opacity: 0;
		}

		to{
			opacity: 0.1;
		}
		to{
			opacity: 0.2;
		}
		to{
			opacity: 0.4;
		}
		to{
			opacity: 0.6;
		}
		to{
			opacity: 0.8;
		}
		to{
			opacity: 1;
		}
	}

	/* Chrome, Safari, Opera */
	@-webkit-keyframes fadeout{
		to{
			opacity: 0;
		}
	}

	.pea-next{
		width: 55px;
		height: 69px;
		background: url(pea-imagem/setas-slide.png) no-repeat -55px 0px;
		right:0px;
	}

	.pea-prev{
		width: 55px;
		height: 69px;
		background: url(pea-imagem/setas-slide.png) no-repeat 0px 0px;
		left:0px;
	}

	/* pea-slider */


Estrutura Simples:

    <peaslider><!-- peaslider -->

        <slide-content>
			<img ng-src="" class="is-hidden-img"/>
        </slide-content>

        <slide-images>
            <slide-img ng-repeat="{{ regra }}" img-src="web-files/images/{{item.imagem}}" repeat-end="onEnd();">
            </slide-img>
        </slide-images>

	    <button class="pea-prev" ng-click="sliderPrev();"></Button>
	    <button class="pea-next" ng-click="sliderNext();"></Button>

    </peaslider><!-- peaslider -->


Rotate Automático:
	
	Para o Pea Slider fazer a Transição entre Imagens Automaticamente ,
	basta Adicionar o Atributo ROTATE no elemento <peaslider>
	Ex:

    <peaslider rotate="8000"><!-- peaslider -->

        <slide-content>
			<img ng-src="" class="is-hidden-img"/>
        </slide-content>

        <slide-images>
            <slide-img ng-repeat="{{ regra }}" img-src="web-files/images/{{item.imagem}}" repeat-end="onEnd();">
            </slide-img>
        </slide-images>

	    <button class="pea-prev" ng-click="sliderPrev();"></Button>
	    <button class="pea-next" ng-click="sliderNext();"></Button>

    </peaslider><!-- peaslider -->

Descrição na Imagem:

	Para aparecer a DESCRIÇÃO na imagem no Pea Slider,
	basta Adicionar o Atributo DESCRIBE=" TRUE " no elemento <peaslider>,
	Adicionar a linha: <pea-desc ng-bind="describe" class="is-hidden-img"></pea-desc> dentro do <slide-content>,
	Adicionar o Atributo IMG-DESC=" TEXT " no elemento <slide-img>.
	Ex:

    <peaslider rotate="8000" describe=" true OR false "><!-- peaslider -->

        <slide-content>
			<img ng-src="" class="is-hidden-img"/>
        	<pea-desc ng-bind="describe" class="is-hidden-img"></pea-desc>
        </slide-content>

        <slide-images>
            <slide-img ng-repeat="{{ regra }}" img-desc="{{item.descricao}}" img-src="web-files/images/{{item.imagem}}" repeat-end="onEnd();">
            </slide-img>
        </slide-images>

	    <button class="pea-prev" ng-click="sliderPrev();"></Button>
	    <button class="pea-next" ng-click="sliderNext();"></Button>

    </peaslider><!-- peaslider -->


Modulo do Pea Slider ( src/angular-pea-slider.js ):

	'use strict';

	// nome do Modulo
	var slider = angular.module("pea-slider", []);

	// nome da directive a ser chamada na pagina
	slider.directive("peaslider", ['$timeout', function ($timeout) {
	   return {
	      restrict: "E",
	      scope: true,
	      link: function (scope, elem, attrs) {

	        //starting slider
	        scope.onEnd = function(){
	          //pequeno delay de iniciação
	          $timeout(settings, 100);
	        }

	        //settings
	        var settings = function(){

	            //quando for ELEMENTO - inicia com ELEM
	            //quando for ATRIBUTO - inicia com ATTR

	            //vars        // fadein     // fadeout
	            var config = {'delay': 100, 'duration': 1200 };
	            var elemPeaSlider = elem;
	            var elemSlider = elem.find('slide-content');
	            var elemImgSrc = elem.find('img');
	            var elemPeaDesc = elem.find('pea-desc');
	            var elemSlideSrc = elem.find('slide-img');
	            var vectorSlide = elemSlideSrc.length;
	            var num = 0;
	            var pull = null;
	            var rotate = 0;
	            var rotateMin = 4999;
	            var describeActive = false;

	            //
	            //  CONFIGURAÇÕES INICIAIS \/
	            // 

	            //definindo primeira imagem a ser carregada
	            prevAndNext(num);

	            //definindo se rotação irá acontecer
	            rotate          = elemPeaSlider.attr('rotate');
	            //define se havera descricao nas imagens
	            describeActive  = elemPeaSlider.attr('describe');

	            //
	            //  CONFIGURAÇÕES DE TRANSIÇÃO DE SLIDES \/
	            // 

	            //next image Function
	            scope.sliderNext = function (){

	              //incremente se for num+1 (tamanho do vetor) volta ao inicio
	              if (num+1 == vectorSlide){
	                  num = 0;
	                }else{
	                  num++;
	              }

	              prevAndNext(num);

	            }

	            //prev image Function
	            scope.sliderPrev = function (){

	                //decrementa se for igual a zero vai para o ultimo
	                if(num == 0){
	                  num = vectorSlide-1;
	                }else{
	                  num--;
	                }

	                prevAndNext(num);

	            }

	            // func PREV AND NEXT
	            function prevAndNext(num){
	                //gera link 
	                var attrImgLink = elemSlideSrc.eq(num).attr('img-src');
	                //gera descricao
	                var attrImgDesc = elemSlideSrc.eq(num).attr('img-desc');

	                  //adiciona classe de fadeOUT
	                  var timeFadeout = $timeout(function(){
	                                      //add class
	                                      elemSlider.addClass('fadeout');
	                                      elemPeaSlider.addClass('pea-slider-loading');
	                                      //Cancela Timout
	                                      $timeout.cancel(timeFadeout);
	                                    }, config.delay);

	                  //remove classe de fadeOut
	                  var timeFadein = $timeout(function(){

	                                      //muda URL da imagem
	                                      elemImgSrc.attr('src', attrImgLink);
	                                      //muda descricao
	                                      scope.describe = attrImgDesc;

	                                      //verifica quando a imagem foi carregada e remove classe para fazer o FadeIN
	                                      elemImgSrc.bind('load', function() {
	                                                    //remocoes de classe
	                                                     elemImgSrc.removeClass('is-hidden-img');
	                                                     elemSlider.removeClass('fadeout');
	                                                     elemPeaSlider.removeClass('pea-slider-loading');
	                                                    //Verifica Descricao
	                                                     descricaoVerify(describeActive, attrImgDesc);
	                                                    //cancela timout
	                                                     $timeout.cancel(timeFadein);
	                                                  });
	                                  
	                                    }, config.duration);


	                //verifica se rotate está ativo;
	                rotateVerify();

	            }

	            //
	            //  CONFIGURAÇÕES DE ROTAÇÃO COM TEMPO \/
	            //

	            //chama função de rotação a primeira vez;
	            rotateVerify();

	            //verifica se rotate Está ativado se sim ativa e não deixa normal
	            function rotateVerify(){

	              if (rotate > rotateMin) {

	                  if (pull != null) {
	                    $timeout.cancel(pull);
	                  }

	                 pull = $timeout(scope.sliderNext, rotate);
	              }

	            }

	            //pause no rotate - quando mouse over
	            elemPeaSlider.bind('mouseover', function() {
	                 $timeout.cancel(pull);
	            });

	            //return de rotação  - quando mouse out
	            elemPeaSlider.bind('mouseout', function() {
	                 rotateVerify();
	            });

	            //
	            // CONFIGURAÇÕES DE DESCRICAO DAS IMAGENS
	            //

	            //verifica se havera desc e se esta tudo OK com suas instalações 
	            function descricaoVerify(active, desc){

	                if (active === "true" && desc != "") {

	                  if (elemPeaDesc.length > 0 && desc != undefined) {
	                    elemPeaDesc.removeClass('is-hidden-img');
	                  }else if(desc == undefined){
	                    alert('Falta o Atributo img-desc="{{value}}" na TAG slide-img !');
	                  }else{
	                    alert('Falta o Elemento: <pea-desc ng-bind="describe" class="is-hidden-img"></pea-desc> !');
	                  }

	                }else{
	                  elemPeaDesc.addClass('is-hidden-img');
	                }

	            }

	        }

	      }

	   };
	}]);

	//directive que verifica qual o ultimo item da repetição e manda iniciar slider
	slider.directive("repeatEnd", [function(){
	    return {
	        restrict: 'A',
	        scope: true,
	        link: function (scope, element, attrs) {

	            //verifica se é ultimo item do ng-repeat ( mandando executar a função no item)
	            if (scope.$last) {
	                scope.$eval(attrs.repeatEnd);
	            }

	        }
	    };
	}]);