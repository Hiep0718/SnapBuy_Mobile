// Asset paths constants - Dễ quản lý và maintain
export const ASSET_PATHS = {
  // App Icons
  APP_ICON: require("../../assets/app-icons/logo.png"),
  SPLASH_ICON: require("../../assets/app-icons/logo.png"),

  // Products - Fruits
  PRODUCTS_FRUITS: {
    APPLE: require("../../assets/products/fruits/apple.jpg"),
    PEAR: require("../../assets/products/fruits/pear.jpg"),
    AVOCADO: require("../../assets/products/fruits/avocado.jpg"),
    CHERRY: require("../../assets/products/fruits/cherry.jpg"),
    ORANGE: require("../../assets/products/fruits/orange.jpg"),
    PEACH: require("../../assets/products/fruits/peach.jpg"),
    POMEGRANATE: require("../../assets/products/fruits/pomegranate.jpg"),
  },

  // Products - Electronics
  PRODUCTS_ELECTRONICS: {
    SMARTPHONE_1: require("../../assets/products/electronics/smartphone-1.jpg"),
    SMARTPHONE_2: require("../../assets/products/electronics/smartphone-2.jpg"),
    SMARTPHONE_3: require("../../assets/products/electronics/smartphone-3.jpg"),
    SMARTPHONE_4: require("../../assets/products/electronics/smartphone-4.jpg"),
    LAPTOP: require("../../assets/products/electronics/laptop.jpg"),
    TABLET: require("../../assets/products/electronics/tablet.jpg"),
    ACCESSORIES: require("../../assets/products/electronics/accessories.jpg"),
  },

  // Categories
  CATEGORIES: {
    FRUITS: require("../../assets/categories/fresh-fruits.jpg"),
    ELECTRONICS: require("../../assets/categories/electronics.jpg"),
    CLOTHING: require("../../assets/categories/clothing.jpg"),
    BEAUTY: require("../../assets/categories/beauty.jpg"),
    HOME: require("../../assets/categories/home.jpg"),
  },

  // Banners
  BANNERS: {
    PROMO_1: require("../../assets/banners/promo-banner-1.jpg"),
    PROMO_2: require("../../assets/banners/promo-banner-2.jpg"),
    FRUITS_PROMO: require("../../assets/banners/fruits-promo.jpg"),
    ELECTRONICS_PROMO: require("../../assets/banners/electronics-promo.jpg"),
    FLASH_SALE: require("../../assets/banners/flash-sale.jpg"),
  },

  // Avatars
  AVATARS: {
    DEFAULT: require("../../assets/avatars/user-default.jpg"),
    USER_1: require("../../assets/avatars/user-1.jpg"),
    USER_2: require("../../assets/avatars/user-2.jpg"),
    USER_3: require("../../assets/avatars/user-3.jpg"),
  },

  // Illustrations
  ILLUSTRATIONS: {
    SUCCESS: require("../../assets/illustrations/success-checkmark.jpg"),
    EMPTY_CART: require("../../assets/illustrations/empty-cart.jpg"),
    NOT_FOUND: require("../../assets/illustrations/not-found.jpg"),
    LOADING: require("../../assets/illustrations/loading.jpg"),
  },
}

// Helper function để lấy asset đơn giản hơn
export const getAsset = (category: string, name: string) => {
  const path = ASSET_PATHS[category as keyof typeof ASSET_PATHS]
  if (path && typeof path === "object") {
    return path[name as keyof typeof path]
  }
  return null
}
