export interface ReportYearModel {
    nam: number;
    thang: number;
    dau_tu: number;
    goc_tra: number;
    lai_tra: number;
}

export interface ReportChartModel {
    moneyInvestMent: number[],
    initialMoney: number[],
    interestMoney: number[],
    label: string[]
}
