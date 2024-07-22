export interface ServiceResponse {
    message?: string,
    success?: boolean,
    data?: any
    token?: string
    error?: any
}

export interface imageProps {
    base64: string,
    source: string,
    format: string
}

export interface packageInformationProps {
    trackingCode: string,
    image?: imageProps
}

export interface CollectionDataRequest {
    IdOrderDetail: number,
    LstPackages: packageInformationProps[]
}

export interface ModalButton {
    text: string;
    onPress: () => void;
}

export interface Customer {
    id: number;
    customer_category_id: number;
    identification: string;
    name: string;
    credit_limit: number;
    credit_available: number;
    current_balance: number;
    contact_dni: string;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    address: string;
    phone: string;
    is_tax_exemption: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Order {
    id: number;
    customer_id: number;
    customer_address_id: number;
    seller_id: number;
    user_id: number;
    customer_name: string;
    description: string;
    exchange_rate: number;
    seller_commision_amount: number;
    total_item: number;
    total_tax: number;
    total_discount: number;
    sub_total: number;
    total_order: number;
    state: string;
    estimated_delivery_date: string; // Usar Date si se desea trabajar con objetos de fecha
    createdAt: string; // Usar Date si se desea trabajar con objetos de fecha
    updatedAt: string; // Usar Date si se desea trabajar con objetos de fecha
}


export interface NewOrderDTO {
    customer_id: number;
    customer_address_id?: number | null;
    seller_id?: number | null;
    customer_name: string;
    description?: string | null;
    exchange_rate: number;
    total_item: number;
    total_tax: number;
    total_discount: number;
    sub_total: number;
    total_order: number;
    estimated_delivery_date?: string | null;
    items: OrderDetailDTO[]
  }
  
  export interface OrderDetailDTO {
    article_id: number;
    article_description: string;
    quantity: number;
    presentation?: string | null;
    unit_price: number;
    tax_percentage: number;
    total_tax: number;
    sub_total: number;
    discount_percentage: number;
    discount_amount: number;
    total: number;
  }