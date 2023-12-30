const msg = document.getElementById("msg");
const sidebar = document.getElementById("sidebar");
const main = document.getElementById("main");
const rightSection = document.getElementById("right-section");

const resetForm = (formName) => document.forms[formName].reset();
const getElem = (id) => document.getElementById(id);

const addProductForm = () => {
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
  return element;
};
rightSection.appendChild(addProductForm());

const submitForm = (formName, cb) => {
  let data = {};
  Array.from(document.forms[formName].getElementsByTagName("input")).map(
    (input) => (data[input.name] = input.value)
  );
  cb(data);
  data = {};
  resetForm(formName);
};

if (getElem("add-product-form")) {
  getElem("add-product-form").addEventListener("submit", (e) => {
    e.preventDefault();
    submitForm("add-product-form", eel.add_product);
  });

  getElem("cancel-products-btn").addEventListener("click", () =>
    resetForm("add-product-form")
  );
}
