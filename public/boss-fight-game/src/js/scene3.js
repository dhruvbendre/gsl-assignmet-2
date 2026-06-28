(function () {
    const REQUIRED_TYPE_BY_NAME = [
        { pattern: /\barduino\b/i, type: "arduino" },
        { pattern: /\b(sensor|soil moisture sensor)\b/i, type: "sensor" },
        { pattern: /\bred wire\b/i, type: "vcc" },
        { pattern: /\bblack wire\b/i, type: "gnd" },
        { pattern: /\byellow wire\b/i, type: "ao" },
        { pattern: /\bblueprint\b/i, type: "blueprint" }
    ];

    function assemblyTypeFor(item) {
        const searchValue = `${item?.id || ""} ${item?.name || ""}`;
        const match = REQUIRED_TYPE_BY_NAME.find((entry) => entry.pattern.test(searchValue));
        return match?.type || "";
    }

    function itemClassFor(type) {
        if (type === "vcc" || type === "gnd" || type === "ao" || type === "blueprint") {
            return "inventory-item wire-item";
        }
        return "inventory-item comp-item";
    }

    function supportsHoverPreview() {
        return window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches;
    }

    function ensurePreview() {
        let preview = document.getElementById("scene3InventoryPreview");
        if (preview) return preview;

        preview = document.createElement("div");
        preview.id = "scene3InventoryPreview";
        preview.className = "scene3-preview";
        preview.innerHTML = '<img class="scene3-preview-image" alt="">';
        preview.addEventListener("transitionend", () => {
            if (!preview.classList.contains("is-visible")) {
                const previewImage = preview.querySelector("img");
                previewImage.removeAttribute("src");
                previewImage.alt = "";
            }
        });
        document.body.appendChild(preview);
        return preview;
    }

    function showPreview(image) {
        if (!supportsHoverPreview() || image.classList.contains("is-placed")) return;

        const preview = ensurePreview();
        const previewImage = preview.querySelector("img");
        previewImage.src = image.currentSrc || image.src;
        previewImage.alt = image.alt || "";
        preview.classList.add("is-visible");
    }

    function hidePreview() {
        const preview = document.getElementById("scene3InventoryPreview");
        if (preview) preview.classList.remove("is-visible");
    }

    function bindPreview(image) {
        image.addEventListener("mouseenter", () => showPreview(image));
        image.addEventListener("mouseleave", hidePreview);
        image.addEventListener("dragstart", hidePreview);
    }

    function renderSlot(item, index) {
        const slot = document.createElement("div");
        slot.className = "slot-box";

        const type = assemblyTypeFor(item);
        if (!item || !item.image) return slot;

        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.name;
        image.id = `scene3-item-${type || item.id || index}`;
        image.className = itemClassFor(type);
        image.dataset.type = type || item.id || "";
        image.dataset.inventoryId = item.id || "";
        image.draggable = Boolean(type);
        bindPreview(image);

        const label = document.createElement("span");
        label.className = "item-label";
        label.textContent = item.name || "Inventory";

        slot.appendChild(image);
        slot.appendChild(label);
        return slot;
    }

    function renderToolbox(Game) {
        const grid = document.getElementById("scene3Inventory");
        if (!grid) return;

        const inventory = Array.isArray(Game?.state?.inventory) ? Game.state.inventory : [];
        grid.innerHTML = "";

        if (!inventory.length) {
            const empty = document.createElement("div");
            empty.className = "scene3-empty";
            empty.textContent = "Inventory empty. Return to Scene 2 to collect components.";
            grid.appendChild(empty);
            return;
        }

        inventory.forEach((item, index) => grid.appendChild(renderSlot(item, index)));
    }

    window.Scene3Assembly = {
        renderToolbox
    };
})();
