import React from "react"
import "./OrderPage.scss"

const OrderPage = () => {

return (
<div class="product-card">
  <img
    src="/uploads/photo_1533450718592_29d45635f0a9_4979ae4d68.jpeg"
    alt="Shaq Toy"
    class="product-image"
  />
  <h3 class="product-title">Shaq Toy</h3>
  <p class="product-price">$30</p>
  <p class="product-quantity">Quantity: 1</p>
</div>
    );
}

export default OrderPage;