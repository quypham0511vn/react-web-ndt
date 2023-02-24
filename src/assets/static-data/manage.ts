export const columnNameTransaction = ['STT', 'Số tiền', 'Nội dung', 'Mã hợp đồng', 'Thời gian'];
export const labelArrTransactionMobile = {
    so_tien: 'Số tiền',
    hinh_thuc: 'Nội dung',
    created_at: 'Ngày thanh toán'
};

export const arrKeyTransactionMobile = ['so_tien', 'hinh_thuc', 'created_at'];
export const arrKeyTransactionWeb = ['so_tien', 'hinh_thuc', 'ma_hop_dong', 'created_at'];

export const TabTransaction = [
    {
        id: 1,
        text: 'Tất cả',
        value: 'all',
        icon: ''
    },
    {
        id: 2,
        text: 'Tiền ra',
        value: 'investor',
        icon: ''
    },
    {
        id: 3,
        text: 'Tiền vào',
        value: 'pay',
        icon: ''
    }
];

export const TabHistory = [
    {
        id: 1,
        text: 'Đang đầu tư',
        value: '1',
        icon: ''
    },
    {
        id: 2,
        text: 'Đã đáo hạn',
        value: '2',
        icon: ''
    }
];
