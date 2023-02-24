import { RecruitModel } from 'models/recruit';

export const InvestMethod = [
    {
        id: 1,
        text: 'Tài khoản Ngân lượng',
        value: 'nganluong'
    },
    {
        id: 2,
        text: 'Tài khoản ngân hàng',
        value: 'bank'
    }
];

export const columnNameHistory = ['STT', 'Số tiền gốc', 'Số tiền lãi', 'Tổng tiền', 'Trạng thái', 'Ngày nhận'];
export const columnNameInvest = ['STT', 'Kỳ nhận', 'Số tiền gốc', 'Số tiền lãi', 'Tổng tiền', 'Ngày nhận'];
export const columnNameCommission = ['STT', 'Họ và tên', 'Tổng tiền đầu tư', 'Hoa hồng'];

export const arrInvestKey = ['ky_tra', 'tien_goc_tra', 'tien_lai_tra', 'tong_goc_lai', 'ngay_nhan'];
export const arrKeyHistory = ['tien_goc', 'tien_lai', 'so_tien', 'trang_thai', 'ngay_tra_lai'];
export const arrKeyCommission = ['name', 'total_money', 'money_commission'];

export const arrKeyInvestMobile = ['tien_goc_tra', 'tien_lai_tra', 'tong_goc_lai', 'ngay_nhan'];
export const arrKeyHistoryMobile = ['ngay_tra_lai', 'tien_goc', 'tien_lai', 'so_tien'];
export const arrKeyCommissionMobile = ['total_money', 'money_commission'];

export const labelInvestArr = {
    ngay_nhan: 'Ngày thanh toán',
    tien_goc_tra: 'Số tiền gốc',
    tien_lai_tra: 'Số tiền lãi',
    tong_goc_lai: 'Tổng tiền'
};

export const labelArrHistory = {
    ngay_tra_lai: 'Ngày thanh toán',
    tien_goc: 'Số tiền gốc',
    tien_lai: 'Số tiền lãi',
    so_tien: 'Tổng tiền'
};

export const labelArrCommission = {
    name: 'Họ và tên',
    total_money: 'Tiền đầu tư',
    money_commission: 'Hoa hồng'
};


export const dateListAddress = [
    {
        id: '1',
        text: 'Hà Nội',
        value: 'Hà Nội'
    },
    {
        id: '2',
        text: 'Hồ Chí Minh',
        value: 'Hồ Chí Minh'
    },
    {
        id: '3',
        text: 'Hải Dương',
        value: 'Hải Dương'
    }
];
export const dataRecruit = [
    { id: '1', title: 'Chuyên Viên Đào Tạo/Chuyên Viên Đào Tạo Cao Cấp', address: 'Thành phố Hà Nội', date: '31-12-2022', quantity: '2' },
    { id: '2', title: 'Chuyên viên Chăm sóc Nhà Đầu Tư', address: 'Thành phố Hà Nội', date: '31-12-2022', quantity: '2' },
    { id: '3', title: 'Chuyên viên Thu hồi nợ qua điện thoại', address: 'Thành phố Hồ Chí Minh', date: '31-12-2022', quantity: '2' },
    { id: '4', title: 'Chuyên viên tuyển dụng', address: 'Thành phố Hà Nội, Thành phố Hồ Chí Minh', date: '31-12-2022', quantity: '2' },
    { id: '5', title: 'Trưởng phòng giao dịch', address: 'Thành phố Hà Nội', date: '31-12-2022', quantity: '2' },
    { id: '6', title: 'Chuyên viên kinh doanh', address: 'TTỉnh Bình Dương', date: '31-12-2022', quantity: '2' },
    { id: '7', title: 'Chuyên viên Hành chính mua sắm', address: 'Thành phố Hà Nội', date: '31-12-2022', quantity: '2' },
    { id: '8', title: 'Chuyên viên sáng tạo nội dung - Content Creator', address: 'Thành phố Hà Nội', date: '31-12-2022', quantity: '2' }
] as RecruitModel[];

export const columnNameRecruit = ['VỊ TRÍ', 'ĐỊA ĐIỂM LÀM VIỆC', 'NGÀY HẾT HẠN', 'SỐ LƯỢNG'];

export const arrKeyRecruit: Array<keyof RecruitModel> = ['title', 'address', 'date', 'quantity'];

