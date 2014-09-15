
Pea Slider - Image Slider para AngularJS
===========


Requisitos:

    AngularJS
    JQuery

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
		background:url(../imagem/loading.gif) no-repeat  center;
		z-index: 1000;
		position: relative;

	}

	peaslider img {
		width: 100%;
		height: 300px;

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

	/* pea-slider*/


Estrutura:

	<div class="pea-slider">
		
		<peaslider><!-- peaslider -->

			<img src="" />

			<slide-images>
				<slide-img img-src="web-files/images/bg1.jpg"></slide-img>
				<slide-img img-src="web-files/images/bg2.jpg"></slide-img>
				<slide-img img-src="web-files/images/bg3.jpg"></slide-img>
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
	slider.directive("peaslider", function () {
	   return {
	      restrict: "E",
	      link: function (scope, elem, attrs) {

	      	//vars        // fadein     // fadeout
	        var config = {'delay': 300, 'duration': 1300 };
	      	var slider = elem;
	      	var slideSrc = elem.find('slide-img');
	      	var imgSrc = elem.find('img');
	        var slideVector = slideSrc.length;
	        var num = 0;
	        var firstImage = slideSrc.eq(num).attr('img-src');

	      	//definindo primeira imagem a ser carregada
	      	imgSrc.attr('src', firstImage);

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

	  	        //Procure a imagem grande atual e desapareça com ela
	  	        slider.fadeOut(config.duration, function(){

	               imgSrc.attr('src', imgLink);

	                imgSrc.load(function() {

	                    slider.fadeIn(config.delay);

	                });
	  	        });

	  	    }

	      }

	   };
	});
