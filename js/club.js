(function () {
  const root = document.documentElement;

  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.closest("[data-filter-group]");
      group.querySelectorAll("[data-filter]").forEach((b) => b.classList.remove("is-on"));
      btn.classList.add("is-on");
      const key = btn.dataset.filter;
      const seg = document.querySelector("[data-seg-key].is-on");
      const kind = seg ? seg.dataset.segKey : null;
      document.querySelectorAll("[data-game]").forEach((row) => {
        const gameOk = key === "all" || row.dataset.game === key;
        const kindOk = !kind || !row.dataset.kind || row.dataset.kind === kind;
        row.hidden = !(gameOk && kindOk);
      });
    });
  });

  document.querySelectorAll("[data-table]").forEach((row) => {
    row.addEventListener("click", (e) => {
      if (e.target.closest("a, button.cta, button.join")) return;
      const was = row.classList.contains("is-open");
      document.querySelectorAll("[data-table].is-open").forEach((r) => r.classList.remove("is-open"));
      if (!was) row.classList.add("is-open");
    });
  });

  document.querySelectorAll("[data-check]").forEach((el) => {
    el.addEventListener("click", () => el.classList.toggle("is-on"));
  });

  document.querySelectorAll("[data-nav]").forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelectorAll("[data-nav]").forEach((n) => n.classList.remove("is-on"));
      item.classList.add("is-on");
    });
  });

  document.querySelectorAll("[data-toast]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const t = document.querySelector(".toast");
      if (!t) return;
      t.textContent = btn.dataset.toast;
      t.classList.add("is-on");
      clearTimeout(root._toast);
      root._toast = setTimeout(() => t.classList.remove("is-on"), 1600);
    });
  });

  document.querySelectorAll("[data-seg-key]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.closest("[data-seg]");
      group.querySelectorAll("[data-seg-key]").forEach((b) => b.classList.remove("is-on"));
      btn.classList.add("is-on");
      const key = btn.dataset.segKey;
      document.querySelectorAll("[data-kind]").forEach((row) => {
        row.hidden = row.dataset.kind !== key;
      });
      const filters = document.querySelector("[data-filter-group]");
      if (filters) {
        filters.querySelectorAll("[data-filter]").forEach((b) => b.classList.toggle("is-on", b.dataset.filter === "all"));
      }
    });
  });
  const segOn = document.querySelector("[data-seg-key].is-on");
  if (segOn) {
    const kind = segOn.dataset.segKey;
    document.querySelectorAll("[data-kind]").forEach((row) => {
      row.hidden = row.dataset.kind !== kind;
    });
  }
})();
