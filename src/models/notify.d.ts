interface Detail {
    body: string;
    title: string;
    icon: string;
}

interface Data {
    type: string;
}

interface FcmOptions {
    link: string;
}

export interface NotifyModel {
    notification: Detail;
    data: Data;
    fcmOptions: FcmOptions;
}
