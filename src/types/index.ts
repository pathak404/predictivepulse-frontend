import { Dispatch, FormEvent, ReactNode, SetStateAction } from "react"

import { ToastProps, ToastContextType, ToastItemProps, ToastType } from "./toast"
export type { ToastProps, ToastContextType, ToastItemProps, ToastType }

export type FormButtomProps = {
    children: ReactNode,
    loading: boolean,
    arrow?: boolean | undefined
}

export type SectionHeaderProps = {
    title?: string,
    heading: string,
    paragraph: string
}

export type InputGroupProps = {
    type?: string
    name: string,
    value?: string,
    label?: string,
    placeholder?: string,
    pattern?: string,
    maxLength?: number,
    handler?: (e: FormEvent<HTMLInputElement>) => void
}





export type AssetsDataType = {
    stocks: StockType[],
    indices: IndiceType[],
    currency_crosses: CurrencyCrossType[],
    crypto_currencies: CryptocurrencyType[],
}

type AssetsDataBaseType = {
    TVsymbol?: string,
    YFsymbol?:string,
    symbol: string,
    name: string,
    id: number,
}

export type IndiceType = AssetsDataBaseType & {
    currency: string,
    image: string|null,
    TVsymbol: string|undefined,
}

type StockType = IndiceType & {
    full_name: string,
    isin: string,
}

type CurrencyCrossType = AssetsDataBaseType & {
    base: string,
    base_name: string,
    base_image: string,
    second: string,
    second_name: string,
    second_image: string,
}

type CryptocurrencyType = AssetsDataBaseType & {
    currency: string,
    image: string|null,
}


export type navItemType = {
    name: string,
    path: string,
    icon: ReactNode
}

export type TabType = {
    number: number, 
    name: string, 
    timeframe: string
}

export type PredictionType = {
    name: string;
    icon: ReactNode;
    classes: string;
}
  
export type PredictionMapperType = {
    buy: PredictionType;
    strong_buy: PredictionType;
    sell: PredictionType;
    strong_sell: PredictionType;
    not_available: PredictionType;
}



export type AuthContextType = {
    isLoggedIn: boolean | null;
    setIsLoggedIn: Dispatch<SetStateAction<boolean | null>>
    logout: () => void;
    nonce: string,
    setNonce: Dispatch<SetStateAction<string>>
}


export type ApiResponse<T = Record<string, unknown>> = {
    status: string;
    message: string;
    data?: T;
};

export type LoginApiResponseType = {
    status: string;
    message: string;
    isLoggedIn: boolean;
    nonce: string;
};

export type CreateOrderApiResponseType = {
    status: string;
    message: string;
    longurl: string;
    order_id: string;
};


export type FeaturesType = {
    icon: ReactNode,
    name: string,
    paragraph: string,
}

