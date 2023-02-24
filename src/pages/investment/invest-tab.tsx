
import { Events, TABS_INVEST, TAB_INDEX } from 'commons/constants';
import { PackageInvest } from 'models/invest';
import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState
} from 'react';
import { EventEmitter } from 'utils/event-emitter';
import Investment from '.';
import InvestDetail from './invest-detail';
import InvestPackageVerify from './invest-package-verify';
import TransferBank from './tranfer-bank';

export type TabsActions = {
    goBack: () => void;
    setTab: (tab?: any) => void;
};

export type TabProps = {
    label?: string;
    numberTabs?: number;
    receptionData?: any;
    onResetNumberTabs?: any;
};

const InvestTab = forwardRef<TabsActions, TabProps>(
    ({
        numberTabs,
        receptionData,
        onResetNumberTabs
    }: TabProps, ref) => {

        const [tabName, setTabName] = useState<string>(TABS_INVEST.INVESTMENT);
        const [investPackage, setInvestPackage] = useState<PackageInvest>();
        const nextNumber = useRef<number>(0);

        useEffect(() => {
            if (numberTabs) {
                setTabName(`${numberTabs}`);
                setInvestPackage(receptionData);
            } else {
                setTabName(TABS_INVEST.INVESTMENT);
            }
            nextNumber.current = 0;
        }, [numberTabs, receptionData]);

        const onNavigateDetail = useCallback((data: PackageInvest) => {
            setTabName(`${Number(tabName) + 1}`);
            setInvestPackage(data);
            nextNumber.current += 1;
        }, [tabName]);

        const onNextPage = useCallback(() => {
            setTabName(`${Number(tabName) + 1}`);
            nextNumber.current += 1;
        }, [tabName]);

        const goBack = useCallback(() => {
            if (nextNumber.current === 0 && numberTabs) { // go back intro 
                EventEmitter.emit(Events.CHANGE_TAB, TAB_INDEX.INTRO);
                onResetNumberTabs?.(TAB_INDEX.INVESTMENT);
            } else {
                setTabName(`${Number(tabName) - 1}`);
                nextNumber.current -= 1;
            }
        }, [numberTabs, onResetNumberTabs, tabName]);

        const onSuccessInvestPackage = useCallback(() => {
            EventEmitter.emit(Events.CHANGE_TAB, TAB_INDEX.MANAGEMENT); // vào ds gói đang đầu tư
            // EventEmitter.emit(Events.CHANGE_TAB, TAB_INDEX.MANAGEMENT, 0, { investPackage: investPackage, tabHistoryInvest: 0 }); // vào chi tiết gói đầu tư
            onResetNumberTabs?.(TAB_INDEX.INVESTMENT);
        }, [onResetNumberTabs]);

        const setTab = useCallback((tab: string) => {
            setTabName(tab);
        }, []);

        useImperativeHandle(ref, () => ({
            goBack,
            setTab
        }));

        // CHANGE TABS SCREEN INVEST
        const renderCustomTab = useCallback(() => {
            switch (tabName) {
                case TABS_INVEST.INVESTMENT:
                    return <Investment onNextScreen={onNavigateDetail} />;
                case TABS_INVEST.INVEST_DETAIL:
                    return <InvestDetail
                        onBackScreen={goBack} onNextScreen={onNextPage}
                        investPackage={investPackage} />;
                case TABS_INVEST.INVEST_PACKAGE_VERIFY:
                    return <InvestPackageVerify
                        onBackDetail={goBack}
                        onNextScreen={onNextPage}
                        onSuccessInvestPackage={onSuccessInvestPackage}
                        investPackage={investPackage} />;
                case TABS_INVEST.TRANSFER_BANK:
                    return <TransferBank
                        goBack={goBack}
                        onNextScreen={onNextPage}
                        investPackage={investPackage}
                        onSuccessInvestPackage={onSuccessInvestPackage} />;
                default:
                    break;
            }
        }, [goBack, investPackage, onNavigateDetail, onNextPage, onSuccessInvestPackage, tabName]);

        return (
            <>
                {renderCustomTab()}
            </>
        );
    }
);

export default InvestTab;

