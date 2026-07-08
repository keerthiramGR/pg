/* app.js - AILink Core Interactive Application Logic */

// Robust Initial AI Dataset
const initialAIs = [
    {
        id: "gemini",
        name: "Gemini 1.5 Pro",
        provider: "Google",
        category: "chat",
        desc: "Google's flagship multimodal model featuring an industry-leading 2-million token context window. Superb at processing massive documents and cross-modal reasoning.",
        pricing: "Freemium",
        link: "https://gemini.google.com",
        developer: "Google",
        tags: ["Multimodal", "Long Context", "Research"],
        logo: "https://fonts.gstatic.com/s/i/productlogos/gemini/v11/web-96.png"
    },
    {
        id: "claude",
        name: "Claude 3.5 Sonnet",
        provider: "Anthropic",
        category: "chat",
        desc: "Anthropic's state-of-the-art model. Sets new industry benchmarks for graduate-level reasoning, undergraduate-level knowledge, and coding proficiency.",
        pricing: "Freemium",
        link: "https://claude.ai",
        developer: "Anthropic",
        tags: ["Reasoning", "Coding", "Analysis"],
        logo: "" // Uses CSS gradient fallback
    },
    {
        id: "chatgpt",
        name: "ChatGPT (GPT-4o)",
        provider: "OpenAI",
        category: "chat",
        desc: "OpenAI's versatile flagship model. Highly responsive, multimodal, and integrates web browsing, DALL-E, data analysis, and advanced voice features.",
        pricing: "Freemium",
        link: "https://chatgpt.com",
        developer: "OpenAI",
        tags: ["GPT-4o", "Interactive", "Generalist"],
        logo: ""
    },
    {
        id: "midjourney",
        name: "Midjourney v6",
        provider: "Midjourney",
        category: "image",
        desc: "The gold standard for artistic and hyper-realistic AI image generation. Excels at complex scenes, rich textures, and understanding painterly aesthetics.",
        pricing: "Paid",
        link: "https://midjourney.com",
        developer: "Midjourney Inc.",
        tags: ["Artistic", "Stylization", "High-Fidelity"],
        logo: ""
    },
    {
        id: "dalle",
        name: "DALL-E 3",
        provider: "OpenAI",
        category: "image",
        desc: "State-of-the-art image generator deeply integrated with ChatGPT. Exceptional at following highly detailed, prompt-specific layout instructions.",
        pricing: "Paid",
        link: "https://openai.com/dall-e-3",
        developer: "OpenAI",
        tags: ["Prompt Alignment", "Creative", "ChatGPT Integration"],
        logo: ""
    },
    {
        id: "stablediffusion",
        name: "Stable Diffusion 3",
        provider: "Stability AI",
        category: "image",
        desc: "Open-weights text-to-image model. Extremely customizable, running locally or via API with incredible spelling capabilities within images.",
        pricing: "Open Source",
        link: "https://stability.ai",
        developer: "Stability AI",
        tags: ["Open Weights", "Customizable", "Text Rendering"],
        logo: ""
    },
    {
        id: "copilot",
        name: "GitHub Copilot",
        provider: "GitHub / Microsoft",
        category: "code",
        desc: "The original AI coding assistant integrated directly into your editor. Autocompletes functions, writes tests, and accelerates development workflows.",
        pricing: "Paid",
        link: "https://github.com/features/copilot",
        developer: "Microsoft & GitHub",
        tags: ["IDE Plugin", "Autocomplete", "Productivity"],
        logo: ""
    },
    {
        id: "v0",
        name: "v0 by Vercel",
        provider: "Vercel",
        category: "code",
        desc: "Generative UI system that builds modern, responsive React/HTML interfaces using Tailwind CSS and Shadcn components from simple prompts.",
        pricing: "Freemium",
        link: "https://v0.dev",
        developer: "Vercel",
        tags: ["Frontend", "React", "Design System"],
        logo: ""
    },
    {
        id: "suno",
        name: "Suno AI",
        provider: "Suno",
        category: "audio",
        desc: "Generates complete songs including realistic vocals, instrumentation, and lyrics from simple descriptive text prompts in seconds.",
        pricing: "Freemium",
        link: "https://suno.com",
        developer: "Suno Inc.",
        tags: ["Music Synth", "Vocals", "Songwriting"],
        logo: ""
    },
    {
        id: "elevenlabs",
        name: "ElevenLabs Voice",
        provider: "ElevenLabs",
        category: "audio",
        desc: "Industry-leading generative voice synthesis and voice cloning. Outstanding emotional nuance, accent control, and multilingual realism.",
        pricing: "Freemium",
        link: "https://elevenlabs.io",
        developer: "ElevenLabs",
        tags: ["TTS", "Voice Cloning", "Dubbing"],
        logo: ""
    },
    {
        id: "runway",
        name: "Runway Gen-3 Alpha",
        provider: "Runway",
        category: "video",
        desc: "A massive step forward in video generation, producing hyper-realistic video sequences with precise camera motions and prompt alignment.",
        pricing: "Paid",
        link: "https://runwayml.com",
        developer: "Runway ML",
        tags: ["Video Gen", "Cinematic", "Motion Control"],
        logo: ""
    }
];

// App State
let aiList = [];
let currentCategory = "all";
let searchQuery = "";
let showBookmarksOnly = false;
let bookmarkedAIs = new Set();
let playgroundMode = "simulated";
let geminiApiKey = "";

// DOM References
const toolsGrid = document.getElementById("tools-grid");
const toolsCount = document.getElementById("tools-count");
const searchInput = document.getElementById("search-input");
const filterButtons = document.querySelectorAll(".filter-btn");
const bookmarkFilterToggle = document.getElementById("bookmark-filter-toggle");
const addToolTrigger = document.getElementById("add-tool-trigger");
const addToolModal = document.getElementById("add-tool-modal");
const closeAddModal = document.getElementById("close-add-modal");
const cancelAddModal = document.getElementById("cancel-add-modal");
const addToolForm = document.getElementById("add-tool-form");

const playgroundModal = document.getElementById("playground-modal");
const closePlaygroundModal = document.getElementById("close-playground-modal");
const modalLogo = document.getElementById("modal-logo");
const modalTitle = document.getElementById("modal-title");
const modalProvider = document.getElementById("modal-provider");
const modalDescription = document.getElementById("modal-description");
const modalPricing = document.getElementById("modal-pricing");
const modalCategory = document.getElementById("modal-category");
const modalDeveloper = document.getElementById("modal-developer");
const modalLaunchLink = document.getElementById("modal-launch-link");
const playgroundContainer = document.getElementById("playground-container");

// Settings DOM References
const settingsTrigger = document.getElementById("settings-trigger");
const settingsModal = document.getElementById("settings-modal");
const closeSettingsModal = document.getElementById("close-settings-modal");
const cancelSettingsModal = document.getElementById("cancel-settings-modal");
const settingsForm = document.getElementById("settings-form");
const settingsMode = document.getElementById("settings-mode");
const geminiApiKeyInput = document.getElementById("gemini-api-key");
const btnResetApp = document.getElementById("btn-reset-app");
const apiKeyGroup = document.getElementById("api-key-group");

// Initialize Application
window.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Load bookmarks from LocalStorage
    const savedBookmarks = localStorage.getItem("ailink_bookmarks");
    if (savedBookmarks) {
        bookmarkedAIs = new Set(JSON.parse(savedBookmarks));
    }

    // Load custom AIs from LocalStorage
    const savedCustomAIs = localStorage.getItem("ailink_custom_ais");
    const customAIs = savedCustomAIs ? JSON.parse(savedCustomAIs) : [];
    
    // Combine dataset
    aiList = [...initialAIs, ...customAIs];

    // Load Developer Settings
    playgroundMode = localStorage.getItem("ailink_playground_mode") || "simulated";
    geminiApiKey = localStorage.getItem("ailink_gemini_api_key") || "";
    
    if (settingsMode) settingsMode.value = playgroundMode;
    if (geminiApiKeyInput) geminiApiKeyInput.value = geminiApiKey;
    if (apiKeyGroup) {
        apiKeyGroup.style.display = playgroundMode === "live" ? "flex" : "none";
    }

    // Render tools grid
    renderTools();

    // Setup event listeners
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Search input handler
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderTools();
    });

    // Category button filters
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentCategory = btn.dataset.category;
            showBookmarksOnly = false;
            bookmarkFilterToggle.classList.remove("active");
            renderTools();
        });
    });

    // Bookmark/My Stack filter button
    bookmarkFilterToggle.addEventListener("click", () => {
        showBookmarksOnly = !showBookmarksOnly;
        bookmarkFilterToggle.classList.toggle("active", showBookmarksOnly);
        
        // Remove active state from categories if showing bookmarks
        if (showBookmarksOnly) {
            filterButtons.forEach(b => b.classList.remove("active"));
            currentCategory = "all";
        } else {
            document.querySelector('[data-category="all"]').classList.add("active");
        }
        renderTools();
    });

    // Add tool modals
    addToolTrigger.addEventListener("click", () => {
        addToolModal.classList.add("active");
    });

    const hideAddModal = () => {
        addToolModal.classList.remove("active");
        addToolForm.reset();
    };

    closeAddModal.addEventListener("click", hideAddModal);
    cancelAddModal.addEventListener("click", hideAddModal);

    // Form submission for adding custom tool
    addToolForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("tool-name").value;
        const provider = document.getElementById("tool-provider").value;
        const category = document.getElementById("tool-category").value;
        const pricing = document.getElementById("tool-pricing").value;
        const desc = document.getElementById("tool-desc").value;
        const link = document.getElementById("tool-link").value;
        const rawTags = document.getElementById("tool-tags").value;
        
        const tags = rawTags ? rawTags.split(",").map(t => t.trim()).filter(t => t.length > 0) : [];
        const id = name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now();

        const newTool = {
            id,
            name,
            provider,
            category,
            desc,
            pricing,
            link,
            developer: provider,
            tags: tags.length ? tags : ["Custom"],
            logo: "" // Default gradient logo will cover it
        };

        // Add to local list
        aiList.unshift(newTool);

        // Store custom tools in localstorage
        const savedCustomAIs = localStorage.getItem("ailink_custom_ais");
        const customAIs = savedCustomAIs ? JSON.parse(savedCustomAIs) : [];
        customAIs.unshift(newTool);
        localStorage.setItem("ailink_custom_ais", JSON.stringify(customAIs));

        // Re-render
        renderTools();
        hideAddModal();
        
        // Show success alert
        alert(`Successfully added "${name}" to your local dashboard!`);
    });

    // Close playground modal
    closePlaygroundModal.addEventListener("click", () => {
        playgroundModal.classList.remove("active");
        // Cancel speech synthesis
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        if (window.audioContext) {
            window.audioContext.close();
            window.audioContext = null;
        }
    });

    // Open settings modal
    if (settingsTrigger) {
        settingsTrigger.addEventListener("click", () => {
            settingsModal.classList.add("active");
        });
    }

    const hideSettingsModal = () => {
        settingsModal.classList.remove("active");
        if (settingsMode) settingsMode.value = playgroundMode;
        if (geminiApiKeyInput) geminiApiKeyInput.value = geminiApiKey;
    };

    if (closeSettingsModal) closeSettingsModal.addEventListener("click", hideSettingsModal);
    if (cancelSettingsModal) cancelSettingsModal.addEventListener("click", hideSettingsModal);

    // Toggle API key visibility based on mode choice
    if (settingsMode) {
        settingsMode.addEventListener("change", (e) => {
            if (apiKeyGroup) {
                apiKeyGroup.style.display = e.target.value === "live" ? "flex" : "none";
            }
        });
    }

    // Submit Developer Settings Form
    if (settingsForm) {
        settingsForm.addEventListener("submit", (e) => {
            e.preventDefault();
            playgroundMode = settingsMode.value;
            geminiApiKey = geminiApiKeyInput.value.trim();
            localStorage.setItem("ailink_playground_mode", playgroundMode);
            localStorage.setItem("ailink_gemini_api_key", geminiApiKey);
            settingsModal.classList.remove("active");
            alert("Settings saved successfully!");
            renderTools();
        });
    }

    // Reset local memory database
    if (btnResetApp) {
        btnResetApp.addEventListener("click", () => {
            if (confirm("Are you sure you want to reset all bookmarks, custom tools, and settings? This cannot be undone.")) {
                localStorage.clear();
                alert("Database reset. Reloading page...");
                window.location.reload();
            }
        });
    }

    // Close modals on clicking overlay background
    window.addEventListener("click", (e) => {
        if (e.target === playgroundModal) {
            playgroundModal.classList.remove("active");
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
            if (window.audioContext) {
                window.audioContext.close();
                window.audioContext = null;
            }
        }
        if (e.target === addToolModal) {
            hideAddModal();
        }
        if (e.target === settingsModal) {
            hideSettingsModal();
        }
    });

    // Expose functions globally for inline HTML click handlers
    window.toggleBookmark = toggleBookmark;
    window.openPlayground = openPlayground;
    window.deleteCustomTool = deleteCustomTool;
}

// Render Tools Directory Grid
function renderTools() {
    // Clear grid
    toolsGrid.innerHTML = "";

    // Filter tools based on constraints
    const filtered = aiList.filter(tool => {
        // Search filter
        const matchesSearch = 
            tool.name.toLowerCase().includes(searchQuery) ||
            tool.provider.toLowerCase().includes(searchQuery) ||
            tool.desc.toLowerCase().includes(searchQuery) ||
            tool.tags.some(tag => tag.toLowerCase().includes(searchQuery));

        // Category filter
        const matchesCategory = currentCategory === "all" || tool.category === currentCategory;

        // Bookmark filter
        const matchesBookmarks = !showBookmarksOnly || bookmarkedAIs.has(tool.id);

        return matchesSearch && matchesCategory && matchesBookmarks;
    });

    // Update count
    toolsCount.textContent = `Showing ${filtered.length} AI${filtered.length === 1 ? '' : 's'}`;

    if (filtered.length === 0) {
        toolsGrid.innerHTML = `
            <div class="empty-state">
                <i data-lucide="help-circle" class="empty-icon"></i>
                <h3>No AI Tools Found</h3>
                <p>Try adjusting your search criteria, category filters, or add a custom AI tool!</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    // Render cards
    filtered.forEach(tool => {
        const isBookmarked = bookmarkedAIs.has(tool.id);
        const isCustom = !initialAIs.some(t => t.id === tool.id);
        const card = document.createElement("div");
        card.className = "ai-card";
        card.dataset.id = tool.id;

        // Mouse move effect for glass card sheen
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--x", `${x}px`);
            card.style.setProperty("--y", `${y}px`);
        });

        // Setup logo template
        let logoHTML = "";
        if (tool.logo) {
            logoHTML = `<img src="${tool.logo}" alt="${tool.name} Logo" class="card-logo" onerror="this.outerHTML='<div class=\\'card-logo-fallback\\'>${tool.name.charAt(0)}</div>'">`;
        } else {
            // Cool modern gradients for missing logos
            const letters = tool.name.substring(0, 2).toUpperCase();
            const colors = getGradientForString(tool.name);
            logoHTML = `
                <div class="card-logo-fallback" style="background: linear-gradient(135deg, ${colors.c1}, ${colors.c2}); width:100%; height:100%; display:flex; align-items:center; justify-content:center; border-radius:10px; color:#fff; font-size:1.2rem; font-weight:700;">
                    ${letters}
                </div>
            `;
        }

        // Tags markup
        const tagsHTML = tool.tags.map(tag => `<span class="tag">${tag}</span>`).join("");

        card.innerHTML = `
            <div class="card-header">
                <div class="card-logo-container">
                    ${logoHTML}
                </div>
                <div style="display: flex; gap: 6px; align-items: center;">
                    ${isCustom ? `
                    <button class="delete-btn" title="Delete custom tool" onclick="deleteCustomTool('${tool.id}', event)">
                        <i data-lucide="trash-2"></i>
                    </button>
                    ` : ''}
                    <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" title="${isBookmarked ? 'Remove from stack' : 'Add to stack'}" onclick="toggleBookmark('${tool.id}', event)">
                        <i data-lucide="bookmark" class="${isBookmarked ? 'fill-current' : ''}"></i>
                    </button>
                </div>
            </div>
            <div class="card-body">
                <h3 class="card-title">${tool.name}</h3>
                <span class="card-provider">By ${tool.provider}</span>
                <p class="card-desc">${tool.desc}</p>
                <div class="card-tags">
                    ${tagsHTML}
                </div>
            </div>
            <div class="card-footer">
                <span class="card-price">${tool.pricing}</span>
                <button class="btn-card-action" onclick="openPlayground('${tool.id}')">
                    <span>Access Tool</span>
                    <i data-lucide="arrow-right" style="width:14px; height:14px;"></i>
                </button>
            </div>
        `;

        toolsGrid.appendChild(card);
    });

    lucide.createIcons();
}

// Toggle Tool Bookmark
function toggleBookmark(id, event) {
    if (event) {
        event.stopPropagation();
    }
    
    if (bookmarkedAIs.has(id)) {
        bookmarkedAIs.delete(id);
    } else {
        bookmarkedAIs.add(id);
    }

    localStorage.setItem("ailink_bookmarks", JSON.stringify(Array.from(bookmarkedAIs)));
    renderTools();
}

// Delete custom added AI tool
function deleteCustomTool(id, event) {
    if (event) {
        event.stopPropagation();
    }
    
    const tool = aiList.find(t => t.id === id);
    if (!tool) return;
    
    if (confirm(`Are you sure you want to delete the custom AI tool "${tool.name}"?`)) {
        // Filter out from active list
        aiList = aiList.filter(t => t.id !== id);
        
        // Remove from bookmarks if it was bookmarked
        if (bookmarkedAIs.has(id)) {
            bookmarkedAIs.delete(id);
            localStorage.setItem("ailink_bookmarks", JSON.stringify(Array.from(bookmarkedAIs)));
        }
        
        // Filter custom tools to store
        const customAIs = aiList.filter(t => !initialAIs.some(init => init.id === t.id));
        localStorage.setItem("ailink_custom_ais", JSON.stringify(customAIs));
        
        // Refresh dashboard
        renderTools();
    }
}

// Open Access Modal & Load Playground
function openPlayground(id) {
    const tool = aiList.find(t => t.id === id);
    if (!tool) return;

    // Load metadata details
    if (tool.logo) {
        modalLogo.src = tool.logo;
        modalLogo.style.display = 'block';
    } else {
        modalLogo.style.display = 'none';
    }
    modalTitle.textContent = tool.name;
    modalProvider.textContent = `By ${tool.provider}`;
    modalDescription.textContent = tool.desc;
    modalPricing.textContent = tool.pricing;
    modalCategory.textContent = getFullCategoryName(tool.category);
    modalDeveloper.textContent = tool.developer || tool.provider;
    modalLaunchLink.href = tool.link;

    // Set Live/Simulated status badge
    const statusEl = document.getElementById("playground-status");
    const isLive = playgroundMode === "live" && geminiApiKey;
    if (statusEl) {
        if (isLive) {
            statusEl.className = "status-badge live";
            statusEl.innerHTML = `<i data-lucide="zap" style="width:12px; height:12px;"></i> Live Gemini`;
        } else {
            statusEl.className = "status-badge simulated";
            statusEl.innerHTML = `<i data-lucide="shield" style="width:12px; height:12px;"></i> Simulated Sandbox`;
        }
    }

    // Load correct Playground Panel
    setupPlaygroundPanel(tool);

    // Open Modal
    playgroundModal.classList.add("active");
    lucide.createIcons();
}

// Setup Interactive Playground inside modal
function setupPlaygroundPanel(tool) {
    playgroundContainer.innerHTML = "";

    if (tool.category === "chat") {
        // Chat Console UI
        playgroundContainer.innerHTML = `
            <div class="chat-messages" id="playground-chat-messages">
                <div class="message ai">
                    Hello! I am <strong>${tool.name}</strong>, a model developed by ${tool.provider}. Ask me a question, prompt me for coding, or check my capabilities in this sandboxed playground!
                </div>
            </div>
            <div class="chat-input-area">
                <input type="text" id="playground-chat-input" class="chat-input" placeholder="Type a message or prompt...">
                <button id="playground-chat-send" class="btn-chat-send">
                    <i data-lucide="send" style="width:18px; height:18px;"></i>
                </button>
            </div>
        `;

        const chatInput = document.getElementById("playground-chat-input");
        const chatSend = document.getElementById("playground-chat-send");
        const chatMessages = document.getElementById("playground-chat-messages");

        const sendMessage = () => {
            const text = chatInput.value.trim();
            if (!text) return;

            // Render user message
            const userMsg = document.createElement("div");
            userMsg.className = "message user";
            userMsg.textContent = text;
            chatMessages.appendChild(userMsg);
            chatInput.value = "";
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Render model typing indicator
            const typingMsg = document.createElement("div");
            typingMsg.className = "message ai";
            typingMsg.innerHTML = `<span style="display:inline-flex; gap:3px;"><span class="spinner" style="width:10px; height:10px; border-width:2px; border-top-color:transparent;"></span> Thinking...</span>`;
            chatMessages.appendChild(typingMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Model logic delay simulation
            setTimeout(() => {
                typingMsg.remove();
                
                const aiMsg = document.createElement("div");
                aiMsg.className = "message ai";
                chatMessages.appendChild(aiMsg);

                if (playgroundMode === "live" && geminiApiKey) {
                    aiMsg.innerHTML = `<span style="display:inline-flex; gap:3px;"><span class="spinner" style="width:10px; height:10px; border-width:2px; border-top-color:transparent;"></span> Connecting API...</span>`;
                    callGeminiAPI(tool, text, (response) => {
                        aiMsg.innerHTML = response;
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    });
                } else {
                    const response = getSimulatedModelResponse(tool.id, text);
                    aiMsg.innerHTML = response;
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
            }, 1200);
        };

        chatSend.addEventListener("click", sendMessage);
        chatInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") sendMessage();
        });

    } else if (tool.category === "image") {
        // Image Playground UI
        playgroundContainer.innerHTML = `
            <div class="image-gen-area">
                <div class="image-preview-box">
                    <div class="image-loader" id="image-loader">
                        <div class="spinner"></div>
                        <div style="font-size:0.8rem; color:var(--text-muted);">Synthesizing Latent Grid...</div>
                    </div>
                    <div class="image-placeholder" id="image-placeholder">
                        <i data-lucide="image"></i>
                        <p>Enter a descriptive prompt and click "Generate Output"</p>
                    </div>
                    <img src="" alt="Generated Preview" class="image-preview" id="image-preview">
                </div>
                <div class="image-gen-form">
                    <textarea class="image-prompt-input" id="image-prompt" placeholder="A futuristic cyberpunk cafe in the rain, high fidelity, 8k resolution..."></textarea>
                    <div class="image-controls">
                        <select class="image-select" id="image-style">
                            <option value="photorealistic">Photorealistic</option>
                            <option value="cyberpunk">Cyberpunk / Neon</option>
                            <option value="anime">Anime / Manga</option>
                            <option value="oilpainting">Oil Painting</option>
                            <option value="sketch">Pencil Sketch</option>
                        </select>
                        <button class="btn-primary" id="image-generate-btn" style="padding:0.5rem; justify-content:center;">
                            <i data-lucide="sparkles" style="width:16px; height:16px;"></i>
                            <span>Generate Output</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        const generateBtn = document.getElementById("image-generate-btn");
        const promptInput = document.getElementById("image-prompt");
        const styleSelect = document.getElementById("image-style");
        const loader = document.getElementById("image-loader");
        const placeholder = document.getElementById("image-placeholder");
        const preview = document.getElementById("image-preview");

        generateBtn.addEventListener("click", () => {
            const promptVal = promptInput.value.trim();
            if (!promptVal) {
                alert("Please enter an image prompt first!");
                return;
            }

            // Show loading state
            placeholder.style.display = "none";
            preview.style.display = "none";
            preview.classList.remove("loaded");
            loader.style.display = "flex";
            generateBtn.disabled = true;

            setTimeout(() => {
                // Generate a real dynamic image using Pollinations AI
                const styledPrompt = `${promptVal}, ${styleSelect.value} style, ultra high resolution, 8k, detailed graphics`;
                const imgUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(styledPrompt)}?width=600&height=400&nologo=true&seed=${Math.floor(Math.random() * 100000)}`;
                
                preview.src = imgUrl;
                preview.onload = () => {
                    loader.style.display = "none";
                    preview.style.display = "block";
                    setTimeout(() => preview.classList.add("loaded"), 50);
                    generateBtn.disabled = false;
                };
                preview.onerror = () => {
                    loader.style.display = "none";
                    placeholder.style.display = "flex";
                    placeholder.querySelector("p").textContent = "Dynamic generation failed. Please check internet connection and try again.";
                    generateBtn.disabled = false;
                };
            }, 2500); // simulation delay
        });

    } else if (tool.category === "code") {
        // Code Playground UI
        playgroundContainer.innerHTML = `
            <div style="display:flex; flex-direction:column; height:100%; padding:1rem; gap:0.75rem;">
                <div style="display:grid; grid-template-rows: 1fr 1fr; gap:0.75rem; flex:1;">
                    <textarea class="form-control" id="code-input" style="font-family:monospace; font-size:0.85rem; background:rgba(0,0,0,0.3); resize:none;" placeholder="// Write your code snippet here...\nfunction add(a, b) {\n    return a + b;\n}"></textarea>
                    <div id="code-output" style="background:rgba(255,255,255,0.03); border:1px solid var(--border-glass); border-radius:8px; padding:0.75rem; font-family:monospace; font-size:0.85rem; color:var(--text-muted); overflow-y:auto; white-space:pre-wrap;">
// AI Analysis will print here...
                    </div>
                </div>
                <div style="display:flex; gap:0.5rem; justify-content:flex-end;">
                    <button class="btn-secondary" id="code-explain" style="padding:0.5rem 1rem;">
                        <i data-lucide="help-circle" style="width:14px; height:14px;"></i> Explain Code
                    </button>
                    <button class="btn-primary" id="code-optimize" style="padding:0.5rem 1rem;">
                        <i data-lucide="zap" style="width:14px; height:14px;"></i> Refactor & Optimize
                    </button>
                </div>
            </div>
        `;

        const codeInput = document.getElementById("code-input");
        const codeOutput = document.getElementById("code-output");
        const btnExplain = document.getElementById("code-explain");
        const btnOptimize = document.getElementById("code-optimize");

        const processCode = (mode) => {
            const code = codeInput.value.trim();
            if (!code) {
                alert("Please write some code inside the editor first!");
                return;
            }

            codeOutput.innerHTML = `<span style="display:inline-flex; gap:3px;"><span class="spinner" style="width:10px; height:10px; border-width:2px; border-top-color:transparent;"></span> Analyzing AST & processing...</span>`;
            
            setTimeout(() => {
                if (playgroundMode === "live" && geminiApiKey) {
                    const promptText = mode === "explain"
                        ? `Analyze and explain this snippet in detail:\n\n\`\`\`\n${code}\n\`\`\``
                        : `Optimize and refactor this code snippet. Explain the improvements and provide the optimized code block:\n\n\`\`\`\n${code}\n\`\`\``;
                        
                    callGeminiAPI(tool, promptText, (response) => {
                        codeOutput.innerHTML = response;
                    });
                } else {
                    codeOutput.innerHTML = getSmartSimulatedCodeResponse(tool, code, mode);
                }
            }, 1200);
        };

        btnExplain.addEventListener("click", () => processCode("explain"));
        btnOptimize.addEventListener("click", () => processCode("refactor"));

    } else if (tool.category === "audio") {
        // Audio Synthesizer UI using browser Web Audio API + SpeechSynthesis
        playgroundContainer.innerHTML = `
            <div class="static-playground" style="padding: 1.5rem;">
                <i data-lucide="waves" class="static-icon" id="audio-wave-icon" style="color:var(--cyan);"></i>
                <div style="font-family:var(--font-heading); font-size:1.1rem; font-weight:600;">Neural TTS & Vocoder Playground</div>
                <p style="font-size:0.85rem; color:var(--text-muted); max-width:280px; margin:-5px auto 10px;">Enter a phrase, select a voice print, and synthesize output audio.</p>
                
                <input type="text" id="audio-speech-text" class="form-control" style="width:100%; text-align:center;" value="Exploring the future of artificial neural sound synthesis.">
                
                <div style="display:grid; grid-template-columns: 1fr; gap:0.5rem; width:100%; margin-top:5px;">
                    <select id="audio-voice" class="image-select" style="width:100%;">
                        <!-- Populated dynamically -->
                    </select>
                </div>
                <button class="btn-primary" id="audio-speak-btn" style="justify-content:center; width:100%; margin-top:0.5rem;">
                    <i data-lucide="play" style="width:16px; height:16px;"></i> Play Audio
                </button>
            </div>
        `;

        const btnSpeak = document.getElementById("audio-speak-btn");
        const voiceSelect = document.getElementById("audio-voice");
        const waveIcon = document.getElementById("audio-wave-icon");
        const speechInput = document.getElementById("audio-speech-text");

        const populateVoices = () => {
            const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
            voiceSelect.innerHTML = "";
            
            if (voices.length === 0) {
                // Presets if not loaded yet
                voiceSelect.innerHTML = `
                    <option value="male" data-pitch="0.7">Deep Male Synth</option>
                    <option value="female" data-pitch="1.4">High Pitch Female Synth</option>
                    <option value="cyber" data-pitch="0.2">Cosmic Cyber Sweep</option>
                `;
            } else {
                voices.forEach((voice, index) => {
                    const option = document.createElement("option");
                    option.value = index;
                    option.textContent = `${voice.name} (${voice.lang})`;
                    voiceSelect.appendChild(option);
                });
            }
        };

        populateVoices();
        if (window.speechSynthesis && window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = populateVoices;
        }

        btnSpeak.addEventListener("click", () => {
            const phrase = speechInput.value.trim() || "Exploring sound synthesis.";
            btnSpeak.disabled = true;
            waveIcon.style.animation = "float 0.3s ease-in-out infinite alternate";
            
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(phrase);
                const selectedVal = voiceSelect.value;
                const voices = window.speechSynthesis.getVoices();

                let pitchMultiplier = 1.0;

                if (voices.length > 0 && selectedVal !== "" && !isNaN(selectedVal)) {
                    utterance.voice = voices[parseInt(selectedVal)];
                    // set pitch estimate based on voice name for Web Audio sync
                    if (utterance.voice.name.toLowerCase().includes("male") || utterance.voice.name.toLowerCase().includes("david")) {
                        pitchMultiplier = 0.6;
                    } else if (utterance.voice.name.toLowerCase().includes("female") || utterance.voice.name.toLowerCase().includes("zira")) {
                        pitchMultiplier = 1.4;
                    }
                } else {
                    if (selectedVal === "male") {
                        utterance.pitch = 0.7;
                        utterance.rate = 0.9;
                        pitchMultiplier = 0.7;
                    } else if (selectedVal === "female") {
                        utterance.pitch = 1.4;
                        utterance.rate = 1.0;
                        pitchMultiplier = 1.4;
                    } else if (selectedVal === "cyber") {
                        utterance.pitch = 0.3;
                        utterance.rate = 0.75;
                        pitchMultiplier = 0.3;
                    }
                }

                utterance.onend = () => {
                    btnSpeak.disabled = false;
                    waveIcon.style.animation = "float 3s ease-in-out infinite";
                };
                utterance.onerror = () => {
                    btnSpeak.disabled = false;
                    waveIcon.style.animation = "float 3s ease-in-out infinite";
                };

                window.speechSynthesis.speak(utterance);
                
                // Play Web Audio sweep in parallel
                playWebAudioSynth(pitchMultiplier);
            } else {
                // Fallback to oscillator sweep only
                playWebAudioSynth(1.0, () => {
                    btnSpeak.disabled = false;
                    waveIcon.style.animation = "float 3s ease-in-out infinite";
                });
            }
        });

    } else if (tool.category === "video") {
        // Video Sandbox UI
        playgroundContainer.innerHTML = `
            <div style="display:flex; flex-direction:column; height:100%; padding:1rem; gap:0.75rem; text-align:center;">
                <div style="flex:1; background:rgba(0,0,0,0.3); border-radius:8px; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center;" id="video-preview-container">
                    <div id="video-placeholder" style="color:var(--text-muted); font-size:0.85rem;">
                        <i data-lucide="video" style="width:36px; height:36px; margin:0 auto 10px; color:rgba(255,255,255,0.1); display:block;"></i>
                        Render a short 4s simulated dynamic video clip.
                    </div>
                    <video id="video-rendered" style="width:100%; height:100%; object-fit:cover; display:none;" loop muted autoplay playsinline></video>
                    <div class="image-loader" id="video-loader" style="display:none; flex-direction:column; align-items:center; gap:0.5rem;">
                        <div class="spinner"></div>
                        <div style="font-size:0.8rem; color:var(--text-muted);">Synthesizing Motion Interpolation...</div>
                    </div>
                </div>
                <div style="display:flex; gap:0.5rem;">
                    <input type="text" id="video-prompt" class="form-control" style="flex:1;" placeholder="A dynamic fly-through of an ancient neon library...">
                    <button class="btn-primary" id="video-generate-btn" style="padding:0.5rem 1rem;">
                        <i data-lucide="film" style="width:16px; height:16px;"></i> Render
                    </button>
                </div>
            </div>
        `;

        const renderBtn = document.getElementById("video-generate-btn");
        const promptInput = document.getElementById("video-prompt");
        const placeholder = document.getElementById("video-placeholder");
        const video = document.getElementById("video-rendered");
        const loader = document.getElementById("video-loader");

        renderBtn.addEventListener("click", () => {
            const promptVal = promptInput.value.trim();
            if (!promptVal) {
                alert("Please enter a video prompt first!");
                return;
            }

            placeholder.style.display = "none";
            video.style.display = "none";
            loader.style.display = "flex";
            renderBtn.disabled = true;

            setTimeout(() => {
                loader.style.display = "none";
                video.style.display = "block";
                
                const norm = promptVal.toLowerCase();
                let videoUrl = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054f4d823ef21f2070d6217e8d356ab&profile_id=139&oauth2_token_id=57447761"; // space tunnel default
                
                if (norm.includes("nature") || norm.includes("forest") || norm.includes("mountain") || norm.includes("river") || norm.includes("water")) {
                    videoUrl = "https://player.vimeo.com/external/434045526.sd.mp4?s=c3a23e594d51ec1b1f1f335359a1801264c1b965&profile_id=165&oauth2_token_id=57447761"; // forest waterfall
                } else if (norm.includes("cyberpunk") || norm.includes("city") || norm.includes("tokyo") || norm.includes("neon") || norm.includes("rain") || norm.includes("future")) {
                    videoUrl = "https://player.vimeo.com/external/498877543.sd.mp4?s=d00e7ee6b5cfef3c8d1796d88cfdc7c126ecf06b&profile_id=165&oauth2_token_id=57447761"; // neon city Tokyo night walk
                } else if (norm.includes("network") || norm.includes("particle") || norm.includes("robot") || norm.includes("ai") || norm.includes("node") || norm.includes("connection")) {
                    videoUrl = "https://player.vimeo.com/external/435674703.sd.mp4?s=7f26d24660d5bfa4e015d911b3337a77e0996843&profile_id=165&oauth2_token_id=57447761"; // digital network nodes
                }

                video.src = videoUrl;
                video.play();
                
                renderBtn.disabled = false;
            }, 3000);
        });
    }
}

// Live Gemini API client connection
async function callGeminiAPI(tool, promptText, callback) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;
    
    // Build context
    const systemContext = `You are simulated as the model "${tool.name}" developed by "${tool.provider}" inside the AILink console sandbox. 
    Role description: ${tool.desc}
    Keep your response clean, highly detailed, structured, formatted in HTML/markdown, and match the personality/tone of the model if applicable.
    Keep it relatively concise (under 300 words). Do not output device markdown wrappers other than regular inline highlights, tables, lists, and code blocks.`;

    const payload = {
        contents: [
            {
                role: "user",
                parts: [{ text: `${systemContext}\n\nUser Prompt: ${promptText}` }]
            }
        ],
        generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.7
        }
    };

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText || `HTTP Status ${res.status}`);
        }

        const data = await res.json();
        let aiResponse = "";
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
            aiResponse = data.candidates[0].content.parts[0].text;
        } else {
            aiResponse = "Received empty response from the Gemini API.";
        }

        // Format Markdown response to HTML
        callback(formatMarkdownResponse(aiResponse));

    } catch (error) {
        console.error("Gemini API Error:", error);
        callback(`<span style="color:var(--pink);"><strong>API Error:</strong> Failed to get response from Gemini API (Details: ${error.message}).<br><br>Falling back to simulated sandbox response.</span><br><br>` + getSimulatedModelResponse(tool.id, promptText));
    }
}

// Helper: Basic Markdown to HTML renderer
function formatMarkdownResponse(text) {
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    formatted = formatted.replace(/```javascript([\s\S]*?)```/g, '<pre style="background:rgba(0,0,0,0.35); padding:10px; border-radius:6px; font-family:monospace; margin:8px 0; overflow-x:auto; border:1px solid var(--border-glass);"><code>$1</code></pre>');
    formatted = formatted.replace(/```python([\s\S]*?)```/g, '<pre style="background:rgba(0,0,0,0.35); padding:10px; border-radius:6px; font-family:monospace; margin:8px 0; overflow-x:auto; border:1px solid var(--border-glass);"><code>$1</code></pre>');
    formatted = formatted.replace(/```html([\s\S]*?)```/g, '<pre style="background:rgba(0,0,0,0.35); padding:10px; border-radius:6px; font-family:monospace; margin:8px 0; overflow-x:auto; border:1px solid var(--border-glass);"><code>$1</code></pre>');
    formatted = formatted.replace(/```css([\s\S]*?)```/g, '<pre style="background:rgba(0,0,0,0.35); padding:10px; border-radius:6px; font-family:monospace; margin:8px 0; overflow-x:auto; border:1px solid var(--border-glass);"><code>$1</code></pre>');
    formatted = formatted.replace(/```([\s\S]*?)```/g, '<pre style="background:rgba(0,0,0,0.25); padding:10px; border-radius:6px; font-family:monospace; margin:8px 0; overflow-x:auto; border:1px solid var(--border-glass);"><code>$1</code></pre>');
    formatted = formatted.replace(/`(.*?)`/g, '<code style="background:rgba(255,255,255,0.08); padding:2px 5px; border-radius:4px; font-family:monospace;">$1</code>');
    formatted = formatted.replace(/^\s*\*\s+(.*?)$/gm, '<li>$1</li>');
    formatted = formatted.replace(/(<li>.*?<\/li>)/g, '<ul style="padding-left:16px; margin:8px 0;">$1</ul>');
    formatted = formatted.replace(/\n/g, '<br>');
    return formatted;
}

// Helper: Smart simulated code analyzer based on AST approximations
function getSmartSimulatedCodeResponse(tool, code, mode) {
    let detectedLanguage = "JavaScript";
    if (code.includes("def ") || code.includes("import ") || code.includes("print(")) {
        detectedLanguage = "Python";
    } else if (code.includes("public class ") || code.includes("System.out")) {
        detectedLanguage = "Java";
    } else if (code.includes("#include") || code.includes("std::")) {
        detectedLanguage = "C++";
    } else if (code.includes("<html>") || code.includes("<div>")) {
        detectedLanguage = "HTML/CSS";
    }

    let functionName = "anonymous block";
    const fnMatch = code.match(/(?:function|const|let|def|class)\s+([a-zA-Z0-9_$]+)/);
    if (fnMatch && fnMatch[1]) {
        functionName = `"${fnMatch[1]}()"`;
    }

    let complexity = "O(1) Constant Time";
    if (code.includes("for ") || code.includes("while ") || code.includes(".forEach") || code.includes(".map")) {
        complexity = "O(N) Linear Time";
        if (code.match(/(?:for|while).*[\s\S]*?(?:for|while)/)) {
            complexity = "O(N²) Quadratic Time (Nested Loop detected)";
        }
    }

    if (mode === "explain") {
        return `<strong>${tool.name} Offline Analysis (${detectedLanguage}):</strong><br><br>` +
            `1. <strong>Functionality</strong>: This snippet outlines the execution of ${functionName} logic operating within modern runtime architectures.<br>` +
            `2. <strong>Logical Overview</strong>: Using a structured schema, variables are parsed and validated on execution. The logic is optimized for ${detectedLanguage} scope bounds.<br>` +
            `3. <strong>Algorithmic Complexity</strong>: Estimated time complexity is <strong>${complexity}</strong>, space complexity is <strong>O(1)</strong>.<br><br>` +
            `<em>Tip: Configure your Gemini API Key in the settings for real-time generative dynamic code explanations!</em>`;
    } else {
        let refactoredCode = "";
        if (detectedLanguage === "JavaScript") {
            refactoredCode = `// Refactored JavaScript arrow equivalent for ${functionName}\nconst ${functionName.replace(/"/g, '').replace(/\(\)/g, '') || 'processData'} = (data) => {\n    if (!data) return [];\n    // Remove duplicate items safely in O(N) time\n    return Array.isArray(data) ? [...new Set(data)] : [data];\n};`;
        } else if (detectedLanguage === "Python") {
            refactoredCode = `# Refactored Pythonic equivalent for ${functionName}\ndef ${functionName.replace(/"/g, '').replace(/\(\)/g, '') || 'process_data'}(data):\n    if not data:\n        return []\n    # Deduplicate in linear time\n    return list(set(data)) if isinstance(data, (list, tuple)) else [data]`;
        } else {
            refactoredCode = `// Optimized structural refactor\n// Simplifies operations and screens variables`;
        }

        return `<strong>${tool.name} Offline Refactoring Recommendations:</strong><br><br>` +
            `<pre style="background:rgba(0,0,0,0.35); padding:10px; border-radius:6px; font-family:monospace; margin:8px 0; overflow-x:auto; border:1px solid var(--border-glass);"><code>${refactoredCode}</code></pre><br>` +
            `- **Functional Upgrades**: Upgraded block syntax to modern modular standard, added null safety guard rails, and replaced hash deduplication for optimized runtime complexity.`;
    }
}

// Simulated Model Responses logic
function getSimulatedModelResponse(id, prompt) {
    const normPrompt = prompt.toLowerCase();
    
    // Coding questions
    if (normPrompt.includes("code") || normPrompt.includes("function") || normPrompt.includes("program") || normPrompt.includes("write a script")) {
        if (id === "claude") {
            return `Here is a clean, optimized JavaScript utility to accomplish this. 
\`\`\`javascript
/**
 * Processes dataset arrays safely.
 * @param {Array} arr - Input dataset.
 * @returns {Array} Unique, filtered dataset.
 */
function processData(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('Input must be a valid array');
    }
    return [...new Set(arr.filter(Boolean))];
}
\`\`\`
<strong>Explanation:</strong> This implementation uses strict input checking, screens out null/falsy values using \`.filter(Boolean)\`, and utilizes a \`Set\` construct to secure unique values in linear O(N) performance complexity. Let me know if you would like me to rewrite it in TypeScript.`;
        }
        if (id === "gemini") {
            return `Sure! Let's build a clean, efficient script! 🚀 Here is what you need:

\`\`\`javascript
// Efficient filter & deduplication utility
const cleanArray = (data) => {
  // Validate input type
  if (!data) return [];
  
  // Strip duplicates & falsy values in one line
  return Array.from(new Set(data)).filter(item => !!item);
};
\`\`\`

**Why this works well:**
* Uses ES6 modern arrow syntax
* \`new Set()\` leverages fast hash-lookup to remove duplicates instantly
* Highly readable and ready to drop into any project!

Let me know if you want to extend this with sorting or custom filter callbacks! ✌️`;
        }
        // Default GPT-4
        return `Here is a concise implementation for your request:

\`\`\`javascript
function sanitizeAndDeduplicate(array) {
  return array.filter((value, index, self) => {
    return value && self.indexOf(value) === index;
  });
}
\`\`\`

This function filters out duplicate values and removes any null, undefined, or empty elements. It runs directly in all modern JavaScript runtimes. Let me know if you require any modifications or need to integrate it with an API.`;
    }

    // Spec/Identity questions
    if (normPrompt.includes("who are you") || normPrompt.includes("your name") || normPrompt.includes("model details")) {
        if (id === "claude") {
            return `I am <strong>Claude 3.5 Sonnet</strong>, a large language model trained by Anthropic. I am engineered to be safe, helpful, and highly accurate, with specialized training in programming, semantic analysis, and long-form document indexing.`;
        }
        if (id === "gemini") {
            return `Hey there! I'm <strong>Gemini 1.5 Pro</strong>, a multimodal AI model built by Google! 🌟 I'm powered by Google's native multimodal architecture, meaning I can parse text, images, video, and audio file tokens all at once! Plus, I have an ultra-long context window to process massive chunks of data! How can I help you build today?`;
        }
        return `I am <strong>GPT-4o</strong>, OpenAI's flagship multimodal model. I am designed to process textual and visual inputs simultaneously, optimized for highly conversational flows, quick reasoning, and versatile tasks.`;
    }

    // Default responses based on persona
    if (id === "claude") {
        return `I have analyzed your input: "${prompt}". 

From an analytical standpoint, this involves looking at the context and optimizing for accuracy. I would advise structuring the concept into separate manageable units. 

If this represents a larger project, please provide more structural requirements, and I will outline a formal specification document for you.`;
    }
    
    if (id === "gemini") {
        return `That is a super interesting prompt! 🌟 Here is a quick breakdown of how we can approach this:

* **Step 1:** Establish clear core objectives.
* **Step 2:** Formulate custom variables and adjust context bounds.
* **Step 3:** Optimize!

I'd love to explore this further with you. What specific angle should we focus on next? 🎨`;
    }

    // ChatGPT Default
    return `That's an interesting question. Here's a quick summary to help clarify:
    
- **Context**: The inquiry relates directly to general operations.
- **Key Factor**: Optimization of prompt design often yields better results.
- **Next Step**: Try adding specific constraints like target audience, formatting constraints, or length constraints.

Let me know if you want me to expand on any of these points!`;
}

// Simulated Images database matching keywords (kept as emergency fallback)
function getSimulatedImageUrl(prompt, style) {
    const norm = prompt.toLowerCase();
    
    // Core categories keyword mapping
    let keyword = "landscape";
    if (norm.includes("cyberpunk") || norm.includes("neon") || norm.includes("future")) {
        keyword = "cyberpunk";
    } else if (norm.includes("space") || norm.includes("galaxy") || norm.includes("stars")) {
        keyword = "space";
    } else if (norm.includes("robot") || norm.includes("android") || norm.includes("cyborg") || norm.includes("ai")) {
        keyword = "robot";
    } else if (norm.includes("cat") || norm.includes("kitten") || norm.includes("dog") || norm.includes("animal")) {
        keyword = "cat";
    } else if (norm.includes("forest") || norm.includes("tree") || norm.includes("nature") || norm.includes("mountain")) {
        keyword = "forest";
    } else if (norm.includes("city") || norm.includes("building") || norm.includes("tokyo") || norm.includes("ny")) {
        keyword = "city";
    } else if (norm.includes("anime") || norm.includes("art") || norm.includes("character") || norm.includes("girl") || norm.includes("boy")) {
        keyword = "anime";
    }

    const styleMap = {
        photorealistic: {
            cyberpunk: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80",
            space: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
            robot: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80",
            cat: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80",
            forest: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80",
            city: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&auto=format&fit=crop&q=80",
            anime: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80",
            landscape: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80"
        },
        cyberpunk: {
            cyberpunk: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=600&auto=format&fit=crop&q=80",
            space: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=600&auto=format&fit=crop&q=80",
            robot: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&auto=format&fit=crop&q=80",
            cat: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&auto=format&fit=crop&q=80",
            forest: "https://images.unsplash.com/photo-1511497584788-876760111969?w=600&auto=format&fit=crop&q=80",
            city: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
            anime: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80",
            landscape: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&auto=format&fit=crop&q=80"
        },
        anime: {
            cyberpunk: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80",
            space: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
            robot: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&auto=format&fit=crop&q=80",
            cat: "https://images.unsplash.com/photo-1574158622643-69d34d72650a?w=600&auto=format&fit=crop&q=80",
            forest: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600&auto=format&fit=crop&q=80",
            city: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&auto=format&fit=crop&q=80",
            anime: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80",
            landscape: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&auto=format&fit=crop&q=80"
        },
        oilpainting: {
            cyberpunk: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&auto=format&fit=crop&q=80",
            space: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=80",
            robot: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&auto=format&fit=crop&q=80",
            cat: "https://images.unsplash.com/photo-1579783928621-7a13d66a6211?w=600&auto=format&fit=crop&q=80",
            forest: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format&fit=crop&q=80",
            city: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=600&auto=format&fit=crop&q=80",
            anime: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80",
            landscape: "https://images.unsplash.com/photo-1547891654-e66ed7edd96c?w=600&auto=format&fit=crop&q=80"
        },
        sketch: {
            cyberpunk: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80",
            space: "https://images.unsplash.com/photo-1454117096348-e4abbeae002c?w=600&auto=format&fit=crop&q=80",
            robot: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop&q=80",
            cat: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&auto=format&fit=crop&q=80",
            forest: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&auto=format&fit=crop&q=80",
            city: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
            anime: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
            landscape: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80"
        }
    };

    return styleMap[style][keyword] || styleMap.photorealistic.landscape;
}

// Actual Audio Synth logic utilizing Web Audio API
function playWebAudioSynth(pitchMultiplier, callback) {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        window.audioContext = ctx; // Track context for manual close operations

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        // Sound parameters
        const duration = 1.8; // 1.8s sound
        const now = ctx.currentTime;

        // Custom pitch frequency sequences
        osc.type = "sine";
        osc.frequency.setValueAtTime(150 * pitchMultiplier, now);
        osc.frequency.exponentialRampToValueAtTime(380 * pitchMultiplier, now + 0.4);
        osc.frequency.exponentialRampToValueAtTime(260 * pitchMultiplier, now + 0.8);
        osc.frequency.exponentialRampToValueAtTime(520 * pitchMultiplier, now + 1.4);

        // Gain Envelope (adsr approximation)
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.15, now + 0.8);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.start(now);
        osc.stop(now + duration);

        setTimeout(() => {
            ctx.close();
            window.audioContext = null;
            if (callback) callback();
        }, duration * 1000);

    } catch (e) {
        console.error("Web Audio API not supported or user gesture required", e);
        if (callback) callback();
    }
}

// Utility: Map short categories code to human strings
function getFullCategoryName(cat) {
    const names = {
        chat: "Chat & Language Processing",
        image: "Text-To-Image Synthesis",
        code: "Source Code Automation & IDEs",
        audio: "Neural Voice Synth & Soundscapes",
        video: "Temporal Motion & Video Diffusion"
    };
    return names[cat] || "Artificial Intelligence Tool";
}

// Utility: Create harmonious colors from string hashes
function getGradientForString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const h1 = Math.abs(hash % 360);
    const h2 = (h1 + 45) % 360;
    
    return {
        c1: `hsl(${h1}, 70%, 55%)`,
        c2: `hsl(${h2}, 80%, 45%)`
    };
}
