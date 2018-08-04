var testResults = [
    //  BrainSpan Trajectory Index is increasing, min value = 0, max value = 10.
    {   element: $('#brainSpan'),
        name: 'brainSpan',
        value: 11,
        interval: {
            poor: 0,
            optimal: 10
        }
    },
    //  Omega-3 Index is increasing, min value = 0, max value = 12.
    {   summaryElement: $('#omega3'),
        name: 'omega3',
        generalElement: $('#omega3General'),
        graphElement: $('#omega3Graph'),
        value: 4,
        history: {
            first: 10,
            second: 9,
            third: 4.9
        },
        interval: {
            poor: 0,
            optimal: 12
        }
    },
    //  Cell Inflammation Balance is decreasing, min value = 16, max value = 1. The value 16 means 16:1, the value 1 means 1:1
    {   summaryElement : $('#cellInflammation'),
        name: 'cellInflammation',
        generalElement: $('#cellInflammationGeneral'),
        graphElement: $('#cellInflammationGraph'),
        value: 17,
        history: {
            first: 13,
            second: 9,
            third: 6
        },
        interval: {
            poor: 16,
            optimal: 1
        }
    },
    //  Carb Burn Rate Index is decreasing, min value = 29, max value = 17.
    {   summaryElement : $('#carbBurRate'),
        name: 'carbBurRate',
        generalElement: $('#carbBurRateGeneral'),
        graphElement: $('#carbBurRateGraph'),
        value: 29,
        history: {
            first: 18,
            second: 22,
            third: 27
        },
        interval: {
            poor: 29,
            optimal: 17
        }
    },
    //  Memory Capacity is increasing, min value = 1, max value = 7;
    {   summaryElement : $('#memoryCapacity'),
        name: 'memoryCapacity',
        generalElement: $('#memoryCapacityGeneral'),
        graphElement: false,
        value: 7,
        history: {
            first: 1,
            second: 2,
            third: 5
        },
        interval: {
            poor: 1,
            optimal: 7
        }
    },
    //  Sustained Attention is increasing, min value = 1, max value = 7;
    {   summaryElement : $('#sustainedAttention'),
        name: 'sustainedAttention',
        generalElement: $('#sustainedAttentionGeneral'),
        graphElement: false,
        value: 2,
        history: {
            first: 10,
            second: 0,
            third: 5
        },
        interval: {
            poor: 1,
            optimal: 7
        }
    },
    //  Cognitive Flexibility is increasing, min value = 1, max value = 7;
    {   summaryElement : $('#cognitiveFlexibility'),
        name: 'cognitiveFlexibility',
        generalElement: $('#cognitiveFlexibilityGeneral'),
        graphElement: false,
        value: 3,
        history: {
            first: 6,
            second: 4,
            third: 2
        },
        interval: {
            poor: 1,
            optimal: 7
        }
    },
    //  Processing Speed is increasing, min value = 1, max value = 7;
    {   summaryElement : $('#processingSpeed'),
        name: 'processingSpeed',
        generalElement: $('#processingSpeedGeneral'),
        graphElement: false,
        value: 4,
        history: {
            first: 9,
            second: 6,
            third: 3
        },
        interval: {
            poor: 1,
            optimal: 7
        }
    }
];

var historyDates = {
    history: {
        first: '10/20/17',
        second: '10/15/17',
        third: '10/05/17'
    },
    currentDate : '10/25/17'
};

//The logic of tests result
const resultsLogic = {
    omega3 : {
        linear: function  (test) {
            var value = resultsLogic.omega3.getActualNormalizedResult(test, test.value);

            var onePercent = resultsLogic.omega3.getOnePercent(test);

            var currentResult = resultsLogic.omega3.getCurrentPercents(test, value, onePercent) ;

            //Change horizontal slider position based on test.value
            moveHorizontalSlider(test, currentResult);

            //Change vertical slider position based on test.value
            moveVerticalSlider(test, currentResult);

            // Change history's sliders position based on test.value
            if(test.history){
                renderHistorySlider(
                    test,
                    resultsLogic.omega3.getActualNormalizedResult,
                    resultsLogic.omega3.getOnePercent,
                    resultsLogic.omega3.getCurrentPercents);
            }

            //Change background-color based on test.value
            var barResult = (test.interval.poor + value) / onePercent;
            if(barResult >= 0 && barResult <= 20) {
                paintSummaryRecomendationsRed(test);
            }
            if(barResult > 20 && barResult <= 40){
                paintHorizontalPointerOrange(test);
                paintCurrentScoreOrange(test);
                paintVerticalPointerOrange(test);
                paintSummaryCurrentScoreOrange(test);
                paintRadialPointerOrange(test.graphElement)
            }
            if(barResult > 40 && barResult <= 60) {
                paintHorizontalPointerGray(test);
                paintCurrentScoreGray(test);
                paintVerticalPointerGray(test);
                paintSummaryCurrentScoreGray(test);
                paintRadialPointerGray(test.graphElement)
            }
            if(barResult > 60 && barResult <= 80) {
                paintHorizontalPointerLightgreen(test);
                paintCurrentScoreLightgreen(test);
                paintVerticalPointerLightgreen(test);
                paintSummaryCurrentScoreLightgreen(test);
                paintRadialPointerLightgreen(test.graphElement)
            }
            if(barResult > 80 && barResult <= 100) {
                paintHorizontalPointerGreen(test);
                paintCurrentScoreGreen(test);
                paintVerticalPointerGreen(test);
                paintSummaryCurrentScoreGreen(test);
                paintRadialPointerGreen(test.graphElement)
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
            var angle = 1.8 * currentResult;
            test.graphElement.css('transform', 'rotate('+ angle+'deg)')
        },
        getActualNormalizedResult: function getActualNormalizedResult(test, value) {
            var result = 0;
            value < test.interval.poor ?
                result = test.interval.poor:
                value > test.interval.optimal ?
                    result = test.interval.optimal:
                    result = value;
            return result;
        },
        getOnePercent: function getOnePercent (test) {
            return ((test.interval.optimal - test.interval.poor) / 100)
        },
        getCurrentPercents: function getCurrentPercents(test, normalizedTestValue, onePercentArg) {
            return (test.interval.poor + normalizedTestValue) / onePercentArg;
        }
    },
    cellInflammation : {
        linear: function (test) {
            var value = getActualNormalizedResult(test, test.value);
            function getActualNormalizedResult(test, value) {
                var result = 0;
                value < test.interval.optimal ?
                    result = test.interval.optimal:
                    value > test.interval.poor ?
                        result = test.interval.poor:
                        result = value;
                return result;
            }

            var onePercent = getOnePercent(test);
            function getOnePercent (test) {
                return ((test.interval.poor - test.interval.optimal) / 100);
            }

            var currentResult = getCurrentPercents(test, value, onePercent) ;
            function getCurrentPercents(test, normalizedTestValue, onePercentArg) {
                return (test.interval.poor - normalizedTestValue) / onePercentArg ;
            }

            //Change horizontal slider position based on test.value
            moveHorizontalSlider(test, currentResult);

            //Change vertical slider position based on test.value
            moveVerticalSlider(test, currentResult);

            // Change history's sliders position based on test.value
            if(test.history){
                renderHistorySlider(test, getActualNormalizedResult, getOnePercent, getCurrentPercents);
            }

            var barResult = (test.interval.poor - value) / onePercent;
            if(barResult >= 0 && barResult <= 20) {
                paintSummaryRecomendationsRed(test);
            }
            if(barResult > 20 && barResult <= 40){
                paintHorizontalPointerOrange(test);
                paintCurrentScoreOrange(test);
                paintVerticalPointerOrange(test);
                paintSummaryCurrentScoreOrange(test);
                paintRadialPointerOrange(test.graphElement)
            }
            if(barResult > 40 && barResult <= 60) {
                paintHorizontalPointerGray(test);
                paintCurrentScoreGray(test);
                paintVerticalPointerGray(test);
                paintSummaryCurrentScoreGray(test);
                paintRadialPointerGray(test.graphElement)
            }
            if(barResult > 60 && barResult <= 80) {
                paintHorizontalPointerLightgreen(test);
                paintCurrentScoreLightgreen(test);
                paintVerticalPointerLightgreen(test);
                paintSummaryCurrentScoreLightgreen(test);
                paintRadialPointerLightgreen(test.graphElement)
            }
            if(barResult > 80 && barResult <= 100) {
                paintHorizontalPointerGreen(test);
                paintCurrentScoreGreen(test);
                paintVerticalPointerGreen(test);
                paintSummaryCurrentScoreGreen(test);
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
            var angle = 1.8 * currentResult;
            test.graphElement.css('transform', 'rotate('+ angle+'deg)')
        }
    },
    carbBurRate : {
        linear: function (test) {
            var value = getActualNormalizedResult(test, test.value);
            function getActualNormalizedResult(test, value) {
                var result = 0;
                value < test.interval.optimal ?
                    result = test.interval.optimal:
                    value > test.interval.poor ?
                        result = test.interval.poor:
                        result = value;
                return result;
            }

            var onePercent = getOnePercent(test);
            function getOnePercent (test) {
                return ((test.interval.poor - test.interval.optimal) / 100);
            }

            var currentResult = getCurrentPercents(test, value, onePercent) ;
            function getCurrentPercents(test, normalizedTestValue, onePercentArg) {
                return (test.interval.poor - normalizedTestValue) / onePercentArg ;
            }

            //Change horizontal slider position based on test.value
            moveHorizontalSlider(test, currentResult);

            //Change vertical slider position based on test.value
            moveVerticalSlider(test, currentResult);

            // Change history's sliders position based on test.value
            if(test.history){
                renderHistorySlider(test, getActualNormalizedResult, getOnePercent, getCurrentPercents);
            }

            //Change background-color based on test.value
            var barResult = (test.interval.poor - value) / onePercent;
            if(barResult >= 0 && barResult <= 20) {
                paintSummaryRecomendationsRed(test);
            }
            if(barResult > 20 && barResult <= 40){
                paintHorizontalPointerOrange(test);
                paintCurrentScoreOrange(test);
                paintVerticalPointerOrange(test);
                paintSummaryCurrentScoreOrange(test);
                paintRadialPointerOrange(test.graphElement)
            }
            if(barResult > 40 && barResult <= 60) {
                paintHorizontalPointerGray(test);
                paintCurrentScoreGray(test);
                paintVerticalPointerGray(test);
                paintSummaryCurrentScoreGray(test);
                paintRadialPointerGray(test.graphElement)
            }
            if(barResult > 60 && barResult <= 80) {
                paintHorizontalPointerLightgreen(test);
                paintCurrentScoreLightgreen(test);
                paintVerticalPointerLightgreen(test);
                paintSummaryCurrentScoreLightgreen(test);
                paintRadialPointerLightgreen(test.graphElement)
            }
            if(barResult > 80 && barResult <= 100) {
                paintHorizontalPointerGreen(test);
                paintCurrentScoreGreen(test);
                paintVerticalPointerGreen(test);
                paintSummaryCurrentScoreGreen(test);
                paintRadialPointerGreen(test.graphElement)
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
            var angle = 1.8 * currentResult;
            test.graphElement.css('transform', 'rotate('+ angle+'deg)')
        }
    },
    multipleTests : {
        linear: function (test) {
            var value = getActualNormalizedResult(test, test.value);
            function getActualNormalizedResult(test, value) {
                var result = 0;
                value < test.interval.poor ?
                    result = test.interval.poor:
                    value > test.interval.optimal ?
                        result = test.interval.optimal:
                        result = value;
                return result;
            }

            var onePercent = getOnePercent(test);
            function getOnePercent (test) {
                return ((test.interval.optimal - test.interval.poor) / 100);
            }

            var currentResult = getCurrentPercents(test, value, onePercent) ;
            function getCurrentPercents(test, normalizedTestValue, onePercentArg) {
                return (Math.abs(test.interval.poor - normalizedTestValue) / onePercentArg);
            }

            //Change horizontal slider position based on test.value
            moveHorizontalSlider(test, currentResult);

            //Change vertical slider position based on test.value
            moveVerticalSlider(test, currentResult);

            // Change history's sliders position based on test.value
            if(test.history){
                renderHistorySlider(test, getActualNormalizedResult, getOnePercent, getCurrentPercents);
            }

            //Change background-color based on test.value
            var barResult = Math.abs(test.interval.poor - value) / onePercent;
            if(barResult >= 0 && barResult <= 20) {
                paintSummaryRecomendationsRed(test);
            }
            if(barResult > 20 && barResult <= 40){
                paintHorizontalPointerOrange(test);
                paintCurrentScoreOrange(test);
                paintVerticalPointerOrange(test);
                paintSummaryCurrentScoreOrange(test);
            }
            if(barResult > 40 && barResult <= 60) {
                paintHorizontalPointerGray(test);
                paintCurrentScoreGray(test);
                paintVerticalPointerGray(test);
                paintSummaryCurrentScoreGray(test);
            }
            if(barResult > 60 && barResult <= 80) {
                paintHorizontalPointerLightgreen(test);
                paintCurrentScoreLightgreen(test);
                paintVerticalPointerLightgreen(test);
                paintSummaryCurrentScoreLightgreen(test);
            }
            if(barResult > 80 && barResult <= 100) {
                paintHorizontalPointerGreen(test);
                paintCurrentScoreGreen(test);
                paintVerticalPointerGreen(test);
                paintSummaryCurrentScoreGreen(test);
            }



            /*if((Math.abs(test.interval.poor - value) / onePercent) > 33) {
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
            }*/

            //Change displayed value
            processGeneralAndSummaryValues(test);
        }
    }
};

$(document).ready(function (){
    // Start counting and rendering of tests results.
    renderTestResults();
    // Add value to the date pointer.
    renderDates()
});
handleIconsPosition();

$( window ).resize(function() {
    // The handling of resize event.
    renderTestResults();
    // Add value to the date pointer.
    renderDates()
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

function renderDates () {
    if(historyDates.currentDate){
        $('.date_current').text(historyDates.currentDate)
    }
    if(historyDates.history.first){
        $('.date_first').text(historyDates.history.first)
    }
    if(historyDates.history.second){
        $('.date_second').text(historyDates.history.second)
    }
    if(historyDates.history.third){
        $('.date_third').text(historyDates.history.third)
    }
}

// The handling each of tests.
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

// Setting the counted position of horizontal slider.
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
    // var onePercentOfBar = (barWidth - pointerWidth) / 100;
    var onePercentOfBar = (barWidth - pointerWidth) / 100;
    pointer.css('left', ((currentResult * onePercentOfBar)) + 'px');
}

// Setting the counted position of vertical slider.
function moveVerticalSlider (test, currentResult){
    var barHeight = +test.summaryElement.find('.current_slider').css('height').slice(0, -2);
    var pointer = test.summaryElement.find('.current_slider').find('.slider_pointer');
    var pointerHeight = $(pointer).outerHeight();
    var onePercent = (barHeight - pointerHeight) / 100;
    pointer.css('top', ((100 - currentResult) * onePercent) + 'px');
}

function renderHistorySlider (test, getActualNormalizedResult, getOnePercentArg, getCurrentPercents) {
    if(test.history.first || test.history.first === 0) {
        processHistoryItem(test, getActualNormalizedResult, getOnePercentArg, getCurrentPercents, 'first');

    }
    if(test.history.second || test.history.second === 0) {
        processHistoryItem(test, getActualNormalizedResult, getOnePercentArg, getCurrentPercents, 'second');

    }
    if(test.history.third || test.history.third === 0) {
        processHistoryItem(test, getActualNormalizedResult, getOnePercentArg, getCurrentPercents, 'third');


    }
}

function processHistoryItem(test, getActualNormalizedResult, getOnePercentArg, getCurrentPercents, order) {
    var normalizedresult = getActualNormalizedResult(test, test.history[order]);
    var onePercent = getOnePercentArg(test);
    var currentPercents = getCurrentPercents(test, normalizedresult, onePercent);
    moveHistorySliders(test, currentPercents, order);
    drawLinesBetweenHistoryItems(test, order, currentPercents);

    //Change background-color based on test.history.[order] value.
    if(currentPercents > 20 && currentPercents <= 40) {
        paintHistoryPointerOrange(test, order);
    }
    if(currentPercents > 40 && currentPercents <= 60) {
        paintHistoryPointerGray(test, order);
    }
    if(currentPercents > 60 && currentPercents <= 80) {
        paintHistoryPointerLightgreen(test, order);
    }
    if(currentPercents > 80 && currentPercents <= 100) {
        paintHistoryPointerGreen(test, order);
    }
}

function moveHistorySliders (test, currentResult, order) {
    test.summaryElement.find('.body-score-history-' + order).addClass('history-item-active');
    var barHeight = +test.summaryElement.find('.body-score-history-' + order).css('height').slice(0, -2);
    var pointer = test.summaryElement.find('.body-score-history').find('.history_pointer_' + order);
    var pointerHeight = $(pointer).outerHeight();
    var onePercent = (barHeight - pointerHeight) / 100;
    pointer.css('top', ((100 - currentResult) * onePercent) + 'px');
}

function drawLinesBetweenHistoryItems(test, order, currentPercents) {
    var line = test.summaryElement
        .find('.body-score-history-'+ order)
        .find('.history-svg')
        .find('line');
    var historyPointer = test.summaryElement
        .find('.body-score-history-'+ order)
        .find('.history_pointer_' + order);
    var drawingLineHeight = 4;
    var pointerHeight = historyPointer.outerHeight();
    var historyPointerPosition = +historyPointer.css('top').slice(0, -2);
    var rightPointerPosition = getRightPointerPosition(test, order);

    line.css('stroke-width',drawingLineHeight );
    line.css('stroke-width',drawingLineHeight );

    line.attr('x1', '0');
    line.attr('y1', (historyPointerPosition + (pointerHeight / 2)))
    line.attr('x2', '100%');
    line.attr('y2', (rightPointerPosition + (pointerHeight / 2)))
}
function getRightPointerPosition (test, order) {
    var rightPointer;
    switch (order) {
        case "first":
            rightPointer = test.summaryElement
                .find('.body_current-score')
                .find('.current_slider')
                .find('.slider_pointer');
            break;
        case "second" :
            rightPointer = test.summaryElement
                .find('.body-score-history')
                .find('.body-score-history-first')
                .find('.slider_pointer');
            break;
        case "third" :
            rightPointer = test.summaryElement
                .find('.body-score-history')
                .find('.body-score-history-second')
                .find('.slider_pointer');
            break;
    }
    return +rightPointer.css('top').slice(0, -2);
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
                setRadialValue(test);
                break;
            case 'cellInflammation':
                resultsLogic.cellInflammation.radial(test);
                setRadialValue(test);
                break;
            case 'carbBurRate':
                resultsLogic.carbBurRate.radial(test);
                setRadialValue(test);
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

function paintCurrentScoreOrange (test) {
    var currentScoreElement = test.generalElement
        .find('.test-box__score-box');
    currentScoreElement.addClass('test-box__score-box-orange');
}
function paintCurrentScoreGray (test) {
    var currentScoreElement = test.generalElement
        .find('.test-box__score-box');
    currentScoreElement.addClass('test-box__score-box-gray');
}
function paintCurrentScoreLightgreen (test) {
    var currentScoreElement = test.generalElement
        .find('.test-box__score-box');
    currentScoreElement.addClass('test-box__score-box-lightgreen');
}
function paintCurrentScoreGreen (test) {
    var currentScoreElement = test.generalElement
        .find('.test-box__score-box');
    currentScoreElement.addClass('test-box__score-box-green');
}

function paintHorizontalPointerOrange (test){
    var pointer = test.generalElement
        .find('.test-box__scale-box')
        .find('.scale-box__scale')
        .find('.scale__pointer');

    pointer.addClass('scale__pointer-orange');
}
function paintHorizontalPointerGray (test){
    var pointer = test.generalElement
        .find('.test-box__scale-box')
        .find('.scale-box__scale')
        .find('.scale__pointer');

    pointer.addClass('scale__pointer-gray');
}
function paintHorizontalPointerLightgreen (test){
    var pointer = test.generalElement
        .find('.test-box__scale-box')
        .find('.scale-box__scale')
        .find('.scale__pointer');

    pointer.addClass('scale__pointer-lightgreen');
}
function paintHorizontalPointerGreen (test){
    var pointer = test.generalElement
        .find('.test-box__scale-box')
        .find('.scale-box__scale')
        .find('.scale__pointer');

    pointer.addClass('scale__pointer-green');
}

function paintVerticalPointerOrange (test){
    var pointer = test.summaryElement.find('.current_slider').find('.slider_pointer');
    pointer.addClass('slider_pointer__orange')
}
function paintVerticalPointerGray (test){
    var pointer = test.summaryElement.find('.current_slider').find('.slider_pointer');
    pointer.addClass('slider_pointer__gray')
}
function paintVerticalPointerLightgreen (test){
    var pointer = test.summaryElement.find('.current_slider').find('.slider_pointer');
    pointer.addClass('slider_pointer__lightgreen')
}
function paintVerticalPointerGreen (test){
    var pointer = test.summaryElement.find('.current_slider').find('.slider_pointer');
    pointer.addClass('slider_pointer__green')
}

function paintSummaryCurrentScoreOrange (test) {
    var currentScoreElement = test.summaryElement
        .find('.diagram-item-body')
        .find('.body_current-score')
        .find('.slider_description');
    currentScoreElement.addClass('slider_description__orange');
}
function paintSummaryCurrentScoreGray (test) {
    var currentScoreElement = test.summaryElement
        .find('.diagram-item-body')
        .find('.body_current-score')
        .find('.slider_description');
    currentScoreElement.addClass('slider_description__gray');
}
function paintSummaryCurrentScoreLightgreen (test) {
    var currentScoreElement = test.summaryElement
        .find('.diagram-item-body')
        .find('.body_current-score')
        .find('.slider_description');
    currentScoreElement.addClass('slider_description__lightgreen');
}
function paintSummaryCurrentScoreGreen (test) {
    var currentScoreElement = test.summaryElement
        .find('.diagram-item-body')
        .find('.body_current-score')
        .find('.slider_description');
    currentScoreElement.addClass('slider_description__green');
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

function paintHistoryPointerOrange (test, order) {
    var pointer = test.summaryElement.find('.body-score-history-'+order).find('.slider_pointer');
    pointer.addClass('slider_pointer__orange')
}
function paintHistoryPointerGray (test, order) {
    var pointer = test.summaryElement.find('.body-score-history-'+order).find('.slider_pointer');
    pointer.addClass('slider_pointer__gray')
}
function paintHistoryPointerLightgreen (test, order) {
    var pointer = test.summaryElement.find('.body-score-history-'+order).find('.slider_pointer');
    pointer.addClass('slider_pointer__lightgreen')
}
function paintHistoryPointerGreen (test, order) {
    var pointer = test.summaryElement.find('.body-score-history-'+order).find('.slider_pointer');
    pointer.addClass('slider_pointer__green')
}

function paintRadialPointerOrange(pointerImage) {
    pointerImage.attr('src','./fonts/orangeRadial.png')
}
function paintRadialPointerGray(pointerImage) {
    pointerImage.attr('src','./fonts/grayRadial.png')
}
function paintRadialPointerLightgreen(pointerImage) {
    pointerImage.attr('src','./fonts/lightgreenRadial.png')
}
function paintRadialPointerGreen(pointerImage) {
    pointerImage.attr('src','./fonts/greenRadial.png')
}
function setRadialValue(test) {
    test.graphElement
        .closest('.graph__pointer')
        .find('.result-value')
        .find('.value')
        .text(test.value)
}