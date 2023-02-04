// storeService
const msg = document.getElementById("msg");

const displayMsg = (msgText) => {
  msg.innerHTML = msgText;
  setTimeout(() => (msg.innerHTML = ""), 3000);
};

const setItem = (barcode, price, category, name) => {
  const items = JSON.parse(localStorage.getItem("items") || "[]");
  const item = {
    barcode: barcode,
    name: name,
    price: price,
    category: category,
  };
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
};

const getItem = (barcode) => {
  let items = JSON.parse(localStorage.getItem("items") || "[]");
  return items.find((item) => item.barcode === barcode);
};

const editItem = (item) => {
  const items = JSON.parse(localStorage.getItem("items") || "[]");
  const newItems = items.filter((oldItem) => oldItem.barcode !== item.barcode);
  newItems.push(item);
  localStorage.setItem("items", JSON.stringify(newItems));
};

const deleteItem = (barcode) => {
  const items = JSON.parse(localStorage.getItem("items") || "[]");
  const newItems = items.filter((item) => item.barcode !== barcode);
  localStorage.setItem("items", JSON.stringify(newItems));
};

const addItemToOrder = (items, item) => {
  item.qua = 1;
  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    if (element.barcode === item.barcode) {
      element.qua++;
      return;
    }
  }
  items.push(item);
};

// price container
const createPriceElement = (price, name, category) => {
  const element = document.createElement("div");
  element.className = "info-container";
  element.innerHTML = String.raw`
    <p class="item-name">${name}</p>
    <h2 id="price-container">€ ${price}</h2>
    <p class="item-category">${category.toUpperCase()}</p>
    <div class="btn-price-container">
      <button id="edit-price-button">Edit  <i class="fa-solid fa-pen-to-square"></i></button>
      <button id="delete-price-button">Delete  <i class="fa-solid fa-trash-can"></i></button>
    </div>
  `;
  return element;
};

const displayPriceElement = (price, container, barcode, name, category) => {
  container.innerHTML = "";
  const PriceElement = createPriceElement(price, name, category);
  container.appendChild(PriceElement);

  const editPriceBtn = document.getElementById("edit-price-button");
  editPriceBtn.addEventListener("click", () => {
    container.innerHTML = "";
    displayEditForm(container, barcode, name, price, category);
  });

  const deletePriceBtn = document.getElementById("delete-price-button");
  deletePriceBtn.addEventListener("click", () => {
    deleteItem(barcode);
    displayMsg("The product has been deleted");
    container.innerHTML = "";
  });
};

// add product

const createAddPriceElement = () => {
  const element = document.createElement("div");
  element.className = "info-container";
  element.innerHTML = String.raw`
    <h2>Add product</h2>
      <div class="inputs-container">
        <input type="text" id="name-input"  placeholder="add name">
        <input type="text" id="price-input" placeholder="price">
        <select name="category" id="category-selector">
          <option value="select category">Select category</option>
          <option value="alc">ALC</option>
          <option value="food">FOOD</option>
          <option value="sig">SIG</option>
        </select>
      </div>
      <div class="edit-btn-container">
        <button id="add-price">Add <i class="fa-solid fa-plus"></i></button>
        <button id="cancel-add-btn">Cancel <i class="fa-solid fa-xmark"></i></button>
      </div>
  `;
  return element;
};

const displayAddPriceElement = (container, barcode, input) => {
  container.innerHTML = "";
  const addProductElement = createAddPriceElement();
  container.appendChild(addProductElement);
  const addBtn = document.getElementById("add-price");

  addBtn.addEventListener("click", () => {
    const newPrice = document.getElementById("price-input").value;
    const category = document.getElementById("category-selector").value;
    let name = document.getElementById("name-input").value;
    if (category === "select category") {
      displayMsg("Please select a category");
      return;
    }

    if (newPrice.trim() === "") {
      displayMsg("Please add a price");
      return;
    }
    container.innerHTML = "";
    if (name.trim() === "") {
      setItem(barcode, newPrice, category, `${barcode}`);
      displayPriceElement(newPrice, container, barcode, `${barcode}`, category);
    } else {
      setItem(barcode, newPrice, category, name);
      displayPriceElement(newPrice, container, barcode, name, category);
    }
    displayMsg("The product has been added");
    input.value = "";
    input.focus();

    // todo add to order
  });

  const cancelAddBtn = document.getElementById("cancel-add-btn");
  cancelAddBtn.addEventListener("click", () => {
    container.innerHTML = "";
    input.value = "";
    input.focus();
  });
};

// edit form

const createEditPriceElement = (name, price) => {
  const element = document.createElement("div");
  element.className = "info-container";
  element.innerHTML = String.raw`
    <h2>Add new product</h2>
    <div class="inputs-container">
      <input type="text" id="edit-name-input"  placeholder="${name}">
      <input type="text" id="edit-price-input" placeholder="${price}">
      <select name="category" id="edit-category-selector" >
        <option value="select category">Select category</option>
        <option value="alc">ALC</option>
        <option value="food">FOOD</option>
        <option value="sig">SIG</option>
      </select>
    </div>
    <div class="edit-btn-container">
      <button id="cancel-edit-btn">Cancel <i class="fa-solid fa-xmark"></i></button>
      <button id="edit-price">Done <i class="fa-solid fa-check"></i></button>
    </div>
  `;
  return element;
};

const displayEditForm = (container, barcode, name, price, category) => {
  const form = createEditPriceElement(name, price);
  container.appendChild(form);
  document.getElementById("edit-category-selector").value = category;
  const editFormBtn = document.getElementById("edit-price");
  editFormBtn.addEventListener("click", () => {
    let newPrice = document.getElementById("edit-price-input").value;
    let newCategory = document.getElementById("edit-category-selector").value;
    let newName = document.getElementById("edit-name-input").value;

    if (newPrice.trim() === "") {
      newPrice = price;
    }
    if (newName.trim() === "") {
      newName = name;
    }
    if (newCategory === "select category") {
      displayMsg("Please select a category");
      return;
    }

    const newItem = {
      barcode: barcode,
      name: newName,
      price: newPrice,
      category: newCategory,
    };
    editItem(newItem);
    displayMsg("The product has been edited");
    container.innerHTML = "";
    displayPriceElement(
      newItem.price,
      container,
      barcode,
      newItem.name,
      newItem.category
    );
    // todo add to order
  });

  const cancelEditBtn = document.getElementById("cancel-edit-btn");
  cancelEditBtn.addEventListener("click", () => {
    container.innerHTML = "";
    displayPriceElement(price, container, barcode, name, category);
  });
};

// create order
const createOrderItem = (name, qua, price) => {
  const element = document.createElement("li");
  element.className = "order-item";
  element.innerHTML = String.raw`
   <span class="order-item-name">${name}</span>
   <span class="order-item-qua">${qua}</span>
   <span class="order-item-price">${price}</span>
  `;
  return element;
};
const displayOrder = (items) => {
  let totalAlc = 0;
  let totalFood = 0;
  let totalSig = 0;

  const alcContainer = document.querySelector(".alc");
  alcContainer.innerHTML = "";
  const foodContainer = document.querySelector(".food");
  foodContainer.innerHTML = "";
  const sigContainer = document.querySelector(".sig");
  sigContainer.innerHTML = "";

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const totalPriceOfItem = Number(item.price) * Number(item.qua);
    if (item.category === "alc") {
      alcContainer.appendChild(
        createOrderItem(item.name, item.qua, totalPriceOfItem.toFixed(2))
      );
      totalAlc += totalPriceOfItem;
    }
    if (item.category === "food") {
      foodContainer.appendChild(
        createOrderItem(item.name, item.qua, totalPriceOfItem.toFixed(2))
      );
      totalFood += totalPriceOfItem;
    }
    if (item.category === "sig") {
      sigContainer.appendChild(
        createOrderItem(item.name, item.qua, totalPriceOfItem.toFixed(2))
      );
      totalSig += totalPriceOfItem;
    }
  }
  const totalPrice = totalAlc + totalFood + totalSig;
  document.querySelector(".total-alc").innerHTML = totalAlc.toFixed(2);
  document.querySelector(".total-food").innerHTML = totalFood.toFixed(2);
  document.querySelector(".total-sig").innerHTML = totalSig.toFixed(2);
  document.querySelector(".total-price").innerHTML = totalPrice.toFixed(2);
};
// main

const main = () => {
  let items = [];
  const infoContainer = document.querySelector(".info");
  const input = document.getElementById("code-input");
  input.focus();

  const newScanBtn = document.getElementById("scan-new-product");
  newScanBtn.onclick = () => {
    input.value = "";
    infoContainer.innerHTML = "";
    input.focus();
    items = [];
    displayOrder(items);
  };

  input.addEventListener("input", (e) => {
    const barcode = e.target.value;
    const item = getItem(barcode);

    if (item) {
      const { price, name, category } = item;
      addItemToOrder(items, item);
      displayOrder(items);
      console.log(items);
      displayPriceElement(price, infoContainer, barcode, name, category);
      input.value = "";
    } else {
      displayAddPriceElement(infoContainer, barcode, input);
    }
  });
  document.body.onclick = (e) => {
    const isInput =
      e.target.tagName === "INPUT" || e.target.tagName === "SELECT";
    if (isInput) return;
    input.focus();
  };
};

main();
