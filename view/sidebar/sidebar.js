const sideBar = async () => {
  const navElemList = Array.from(document.getElementsByTagName("nav"));
  const currentPage = await eel.get_setting("current_page")();
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
    if (elem.id === currentPage) elem.classList.add("active");
    elem.addEventListener("click", async () => {
      await handleNavClick(elem);
    });
  });
};
