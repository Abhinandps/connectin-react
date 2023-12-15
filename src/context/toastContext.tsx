import { ReactNode, createContext, useContext, useState } from "react";

interface ToastContextProps {
    toastDetails: any | null;
    setToastDetails: React.Dispatch<React.SetStateAction<any | null>>;
}

const defaultValues: ToastContextProps = {
    toastDetails: null,
    setToastDetails: () => { },
};

const toastContext = createContext<ToastContextProps>(defaultValues);

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastContextProvider = ({ children }: ToastProviderProps) => {
    const [toastDetails, setToastDetails] = useState<any>();

    return (
        <toastContext.Provider value={{ toastDetails, setToastDetails }}>
            {children}
        </toastContext.Provider>
    );
};

export function useToaster() {
    return useContext(toastContext);
}