const data = async () => {
  return await eel.get_setting("current_page")();
};

const navElemList = Array.from(document.getElementsByTagName("nav"));
const handleNavClick = async (clickedElem) => {
  const navPage = clickedElem.id;

  await eel.add_settings({ current_page: navPage });
  clickedElem.classList.add("active");
  navElemList.map((elem) => {
    if (elem.id !== navPage) {
      elem.classList.remove("active");
    }
  });
};

navElemList.map(async (elem) => {
  const currentPage = await eel.get_setting("current_page")();
  if (elem.id === currentPage) elem.classList.add("active");
  elem.addEventListener("click", async () => {
    await handleNavClick(elem);
  });
});

(async () => {})();
