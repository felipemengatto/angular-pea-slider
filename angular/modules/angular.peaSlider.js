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
