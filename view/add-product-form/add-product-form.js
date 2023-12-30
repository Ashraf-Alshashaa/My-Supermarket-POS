const addProductForm = (container) => {
  const submitForm = async (formName, cb) => {
    let data = {};
    Array.from(document.forms[formName].getElementsByTagName("input")).map(
      (input) => (data[input.name] = input.value)
    );
    await cb(data);
    data = {};
    resetForm(formName);
  };
  const element = document.createElement("form");
  element.id = "add-product-form";
  element.innerHTML = String.raw`
      <p>Add Product</p>
      <label>Barcode:</label>
      <input name="barcode" type="text" required>
      <label>Name:</label>
      <input name="name" type="text" required>
      <label>Buying Price:</label>
      <input name="buy_price" type="number" required>
      <label>Selling Price:</label>
      <input name="sell_price" type="number" required>
      <label>Quantity:</label>
      <input name="qty" type="number" required>
      <label>Category:</label>
      <input name="category" type="text" required>
      <div class="add-products-btn-cont">
        <button id="add-products-btn" type="submit">Add</button>
        <button id="cancel-products-btn" type="button">Cancel</button>
      </div>
    `;
  element.addEventListener("submit", (e) => {
    e.preventDefault();
    submitForm("add-product-form", eel.add_product);
  });
  container.appendChild(element);
  getElem("cancel-products-btn").addEventListener(
    "click",
    resetForm("add-product-form")
  );
};
