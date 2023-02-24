function formatLoanMoney(number: string | undefined) {
    if (!number) {
        return '0';
    }
    return (
        `${parseInt((number || '0').replace(/\./g, ''), 10)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')} vnđ`
    );
}
function formatMoney(number: string | number | undefined) {
    if (!number) {
        return '0 đ';
    }
    return (
        `${Math.ceil(Number(number))
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ`
    );
}
function formatMoneyNotSuffixes(number: string | number | undefined) {
    if (!number) {
        return '0';
    }
    return (
        `${Math.ceil(Number(number))
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
    );
}

function formatMoneyToCommaAndNotSuffixes(number: string | number | undefined) {
    if (!number) {
        return '0';
    }
    return (
        `${Math.ceil(Number(number))
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
    );
}

function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatForEachWordCase(str: string) {
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}

function formatUpperCaseCharacter(str: string) {
    return str = str.toUpperCase?.();
}

function formatRoundNumberToDecimalMillion(number: number) { // from 1440000 to round 1.44

    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const format = (Math.abs(Number(number)) / 1.0e+6).toFixed(1);
    1;
    return formatter.format(Number(format));
}

function formatObjectToKeyLabel(data: any) {
    const lengthArray = new Array(Object.keys(data).length);
    if (lengthArray.length > 0) {
        for (let i = 0; i < lengthArray.length; i++) {
            lengthArray[i] = {
                id: i,
                text: Object.values(data)[i],
                value: Object.values(data)[i]
            };
        }
        return lengthArray;
    }
    return [];
}

function convertSecondToMinutes(value: number) {
    return `${Math.floor(value / 60)}:${value % 60 ? `0${value % 60}`.slice(-2) : '00'}`;
}

function formatObjectFilterInvest(data: any) {
    const lengthArray = new Array(Object.keys(data).length);
    if (lengthArray.length > 0) {
        for (let i = 0; i < lengthArray.length; i++) {
            lengthArray[i] = {
                id: i,
                text: Object.values(data)[i],
                value: Object.keys(data)[i]
            };
        }
        return lengthArray;
    }
    return [];
}

function formatTextToNumber(textNumber: string | undefined) {
    if (!textNumber) {
        return 0;
    }
    else {
        const num = (`${textNumber}`).replace(/[^0-9]/g, '');
        return num;
    }
}

function formatHidePhoneNumber(textNumber: string) {
    const length = textNumber.length;
    const replacement = '*';
    for (let i = 3; i < length - 2; i++) {
        textNumber = textNumber.substring(0, i) + replacement + textNumber.substring(i + 1);
    }
    return textNumber;
}

export default {
    formatLoanMoney,
    formatMoney,
    formatMoneyNotSuffixes,
    capitalizeFirstLetter,
    formatForEachWordCase,
    formatUpperCaseCharacter,
    formatRoundNumberToDecimalMillion,
    formatObjectToKeyLabel,
    convertSecondToMinutes,
    formatObjectFilterInvest,
    formatTextToNumber,
    formatMoneyToCommaAndNotSuffixes,
    formatHidePhoneNumber
};
