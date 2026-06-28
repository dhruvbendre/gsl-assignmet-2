const Game = {
    // Central constants keep scene rules, storage keys, and puzzle targets easy to adjust.
      config: {
          storageKey: "stemEscapeRoomSave",
          platformContextKey: "stem-boss-fight-context",
          platformResultKey: "stem-boss-fight-result",
          maxHearts: 3,
        inventoryTarget: 6,
        assemblyTarget: 5,
        bossHealthMax: 3,
        scenes: {
            "index.html": 1,
            "": 1,
            "scene2.html": 2,
            "scene3.html": 3,
            "scene4.html": 4,
            "scene5.html": 5,
            "scene6.html": 6,
            "scene7.html": 7,
            "scene8.html": 8,
            "gameover.html": 0
        },
        nextSceneByNumber: {
            1: "scene2.html",
            2: "scene3.html",
            3: "scene4.html",
            4: "scene6.html",
            6: "scene7.html",
            7: "scene8.html",
            8: "scene8.html"
        },
        correctInventoryNames: [
            "arduino",
            "soil moisture sensor",
            "red wire",
            "black wire",
            "yellow wire",
            "blueprint",
        ],
        inventoryAliases: {
            item3: "Arduino",
            item7: "Soil Moisture Sensor",
            item9: "Red Wire",
            item10: "Black Wire",
            item11: "Yellow Wire",
            item12: "Blueprint"
        }
    },

    state: null,
    draggedElement: null,
    selectedCodeBlock: null,
    activeQuiz: null,
    quizIndex: 0,
    answeredQuestions: new Set(),
    placedAssemblyParts: new Set(),
    popupTimer: null,
    sceneFeedbackTimer: null,

    // Save data always starts from this shape, then localStorage values are layered over it.
    defaultState() {
        return {
            hearts: 3,
            unlockedScene: 1,
            inventory: [],
            assembled: false,
            codingComplete: false,
            boss1Complete: false,
            boss2Complete: false,
            finalBossComplete: false,
            score: 0,
            completedMissions: [],
            answeredQuestions: [],
            bossHealth: this.config.bossHealthMax
        };
    },

    // Boot sequence for every HTML page that includes this single engine file.
      init() {
          this.load();
          this.protectScene();
          if (this.state.hearts === 0 && this.currentSceneNumber() !== 0) {
            this.gotoScene("gameover.html");
            return;
        }
        this.ensureBaseUI();
        this.updateHeartUI();
        this.restoreRuntimeSets();
        this.bindGlobalControls();
        this.bindScene();
        this.renderSceneState();
        this.save();
    },

    // Shared UI is injected so individual scenes do not need repeated heart/popup markup.
    ensureBaseUI() {
        if (!document.getElementById("heart-container") && this.currentSceneNumber() !== 0) {
            const hearts = document.createElement("div");
            hearts.id = "heart-container";
            hearts.className = "heart-container";
            document.body.appendChild(hearts);
        }

        if (!document.getElementById("game-popup")) {
            const popup = document.createElement("div");
            popup.id = "game-popup";
            popup.className = "game-popup is-hidden";
            popup.setAttribute("role", "status");
            popup.setAttribute("aria-live", "polite");
            document.body.appendChild(popup);
        }

        this.injectUtilityStyles();
    },

    injectUtilityStyles() {
        if (document.getElementById("game-engine-styles")) return;

        const style = document.createElement("style");
        style.id = "game-engine-styles";
        style.textContent = `
            .heart-container{position:fixed;top:16px;left:16px;z-index:10000;display:flex;gap:8px;font-size:24px;line-height:1}
            .game-popup{position:fixed;left:50%;top:18px;transform:translateX(-50%);z-index:10001;padding:10px 16px;transition:opacity .22s ease,transform .22s ease;pointer-events:none}
            .game-popup.is-hidden{opacity:0;transform:translate(-50%,-12px)}
            .shake{animation:gameShake .28s ease both}@keyframes gameShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}
            .quiz-opt.correct,.code-block.correct{outline:3px solid #10b981}.quiz-opt.wrong,.code-block.wrong{outline:3px solid #ef4444}
            .boss-health{position:fixed;right:16px;top:17px;z-index:10000;width:220px;height:22px;border-radius:999px;overflow:hidden}.boss-health-fill{height:100%;width:100%;transition:width .25s ease}
            .confetti-piece{position:fixed;top:-14px;z-index:10002;width:8px;height:14px;animation:confettiFall 1.8s linear forwards}@keyframes confettiFall{to{transform:translateY(105vh) rotate(540deg);opacity:.2}}
        `;
        document.head.appendChild(style);
    },

    restoreRuntimeSets() {
        this.answeredQuestions = new Set(this.state.answeredQuestions || []);
    },

    bindGlobalControls() {
        document.querySelectorAll("[data-next-scene], .next-scene, #nextStepBtn").forEach((button) => {
            button.addEventListener("click", () => this.nextScene());
        });

        document.querySelectorAll("[data-reset-game], #retryBtn, .retry-btn").forEach((button) => {
            button.addEventListener("click", () => this.reset());
        });

        const startButton = Array.from(document.querySelectorAll("button")).find((button) => {
            return button.textContent.trim().toLowerCase() === "start mission";
        });
        if (startButton) {
            startButton.addEventListener("click", () => {
                this.unlockScene(2);
                this.gotoScene("scene2.html");
            });
        }
    },

    bindScene() {
        const scene = this.currentSceneNumber();
        if (scene === 2) this.bindInventoryScene();
        if (scene === 3) this.bindAssemblyScene();
          if (scene === 4) this.bindCodingScene();
          if (scene === 6 || scene === 7 || scene === 8) this.bindBossScene(scene);
          if (scene === 0) this.bindGameOverScene();
          if (scene === 8 && this.state.finalBossComplete) this.renderVictory();
      },

      // Integration point: React stores launch context in sessionStorage before
      // embedding the vanilla game. The game only reports outcomes back.
      platformContext() {
          try {
              return JSON.parse(window.sessionStorage.getItem(this.config.platformContextKey) || "null");
          } catch (error) {
              return null;
          }
      },

      finishPlatformAttempt(completed) {
          const context = this.platformContext();
          if (!context || this.platformResultSent) return;

          this.platformResultSent = true;
          const result = {
              completed,
              score: Number(this.state.score) || 0,
              badgeEarned: Boolean(completed),
              timeTaken: Math.max(0, Date.now() - (Number(context.startedAt) || Date.now())),
              remainingHearts: Number(this.state.hearts) || 0
          };

          window.sessionStorage.setItem(this.config.platformResultKey, JSON.stringify(result));
          window.setTimeout(() => {
              window.top.location.href = context.callbackPath || "/dashboard";
          }, completed ? 2000 : 1200);
      },

    renderSceneState() {
        if (this.currentSceneNumber() === 2) {
            this.renderInventory();
            this.updateInventoryProgress();
        }
        if (this.currentSceneNumber() === 3) this.updateAssemblyProgress();
        if (this.currentSceneNumber() === 7 || this.currentSceneNumber() === 8) this.renderBossHealth();
    },

    // Progress persistence is intentionally defensive so broken or missing saves recover cleanly.
    save() {
        try {
            localStorage.setItem(this.config.storageKey, JSON.stringify(this.state || this.defaultState()));
        } catch (error) {
            this.showPopup("Progress could not be saved in this browser.", "error");
        }
    },

    load() {
        try {
            const saved = JSON.parse(localStorage.getItem(this.config.storageKey) || "null");
            this.state = { ...this.defaultState(), ...(saved && typeof saved === "object" ? saved : {}) };
            const savedHearts = Number(this.state.hearts);
            this.state.hearts = Number.isFinite(savedHearts) ? this.clamp(savedHearts, 0, this.config.maxHearts) : this.config.maxHearts;
            this.state.unlockedScene = Math.max(1, Number(this.state.unlockedScene) || 1);
            this.state.inventory = Array.isArray(this.state.inventory) ? this.state.inventory : [];
            this.state.completedMissions = Array.isArray(this.state.completedMissions) ? this.state.completedMissions : [];
            this.state.answeredQuestions = Array.isArray(this.state.answeredQuestions) ? this.state.answeredQuestions : [];
        } catch (error) {
            this.state = this.defaultState();
            this.save();
        }
    },

    reset() {
        this.state = this.defaultState();
        this.restoreRuntimeSets();
        this.save();
        this.gotoScene("index.html");
    },

    getState() {
        return JSON.parse(JSON.stringify(this.state));
    },

    setState(nextState) {
        this.state = { ...this.state, ...nextState };
        this.save();
        this.updateHeartUI();
        return this.getState();
    },

    // Scene protection prevents URL-skipping into locked missions.
    protectScene() {
        const scene = this.currentSceneNumber();
        if (scene === 0) return;
        if (scene > this.state.unlockedScene) {
            this.gotoScene(this.sceneFileForNumber(this.state.unlockedScene));
        }
    },

    currentSceneNumber() {
        return this.config.scenes[this.currentFileName()] ?? 1;
    },

    currentFileName() {
        return window.location.pathname.split("/").pop().toLowerCase();
    },

    sceneFileForNumber(sceneNumber) {
        const entry = Object.entries(this.config.scenes).find(([, value]) => value === sceneNumber && value > 0);
        return entry ? entry[0] : "index.html";
    },

    unlockScene(sceneNumber) {
        if (sceneNumber > this.state.unlockedScene) {
            this.state.unlockedScene = sceneNumber;
            this.save();
        }
    },

    completeMission(missionName, unlockSceneNumber) {
        if (!this.state.completedMissions.includes(missionName)) {
            this.state.completedMissions.push(missionName);
        }
        if (unlockSceneNumber) this.unlockScene(unlockSceneNumber);
        this.save();
        this.showPopup("Mission Complete!", "success");
    },

    nextScene() {
        const current = this.currentSceneNumber();
        const nextFile = this.config.nextSceneByNumber[current] || this.sceneFileForNumber(current + 1);
        this.gotoScene(nextFile);
    },

    gotoScene(fileName) {
        window.location.href = fileName;
    },

    // Hearts are global across scenes; zero hearts redirects to the retry screen.
    loseHeart(reason = "Heart Lost!") {
        if (this.state.hearts <= 0 || this.currentSceneNumber() === 0) return;
        this.state.hearts = Math.max(0, this.state.hearts - 1);
        this.save();
        this.updateHeartUI();
        this.showPopup(reason, "error");
        if (this.state.hearts === 0) {
            window.setTimeout(() => this.gotoScene("gameover.html"), 500);
        }
    },

    resetHearts() {
        this.state.hearts = this.config.maxHearts;
        this.save();
        this.updateHeartUI();
    },

    updateHeartUI() {
        const container = document.getElementById("heart-container");
        if (!container) return;
        container.innerHTML = "";
        for (let index = 0; index < this.config.maxHearts; index += 1) {
            const heart = document.createElement("span");
            heart.className = index < this.state.hearts ? "heart-full" : "heart-empty";
            heart.textContent = "\u2665";
            container.appendChild(heart);
        }
    },

    // Scene 2 item collection: correct parts fill the inventory, wrong parts cost a heart.
    bindInventoryScene() {
        document.querySelectorAll(".choice-btn, [data-item-id]").forEach((button) => {
            button.addEventListener("click", () => {
                const item = this.itemFromElement(button);
                if (this.isCorrectInventoryItem(item, button)) {
                    this.collectItem(item, button);
                } else {
                    this.markWrong(button, "Wrong item!");
                }
            });
        });
    },

    itemFromElement(element) {
        const rawId = element.dataset.itemId || element.dataset.id || element.id || "";
        const label = element.dataset.name || element.querySelector("span")?.textContent || element.querySelector("img")?.alt || rawId;
        const name = this.config.inventoryAliases[rawId] || label.trim();
        return { id: this.slug(name), name, image: element.querySelector("img")?.getAttribute("src") || "" };
    },

    isCorrectInventoryItem(item, element) {
        if (element.dataset.correct === "true" || element.dataset.answer === "correct") return true;
        if (element.dataset.correct === "false" || element.dataset.answer === "wrong") return false;
        return this.config.correctInventoryNames.includes(item.name.toLowerCase());
    },

    collectItem(item, sourceElement = null) {
        if (this.hasItem(item.id)) {
            this.showPopup("Already collected.", "info");
            return false;
        }
        if (this.inventoryComplete()) {
            this.showPopup("Inventory is full.", "info");
            return false;
        }
        this.state.inventory.push(item);
        this.save();
        if (sourceElement) sourceElement.classList.add("collected");
        this.renderInventory();
        this.updateInventoryProgress();
        this.showPopup("Item Collected!", "success");
        return true;
    },

    removeItem(itemId) {
        const normalizedId = this.slug(itemId);
        const before = this.state.inventory.length;
        this.state.inventory = this.state.inventory.filter((item) => item.id !== normalizedId);
        if (before !== this.state.inventory.length) {
            this.save();
            document.querySelectorAll(".choice-btn").forEach((button) => {
                if (this.itemFromElement(button).id === normalizedId) button.classList.remove("collected");
            });
            this.renderInventory();
            this.updateInventoryProgress();
        }
    },

    hasItem(itemId) {
        const normalizedId = this.slug(itemId);
        return this.state.inventory.some((item) => item.id === normalizedId);
    },

    inventoryComplete() {
        return this.state.inventory.length >= this.config.inventoryTarget;
    },

    renderInventory() {
        const slots = Array.from(document.querySelectorAll(".inv-slot"));
        if (!slots.length) return;
        slots.forEach((slot) => slot.innerHTML = "");

        this.state.inventory.slice(0, slots.length).forEach((item, index) => {
            const image = document.createElement("img");
            image.src = item.image;
            image.alt = item.name;
            image.className = "inv-item-pic pop-in-smooth";
            image.dataset.targetId = item.id;
            image.addEventListener("click", () => this.removeItem(item.id));
            slots[index].appendChild(image);
        });

        document.querySelectorAll(".choice-btn").forEach((button) => {
            button.classList.toggle("collected", this.hasItem(this.itemFromElement(button).id));
        });
    },

    updateInventoryProgress() {
        const nextButton = document.getElementById("nextStepBtn");
        if (!nextButton) return;
        if (this.inventoryComplete()) {
            nextButton.textContent = "Next Mission";
            nextButton.className = "action-btn-visible pop-in-smooth";
            this.unlockScene(3);
        } else {
            nextButton.className = "action-btn-hidden";
        }
    },

    // Scene 3 supports mouse drag/drop and pointer tap-drop for touch-style interaction.
    bindAssemblyScene() {
        this.placedAssemblyParts = new Set();
        if (window.Scene3Assembly?.renderToolbox) {
            window.Scene3Assembly.renderToolbox(this);
        }
        document.querySelectorAll(".inventory-item, [draggable='true'][data-type]").forEach((item) => {
            item.addEventListener("dragstart", (event) => this.startDrag(event, item));
            item.addEventListener("pointerdown", () => this.draggedElement = item);
        });

        document.querySelectorAll(".drop-zone[data-expected]").forEach((zone) => {
            zone.addEventListener("dragover", (event) => {
                event.preventDefault();
                if (!zone.classList.contains("correct")) zone.classList.add("drag-over");
            });
            zone.addEventListener("dragleave", () => zone.classList.remove("drag-over"));
            zone.addEventListener("drop", (event) => {
                event.preventDefault();
                this.handleAssemblyDrop(zone, this.elementFromDrop(event));
            });
            zone.addEventListener("pointerup", () => this.handleAssemblyDrop(zone, this.draggedElement));
        });
    },

    startDrag(event, item) {
        this.draggedElement = item;
        if (event.dataTransfer) {
            event.dataTransfer.setData("text/plain", item.id || item.dataset.type);
        }
    },

    elementFromDrop(event) {
        const id = event.dataTransfer?.getData("text/plain");
        return id ? document.getElementById(id) : this.draggedElement;
    },

    handleAssemblyDrop(zone, item) {
        zone.classList.remove("drag-over");
        if (!item) return;

        const itemType = item.dataset.type;
        const expected = zone.dataset.expected;
        if (zone.classList.contains("correct") && itemType === expected) {
            this.placedAssemblyParts.add(expected);
            if (this.placedAssemblyParts.size >= this.config.assemblyTarget) this.completeAssembly();
            return;
        }
        if (itemType === expected) {
            this.placeAssemblyPart(zone, item, expected);
        } else {
            this.markWrong(zone, "Wrong Connection - Heart Lost!");
        }
    },

    placeAssemblyPart(zone, item, type) {
        zone.classList.add("correct");
        const clone = item.cloneNode(true);
        clone.removeAttribute("id");
        clone.draggable = false;
        clone.style.transform = "none";
        clone.style.width = "100%";
        clone.style.height = "100%";
        zone.innerHTML = "";
        zone.appendChild(clone);
        item.style.opacity = "0.2";
        item.classList.add("is-placed");
        item.draggable = false;
        item.style.cursor = "default";
        this.placedAssemblyParts.add(type);
        this.showPopup("Correct Connection", "success");
        if (this.placedAssemblyParts.size >= this.config.assemblyTarget) this.completeAssembly();
    },

    completeAssembly() {
        if (this.state.assembled) return;
        this.state.assembled = true;
        this.completeMission("assembly", 4);
        this.showPopup("Puzzle Complete", "success", 1800);
        this.updateAssemblyProgress();
    },

    updateAssemblyProgress() {
        const nextButton = document.getElementById("nextStepBtn");
        if (!nextButton) return;
        if (this.state.assembled) {
            nextButton.textContent = "Next Mission";
            nextButton.className = "action-btn-visible pop-in-smooth";
        } else {
            nextButton.className = "action-btn-hidden";
        }
    },

    // Scene 4 accepts both drag/drop and tap-to-place ordering for code blocks.
    bindCodingScene() {
        document.querySelectorAll(".code-block").forEach((block) => {
            if (!block.dataset.originalCodeOrder) {
                block.dataset.originalCodeOrder = String(Array.from(block.parentElement.children).indexOf(block));
            }
            block.addEventListener("dragstart", (event) => this.startDrag(event, block));
            block.addEventListener("click", () => this.selectCodeBlock(block));
        });

        document.querySelectorAll("#code-target .drop-zone, .code-drop-zone").forEach((zone) => {
            zone.addEventListener("dragover", (event) => event.preventDefault());
            zone.addEventListener("drop", (event) => {
                event.preventDefault();
                const block = this.elementFromDrop(event);
                if (block?.classList.contains("code-block")) this.moveCodeBlock(block, zone);
            });
            zone.addEventListener("click", () => {
                if (this.selectedCodeBlock) this.moveCodeBlock(this.selectedCodeBlock, zone);
            });
        });

        const checkButton = Array.from(document.querySelectorAll("button")).find((button) => {
            return button.textContent.trim().toLowerCase().includes("check order");
        });
        if (checkButton) checkButton.addEventListener("click", () => this.validateCode());
    },

    selectCodeBlock(block) {
        this.selectedCodeBlock = block;
        document.querySelectorAll(".code-block").forEach((item) => item.classList.remove("selected"));
        block.classList.add("selected");
    },

    moveCodeBlock(block, zone) {
        if (zone.children.length) {
            document.getElementById("code-source")?.appendChild(zone.firstElementChild);
        }
        zone.textContent = "";
        zone.appendChild(block);
        this.selectedCodeBlock = null;
    },

    validateCode() {
        const orderedBlocks = Array.from(document.querySelectorAll("#code-target .drop-zone")).map((zone) => zone.firstElementChild);
        if (orderedBlocks.some((block) => !block)) {
            this.showPopup("Place every code block first.", "info");
            return false;
        }
        const isCorrect = orderedBlocks.every((block, index) => Number(block.dataset.val) === index + 1);
        if (isCorrect) {
            orderedBlocks.forEach((block) => block.classList.add("correct"));
            this.completeCoding();
            return true;
        }
        orderedBlocks.filter(Boolean).forEach((block) => block.classList.add("wrong"));
        window.setTimeout(() => orderedBlocks.filter(Boolean).forEach((block) => block.classList.remove("wrong")), 600);
        this.loseHeart("Wrong order!");
        window.setTimeout(() => this.resetCodePuzzle(), 800);
        return false;
    },

    resetCodePuzzle() {
        const source = document.getElementById("code-source");
        const zones = Array.from(document.querySelectorAll("#code-target .drop-zone"));
        if (!source) return;

        const blocks = Array.from(document.querySelectorAll(".code-block"));
        const firstRects = new Map(blocks.map((block) => [block, block.getBoundingClientRect()]));

        this.selectedCodeBlock = null;
        this.draggedElement = null;
        blocks.forEach((block) => {
            block.classList.remove("selected", "wrong");
            block.draggable = true;
            block.style.pointerEvents = "auto";
        });

        zones.forEach((zone) => {
            zone.innerHTML = zone.dataset.pos || "";
        });

        blocks
            .sort((a, b) => Number(a.dataset.originalCodeOrder || 0) - Number(b.dataset.originalCodeOrder || 0))
            .forEach((block) => source.appendChild(block));

        blocks.forEach((block) => {
            const first = firstRects.get(block);
            const last = block.getBoundingClientRect();
            if (!first) return;

            const deltaX = first.left - last.left;
            const deltaY = first.top - last.top;
            if (!deltaX && !deltaY) return;

            block.style.transition = "none";
            block.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            block.style.pointerEvents = "none";

            requestAnimationFrame(() => {
                block.style.transition = "transform 0.32s ease";
                block.style.transform = "";
                window.setTimeout(() => {
                    block.style.transition = "";
                    block.style.pointerEvents = "auto";
                    block.draggable = true;
                }, 340);
            });
        });
    },

    completeCoding() {
        if (this.state.codingComplete) return;
        this.state.codingComplete = true;
        this.completeMission("coding", 6);
        window.setTimeout(() => this.nextScene(), 900);
    },

    // Boss and quiz scenes reuse one answer pipeline for scoring, hearts, and unlocks.
    bindBossScene(sceneNumber) {
        if (sceneNumber === 7 || sceneNumber === 8) this.renderBossHealth();

        document.querySelectorAll(".quiz-q").forEach((question, questionIndex) => {
            const questionId = question.dataset.questionId || question.querySelector(".q-text")?.textContent || `scene-${sceneNumber}-q-${questionIndex}`;
            question.querySelectorAll(".quiz-opt").forEach((button) => {
                button.addEventListener("click", () => {
                    this.answerQuestion(button, questionId, this.optionIsCorrect(button), sceneNumber);
                });
            });
        });
    },

    optionIsCorrect(button) {
        const inline = button.getAttribute("onclick") || "";
        if (button.dataset.correct) return button.dataset.correct === "true";
        if (button.dataset.answer) return button.dataset.answer === "correct";
        return inline.includes("'correct'") || inline.includes('"correct"');
    },

    // Reusable quiz renderer for future scenes that prefer data-driven questions.
    loadQuestion(quiz, index = 0) {
        this.activeQuiz = quiz;
        this.quizIndex = index;
        const question = quiz[index];
        const container = document.querySelector("[data-quiz-container], .quiz-container");
        if (!question || !container) return;

        container.innerHTML = "";
        const title = document.createElement("div");
        title.className = "q-text";
        title.textContent = question.text;
        container.appendChild(title);

        const options = document.createElement("div");
        options.className = "quiz-options";
        question.choices.forEach((choice) => {
            const button = document.createElement("button");
            button.className = "quiz-opt";
            button.textContent = choice;
            button.addEventListener("click", () => this.answerQuestion(button, question.text, choice === question.correctAnswer, this.currentSceneNumber()));
            options.appendChild(button);
        });
        container.appendChild(options);
    },

    answerQuestion(button, questionId, isCorrect, sceneNumber = this.currentSceneNumber()) {
        const normalizedId = this.slug(questionId);
        if (this.answeredQuestions.has(normalizedId) || button.disabled) return;

        if (isCorrect) {
            this.answeredQuestions.add(normalizedId);
            this.state.answeredQuestions = Array.from(this.answeredQuestions);
            this.state.score += 10;
            button.classList.add("correct");
            this.save();
            this.showPopup("Correct!", "success");
            this.handleQuizProgress(sceneNumber);
        } else {
            button.classList.add("wrong");
            this.loseHeart("Wrong!");
            window.setTimeout(() => button.classList.remove("wrong"), 650);
        }
    },

    nextQuestion() {
        if (!this.activeQuiz) return;
        this.quizIndex += 1;
        if (this.quizIndex >= this.activeQuiz.length) {
            this.finishQuiz();
        } else {
            this.loadQuestion(this.activeQuiz, this.quizIndex);
        }
    },

    finishQuiz() {
        this.showPopup("Quiz Complete!", "success");
        this.save();
    },

    handleQuizProgress(sceneNumber) {
        const sceneQuestionCount = document.querySelectorAll(".quiz-q").length || 1;
        const answeredOnPage = Array.from(document.querySelectorAll(".quiz-q")).filter((question, index) => {
            const id = this.slug(question.dataset.questionId || question.querySelector(".q-text")?.textContent || `scene-${sceneNumber}-q-${index}`);
            return this.answeredQuestions.has(id);
        }).length;

        if (sceneNumber === 6 && answeredOnPage >= sceneQuestionCount) {
            this.state.boss1Complete = true;
            this.completeMission("boss1", 7);
            window.setTimeout(() => this.nextScene(), 900);
        } else if (sceneNumber === 7) {
            this.damageBoss(Math.ceil(this.config.bossHealthMax / sceneQuestionCount));
            if (answeredOnPage >= sceneQuestionCount || this.state.bossHealth <= 0) {
                this.state.boss2Complete = true;
                this.completeMission("boss2", 8);
                window.setTimeout(() => this.nextScene(), 900);
            }
        } else if (sceneNumber === 8 && answeredOnPage >= sceneQuestionCount) {
            this.win();
        }
    },

    damageBoss(amount = 1) {
        this.state.bossHealth = Math.max(0, (this.state.bossHealth ?? this.config.bossHealthMax) - amount);
        this.save();
        this.renderBossHealth();
    },

    renderBossHealth() {
        let bar = document.querySelector(".boss-health");
        if (!bar) {
            bar = document.createElement("div");
            bar.className = "boss-health";
            bar.innerHTML = "<div class='boss-health-fill'></div>";
            document.body.appendChild(bar);
        }
        const fill = bar.querySelector(".boss-health-fill");
        const percent = (this.state.bossHealth / this.config.bossHealthMax) * 100;
        fill.style.width = `${this.clamp(percent, 0, 100)}%`;
    },

    win() {
        if (this.state.finalBossComplete) return;
        this.state.finalBossComplete = true;
        this.state.score += 25;
        this.completeMission("finalBoss", 8);
        this.renderVictory();
    },

    // Victory UI is generated here so Scene 8 can stay lightweight.
      renderVictory() {
          this.launchConfetti();
          let panel = document.getElementById("victory-panel");
        if (!panel) {
            panel = document.createElement("div");
            panel.id = "victory-panel";
            panel.className = "victory-panel";
            panel.style.cssText = "position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:10003;color:white;padding:28px;text-align:center;font-family:system-ui,sans-serif;";
            document.body.appendChild(panel);
        }
          panel.innerHTML = `
              <h1 style="margin:0 0 8px;">Mission Complete</h1>
              <p style="margin:0 0 10px;color:#d1d5db;">Badge earned: Sprouty Rescuer</p>
              <p style="margin:0 0 18px;">Final score: ${this.state.score}</p>
              <button data-reset-game type="button">Restart</button>
          `;
          panel.querySelector("[data-reset-game]").addEventListener("click", () => this.reset());
          this.finishPlatformAttempt(true);
      },

      bindGameOverScene() {
          document.querySelectorAll("button, [data-reset-game]").forEach((button) => {
              if (button.textContent.toLowerCase().includes("retry") || button.hasAttribute("data-reset-game")) {
                  button.addEventListener("click", () => this.reset());
              }
          });
          this.finishPlatformAttempt(false);
      },

    markWrong(element, message) {
        element.classList.add("shake");
        window.setTimeout(() => element.classList.remove("shake"), 320);
        this.loseHeart(message);
    },

    // Lightweight notification system used instead of alert().
    showPopup(message, type = "info", duration = 1400) {
        const popup = document.getElementById("game-popup");
        if (!popup) return;
        popup.textContent = message;
        popup.className = `game-popup ${type}`;
        this.showSceneFeedback(message, type, duration);
        window.clearTimeout(this.popupTimer);
        this.popupTimer = window.setTimeout(() => this.hidePopup(), duration);
    },

    showSceneFeedback(message, type = "info", duration = 1400) {
        const feedback = document.getElementById("fb2");
        if (!feedback || this.currentSceneNumber() !== 2) return;

        const normalized = String(message || "").toLowerCase();
        let sceneMessage = message;
        if (type === "success" && normalized.includes("item")) {
            sceneMessage = "\u2713 Correct Item!";
        } else if (type === "error" && normalized.includes("wrong")) {
            sceneMessage = "\u2715 Wrong Item! \u2665 Heart Lost!";
        } else if (type === "error" && normalized.includes("heart")) {
            sceneMessage = "\u2665 Heart Lost!";
        }

        window.clearTimeout(this.sceneFeedbackTimer);
        feedback.textContent = sceneMessage;
        feedback.className = `feedback-msg ${type}`;
        void feedback.offsetWidth;
        feedback.classList.add("is-visible");
        this.sceneFeedbackTimer = window.setTimeout(() => {
            feedback.className = "feedback-msg";
            feedback.textContent = "";
        }, duration);
    },

    hidePopup() {
        const popup = document.getElementById("game-popup");
        if (popup) popup.classList.add("is-hidden");
    },

    launchConfetti() {
        const colors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#a855f7"];
        for (let index = 0; index < 42; index += 1) {
            const piece = document.createElement("span");
            piece.className = "confetti-piece";
            piece.style.left = `${Math.random() * 100}vw`;
            piece.style.background = colors[index % colors.length];
            piece.style.animationDelay = `${Math.random() * 0.6}s`;
            document.body.appendChild(piece);
            window.setTimeout(() => piece.remove(), 2600);
        }
    },

    // Utility helpers used by current and future puzzle variations.
    shuffleArray(array) {
        const copy = [...array];
        for (let index = copy.length - 1; index > 0; index -= 1) {
            const swapIndex = Math.floor(Math.random() * (index + 1));
            [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
        }
        return copy;
    },

    playSound(idOrUrl) {
        const element = document.getElementById(idOrUrl);
        const audio = element instanceof HTMLAudioElement ? element : new Audio(idOrUrl);
        audio.play().catch(() => {});
        return audio;
    },

    stopSound(id) {
        const audio = document.getElementById(id);
        if (audio instanceof HTMLAudioElement) {
            audio.pause();
            audio.currentTime = 0;
        }
    },

    slug(value) {
        return String(value || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    },

    clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }
};

document.addEventListener("DOMContentLoaded", () => Game.init());
