const app = async () => {
  const getElem = (id) => document.getElementById(id);
  const resetForm = (formName) => document.forms[formName].reset();
  const msg = getElem("msg");
  const sidebar = getElem("sidebar");
  const main = getElem("main");
  const rightSection = getElem("right-section");
  await sideBar();
};

app();
