import { Store } from 'react-notifications-component';

export const success = (message = "", title = "", postion: any = "top-center") => {
    Store.addNotification({
        title: title,
        message: message,
        // content: anc,
        type: "success",
        insert: "top",
        container: postion,
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 3000,
            onScreen: false
        }
    });
}

export const error = (message = "", title = "", postion: any = "top-center") => {
    Store.addNotification({
        title: title,
        message: message,
        type: "danger",
        insert: "top",
        container: postion,
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 1000,
            onScreen: false
        }
    });
}

export const info = (message = "", title = "Thông báo", postion: any = "bottom-left") => {
    Store.addNotification({
        title: title,
        message: message,
        type: "info",
        insert: "top",
        container: postion,
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 10000,
            onScreen: false
        }
    });
}

