'use strict';

//      ***********************************************
//      *** Pea Image Slider P/ AngularJS Ver. 1.7  ***
//      ***         @Author - Felipe Mengatto       ***
//      ***                let's Go!                ***
//      ***********************************************
// ============================================================================================================

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