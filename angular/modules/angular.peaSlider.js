'use strict';

//      ***********************************************
//      *** Pea Image Slider P/ AngularJS Ver. 1.5  ***
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