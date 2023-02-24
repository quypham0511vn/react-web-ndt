import { ReportServices } from './report-services';
import { AuthServices } from './auth-services';
import { CommonServices } from './common-services';
import { HistoryServices } from './history-service';
import { PaymentMethodServices } from './payment-method-services';
import { InvestServices } from './invest-services';
import { NotificationServices } from './notification-services';

export class ApiServices {
    auth = new AuthServices();
    
    common = new CommonServices();

    history = new HistoryServices();

    paymentMethod = new PaymentMethodServices();

    report = new ReportServices();
    
    invest = new InvestServices();

    notification = new NotificationServices();

}
