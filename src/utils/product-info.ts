interface Product {
  item_id: string;
  item_name: string;
  item_category?: string;
  price: number;
  quantity: number;
  currency?: string;
}

interface Order {
  transaction_id?: string;
  value: number;
  currency: string;
  tax?: number;
  shipping?: number;
  coupon?: string;
  items: Product[];
}


export const OG_PRICE = 99;
export const DISCOUNTED_PRICE = 99;
export const OTO_OG_PRICE = 499;
export const OTO_DISCOUNTED_PRICE = 499;


export const OG_PRICE_WATCH = 0;
export const DISCOUNTED_PRICE_WATCH = 0;
export const OTO_OG_PRICE_WATCH = 99;


export const WEBINAR_NAME_1 = "Name Numerology NNW Workshop";
export const WEBINAR_NAME_2 = "Wrist Watch Workshop";

export const CURRENCY = "INR";
export const CURRENCY_SYMBOL = "₹";
export const RAZORPAY_PRODUCT_NAME="Ankit Batra Online Workshop"
export const RAZORPAY_DESCRIPTION=`${RAZORPAY_PRODUCT_NAME} `


export const PRODUCT1 : Product = {
    item_id : 'name_numerology_workshop',
    item_name : WEBINAR_NAME_1,
    item_category : 'Online Workshop',
    price : DISCOUNTED_PRICE,
    quantity : 1,
    currency: CURRENCY,

}

export const PRODUCT1_OTO : Product = {
    item_id : 'name_numerology_workshop_oto',
    item_name :  `${WEBINAR_NAME_1} OTO`,
    item_category : 'Online Workshop',
    price : OTO_OG_PRICE,
    quantity : 1,
    currency: CURRENCY,

}

export const PRODUCT2 : Product = {
    item_id : 'wrist_watch_workshop',
    item_name : WEBINAR_NAME_2,
    item_category : 'Online Workshop',
    price : DISCOUNTED_PRICE_WATCH,
    quantity : 1,
    currency: CURRENCY,

}

export const PRODUCT2_OTO : Product = {
    item_id : 'wrist_watch_workshop_oto',
    item_name : `${WEBINAR_NAME_2} OTO`,
    item_category : 'Online Workshop',
    price : OTO_OG_PRICE_WATCH,
    quantity : 1,
    currency: CURRENCY,

}

export const GA_PRODUCT1 : Product = {
    item_id : 'name_numerology_workshop_ga',
    item_name : `${WEBINAR_NAME_1} GA`,
    item_category : 'Online Workshop',
    price : DISCOUNTED_PRICE,
    quantity : 1,
    currency: CURRENCY,

}



export const GA_PRODUCT2 : Product = {
    item_id : 'wrist_watch_workshop_ga',
    item_name : `${WEBINAR_NAME_2} GA`,
    item_category : 'Online Workshop',
    price : DISCOUNTED_PRICE_WATCH,
    quantity : 1,
    currency: CURRENCY,

}

export const GA_PRODUCT1_OTO : Product = {
    item_id : 'name_numerology_workshop_ga_oto',
    item_name : `${WEBINAR_NAME_1} GA OTO`,
    item_category : 'Online Workshop',
    price : OTO_OG_PRICE,
    quantity : 1,
    currency: CURRENCY,


}


export const GA_PRODUCT2_OTO: Product = {
    item_id : 'wrist_watch_workshop_ga_oto',
    item_name : `${WEBINAR_NAME_2} GA OTO`,
    item_category : 'Online Workshop',
    price : OTO_OG_PRICE_WATCH,
    quantity : 1,
    currency: CURRENCY,

}


export const ORDER : Order = {
    value: DISCOUNTED_PRICE,
    currency: CURRENCY,
    items: [PRODUCT1],
}
export const GA_ORDER : Order = {
    value: DISCOUNTED_PRICE,
    currency: CURRENCY,
    items: [GA_PRODUCT1],
}