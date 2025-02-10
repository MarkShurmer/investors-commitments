export function summariseNumber(number: number, decimalPlaces = 1): string {
    if(number === 0) {
        return '0';
    }

     if (number < 1000000000) {
        
        return `${(number / 1000000).toFixed(decimalPlaces)}M`;
    }

    return `${(number / 1000000000).toFixed(1)}B`;
}