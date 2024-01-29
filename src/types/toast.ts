
export type ToastProps = {
    toastList: ToastItemProps[]
}

export type ToastItemProps = {
    id: string,
    type: 'success' | 'error' | 'warning' | 'info',
    message: string,
    onClose: (id: string) => void,
}


export type ToastContextType = {
    addToast: (type: 'success' | 'error' | 'warning' | 'info', message: string, hideAfterSeconds?: number) => string,
    removeToast: (id: string) => void,
}

export type ToastType = {
    error: {
        icon: JSX.Element,
        className: string,
    },
    success: {
        icon: JSX.Element,
        className: string,
    },
    warning: {
        icon: JSX.Element,
        className: string,
    },
    info: {
        icon: JSX.Element,
        className: string,
    },
}