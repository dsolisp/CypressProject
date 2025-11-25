import BasePage from './BasePage';

class InventoryPage extends BasePage {
  productTitle: string = '.inventory_item_name';
  cartBadge: string = '.shopping_cart_badge';
  constructor() {
    super();
  }

  getCartCount() {
    return this.getElement(this.cartBadge).invoke('text');
  }

  getProductTitle() {
    return this.getElement(this.productTitle).invoke('text');
  }
}

export default new InventoryPage();