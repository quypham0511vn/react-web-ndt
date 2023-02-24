import IcOnePeople from 'assets/icon/ic_onepeople.svg';
import IcCash from 'assets/icon/ic_cash.svg';
import IcRecycle from 'assets/icon/ic_recycle.svg';
import IcLink from 'assets/icon/ic_link.svg';
import IcTwoPeople from 'assets/icon/ic_twopeople.svg';
import IcFile from 'assets/icon/ic_file.svg';
import IcInviteFriends from 'assets/icon/ic_invitefriends.svg';
import IcTutorial from 'assets/icon/ic_tutorial.svg';
import IcMessage from 'assets/icon/ic_message.svg';
import IcGlobal from 'assets/icon/ic_global.svg';
import IcMessenger from 'assets/icon/ic_messenger.svg';
import IcWhatApp from 'assets/icon/ic_what_app.svg';
import IcZingAlo from 'assets/icon/ic_zalo.svg';
import IcCall from 'assets/icon/ic_call_support.svg';

import { BankModel, RePay, UserInfoModel } from 'models/user-model';
import { ItemDocument, ItemScreenModel } from 'models/profile';
import { ItemRadioModel } from 'models/common';
import { CONTACT } from 'api/constants';

export const profile: ItemScreenModel[] = [
    {
        id: 1,
        title: 'Thông tin tài khoản',
        icon: IcOnePeople
    },
    {
        id: 2,
        title: 'Phương thức thanh toán',
        icon: IcCash
    },
    {
        id: 3,
        title: 'Đổi mật khẩu',
        icon: IcRecycle
    },
    {
        id: 4,
        title: 'Liên kết tài khoản',
        icon: IcLink
    },
    {
        id: 5,
        title: 'Hoa hồng nhà đầu tư',
        icon: IcTwoPeople
    },
    {
        id: 6,
        title: 'Điều kiện và điều khoản',
        icon: IcFile
    },
    {
        id: 7,
        title: 'Mời bạn bè',
        icon: IcInviteFriends
    },
    {
        id: 8,
        title: 'Hướng dẫn sử dụng',
        icon: IcTutorial
    },
    {
        id: 9,
        title: 'Hỏi đáp',
        icon: IcMessage
    }
    // {
    //     id: 10,
    //     title: 'Tienngay.vn',
    //     icon: IcGlobal
    // }
];

export const TabsMenuHeader: ItemScreenModel[] = [
    {
        id: 1,
        title: 'Giới thiệu',
        is_login: false
    },
    {
        id: 2,
        title: 'Sản phẩm',
        is_login: false
    },
    {
        id: 3,
        title: 'Quản lý của tôi',
        is_login: true
    },
    {
        id: 4,
        title: 'Truyền thông',
        is_login: false
    },
    {
        id: 5,
        title: 'Thông tin cá nhân',
        is_login: true
    },
    {
        id: 6,
        title: 'Thông báo',
        is_login: true
    }
];

export const InfoUser = {
    username: 'Bùi Xuân Duy',
    birth_date: '27/04/1999',
    gender: 'Nam',
    phone_number: '0862319100',
    email: 'buixuanduy2704@gmail.com',
    address: 'Đình Thôn, Mỹ Đinh 1, Nam Từ Liêm, Hà Nội',
    status: 'Chưa xác thực tài khoản'
} as UserInfoModel;

export const InfoBank = {
    account_name: 'Bui Xuan Duy',
    account_number: '071053275',
    name_bank: 'VPBank'
} as BankModel;

export const documentInfoApp = [
    {
        id: '1',
        content: `Nội dung Bản điều khoản sử dụng dịch vụ TienNgay.vn app dưới đây 
        tạo thành một Hợp đồng sử dụng dịch vụ ràng buộc về mặt pháp lý giữa Công 
        Ty Cổ Phần Công Nghệ Tài Chính Việt và Khách hàng. Khi sử dụng dịch vụ 
        TienNgay.vn app có nghĩa là khách hàng đã chấp nhận các Điều khoản 
        và điều kiện dưới đây, đồng thời chịu sự ràng buộc phải tuân thủ bởi 
        các điều khoản và điều kiện đó. Khách hàng có trách nhiệm xem xét 
        và đọc kỹ nội dung của Bản điều khoản này, nếu khách hàng không đồng ý 
        với các điều kiện và điều khoản này thì nên chấm dứt sử dụng ứng dụng này.`,
        style: 0
    },
    {
        id: '2',
        content: `Thành lập từ cuối năm 2019, TienNgay.vn (Tiện Ngay) là hệ thống dịch 
        vụ tài chính đa tiện ích tiên phong tại Việt Nam với các sản phẩm Tài chính 
        đa dạng, được "may đo" phù hợp với từng phân khúc khách hàng dựa trên nền tảng công nghệ.`,
        style: 1
    },
    {
        id: '3',
        content: `TienNgay.vn luôn nỗ lực để mang đến những trải nghiệm tốt nhất, nhiều lợi ích và lâu 
        dài cho khách hàng. Khi tham gia các gói đầu tư cùng TienNgay.vn, khách hàng cá nhân có thể 
        tối ưu hóa nguồn tiền của mình trong thời gian ngắn hạn, thay vì để tiền nhàn rỗi trong tài 
        khoản để hưởng lãi suất không thời hạn nhưng mức lãi suất lại rất thấp.`,
        style: 1
    },
    {
        id: '4',
        content: 'Lợi suất 24/7 - thanh khoản tức thời /n 4 lý do lựa chọn đầu tư cùng TienNgay.vn',
        style: 2
    },
    {
        id: '5',
        content: `TienNgay.vn là thành viên thuộc Hệ sinh thái Nexttech - Tập đoàn tiên phong 
        trong nhiều lĩnh vực công nghệ mới. TienNgay.vn có giấy phép kinh doanh minh bạch, rõ ràng. 
        Tất cả thông tin cá nhân của Khách hàng được bảo mật tuyệt đối.`,
        label: 'Uy tín: ',
        style: 3
    },
    {
        id: '6',
        content: `Tối ưu lãi suất với bất kỳ gói đầu tư nào khách hàng lựa chọn. 
        Đồng thời khách hàng có thể tái đầu tư nhanh chóng với dòng tiền linh hoạt.`,
        label: 'Lãi suất tối ưu: ',
        style: 3
    },
    {
        id: '7',
        content: 'Minh bạch về số tiền đầu tư và lãi suất thu được. Thông tin giao dịch được bảo mật tuyệt đối.',
        label: 'Giảm thiểu tối đa rủi ro: ',
        style: 3
    },
    {
        id: '8',
        content: 'Trở thành nhà đầu tư cùng TienNgay.vn ngay hôm nay',
        style: 2
    },
    {
        id: '9',
        content: `Để tham gia đầu tư cùng TienNgay.vn, khách hàng chỉ cần đáp ứng một số yêu cầu đơn giản, bao gồm:/n
        1.Số tiền đầu tư tối thiểu 3 triệu. /n 2.Thời hạn đầu tư từ 1 tháng - 24 tháng. /n 3.Đối tượng tham gia là công dân quốc tịch Việt Nam, có độ tuổi từ 18 tuổi trở lên.`,
        style: 4
    },
    {
        id: '10',
        content: `Với cách thức tham gia đơn giản cùng những lợi ích kinh tế thiết thực, có thể nói đầu tư cùng 
        TienNgay.vn là một trong những lựa chọn đầu tư thông minh, an toàn, giúp dòng tiền sinh sôi nhanh, lời nhiều.`,
        style: 1
    }
] as ItemDocument[];

export const dataTypeCard = [
    {
        id: '1',
        label: 'Số tài khoản',
        value: '1'
    },
    {
        id: '2',
        label: 'Số thẻ ATM',
        value: '2'
    }
] as ItemRadioModel[];
export const MenuSupport = [
    {
        id: 1,
        title: 'Call',
        icon: IcCall,
        link: `${'tel:'}${CONTACT.PHONE}`
    },
    {
        id: 2,
        title: 'Messenger',
        icon: IcMessenger,
        link: CONTACT.MESSENGER
    },
    {
        id: 3,
        title: 'ZingAlo',
        icon: IcZingAlo,
        link: CONTACT.ZING_ALO
    }
];
