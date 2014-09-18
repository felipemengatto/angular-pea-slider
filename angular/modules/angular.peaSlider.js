'use strict';

//      ***********************************************
//      *** Pea Image Slider P/ AngularJS Ver. 1.1  ***
//      ***         @Author - Felipe Mengatto       ***
//      ***                let's Go!                ***
//      ***********************************************
// ============================================================================================================

// nome do Modulo
var slider = angular.module("pea-slider", []);

// nome da directive a ser chamada na pagina
slider.directive("peaslider", function ($timeout) {
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

  	        //Procure a imagem grande atual e desapareça com ela
  	        slider.fadeOut(config.duration, function(){

               imgSrc.attr('src', imgLink);

                imgSrc.load(function() {

                    slider.fadeIn(config.delay);

                });
  	        });

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

   };
});
