
export function getAverage(array) {
    let number = array.reduce((prev, curr) => prev + curr) / array.length;

    return getRoundNumber(number, 4);
}

export function getStandardDeviationSeriesOfObservations(array, average) {
    let number = Math.sqrt((array.reduce((prev, curr) => prev + (curr - average) ** 2, 0)) / (array.length - 1));

    return getRoundNumber(number, 4);
}

export function getStandardDeviationMeasurementResult(coefficient, count) {
    let number = coefficient / Math.sqrt(count);

    return getRoundNumber(number, 4);
}

export function getSturgessInterval(length) {
    let number = Math.ceil(1 + (3.32 * Math.log10(length)));

    return number % 2 === 0 ? number + 1 : number;
}

export function getIntervalWidth(range, intervalsCount) {
    let width = range / intervalsCount;

    return width;
}

export function getIntervalCoordinates(intervalsCount, intervalsWidth, min) {
    let rightBorder;
    let leftBorder = 0;
    let coordinates = [];

    for (let i = 1; i <= intervalsCount; i++) {
        rightBorder = i * intervalsWidth;

        coordinates.push([min + leftBorder, min + rightBorder]);

        leftBorder = rightBorder;
    }

    return coordinates;
}

export function getIntervalsPerCoordsCount(array, coords) {

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

export function getRoundNumber(number, digitsCount) {
    return +Math.floor(number * (10 ** digitsCount)) / (10 ** digitsCount);
}

export function getArrayOfZeroes(length) {
    let array = [];
    while (array.length < length) {
        array.push(0);
    }

    return array;
}