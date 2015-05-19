
Pea Slider - Image Slider para AngularJS
===========

	Demo: http://peaslider.felipemengatto.com/

Requisitos:

    AngularJS

Instalação:
	
	Html:
	<script src="angular/modules/angular.peaSlider.js"></script>

	Module:
	var app = angular.module('appsite', ['pea-slider']);

CSS:
	
	/* pea slider*/

	.pea-slider{
		width: 100%; 
		height: 300px;
		background:url(../imagem/loading.gif) no-repeat  bottom right;
		z-index: 1000;

	}

	peaslider img {
		width: 100%;
		height: 300px;
	}

	peaslider{
		-webkit-animation: fadein 1s both;
		-o-animation: fadein 1s both;
		-moz-animation: fadein 1s both;
		animation: fadein 1s both;
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
		background: url(../imagem/setas-slide.png) no-repeat -55px 0px;
		top: 40%;
		right:0px;
		position: absolute;	

	}

	.pea-prev{
		width: 55px;
		height: 69px;
		background: url(../imagem/setas-slide.png) no-repeat 0px 0px;
		top: 40%;
		left:0px;
		position: absolute;	

	}

	/* pea-slider */


Estrutura:

	<div class="pea-slider">

	    <peaslider><!-- peaslider -->

	        <img ng-src="" class="is-hidden-img"/>

	        <slide-images>
	            <slide-img ng-repeat="{{ regra }}" img-src="web-files/images/{{ item }}" repeat-end="onEnd();">
	            </slide-img>
	        </slide-images>

	    </peaslider><!-- peaslider -->

	    <button class="pea-prev" ng-click="sliderPrev();"></Button>
	    <button class="pea-next" ng-click="sliderNext();"></Button>

	</div><!-- Fim .pea-slider -->


Rotate Automático:
	
	Para o Pea Slider fazer a Transição entre Imagens Automaticamente ,
	basta Adicionar o Atributo ROTATE no elemento <peaslider>
	Ex:

	<div class="pea-slider">
		
		<peaslider rotate="8000"><!-- peaslider --> // aqui foi adicionado o tempo que queremos entre cada Transição

	        <img ng-src="" class="is-hidden-img"/>

	        <slide-images>
	            <slide-img ng-repeat="{{ regra }}" img-src="web-files/images/{{ item }}" repeat-end="onEnd();">
	            </slide-img>
	        </slide-images>

	    </peaslider><!-- peaslider -->

	    <button class="pea-prev" ng-click="sliderPrev();"></Button>
	    <button class="pea-next" ng-click="sliderNext();"></Button>

	</div><!-- Fim .pea-slider -->


Modulo do Pea Slider:

	'use strict';

	// nome do Modulo
	var slider = angular.module("pea-slider", []);

	// nome da directive a ser chamada na pagina
	slider.directive("peaslider", function ($timeout) {
	   return {

	      restrict: "E",
	      link: function (scope, elem, attrs) {

	        //starting slider
	        scope.onEnd = function(){
	          //pequeno delay de iniciação
	          $timeout(settings, 100);
	        }

	        //settings
	        var settings = function(){


	            //vars        // fadein     // fadeout
	            var config = {'delay': 100, 'duration': 1200 };
	            var slider = elem;
	            var slideSrc = elem.find('slide-img');
	            var imgSrc = elem.find('img');
	            var slideVector = slideSrc.length;
	            var num = 0;
	            var firstImage = slideSrc.eq(num).attr('img-src');
	            var pull = null;
	            var rotate = 0;
	            var rotateMin = 4999;

	            //
	            //  CONFIGURAÇÕES INICIAIS \/
	            // 

	            //definindo primeira imagem a ser carregada
	            prevAndNext(num);

	            //definindo se rotação irá acontecer
	            rotate = slider.attr('rotate');

	            //
	            //  CONFIGURAÇÕES DE TRANSIÇÃO DE SLIDES \/
	            // 

	            //next image Function
	            scope.sliderNext = function (){

	              //incremente se for num+1 (tamanho do vetor) volta ao inicio
	              if (num+1 == slideVector){
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
	                  num = slideVector-1;
	                }else{
	                  num--;
	                }

	                prevAndNext(num);

	            }

	            // func PREV AND NEXT
	            function prevAndNext(num){
	                //gera  link de email
	                var imgLink = slideSrc.eq(num).attr('img-src');

	                  //adiciona classe de fadeOUT
	                  var timeFadeout = $timeout(function(){

	                                      slider.addClass('fadeout');
	                                      $timeout.cancel(timeFadeout);

	                                    }, config.delay);


	                  //remove classe de fadeOut
	                  var timeFadein = $timeout(function(){

	                                      //muda URL da imagem
	                                      imgSrc.attr('src', imgLink);

	                                      //verifica quando a imagem foi carregada e remove classe para fazer o FadeIN
	                                      imgSrc.bind('load', function() {
	                                                     imgSrc.removeClass('is-hidden-img');
	                                                     slider.removeClass('fadeout');
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
	            slider.parent().bind('mouseover', function() {
	                 $timeout.cancel(pull);
	            });

	            //return de rotação  - quando mouse out
	            slider.parent().bind('mouseout', function() {
	                 rotateVerify();
	            });
	        }

	      }

	   };
	});

	//directive que verifica qual o ultimo item da repetição e manda iniciar slider
	slider.directive("repeatEnd", function(){
	    return {
	        restrict: 'A',
	        link: function (scope, element, attrs) {

	            //verifica se é ultimo item do ng-repeat ( mandando executar a função no item)
	            if (scope.$last) {
	                scope.$eval(attrs.repeatEnd);
	            }

	        }
	    };
	});