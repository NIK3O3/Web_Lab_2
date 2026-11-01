(function () {
  "use strict";

  const nav = document.getElementById("mainNav");
  const menuToggle = document.getElementById("menuToggle");
  const statusText = document.getElementById("statusText");
  const demoMessage = document.getElementById("demoMessage");
  const itemsWithSub = document.querySelectorAll(".nav-item.has-submenu");

  function isMobile() {
    return window.getComputedStyle(menuToggle).display !== "none";
  }

  function setStatus(text) {
    statusText.textContent = text;
  }

  function closeAllSubmenus() {
    itemsWithSub.forEach((item) => {
      item.classList.remove("open");
      const link = item.querySelector(".nav-link");
      if (link) {
        link.setAttribute("aria-expanded", "false");
      }
    });
  }

  function openSubmenu(item) {
    closeAllSubmenus();
    item.classList.add("open");
    const link = item.querySelector(".nav-link");
    if (link) {
      link.setAttribute("aria-expanded", "true");
    }
    const label = link ? link.childNodes[0].textContent.trim() : "меню";
    setStatus(`відкрито: «${label}»`);
  }

  itemsWithSub.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      if (isMobile()) return;
      openSubmenu(item);
    });

    item.addEventListener("mouseleave", () => {
      if (isMobile()) return;
      item.classList.remove("open");
      const link = item.querySelector(".nav-link");
      if (link) {
        link.setAttribute("aria-expanded", "false");
      }
      setTimeout(() => {
        const stillOpen = document.querySelector(".nav-item.has-submenu.open");
        if (!stillOpen) {
          setStatus("меню закрите");
        }
      }, 30);
    });

    const link = item.querySelector(".nav-link");
    link.addEventListener("click", (e) => {
      if (isMobile()) {
        e.preventDefault();
        const isOpen = item.classList.contains("open");
        if (isOpen) {
          item.classList.remove("open");
          link.setAttribute("aria-expanded", "false");
          setStatus("меню закрите");
        } else {
          openSubmenu(item);
        }
      }
    });
  });

  document.querySelectorAll(".submenu a").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const text = a.textContent.trim();
      demoMessage.textContent = `Обрано: «${text}». Демонстрація обробки вибору пункту меню.`;
      if (isMobile()) {
        closeAllSubmenus();
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        setStatus("меню закрите");
      }
    });
  });

  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("open", !expanded);
    if (expanded) {
      closeAllSubmenus();
      setStatus("меню закрите");
    } else {
      setStatus("мобільне меню відкрите");
    }
  });

  document.addEventListener("click", (e) => {
    if (!isMobile()) return;
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      closeAllSubmenus();
      setStatus("меню закрите");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllSubmenus();
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      setStatus("меню закрите");
    }
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      closeAllSubmenus();
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      setStatus("меню закрите");
    }, 150);
  });
})();
