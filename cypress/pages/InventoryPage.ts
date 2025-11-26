import BasePage from './BasePage';

class InventoryPage extends BasePage {
  private productTitle: string = '.inventory_item_name';
  private cartBadge: string = '.shopping_cart_badge';
  private inventoryItem: string = '.inventory_item';
  private inventoryList: string = '.inventory_list';

  constructor() {
    super();
  }

  waitForProductsToLoad() {
    this.getElement(this.inventoryItem).should('have.length.greaterThan', 0);
  }

  getCartCount() {
    return this.getElement(this.cartBadge).invoke('text');
  }

  getProductTitle() {
    return this.getElement(this.productTitle).invoke('text');
  }

  getInventoryItems() {
    return this.getElement(this.inventoryItem);
  }

  getCartBadge() {
    return this.getElement(this.cartBadge);
  }

  getInventoryList() {
    return this.getElement(this.inventoryList);
  }
}

export default new InventoryPage();