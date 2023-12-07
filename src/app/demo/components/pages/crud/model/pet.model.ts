interface InventoryStatus {
    label: string;
    value: string;
}

interface Tutor {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
}

export interface Pet {
    id?: string;
    code?: string;
    key?: string;
    name?: string;
    description?: string;
    tutor?: Tutor;
    price?: number;
    quantity?: number;
    inventoryStatus?: InventoryStatus;
    category?: string;
    image?: string;
    rating?: number;
}
