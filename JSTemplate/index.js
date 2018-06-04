var dev = 21;

var testResults = [
    {   element: $('#brainSpan'),
        name: 'brainSpan',
        value: 11,
        interval: {
            poor: 0,
            optimal: 10
        }
    },
    {   summaryElement: $('#omega3'),
        name: 'omega3',
        generalElement: $('#omega3General'),
        graphElement: $('#omega3Graph'),
        value: 12,
        interval: {
            poor: 0,
            optimal: 12
        }
    },
    {   summaryElement : $('#cellInflammation'),
        name: 'cellInflammation',
        generalElement: $('#cellInflammationGeneral'),
        graphElement: $('#cellInflammationGraph'),
        value: 8,
        interval: {
            poor: 16,
            optimal: 1
        }
    },
    {   summaryElement : $('#carbBurRate'),
        name: 'carbBurRate',
        generalElement: $('#carbBurRateGeneral'),
        graphElement: $('#carbBurRateGraph'),
        value: 16,
        interval: {
            poor: 29,
            optimal: 17
        }
    },
    {   summaryElement : $('#memoryCapacity'),
        name: 'memoryCapacity',
        generalElement: $('#memoryCapacityGeneral'),
        graphElement: false,
        value: 1,
        interval: {
            poor: 1,
            optimal: 7
        }
    },
    {   summaryElement : $('#sustainedAttention'),
        name: 'sustainedAttention',
        generalElement: $('#sustainedAttentionGeneral'),
        graphElement: false,
        value: 2,
        interval: {
            poor: 1,
            optimal: 7
        }
    },
    {   summaryElement : $('#cognitiveFlexibility'),
        name: 'cognitiveFlexibility',
        generalElement: $('#cognitiveFlexibilityGeneral'),
        graphElement: false,
        value: 3,
        interval: {
            poor: 1,
            optimal: 7
        }
    },
    {   summaryElement : $('#processingSpeed'),
        name: 'processingSpeed',
        generalElement: $('#processingSpeedGeneral'),
        graphElement: false,
        value: 4,
        interval: {
            poor: 1,
            optimal: 7
        }
    }
];

//The logic of tests result
const resultsLogic = {
    omega3 : {
        linear: function  (test) {
            var value = 0;
            var onePercent = 0;

            test.value < test.interval.poor ?
                value = test.interval.poor:
                test.value > test.interval.optimal ?
                    value = test.interval.optimal:
                    value = test.value;


            onePercent = ((test.interval.optimal - test.interval.poor) / 100);
            var currentResult = (test.interval.poor + value) / onePercent ;

            //Change horizontal slider position based on test.value
            moveHorizontalSlider(test, currentResult);

            //Change vertical slider position based on test.value
            moveVerticalSlider(test, currentResult);

            //Change background-color based on test.value
            if(((test.interval.poor + value) / onePercent ) > 33) {
                if( ((test.interval.poor + value) / onePercent ) > 66) {
                    paintHorizontalPointerGreen(test);
                    paintCurrentScoreGreen(test);
                    paintVerticalPointerGreen(test);
                    paintSummaryCurrentScoreGreen(test);
                }
                else{
                    paintCurrentScoreOrange(test);
                    paintHorizontalPointerOrange(test);
                    paintVerticalPointerOrange(test);
                    paintSummaryRecomendationsPink(test);
                    paintSummaryCurrentScoreOrange(test);
                }
            }
            else{
                paintSummaryRecomendationsRed(test);
            }

            //Change displayed value
            processGeneralAndSummaryValues(test);
        },
        radial : function (test) {
            var value = 0;
            var onePercent = 0;


            test.value < test.interval.poor ?
                value = test.interval.poor:
                test.value > test.interval.optimal ?
                    value = test.interval.optimal:
                    value = test.value;

            //Change slider position based on test.value
            onePercent = ((test.interval.optimal - test.interval.poor) / 100);
            var currentResult = (test.interval.poor + value) / onePercent ;
            var angle = -28 + (2.36 * currentResult);
            test.graphElement.css('transform', 'rotate('+ angle+'deg)')
        }
    },
    cellInflammation : {
        linear: function (test) {
            var value = 0;
            var onePercent = 0;
            var pointer = test.generalElement
                .find('.test-box__scale-box')
                .find('.scale-box__scale')
                .find('.scale__pointer');

            test.value < test.interval.optimal ?
                value = test.interval.optimal:
                test.value > test.interval.poor ?
                    value = test.interval.poor:
                    value = test.value;

            onePercent = ((test.interval.poor - test.interval.optimal) / 100);
            var currentResult = (test.interval.poor - value) / onePercent ;

            //Change horizontal slider position based on test.value
            moveHorizontalSlider(test, currentResult);

            //Change vertical slider position based on test.value
            moveVerticalSlider(test, currentResult);

            //Change background-color based on test.value
            if(((test.interval.poor - value) / onePercent) > 33) {
                if( ((test.interval.poor - value) / onePercent) > 66) {
                    paintHorizontalPointerGreen(test);
                    paintCurrentScoreGreen(test);
                    paintVerticalPointerGreen(test);
                    paintSummaryCurrentScoreGreen(test);
                }
                else{
                    paintCurrentScoreOrange(test);
                    paintHorizontalPointerOrange(test);
                    paintVerticalPointerOrange(test);
                    paintSummaryRecomendationsPink(test);
                    paintSummaryCurrentScoreOrange(test);
                }
            }
            else{
                paintSummaryRecomendationsRed(test);
            }

            //Change displayed value
            processGeneralAndSummaryValues(test);
        },
        radial: function (test) {
            var value = 0;
            var onePercent = 0;

            test.value < test.interval.optimal ?
                value = test.interval.optimal:
                test.value > test.interval.poor ?
                    value = test.interval.poor:
                    value = test.value;

            //Change slider position based on test.value
            onePercent = ((test.interval.poor - test.interval.optimal) / 100);
            var currentResult = (test.interval.poor - value) / onePercent ;
            var angle = -28 + (2.36 * currentResult);
            test.graphElement.css('transform', 'rotate('+ angle+'deg)')
        }
    },
    carbBurRate : {
        linear: function (test) {
            var value = 0;
            var onePercent = 0;
            var pointer = test.generalElement
                .find('.test-box__scale-box')
                .find('.scale-box__scale')
                .find('.scale__pointer');

            test.value < test.interval.optimal ?
                value = test.interval.optimal:
                test.value > test.interval.poor ?
                    value = test.interval.poor:
                    value = test.value;

            onePercent = ((test.interval.poor - test.interval.optimal) / 100);
            var currentResult = (test.interval.poor - value) / onePercent;

            //Change horizontal slider position based on test.value
            moveHorizontalSlider(test, currentResult);

            //Change vertical slider position based on test.value
            moveVerticalSlider(test, currentResult);

            //Change background-color based on test.value
            if(((test.interval.poor - value) / onePercent) > 33) {
                if( ((test.interval.poor - value) / onePercent ) > 66) {
                    paintHorizontalPointerGreen(test);
                    paintCurrentScoreGreen(test);
                    paintVerticalPointerGreen(test);
                    paintSummaryCurrentScoreGreen(test);
                }
                else{
                    paintCurrentScoreOrange(test);
                    paintHorizontalPointerOrange(test);
                    paintVerticalPointerOrange(test);
                    paintSummaryRecomendationsPink(test);
                    paintSummaryCurrentScoreOrange(test);
                }
            }
            else{
                paintSummaryRecomendationsRed(test);
            }

            //Change displayed value
            processGeneralAndSummaryValues(test);
        },
        radial: function (test) {
            var value = 0;
            var onePercent = 0;

            test.value < test.interval.optimal ?
                value = test.interval.optimal:
                test.value > test.interval.poor ?
                    value = test.interval.poor:
                    value = test.value;

            //Change slider position based on test.value
            onePercent = ((test.interval.poor - test.interval.optimal) / 100);
            var currentResult = (test.interval.poor - value) / onePercent;
            var angle = -28 + (2.36 * currentResult);
            test.graphElement.css('transform', 'rotate('+ angle+'deg)')
        }
    },
    multipleTests : {
        linear: function (test) {
            var value = 0;
            var onePercent = 0;
            var pointer = test.generalElement
                .find('.test-box__scale-box')
                .find('.scale-box__scale')
                .find('.scale__pointer');

            test.value < test.interval.poor ?
                value = test.interval.poor:
                test.value > test.interval.optimal ?
                    value = test.interval.optimal:
                    value = test.value;

            onePercent = ((test.interval.optimal - test.interval.poor) / 100);
            var currentResult = (Math.abs(test.interval.poor - value) / onePercent);

            //Change horizontal slider position based on test.value
            moveHorizontalSlider(test, currentResult);

            //Change vertical slider position based on test.value
            moveVerticalSlider(test, currentResult);

            //Change background-color based on test.value
            if((Math.abs(test.interval.poor - value) / onePercent) > 33) {
                if( (Math.abs(test.interval.poor - value) / onePercent ) > 66) {
                    paintHorizontalPointerGreen(test);
                    paintCurrentScoreGreen(test);
                    paintVerticalPointerGreen(test);
                    paintSummaryCurrentScoreGreen(test);
                }
                else{
                    paintCurrentScoreOrange(test);
                    paintHorizontalPointerOrange(test);
                    paintVerticalPointerOrange(test);
                    paintSummaryRecomendationsPink(test);
                    paintSummaryCurrentScoreOrange(test);
                }
            }
            else{
                paintSummaryRecomendationsRed(test);
            }

            //Change displayed value
            processGeneralAndSummaryValues(test);
        }
    }
};

$(document).ready(function (){
    renderTestResults();
});
handleIconsPosition();

$( window ).resize(function() {
    renderTestResults();
    handleIconsPosition();
});

// Scroll to selected reference
$('.item-anchor').click(function(event) {
    event.preventDefault();
    openReference();
    var section = document.getElementById($(event.target).attr('href').slice(1));
    section.scrollIntoView({block: 'start', behavior: 'smooth'})
});

// Add click handler for "reference' button
$('.reference-title').click(function() {
    referenceToggle();
});

// Toggle 'Reference' section
function referenceToggle () {
    var colapsibileContent = $('.references-sections-box');
    var isOpen = colapsibileContent.attr('data-open');
    var referenceButton = $('.reference-title');
    if(isOpen === 'true'){
        referenceButton.removeClass('reference-open');
        closeReference();
    }
    else{
        referenceButton.addClass('reference-open');
        openReference();
    }
}

// Open 'Reference' section
function openReference () {
    var colapsibileContent = $('.references-sections-box');
    colapsibileContent.attr('data-open', 'true');
    colapsibileContent.css('height', 'auto')
}

// Close 'Reference' section
function closeReference () {
    var colapsibileContent = $('.references-sections-box');
    colapsibileContent.attr('data-open', 'false');
    colapsibileContent.css('height', 0)
}


function renderTestResults () {
    testResults.forEach(function(element) {
        if(element.name !== 'brainSpan'){
            processItem(element)
        }
        else {
            processBrainSpan(element)
        }
    })
}
function processItem (test) {
    processHorizontalAndVerticalSlidersPosition(test);
    processRadialSlider(test);

}

function moveHorizontalSlider (test, currentResult) {
    var pointer = test.generalElement
        .find('.test-box__scale-box')
        .find('.scale-box__scale')
        .find('.scale__pointer');
    var barWidth = +test.generalElement
        .find('.test-box__scale-box')
        .find('.scale-box__scale')
        .outerWidth();
    var pointerWidth = $(pointer).outerWidth();
    var onePercentOfBar = (barWidth - pointerWidth) / 100;

    pointer.css('left', ((currentResult * onePercentOfBar) - 2) + 'px');
}
function moveVerticalSlider (test, currentResult){
    var barHeight = +test.summaryElement.find('.current_slider').css('height').slice(0, -2);
    var pointer = test.summaryElement.find('.current_slider').find('.slider_pointer');
    var pointerHeight = $(pointer).outerHeight();
    var onePercent = (barHeight - pointerHeight) / 100;
    pointer.css('top', ((100 - currentResult) * onePercent) + 'px');

}
function processBrainSpan (test) {
    var value = 0;
    var pointer = test.element
        .find('.result-slider-box')
        .find('.slider-pointer');
    var mobilePointer = test.element
        .find('.slider-pointer-mobile')
    var imageHeight = test.element
        .find('.result-image').innerHeight();
    var approximatelyBarHeight =  imageHeight * 0.380;
    var onePercentOfBar = approximatelyBarHeight / 100;
    var valueElement = test.element
        .find('.result-slider-box')
        .find('.slider-score');


    test.value < test.interval.poor ?
        value = test.interval.poor :
        test.value > test.interval.optimal ?
            value = test.interval.optimal :
            value = test.value;

    var onePercent = (test.interval.optimal - test.interval.poor) / 100;
    var currentResult = 100 - (Math.abs(test.interval.poor - value) / onePercent);

    if(window.innerWidth > 800){
        pointer.css('top', ((currentResult * onePercentOfBar) + 9) +'px')
    }
    else{
        mobilePointer.css('top', ((currentResult * onePercentOfBar) + 20) +'px')
    }
//    Display new test.result
    valueElement.text(value)

}
function processGeneralAndSummaryValues (test) {
    var generalValue = test.generalElement
        .find('.test-box__score-box')
        .find('.score__item-value');
    var summaryValue = test.summaryElement
        .find('.diagram-item-body')
        .find('.body_current-score')
        .find('.slider_description')
        .find('.slider_description__item-value');
    switch(test.name) {
        case 'omega3':
            generalValue.text(test.value + '%');
            summaryValue.text(test.value + '%');
            break;
        case 'carbBurRate':
            generalValue.text(test.value + '%');
            summaryValue.text(test.value + '%');
            break;
        case 'cellInflammation':
            generalValue.text(test.value + ':1');
            summaryValue.text(test.value + ':1');
            break;
        default:
            generalValue.text(test.value);
            summaryValue.text(test.value);
            break;
    }
}
function processHorizontalAndVerticalSlidersPosition (test) {
    switch (test.name) {
        case 'omega3':
            resultsLogic.omega3.linear(test);
            break;
        case 'cellInflammation':
            resultsLogic.cellInflammation.linear(test);
            break;
        case 'carbBurRate':
            resultsLogic.carbBurRate.linear(test);
            break;
        case 'memoryCapacity':
        case 'sustainedAttention':
        case 'cognitiveFlexibility':
        case 'processingSpeed':
            resultsLogic.multipleTests.linear(test);
            break;
        default:
            break;
    }

}
function processRadialSlider (test) {
    if(test.graphElement) {
        switch (test.name) {
            case 'omega3':
                resultsLogic.omega3.radial(test);
                break;
            case 'cellInflammation':
                resultsLogic.cellInflammation.radial(test);
                break;
            case 'carbBurRate':
                resultsLogic.carbBurRate.radial(test);
                break;
            default:
                break;
        }
    }
}
function handleIconsPosition () {
    if(window.innerWidth < 681){

        changeIconsPosition();
    } else{
        defaultIconsPosition();
    }
}
function changeIconsPosition () {
    var results = $('.diagram-item');
    results.each(function(index, element){
        var icon = $(element).find('.diagram-item-icon-box');
        var iconHeight = +icon.css('height').slice(0, -2);
        var descriptionElementHeight = +$(element)
            .find('.diagram-item-body')
            .find('.body-description')
            .css('height').slice(0, -2);

        icon.css('top', (descriptionElementHeight - 33) + 'px');
    })
}
function defaultIconsPosition () {
    var results = $('.diagram-item');
    results.each(function(index, element){
        var icon = $(element).find('.diagram-item-icon-box');

        icon.css('top', 'calc(50% - 36px)');
    })
}
function paintCurrentScoreGreen (test) {
    var currentScoreElement = test.generalElement
        .find('.test-box__score-box');
    currentScoreElement.addClass('test-box__score-box-green');
}
function paintCurrentScoreOrange (test) {
    var currentScoreElement = test.generalElement
        .find('.test-box__score-box');
    currentScoreElement.addClass('test-box__score-box-orange');
}
function paintHorizontalPointerGreen (test){
    var pointer = test.generalElement
        .find('.test-box__scale-box')
        .find('.scale-box__scale')
        .find('.scale__pointer');

    pointer.addClass('scale__pointer-green');
}
function paintHorizontalPointerOrange (test){
    var pointer = test.generalElement
        .find('.test-box__scale-box')
        .find('.scale-box__scale')
        .find('.scale__pointer');

    pointer.addClass('scale__pointer-orange');
}
function paintVerticalPointerGreen (test){
    var pointer = test.summaryElement.find('.current_slider').find('.slider_pointer');
    pointer.addClass('slider_pointer__green')
}
function paintVerticalPointerOrange (test){
    var pointer = test.summaryElement.find('.current_slider').find('.slider_pointer');
    pointer.addClass('slider_pointer__orange')
}
function paintSummaryCurrentScoreGreen (test) {
    var currentScoreElement = test.summaryElement
        .find('.diagram-item-body')
        .find('.body_current-score')
        .find('.slider_description');
    currentScoreElement.addClass('slider_description__green');
}
function paintSummaryCurrentScoreOrange (test) {
    var currentScoreElement = test.summaryElement
        .find('.diagram-item-body')
        .find('.body_current-score')
        .find('.slider_description');
    currentScoreElement.addClass('slider_description__orange');
}
function paintSummaryRecomendationsRed (test) {
    var recomendationsElement = test.summaryElement
        .find('.body_recommendations');
    recomendationsElement.addClass('recommendation-red');
}
function paintSummaryRecomendationsPink (test) {
    var recomendationsElement = test.summaryElement
        .find('.body_recommendations');
    recomendationsElement.addClass('recommendation-pink');
}