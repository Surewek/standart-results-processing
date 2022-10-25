import array from './assets/data/mass.json' assert {type: 'json'};

const voltages = array.values.sort((a, b) => a - b);
const voltagesCount = voltages.length;


const average = getAverage(voltages);
const standardDeviationSeriesOfObservations = getStandardDeviationSeriesOfObservations(voltages, average);
const standardDeviationMeasurementResult = getStandardDeviationMeasurementResult(standardDeviationSeriesOfObservations, voltagesCount);

const maxValue = Math.max.apply(null, voltages);
const minValue = Math.min.apply(null, voltages);
const range = maxValue - minValue;
const intervals = getSturgessInterval(voltagesCount);
const intervalsWidth = getIntervalWidth(range, intervals);
const intervalsCoords = getIntervalCoordinates(intervals, intervalsWidth);
const intervalsPerCoordsCount = getIntervalsPerCoordsCount(voltages, intervalsCoords);


// console.log('volt: ', voltages);

console.log('max: ', maxValue);
console.log('min: ', minValue);
console.log('range: ', range);
console.log('intervals: ', intervals);
console.log('VVVV: ', voltages);

console.log('average: ', average);
console.log('standardDeviationSeriesOfObservations: ', standardDeviationSeriesOfObservations);
console.log('standardDeviationMeasurementResult: ', standardDeviationMeasurementResult);
console.log('interval width', intervalsWidth);
console.log('intervals coords', intervalsCoords);
console.log('intervalsPerCoordsCount', intervalsPerCoordsCount)














function getAverage(array) {
    let number = array.reduce((prev, curr) => prev + curr) / array.length;

    return getRoundNumber(number, 4);
}

function getStandardDeviationSeriesOfObservations(array, average) {
    let number = Math.sqrt((array.reduce((prev, curr) => prev + (curr - average) ** 2, 0)) / (array.length - 1));

    return getRoundNumber(number, 4);
}

function getStandardDeviationMeasurementResult(coefficient, count) {
    let number = coefficient / Math.sqrt(count);

    return getRoundNumber(number, 4);
}

function getSturgessInterval(length) {
    let number = Math.ceil(1 + (3.32 * Math.log10(length)));

    return number % 2 === 0 ? number + 1 : number;
}

function getIntervalWidth(range, intervalsCount) {
    let width = range / intervalsCount;

    return width;
}

function getIntervalCoordinates(intervalsCount, intervalsWidth) {
    let rightBorder;
    let leftBorder = 0;
    let coordinates = [];

    for (let i = 1; i <= intervalsCount; i++) {
        rightBorder = i * intervalsWidth;

        console.log(i, minValue + leftBorder, minValue + rightBorder);
        coordinates.push([minValue + leftBorder, minValue + rightBorder]);

        leftBorder = rightBorder;
    }

    return coordinates;
}

function getIntervalsPerCoordsCount(array, coords) {

    let counts = getArrayOfZeroes(coords.length);
    let currentIndex = 0;

    console.log(array[0]);
    console.log(coords[0]);

    array.forEach(element => {
        if(element >= coords[currentIndex][0] && element <= coords[currentIndex][1]){
            counts[currentIndex] += 1;
        } else {
            currentIndex++;
            if(element >= coords[currentIndex][0] && element <= coords[currentIndex][1]){
                counts[currentIndex] += 1;
            }
        }
    });

    return counts;
}

function getRoundNumber(number, digitsCount) {
    return +Math.floor(number * (10 ** digitsCount)) / (10 ** digitsCount);
}

function getArrayOfZeroes(length) {
    let array = [];
    while (array.length < length) {
        array.push(0);
    }

    return array;
}