import Languages from 'commons/languages';
import toasty from './toasty';

function openLink(link: string) {
    window.open(link);
}

function openLinkInNewTab(link: string) {
    window.open(link, '_blank', 'noopener,noreferrer');
}

function openLinkOnIos(link: string) {
    if (!window.open(link)) {
        window.location.href = link;
    }
}

function copyText(text: string) {
    navigator.clipboard.writeText(text);
    toasty.info(Languages.profile.copySuccess);
}

export default {
    openLink,
    openLinkInNewTab,
    openLinkOnIos,
    copyText
};

