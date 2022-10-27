import array from './assets/data/mass.json' assert {type: 'json'};
import * as calculate from './assets/scripts/calculate.js';
import * as generate from './assets/scripts/generate.js';

const voltages = array.values.sort((a, b) => a - b);
const voltagesCount = voltages.length;

const average = calculate.getAverage(voltages);
const standardDeviationSeriesOfObservations = calculate.getStandardDeviationSeriesOfObservations(voltages, average);
const standardDeviationMeasurementResult = calculate.getStandardDeviationMeasurementResult(standardDeviationSeriesOfObservations, voltagesCount);

const maxValue = Math.max.apply(null, voltages);
const minValue = Math.min.apply(null, voltages);
const range = maxValue - minValue;
const intervals = calculate.getSturgessInterval(voltagesCount);
const intervalsWidth = calculate.getIntervalWidth(range, intervals);
const intervalsCoords = calculate.getIntervalCoordinates(intervals, intervalsWidth, minValue);
const intervalsPerCoordsCount = calculate.getIntervalsPerCoordsCount(voltages, intervalsCoords);

const maxPerCoords = Math.max.apply(null, intervalsPerCoordsCount);
const barsCount = intervalsPerCoordsCount.length;

const barChart = document.querySelector('.bar-chart');

intervalsPerCoordsCount.forEach((elem, index) => {
    barChart.innerHTML += generate.drawBar(index + 1);
    const currentBar = document.querySelector(`.bar-${index + 1}`);
    currentBar.style.gridRowStart = -elem - 1;
    currentBar.style.background = (index % 2 === 0) ? 'darkcyan' : 'brown';
});

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
console.log('intervalsPerCoordsCount', intervalsPerCoordsCount);

const tableRawValues = [maxValue,
    minValue,
    average,
    range,
    intervals,
    standardDeviationSeriesOfObservations,
    standardDeviationMeasurementResult,
]

console.log(tableRawValues);

const tableData = document.querySelectorAll('.table-cell-data');

voltages.forEach((elem, index) => tableData[index].innerHTML = elem);

const tableValues = document.querySelectorAll('.table-cell-value');

for(let i = 0; i < tableRawValues.length; i++){
    tableValues[i].innerHTML = tableRawValues[i];
}










