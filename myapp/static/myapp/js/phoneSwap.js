window.openWhatsAppPopup = function (sellerName, sellerNumber) {
    const nameEl = document.getElementById("popupSellerName");
    const numberEl = document.getElementById("popupSellerNumber");
    const linkEl = document.getElementById("popupSellerLink");
    const popup = document.getElementById("whatsappPopup");

    if (nameEl) nameEl.innerText = sellerName || "";
    if (numberEl) numberEl.innerText = sellerNumber ? "📞 " + sellerNumber : "";
    if (linkEl)
        linkEl.href = sellerNumber
            ? "https://wa.me/" + sellerNumber.replace("+", "")
            : "#";
    if (popup) popup.classList.remove("hidden");
};

window.togglePopup = function () {
    const popup = document.getElementById("whatsappPopup");
    if (popup) popup.classList.add("hidden");
};

function getPhoneDatabase() {
    return {
        iPhone: {
            "iPhone 7": ["32GB", "128GB", "256GB"],
            "iPhone 7 Plus": ["32GB", "128GB", "256GB"],

            "iPhone 8": ["64GB", "128GB", "256GB"],
            "iPhone 8 Plus": ["64GB", "128GB", "256GB"],

            "iPhone X": ["64GB", "256GB"],
            "iPhone XR": ["64GB", "128GB", "256GB"],
            "iPhone XS": ["64GB", "256GB", "512GB"],
            "iPhone XS Max": ["64GB", "256GB", "512GB"],

            "iPhone 11": ["64GB", "128GB", "256GB"],
            "iPhone 11 Pro": ["64GB", "256GB", "512GB"],
            "iPhone 11 Pro Max": ["64GB", "256GB", "512GB"],

            "iPhone SE (2nd generation)": ["64GB", "128GB", "256GB"], // 2020

            "iPhone 12 mini": ["64GB", "128GB", "256GB"],
            "iPhone 12": ["64GB", "128GB", "256GB"],
            "iPhone 12 Pro": ["128GB", "256GB", "512GB"],
            "iPhone 12 Pro Max": ["128GB", "256GB", "512GB"],

            "iPhone 13 mini": ["128GB", "256GB", "512GB"],
            "iPhone 13": ["128GB", "256GB", "512GB"],
            "iPhone 13 Pro": ["128GB", "256GB", "512GB", "1TB"],
            "iPhone 13 Pro Max": ["128GB", "256GB", "512GB", "1TB"],

            "iPhone SE (3rd generation)": ["64GB", "128GB", "256GB"], // 2022

            "iPhone 14": ["128GB", "256GB", "512GB"],
            "iPhone 14 Plus": ["128GB", "256GB", "512GB"],
            "iPhone 14 Pro": ["128GB", "256GB", "512GB", "1TB"],
            "iPhone 14 Pro Max": ["128GB", "256GB", "512GB", "1TB"],

            "iPhone 15": ["128GB", "256GB", "512GB"],
            "iPhone 15 Plus": ["128GB", "256GB", "512GB"],
            "iPhone 15 Pro": ["128GB", "256GB", "512GB", "1TB"],
            "iPhone 15 Pro Max": ["256GB", "512GB", "1TB"], // No 128GB option

            "iPhone 16": ["128GB", "256GB", "512GB"], // 2024 models
            "iPhone 16 Plus": ["128GB", "256GB", "512GB"],
            "iPhone 16 Pro": ["128GB", "256GB", "512GB", "1TB"],
            "iPhone 16 Pro Max": ["256GB", "512GB", "1TB"], // Same as 15 Pro Max
        },
        Samsung: {
            S: {
                "Galaxy S7": ["32GB"],
                "Galaxy S7 Edge": ["32GB"],
                "Galaxy S8": ["64GB"],
                "Galaxy S8+": ["64GB"],
                "Galaxy S8 Active": ["64GB"],
                "Galaxy S9": ["64GB", "128GB", "256GB"],
                "Galaxy S9+": ["64GB", "128GB", "256GB"],
                "Galaxy S10e": ["128GB", "256GB"],
                "Galaxy S10": ["128GB", "512GB"],
                "Galaxy S10+": ["128GB", "512GB", "1TB"],
                "Galaxy S10 5G": ["256GB", "512GB"],
                "Galaxy S20": ["128GB"],
                "Galaxy S20+": ["128GB", "512GB"],
                "Galaxy S20 Ultra": ["128GB", "256GB", "512GB"],
                "Galaxy S20 FE": ["128GB", "256GB"],
                "Galaxy S21": ["128GB", "256GB"],
                "Galaxy S21+": ["128GB", "256GB"],
                "Galaxy S21 Ultra": ["128GB", "256GB", "512GB"],
                "Galaxy S21 FE": ["128GB", "256GB"],
                "Galaxy S22": ["128GB", "256GB"],
                "Galaxy S22+": ["128GB", "256GB"],
                "Galaxy S22 Ultra": ["128GB", "256GB", "512GB", "1TB"],
                "Galaxy S23": ["128GB", "256GB"],
                "Galaxy S23+": ["256GB", "512GB"],
                "Galaxy S23 Ultra": ["256GB", "512GB", "1TB"],
                "Galaxy S24": ["128GB", "256GB"],
                "Galaxy S24+": ["256GB", "512GB"],
                "Galaxy S24 Ultra": ["256GB", "512GB", "1TB"],
            },
            Z: {
                "Galaxy Z Fold": ["512GB"],
                "Galaxy Z Flip": ["256GB"],
                "Galaxy Z Fold2": ["256GB", "512GB"],
                "Galaxy Z Flip 5G": ["256GB"],
                "Galaxy Z Fold3": ["256GB", "512GB"],
                "Galaxy Z Flip3": ["128GB", "256GB"],
                "Galaxy Z Fold4": ["256GB", "512GB", "1TB"],
                "Galaxy Z Flip4": ["128GB", "256GB", "512GB"],
                "Galaxy Z Fold5": ["256GB", "512GB", "1TB"],
                "Galaxy Z Flip5": ["256GB", "512GB"],
                "Galaxy Z Fold6": ["256GB", "512GB", "1TB"],
                "Galaxy Z Flip6": ["256GB", "512GB"],
            },
            A: {
                "Galaxy A3": ["16GB"],
                "Galaxy A5": ["32GB"],
                "Galaxy A7": ["32GB", "64GB"],
                "Galaxy A8": ["32GB", "64GB"],
                "Galaxy A8+": ["32GB", "64GB"],
                "Galaxy A9": ["64GB", "128GB"],
                "Galaxy A10": ["32GB"],
                "Galaxy A20": ["32GB", "64GB"],
                "Galaxy A30": ["32GB", "64GB"],
                "Galaxy A40": ["64GB"],
                "Galaxy A50": ["64GB", "128GB"],
                "Galaxy A60": ["64GB", "128GB"],
                "Galaxy A70": ["64GB", "128GB"],
                "Galaxy A80": ["128GB"],
                "Galaxy A90": ["128GB"],
                "Galaxy A11": ["32GB", "64GB"],
                "Galaxy A21": ["32GB", "64GB"],
                "Galaxy A31": ["64GB", "128GB"],
                "Galaxy A41": ["64GB", "128GB"],
                "Galaxy A51": ["64GB", "128GB", "256GB"],
                "Galaxy A71": ["128GB", "256GB"],
                "Galaxy A12": ["32GB", "64GB", "128GB"],
                "Galaxy A22": ["64GB", "128GB"],
                "Galaxy A32": ["64GB", "128GB"],
                "Galaxy A42": ["128GB"],
                "Galaxy A52": ["128GB", "256GB"],
                "Galaxy A72": ["128GB", "256GB"],
                "Galaxy A13": ["32GB", "64GB", "128GB"],
                "Galaxy A23": ["64GB", "128GB"],
                "Galaxy A33": ["128GB"],
                "Galaxy A53": ["128GB", "256GB"],
                "Galaxy A73": ["128GB", "256GB"],
                "Galaxy A14": ["64GB", "128GB"],
                "Galaxy A24": ["128GB", "256GB"],
                "Galaxy A34": ["128GB", "256GB"],
                "Galaxy A54": ["128GB", "256GB"],
                "Galaxy A15": ["64GB", "128GB"],
                "Galaxy A25": ["128GB", "256GB"],
                "Galaxy A35": ["128GB", "256GB"],
                "Galaxy A55": ["128GB", "256GB"],
            },
        },
        Pixel: {
            "Pixel 5": ["128GB"],
            "Pixel 5a 5G": ["128GB"],
            "Pixel 6": ["128GB", "256GB"],
            "Pixel 6 Pro": ["128GB", "256GB", "512GB"],
            "Pixel 6a": ["128GB"],
            "Pixel 7": ["128GB", "256GB"],
            "Pixel 7 Pro": ["128GB", "256GB", "512GB"],
            "Pixel 7a": ["128GB"],
            "Pixel 8": ["128GB", "256GB"],
            "Pixel 8 Pro": ["128GB", "256GB", "512GB"],
            "Pixel 8a": ["128GB"],
            "Pixel 9": ["128GB", "256GB"],
            "Pixel 9 Pro": ["128GB", "256GB", "512GB"],
            "Pixel 9 Pro XL": ["256GB", "512GB"],
            "Pixel 9 Pro Fold": ["256GB", "512GB", "1TB"],
        },
        Infinix: {
            Note: {
                "Infinix Note 7": ["64GB", "128GB"],
                "Infinix Note 8": ["64GB", "128GB"],
                "Infinix Note 10": ["64GB", "128GB", "256GB"],
                "Infinix Note 11": ["64GB", "128GB", "256GB"],
                "Infinix Note 12": ["64GB", "128GB", "256GB"],
                "Infinix Note 40": ["128GB", "256GB"],
                "Infinix Note 40 Pro": ["256GB"],
                "Infinix Note 50": ["128GB", "256GB"],
                "Infinix Note 50 Pro": ["256GB"],
            },

            Hot: {
                "Infinix Hot 9 Pro": ["64GB", "128GB"],
                "Infinix Hot 40 Pro": ["128GB", "256GB"],
                "Infinix Hot 50i": ["128GB"],
                "Infinix Hot 50 Pro+": ["128GB", "256GB"],
                "Infinix Hot 50": ["128GB"],
            },
            GT: {
                "Infinix GT 10 Pro": ["256GB"],
                "Infinix GT 20 Pro": ["256GB"],
                "Infinix GT 30 Pro": ["256GB"],
            },
            Smart: {
                "Infinix Smart 6": ["32GB", "64GB"],
                "Infinix Smart 7": ["64GB"],
                "Infinix Smart 8": ["64GB", "128GB"],
                "Infinix Smart 8 Pro": ["128GB"],
                "Infinix Smart 9": ["128GB"],
            },
        },
        Oppo: {
            Reno: {
                "Oppo Reno 4": ["128GB"],
                "Oppo Reno 4 Pro": ["128GB", "256GB"],
                "Oppo Reno 5": ["128GB"],
                "Oppo Reno 5 Pro": ["128GB", "256GB"],
                "Oppo Reno 6": ["128GB"],
                "Oppo Reno 6 Pro": ["128GB", "256GB"],
            },

            FindX: {
                "Oppo Find X2": ["128GB", "256GB"],
                "Oppo Find X2 Pro": ["256GB", "512GB"],
                "Oppo Find X3": ["128GB", "256GB"],
                "Oppo Find X3 Pro": ["256GB", "512GB"],
                "Oppo Find X5": ["256GB"],
                "Oppo Find X5 Pro": ["256GB", "512GB"],
            },
        },
        Tecno: {
            Spark: {
                "Tecno Spark 8": ["64GB"],
                "Tecno Spark 9": ["64GB", "128GB"],
                "Tecno Spark 10": ["64GB", "128GB"],
            },

            Camon: {
                "Tecno Camon 18": ["128GB"],
                "Tecno Camon 19": ["128GB"],
                "Tecno Camon 19 Pro": ["128GB", "256GB"],
                "Tecno Camon 20": ["128GB"],
                "Tecno Camon 20 Pro": ["128GB", "256GB"],
                "Tecno Camon 20 Premier": ["256GB"],
            },
        },
        itel: {
            A: {
                "itel A58": ["32GB", "64GB"],
                "itel A60": ["32GB", "64GB"],
                "itel A70": ["64GB", "128GB"],
            },

            S: {
                "itel S16": ["32GB"],
                "itel S17": ["32GB", "64GB"],
                "itel S18": ["64GB"],
                "itel S23": ["128GB", "256GB"],
            },

            P: {
                "itel P37": ["32GB", "64GB"],
                "itel P38": ["32GB", "64GB"],
                "itel P40": ["64GB", "128GB"],
            },

            Vision: {
                "itel Vision 1": ["32GB"],
                "itel Vision 2": ["32GB", "64GB"],
                "itel Vision 3": ["32GB", "64GB"],
            },
        },
        Huawei: {
            P: {
                "Huawei P30": ["128GB", "256GB"],
                "Huawei P30 Pro": ["128GB", "256GB", "512GB"],
                "Huawei P40": ["128GB"],
                "Huawei P40 Pro": ["128GB", "256GB", "512GB"],
                "Huawei P50": ["128GB", "256GB"],
                "Huawei P50 Pro": ["128GB", "256GB", "512GB"],
                "Huawei P60": ["128GB", "256GB", "512GB"],
                "Huawei P60 Pro": ["256GB", "512GB"],
            },

            Mate: {
                "Huawei Mate 30": ["128GB", "256GB"],
                "Huawei Mate 30 Pro": ["128GB", "256GB", "512GB"],
                "Huawei Mate 40": ["128GB", "256GB"],
                "Huawei Mate 40 Pro": ["256GB", "512GB"],
                "Huawei Mate 50": ["128GB", "256GB"],
                "Huawei Mate 50 Pro": ["256GB", "512GB"],
                "Huawei Mate 60": ["256GB", "512GB"],
                "Huawei Mate 60 Pro": ["256GB", "512GB", "1TB"],
            },

            Nova: {
                "Huawei Nova 7": ["128GB", "256GB"],
                "Huawei Nova 8": ["128GB", "256GB"],
                "Huawei Nova 9": ["128GB", "256GB"],
                "Huawei Nova 10": ["128GB", "256GB"],
                "Huawei Nova 11": ["128GB", "256GB"],
            },

            Y: {
                "Huawei Y6p": ["32GB", "64GB"],
                "Huawei Y7a": ["64GB", "128GB"],
                "Huawei Y8p": ["128GB"],
                "Huawei Y9a": ["128GB"],
            },
        },
        Xiaomi: {
            Mi: {
                "Xiaomi Mi 10": ["128GB", "256GB"],
                "Xiaomi Mi 10 Pro": ["256GB", "512GB"],
                "Xiaomi Mi 11": ["128GB", "256GB"],
                "Xiaomi Mi 11 Ultra": ["256GB", "512GB"],
                "Xiaomi Mi 12": ["128GB", "256GB"],
                "Xiaomi Mi 12 Pro": ["256GB", "512GB"],
                "Xiaomi Mi 13": ["128GB", "256GB", "512GB"],
                "Xiaomi Mi 13 Pro": ["256GB", "512GB", "1TB"],
                "Xiaomi Mi 14": ["256GB", "512GB", "1TB"],
            },

            Redmi: {
                "Redmi Note 10": ["64GB", "128GB"],
                "Redmi Note 10 Pro": ["64GB", "128GB"],
                "Redmi Note 11": ["64GB", "128GB"],
                "Redmi Note 11 Pro": ["128GB", "256GB"],
                "Redmi Note 12": ["128GB", "256GB"],
                "Redmi Note 12 Pro": ["128GB", "256GB"],
                "Redmi Note 13": ["128GB", "256GB", "512GB"],
                "Redmi K40": ["128GB", "256GB"],
                "Redmi K40 Pro": ["128GB", "256GB", "512GB"],
                "Redmi K50": ["128GB", "256GB", "512GB"],
                "Redmi K60": ["128GB", "256GB", "512GB"],
                "Redmi K60 Pro": ["256GB", "512GB"],
                "Redmi A1": ["32GB"],
                "Redmi A2": ["32GB", "64GB"],
                "Redmi A3": ["64GB", "128GB"],
            },

            Poco: {
                "Poco X3": ["64GB", "128GB"],
                "Poco X3 Pro": ["128GB", "256GB"],
                "Poco X4 Pro": ["128GB", "256GB"],
                "Poco X5": ["128GB", "256GB"],
                "Poco X5 Pro": ["128GB", "256GB"],
                "Poco F3": ["128GB", "256GB"],
                "Poco F4": ["128GB", "256GB"],
                "Poco F5": ["128GB", "256GB"],
                "Poco M3": ["64GB", "128GB"],
                "Poco M4 Pro": ["64GB", "128GB"],
                "Poco M5": ["64GB", "128GB"],
                "Poco M5s": ["64GB", "128GB"],
            },
        },
    };
}

function getSeriesLabels() {
    return {
        Samsung: {
            S: "S Series",
            Z: "Z Series",
            A: "A Series",
            M: "M Series",
        },
        Infinix: {
            Hot: "Hot Series",
            Note: "Note Series",
            Zero: "Zero Series",
            GT: "GT Series",
            Smart: "Smart Series",
        },
        Oppo: {
            FindX: "Find X Series",
            Reno: "Reno Series",
            A: "A Series",
            F: "F Series",
            K: "K Series",
        },
        Tecno: {
            Spark: "Spark Series",
            Camon: "Camon Series",
            Pova: "Pova Series",
        },
        Itel: {
            S: "S Series",
            P: "P Series",
            A: "A Series",
            Vision: "Vision Series",
        },
        Huawei: {
            P: "P Series",
            Mate: "Mate Series",
            Nova: "Nova Series",
        },
        Xiaomi: {
            Redmi: "Note Series",
            Poco: "Poco Series",
            Mi: "Mi Series",
        },
        Redmi: {
            Note: "Redmi Note Series",
            K: "Redmi K Series",
            A: "Redmi A Series",
        },
    };
}

// Initialize Alpine components
document.addEventListener("alpine:init", () => {
    // Global store
    Alpine.store("phoneData", {
        finalValue: { min: 0, max: 0 },
    });

    Alpine.data("phoneSwap", () => ({
        // Basic selection state
        step: 0,
        brand: "",
        series: "",
        model: "",
        storage: "",
        battery: 85,

        // Results state
        chart: null,
        health: { battery: 0, screen: 0, speaker: 0, camera: 0 },
        tips: [],
        finalValue: { min: 0, max: 0 },
        score: 0,
        baseValue: null,
        deduction: { min: 0, max: 0 },
        modelBasePrices: {},

        // Issues list with proper categorization
        issuesList: [
            { key: "noFaceId", label: "No Face ID", tag: "i", state: false },
            { key: "noTrueTone", label: "No True Tone", tag: "i", state: false },
            { key: "touchIdBad", label: "Fingerprint not working", tag: "i", state: false },
            { key: "changedScreen", label: "Changed screen", tag: "i", state: false },
            { key: "changedBattery", label: "Changed battery", tag: "i", state: false },
            { key: "changedCamera", label: "Changed camera", tag: "i", state: false },
            { key: "changedIc", label: "Changed IC", tag: "i", state: false },
            { key: "passcodeLocked", label: "Password locked", tag: "i", state: false },
            { key: "icloudLocked", label: "iCloud locked", tag: "i", state: false },
            { key: "esimLocked", label: "eSIM locked", tag: "i", state: false },
            { key: "simLocked", label: "SIM locked", tag: "i", state: false },
            { key: "icDamaged", label: "Damaged IC", tag: "ai", state: false },
            { key: "speakerBad", label: "Speaker problems", tag: "ai", state: false },
            { key: "cameraDamaged", label: "Damaged camera", tag: "ai", state: false },
            { key: "screenCracked", label: "Cracked screen", tag: "ai", state: false },
            { key: "backCracked", label: "Cracked back", tag: "ai", state: false },
            { key: "bodyScratches", label: "Scratches on body", tag: "ai", state: false },
        ],

        // Filter issues based on brand
        filteredIssues() {
            if (!this.brand) return [];
            if (this.brand === "iPhone") {
                return this.issuesList.filter(i => i.tag === "i" || i.tag === "ai");
            } else {
                return this.issuesList.filter(i => i.tag === "a" || i.tag === "ai");
            }
        },

        // Quick getters
        get isAndroid() {
            return this.brand && this.brand !== "iPhone";
        },

        get displayBattery() {
            return this.isAndroid ? 80 : this.battery;
        },

        // FIXED: Final price calculation
        get finalPrice() {
            if (!this.baseValue) return { min: 0, max: 0 };

            // Start with base value
            let finalMin = this.baseValue.min;
            let finalMax = this.baseValue.max;

            // Apply battery deduction ONLY for iPhones below 80%
            if (!this.isAndroid && this.displayBattery < 80) {
                const batteryFactor = this.displayBattery / 100;
                finalMin = Math.round(finalMin * batteryFactor);
                finalMax = Math.round(finalMax * batteryFactor);
            }

            // Apply issue deductions
            const issueDeductions = {
                noFaceId: -20000, noTrueTone: -8000, touchIdBad: -15000,
                changedScreen: -25000, changedBattery: -12000, changedCamera: -18000,
                changedIc: -30000, passcodeLocked: -10000, icloudLocked: -50000,
                esimLocked: -8000, simLocked: -5000, icDamaged: -35000,
                speakerBad: -7000, cameraDamaged: -15000, screenCracked: -30000,
                backCracked: -20000, bodyScratches: -5000,
            };

            this.issuesList.forEach(issue => {
                if (issue.state && issueDeductions[issue.key]) {
                    finalMin += issueDeductions[issue.key];
                    finalMax += issueDeductions[issue.key];
                }
            });

            // Ensure we don't go below 0
            return {
                min: Math.max(0, finalMin),
                max: Math.max(0, finalMax)
            };
        },

        // FIXED: Repair suggestions
        get repairSuggestions() {
            const suggestions = [];

            // Battery health suggestion - ONLY for iPhones below 80%
            if (this.brand === "iPhone" && this.displayBattery < 80) {
                suggestions.push({
                    label: "Replace battery with genuine part",
                    improvement: 18000,
                    issue: "battery",
                });
            }

            // Screen issues
            if (this.issuesList.find(i => i.key === "screenCracked" && i.state)) {
                suggestions.push({
                    label: "Replace cracked screen with OEM part",
                    improvement: 35000,
                    issue: "screenCracked",
                });
            }

            if (this.issuesList.find(i => i.key === "changedScreen" && i.state)) {
                suggestions.push({
                    label: "Upgrade to original manufacturer screen",
                    improvement: 28000,
                    issue: "changedScreen",
                });
            }

            // Back glass
            if (this.issuesList.find(i => i.key === "backCracked" && i.state)) {
                suggestions.push({
                    label: "Replace back glass",
                    improvement: 22000,
                    issue: "backCracked",
                });
            }

            // Camera issues
            if (this.issuesList.find(i => i.key === "cameraDamaged" && i.state)) {
                suggestions.push({
                    label: "Repair camera system",
                    improvement: 20000,
                    issue: "cameraDamaged",
                });
            }

            if (this.issuesList.find(i => i.key === "changedCamera" && i.state)) {
                suggestions.push({
                    label: "Install original camera module",
                    improvement: 22000,
                    issue: "changedCamera",
                });
            }

            // Face ID & True Tone
            if (this.issuesList.find(i => i.key === "noFaceId" && i.state)) {
                suggestions.push({
                    label: "Repair Face ID system",
                    improvement: 25000,
                    issue: "noFaceId",
                });
            }

            if (this.issuesList.find(i => i.key === "noTrueTone" && i.state)) {
                suggestions.push({
                    label: "Fix True Tone display calibration",
                    improvement: 10000,
                    issue: "noTrueTone",
                });
            }

            // Locks & Security
            if (this.issuesList.find(i => i.key === "icloudLocked" && i.state)) {
                suggestions.push({
                    label: "Remove iCloud activation lock",
                    improvement: 55000,
                    issue: "icloudLocked",
                });
            }

            if (this.issuesList.find(i => i.key === "passcodeLocked" && i.state)) {
                suggestions.push({
                    label: "Remove passcode lock",
                    improvement: 12000,
                    issue: "passcodeLocked",
                });
            }

            // Other issues
            if (this.issuesList.find(i => i.key === "speakerBad" && i.state)) {
                suggestions.push({
                    label: "Replace speaker system",
                    improvement: 8000,
                    issue: "speakerBad",
                });
            }

            if (this.issuesList.find(i => i.key === "bodyScratches" && i.state)) {
                suggestions.push({
                    label: "Professional polishing & refinishing",
                    improvement: 6000,
                    issue: "bodyScratches",
                });
            }

            return suggestions;
        },

        get totalRepairImprovement() {
            return this.repairSuggestions.reduce((total, suggestion) => total + suggestion.improvement, 0);
        },

        get potentialValueAfterRepairs() {
            if (!this.baseValue) return { min: 0, max: 0 };
            return {
                min: this.finalValue.min + this.totalRepairImprovement,
                max: this.finalValue.max + this.totalRepairImprovement,
            };
        },

        // --- INIT ---
        async init() {
            try {
                const cacheBuster = Date.now() + Math.random();
                const res = await fetch("/static/baseprices.json?t=" + cacheBuster, {
                    headers: { "Cache-Control": "no-cache, no-store, must-revalidate", "Pragma": "no-cache", "Expires": "0" }
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const rawPrices = await res.json();
                this.modelBasePrices = this.expandStoragePrices(rawPrices);
            } catch (err) {
                console.error("Failed to load base prices:", err);
                this.modelBasePrices = {};
            }

            this.loadState();
            this.setupWatchers();
        },

        // --- HELPERS ---
        findStoragesForModel(modelName) {
            const db = getPhoneDatabase();
            for (const brandKey of Object.keys(db)) {
                const brandData = db[brandKey];
                if (brandData && brandData[modelName] && Array.isArray(brandData[modelName])) {
                    return brandData[modelName];
                }
                for (const seriesKey of Object.keys(brandData || {})) {
                    const series = brandData[seriesKey];
                    if (series && !Array.isArray(series) && series[modelName] && Array.isArray(series[modelName])) {
                        return series[modelName];
                    }
                }
            }
            return [];
        },

        expandStoragePrices(basePrices) {
            const result = {};
            for (const [model, basePriceRaw] of Object.entries(basePrices || {})) {
                const basePrice = Number(basePriceRaw) || 0;
                const storages = this.findStoragesForModel(model);
                if (!storages || storages.length === 0) continue;
                result[model] = {};
                storages.forEach((storage, idx) => {
                    let price = basePrice;
                    if (idx === 0) {
                        if (storage.startsWith("32GB")) price += 600;
                        else if (storage.startsWith("64GB")) price += 1200;
                    }
                    result[model][storage] = { min: price, max: price + 30000 };
                });
            }
            return result;
        },

        // --- STATE MANAGEMENT ---
        loadState() {
            const saved = localStorage.getItem("phoneSwapState");
            if (!saved) return;
            try {
                const state = JSON.parse(saved);
                this.step = state.step || 0;
                this.brand = state.brand || "";
                this.series = state.series || "";
                this.model = state.model || "";
                this.storage = state.storage || "";
                this.battery = state.battery || 85;
                if (state.issues) {
                    this.issuesList.forEach(issue => {
                        if (state.issues[issue.key] !== undefined) issue.state = state.issues[issue.key];
                    });
                }
                if (this.step === 3) this.finish();
            } catch (e) {
                console.error("Error loading state:", e);
                this.resetAllState();
            }
        },

        resetAllState() {
            this.step = 0;
            this.brand = ""; this.series = ""; this.model = ""; this.storage = "";
            this.battery = 85;
            this.resetResultsState();
            this.resetIssues();
            localStorage.removeItem("phoneSwapState");
        },

        resetResultsState() {
            this.finalValue = { min: 0, max: 0 };
            this.score = 0; this.baseValue = null; this.deduction = { min: 0, max: 0 };
            this.health = { battery: 0, screen: 0, speaker: 0, camera: 0 };
            this.tips = [];
            if (this.chart) { this.chart.destroy(); this.chart = null; }
            Alpine.store("phoneData").finalValue = this.finalValue;
        },

        resetIssues() {
            this.issuesList = this.issuesList.map(i => ({ ...i, state: false }));
        },

        saveState() {
            const state = {
                step: this.step, brand: this.brand, series: this.series, model: this.model,
                storage: this.storage, battery: this.battery,
                issues: this.issuesList.reduce((acc, i) => { acc[i.key] = i.state; return acc; }, {})
            };
            localStorage.setItem("phoneSwapState", JSON.stringify(state));
        },

        // --- WATCHERS ---
        setupWatchers() {
            this.$watch("brand", (newB, oldB) => {
                if (newB !== oldB) {
                    this.series = ""; this.model = ""; this.storage = "";
                    this.resetResultsState(); this.resetIssues(); this.tips = [];
                    this.battery = newB !== "iPhone" ? 80 : 85;
                }
                this.saveState();
            });

            this.$watch("series", (newS, oldS) => {
                if (newS !== oldS) { this.model = ""; this.storage = ""; this.resetIssues(); this.tips = []; }
            });

            this.$watch("model", (newM, oldM) => {
                if (newM !== oldM) { this.storage = ""; this.resetIssues(); this.tips = []; }
                if (this.model && this.storage) this.updateBaseValue();
            });

            this.$watch("storage", (newS, oldS) => {
                if (newS !== oldS && this.model && this.storage) this.updateBaseValue();
                this.saveState();
            });

            this.$watch("battery", () => { if (this.model) this.generateTips(); });

            this.$watch("issuesList", () => { if (this.model) this.generateTips(); }, { deep: true });

            this.$watch("step", () => this.saveState());
        },

        // --- DATABASE ACCESSORS ---
        get models() { return getPhoneDatabase(); },
        get seriesLabels() { return typeof getSeriesLabels === "function" ? getSeriesLabels() : {}; },

        availableSeries() {
            if (!this.brand) return [];
            const brandData = getPhoneDatabase()[this.brand];
            if (!brandData) return [];
            const values = Object.values(brandData);
            const hasNestedSeries = values.some(v => typeof v === "object" && !Array.isArray(v));
            return hasNestedSeries ? Object.keys(brandData) : [];
        },

        availableModels() {
            if (!this.brand) return [];
            const brandData = getPhoneDatabase()[this.brand];
            if (!brandData) return [];
            const values = Object.values(brandData);
            const hasNestedSeries = values.some(v => typeof v === "object" && !Array.isArray(v));

            if (hasNestedSeries) {
                if (this.series && brandData[this.series]) return Object.keys(brandData[this.series]);
                return Object.keys(brandData).reduce((acc, s) => {
                    const seriesObj = brandData[s];
                    if (seriesObj && !Array.isArray(seriesObj)) acc.push(...Object.keys(seriesObj));
                    return acc;
                }, []);
            } else return Object.keys(brandData);
        },

        availableStorages() {
            if (!this.brand || !this.model) return [];
            const db = getPhoneDatabase(); const brandData = db[this.brand];
            if (!brandData) return ["64GB", "128GB", "256GB"];

            if (brandData[this.model] && Array.isArray(brandData[this.model])) return brandData[this.model];
            if (this.series && brandData[this.series] && brandData[this.series][this.model]) return brandData[this.series][this.model];

            for (const seriesKey of Object.keys(brandData)) {
                const seriesObj = brandData[seriesKey];
                if (seriesObj && !Array.isArray(seriesObj) && Array.isArray(seriesObj[this.model])) return seriesObj[this.model];
            }
            return ["64GB", "128GB", "256GB"];
        },

        // --- PRICING LOGIC ---
        updateBaseValue() {
            if (!this.model || !this.storage || !this.modelBasePrices) { this.baseValue = null; return; }
            const modelEntry = this.modelBasePrices[this.model];
            if (modelEntry && modelEntry[this.storage]) { this.baseValue = modelEntry[this.storage]; return; }
            if (modelEntry) { const firstKey = Object.keys(modelEntry)[0]; if (firstKey) this.baseValue = modelEntry[firstKey]; return; }
            this.baseValue = null;
        },

        normalizeRange(input) {
            if (!input && input !== 0) return { min: 0, max: 0 };
            if (typeof input === "object" && input.min !== undefined && input.max !== undefined) return input;
            const n = Number(input) || 0; return { min: n, max: n + 30000 };
        },

        // --- FIXED: FINAL CALCULATION ---
        async finish() {
            this.updateBaseValue();
            this.generateTips();

            try {
                await this.sendToDjango();
            } catch (err) {
                console.warn("API error — falling back to client calc:", err);

                // Use the corrected finalPrice getter
                this.finalValue = this.finalPrice;

                // FIXED: Calculate deduction properly
                this.deduction = this.baseValue ? {
                    min: this.baseValue.min - this.finalValue.min,
                    max: this.baseValue.max - this.finalValue.max
                } : { min: 0, max: 0 };

                this.score = this.baseValue ? Math.max(0, Math.min(100, Math.round((this.finalValue.min / this.baseValue.min) * 100))) : 0;
                this.generateHealthMetrics();
                Alpine.store("phoneData").finalValue = this.finalValue;
                this.step = 3; this.saveState(); this.$nextTick(() => this.createChart());
            }
        },

        async sendToDjango() {
            const activeIssues = this.issuesList.filter(i => i.state).map(i => i.key);
            const formData = new FormData();
            formData.append("brand", this.brand);
            formData.append("model", this.model);
            formData.append("storage", this.storage);
            formData.append("battery", this.displayBattery);
            activeIssues.forEach(issue => formData.append("issues[]", issue));

            const response = await fetch("/api/calculate/", {
                method: "POST",
                body: formData,
                headers: { "X-CSRFToken": typeof CSRF_TOKEN !== "undefined" ? CSRF_TOKEN : "" }
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();

            this.finalValue = this.normalizeRange(data.final_value);
            this.baseValue = this.normalizeRange(data.base_value);
            this.deduction = this.normalizeRange(data.deduction);
            this.score = data.score || 0;
            this.health = data.health || this.health;
            Alpine.store("phoneData").finalValue = this.finalValue;

            if (data.tips && data.tips.length && this.brand === "iPhone") {
                this.tips = data.tips;
            } else {
                this.generateTips();
            }

            this.step = 3;
            this.saveState();
            this.$nextTick(() => this.createChart());
        },

        generateHealthMetrics() {
            this.health = {
                battery: Math.max(0, Math.min(100, this.displayBattery - (this.issuesList.find(i => i.key === "changedBattery")?.state ? 20 : 0))),
                screen: this.issuesList.find(i => i.key === "screenCracked" || i.key === "changedScreen")?.state ? 50 : 100,
                speaker: this.issuesList.find(i => i.key === "speakerBad")?.state ? 60 : 100,
                camera: this.issuesList.find(i => i.key === "cameraDamaged" || i.key === "changedCamera")?.state ? 70 : 100
            };
        },

        generateTips() {
            const newTips = [];

            const issueTips = {
                noFaceId: { label: "Face ID not working", price: -20000 },
                noTrueTone: { label: "True Tone not working", price: -8000 },
                touchIdBad: { label: "Fingerprint sensor not working", price: -15000 },
                changedScreen: { label: "Non-original screen", price: -25000 },
                changedBattery: { label: "Non-genuine battery", price: -12000 },
                changedCamera: { label: "Non-original camera", price: -18000 },
                changedIc: { label: "Changed IC component", price: -30000 },
                passcodeLocked: { label: "Password locked", price: -10000 },
                icloudLocked: { label: "iCloud locked", price: -50000 },
                esimLocked: { label: "eSIM locked", price: -8000 },
                simLocked: { label: "SIM locked", price: -5000 },
                icDamaged: { label: "Damaged IC component", price: -35000 },
                speakerBad: { label: "Speaker problems", price: -7000 },
                cameraDamaged: { label: "Damaged camera", price: -15000 },
                screenCracked: { label: "Cracked screen", price: -30000 },
                backCracked: { label: "Cracked back", price: -20000 },
                bodyScratches: { label: "Body scratches/dents", price: -5000 },
            };

            this.issuesList.forEach(issue => {
                if (issue.state && issueTips[issue.key]) {
                    newTips.push({ label: issueTips[issue.key].label, price: issueTips[issue.key].price, issue: issue.key });
                }
            });

            if (newTips.length === 0) {
                newTips.push({ label: "Your phone is in good condition", price: 0, issue: "excellent" });
            }

            newTips.sort((a, b) => a.price - b.price);
            this.tips = newTips;
        },

        createChart() {
            const canvas = document.getElementById("valuationChart");
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (this.chart) this.chart.destroy();
            const avgFinal = Math.round((this.finalValue.min + this.finalValue.max) / 2);
            const avgDeduction = Math.round((this.deduction.min + this.deduction.max) / 2);
            this.chart = new Chart(ctx, {
                type: "doughnut",
                data: {
                    labels: ["Valuation", "Deduction"],
                    datasets: [{
                        data: [avgFinal, Math.max(0, avgDeduction)],
                        backgroundColor: ["#14B8A6", "#334155"],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: false,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: {
                                color: "white",
                                font: { size: 14 }
                            }
                        }
                    }
                }
            });
        },

        formatCurrency(amount) {
            const value = Number(amount || 0);
            if (value < 0) return "-₦" + Math.abs(value).toLocaleString();
            return "₦" + value.toLocaleString();
        },

        formatCurrencyRange(range) {
            if (!range) return "₦0";
            return `₦${range.min.toLocaleString()} – ₦${range.max.toLocaleString()}`;
        },
        shareResults() {
            // Create a beautiful share card
            const shareCard = document.createElement('div');
            shareCard.className = 'share-card bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/20 rounded-2xl p-6 max-w-md mx-auto';

            // Create chart canvas for the share card
            const chartCanvas = document.createElement('canvas');
            chartCanvas.id = 'shareValuationChart';
            chartCanvas.width = 220;
            chartCanvas.height = 220;

            shareCard.innerHTML = `
        <div class="text-center mb-6">
            <div class="flex items-center justify-center gap-3 mb-4">
                <img src="{% static 'myapp/images/logo.png' %}" 
                     alt="PhoneSwap" 
                     class="h-12 w-12 rounded-full">
            </div>
            <p class="text-slate-300 text-sm">Phone Valuation Report</p>
        </div>
        <!-- Phone Details -->
        <div class="bg-slate-800/30 rounded-xl p-4 border border-slate-600 text-center mb-6">
            <h3 class="text-slate-300 font-semibold mb-2">Phone Details</h3>
            <p class="text-white text-sm">${this.brand} ${this.model} ${this.storage}</p>
            <p class="text-slate-400 text-xs mt-1">Battery: ${this.displayBattery}%</p>
        </div>
        <!-- Score and Chart Section -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6 p-6 bg-slate-800/30 rounded-2xl mb-6">
            <div class="w-40 h-40 rounded-full flex items-center justify-center">
                <canvas id="shareValuationChart" width="120" height="120"></canvas>
            </div>
            <div class="flex-1 text-center sm:text-left">
                <p class="text-sm text-slate-300">Score</p>
                <p class="text-2xl font-bold text-white">${this.score} / 100</p>
                <p class="text-sm text-slate-300 mt-3">Valued at</p>
                <p class="text-2xl font-bold text-emerald-300">${this.formatCurrencyRange(this.finalValue)}</p>
            </div>
        </div>
        
        <!-- Health Metrics -->
        <div class="space-y-4 mb-6">
            <h3 class="text-lg font-semibold text-white mb-3">Health Metrics</h3>
            ${Object.entries(this.health).map(([key, value]) => `
                <div class="flex items-center gap-4">
                    <div class="w-24 text-sm capitalize text-slate-300">${key}</div>
                    <div class="flex-1 max-w-98">
                        <div class="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                            <div class="h-3 rounded-full transition-all ${key === 'battery' ? 'bg-emerald-400' :
                    key === 'screen' ? 'bg-sky-400' :
                        key === 'speaker' ? 'bg-rose-400' : 'bg-yellow-300'
                }" style="width: ${value}%"></div>
                        </div>
                    </div>
                    <div class="w-12 text-right font-semibold text-slate-300">${value}%</div>
                </div>
            `).join('')}
        </div>

        <!-- Valuation Summary with Deductions -->
        <div class="bg-slate-800/50 rounded-xl p-4 border border-slate-700 mb-6">
            <h3 class="text-lg font-semibold text-white mb-4 text-center">Valuation Summary</h3>
            
            <!-- Base Value -->
            <div class="flex justify-between items-center py-3 border-b border-slate-600">
                <div class="text-slate-300">
                    <div class="font-medium">Base Value</div>
                    <div class="text-xs text-slate-400">Perfect condition value</div>
                </div>
                <span class="text-emerald-300 font-semibold">
                    ${this.formatCurrencyRange(this.baseValue)}
                </span>
            </div>

            <!-- Individual Deductions -->
            <div class="space-y-3 mt-4">
                ${this.tips.filter(tip => tip.price < 0).map(tip => `
                    <div class="flex justify-between items-center py-2 border-b border-slate-600/50 last:border-b-0">
                        <div class="text-slate-300 text-sm">${tip.label}</div>
                        <span class="text-rose-400 font-semibold text-sm">
                            -${this.formatCurrency(Math.abs(tip.price))}
                        </span>
                    </div>
                `).join('')}
            </div>

            <!-- Total Deductions -->
            <div class="flex justify-between items-center py-3 border-t border-slate-600 mt-4 pt-4">
                <div class="text-rose-300">
                    <div class="font-medium">Total Deductions</div>
                    <div class="text-xs text-rose-400">Based on condition issues</div>
                </div>
                <span class="text-rose-300 font-semibold text-lg">
                    -${this.formatCurrency(this.deduction.min)}
                </span>
            </div>

            <!-- Final Value -->
            <div class="flex justify-between items-center py-3 border-t border-emerald-500/30 mt-3 pt-4 bg-emerald-500/5 rounded-lg px-3">
                <div class="text-emerald-300">
                    <div class="font-medium text-lg">Final Value</div>
                    <div class="text-xs text-emerald-400">After all deductions</div>
                </div>
                <span class="text-emerald-300 font-bold text-xl">
                    ${this.formatCurrencyRange(this.finalValue)}
                </span>
            </div>
        </div>

        <!-- Repair Suggestions -->
        ${this.repairSuggestions.length > 0 ? `
            <div class="bg-slate-800/50 rounded-xl p-4 border border-slate-700 mb-6">
                <h3 class="text-cyan-400 font-semibold text-lg mb-3">💡 REPAIR SUGGESTIONS</h3>
                <div class="space-y-3">
                    ${this.repairSuggestions.map(tip => `
                        <div class="flex justify-between items-center py-2 border-b border-slate-600/50 last:border-b-0">
                            <div>
                                <span class="text-slate-300 text-sm">${tip.label}</span>
                                <div class="text-xs text-emerald-400 mt-1">
                                    Adds <span class="font-semibold">${this.formatCurrency(tip.improvement)}</span> to value
                                </div>
                            </div>
                            <span class="text-emerald-300 font-semibold">
                                +${this.formatCurrency(tip.improvement)}
                            </span>
                        </div>
                    `).join('')}
                </div>
                
                <!-- Total Potential Value Increase -->
                ${this.totalRepairImprovement > 0 ? `
                    <div class="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                        <div class="flex justify-between items-center">
                            <div>
                                <div class="font-semibold text-emerald-300">Total Potential Increase</div>
                                <div class="text-xs text-emerald-400">If all repairs are done</div>
                            </div>
                            <div class="text-right">
                                <div class="text-lg font-bold text-emerald-300">
                                    +${this.formatCurrency(this.totalRepairImprovement)}
                                </div>
                                <div class="text-xs text-emerald-400">
                                    New value: ${this.formatCurrencyRange(this.potentialValueAfterRepairs)}
                                </div>
                            </div>
                        </div>
                    </div>
                ` : ''}
            </div>
        ` : ''}

        <!-- Footer -->
        <div class="text-center mt-6 pt-4 border-t border-slate-700">
            <p class="text-slate-400 text-xs">Generated by PhoneSwap • ${new Date().toLocaleDateString()}</p>
        </div>
    `;

            // Create share modal
            const shareModal = document.createElement('div');
            shareModal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4';
            shareModal.innerHTML = `
        <div class="bg-slate-900 border border-cyan-500/30 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl share-modal-content">
            <!-- Header with close button -->
            <div class="flex justify-between items-center p-6 pb-4 border-b border-slate-700 sticky top-0 bg-slate-900 rounded-t-2xl z-10">
                <h3 class="text-xl font-bold text-white">Share Your Results</h3>
                <button id="closeModalTop" class="text-slate-400 hover:text-white transition p-2 hover:bg-slate-800 rounded-lg">
                    <i class="fa-solid fa-xmark text-xl"></i>
                </button>
            </div>

            <!-- Scrollable Content -->
            <div class="flex-1 overflow-y-auto p-6">
                <!-- Share Card Preview -->
                <div class="mb-6 transform origin-center" id="shareCardPreview">
                    ${shareCard.innerHTML}
                </div>

                <!-- Share Platforms -->
                <div class="grid grid-cols-4 gap-4 mb-6">
                    <button data-platform="whatsapp" class="flex flex-col items-center p-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl transition group platform-btn">
                        <i class="fab fa-whatsapp text-white text-xl mb-2"></i>
                        <span class="text-white text-xs font-medium">WhatsApp</span>
                    </button>

                    <button data-platform="twitter" class="flex flex-col items-center p-3 bg-sky-600 hover:bg-sky-500 rounded-xl transition group platform-btn">
                        <i class="fab fa-twitter text-white text-xl mb-2"></i>
                        <span class="text-white text-xs font-medium">Twitter</span>
                    </button>

                    <button data-platform="facebook" class="flex flex-col items-center p-3 bg-blue-600 hover:bg-blue-500 rounded-xl transition group platform-btn">
                        <i class="fab fa-facebook text-white text-xl mb-2"></i>
                        <span class="text-white text-xs font-medium">Facebook</span>
                    </button>

                    <button data-platform="copy" class="flex flex-col items-center p-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl transition group platform-btn">
                        <i class="fa-solid fa-link text-white text-xl mb-2"></i>
                        <span class="text-white text-xs font-medium">Copy</span>
                    </button>
                </div>

                <!-- Download Options -->
                <div class="grid grid-cols-2 gap-3 mb-6">
                    <button id="downloadImage" class="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition">
                        <i class="fa-solid fa-download text-cyan-400"></i>
                        <span class="text-white text-sm font-medium">Download Image</span>
                    </button>
                    
                    <button id="downloadPDF" class="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition">
                        <i class="fa-solid fa-file-pdf text-rose-400"></i>
                        <span class="text-white text-sm font-medium">Save as PDF</span>
                    </button>
                </div>
            </div>

            <!-- Footer with Cancel Button -->
            <div class="p-6 pt-4 border-t border-slate-700 sticky bottom-0 bg-slate-900 rounded-b-2xl">
                <div class="flex justify-center">
                    <button id="closeModalBottom" class="px-8 py-3 text-slate-300 hover:text-white border border-slate-600 hover:border-slate-400 rounded-full transition font-medium cancel-btn w-full max-w-xs">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    `;

            // Add to DOM
            document.body.appendChild(shareModal);

            // Create chart for share card
            setTimeout(() => {
                const shareChartCanvas = document.getElementById('shareValuationChart');
                if (shareChartCanvas) {
                    const ctx = shareChartCanvas.getContext('2d');
                    const avgFinal = Math.round((this.finalValue.min + this.finalValue.max) / 2);
                    const avgDeduction = Math.round((this.deduction.min + this.deduction.max) / 2);

                    new Chart(ctx, {
                        type: "doughnut",
                        data: {
                            labels: ["Valuation", "Deduction"],
                            datasets: [{
                                data: [avgFinal, Math.max(0, avgDeduction)],
                                backgroundColor: ["#14B8A6", "#334155"],
                                borderWidth: 0
                            }]
                        },
                        options: {
                            responsive: false,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false
                                }
                            },
                            cutout: '65%'
                        }
                    });
                }
            }, 100);

            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';

            // Close modal function
            const closeModal = () => {
                document.body.style.overflow = '';
                shareModal.remove();
            };

            // Add event listeners directly
            const closeModalTop = shareModal.querySelector('#closeModalTop');
            const closeModalBottom = shareModal.querySelector('#closeModalBottom');

            if (closeModalTop) {
                closeModalTop.addEventListener('click', closeModal);
            }

            if (closeModalBottom) {
                closeModalBottom.addEventListener('click', closeModal);
            }

            // Close when clicking outside modal
            shareModal.addEventListener('click', (event) => {
                if (event.target === shareModal) {
                    closeModal();
                }
            });

            // Close with Escape key
            const handleEscapeKey = (event) => {
                if (event.key === 'Escape') {
                    closeModal();
                }
            };
            document.addEventListener('keydown', handleEscapeKey);

            // Helper functions
            const captureShareCard = async () => {
                const preview = document.getElementById('shareCardPreview');
                return await html2canvas(preview, {
                    backgroundColor: '#0f172a',
                    scale: 2,
                    logging: false,
                    useCORS: true,
                    allowTaint: true
                });
            };

            const downloadCanvas = (canvas, filename) => {
                const link = document.createElement('a');
                link.download = filename;
                link.href = canvas.toDataURL('image/png');
                link.click();
            };

            const downloadAsImage = async () => {
                const canvas = await captureShareCard();
                downloadCanvas(canvas, `phoneswap-valuation-${Date.now()}.png`);
                showToast('Image downloaded!', 'success');
            };

            const downloadAsPDF = async () => {
                try {
                    const canvas = await captureShareCard();
                    const { jsPDF } = window.jspdf;
                    const pdf = new jsPDF();
                    const imgData = canvas.toDataURL('image/png');

                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    pdf.save(`phoneswap-valuation-${Date.now()}.pdf`);
                    showToast('PDF downloaded!', 'success');
                } catch (error) {
                    showToast('Failed to generate PDF', 'error');
                    console.error('PDF generation error:', error);
                }
            };

            const showToast = (message, type = 'info') => {
                const toast = document.createElement('div');
                toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg border ${type === 'success' ? 'bg-emerald-900/90 border-emerald-500 text-emerald-100' :
                        type === 'error' ? 'bg-rose-900/90 border-rose-500 text-rose-100' :
                            'bg-cyan-900/90 border-cyan-500 text-cyan-100'
                    } transform translate-x-full transition-transform duration-300`;
                toast.textContent = message;
                document.body.appendChild(toast);

                setTimeout(() => toast.classList.remove('translate-x-full'), 100);
                setTimeout(() => {
                    toast.classList.add('translate-x-full');
                    setTimeout(() => toast.remove(), 300);
                }, 3000);
            };

            // FIXED: Platform sharing functions
            const shareToPlatform = async (platform) => {
                try {
                    const canvas = await captureShareCard();

                    switch (platform) {
                        case 'whatsapp':
                            // Convert canvas to blob and create share data
                            canvas.toBlob(async (blob) => {
                                try {
                                    const file = new File([blob], 'phoneswap-valuation.png', { type: 'image/png' });
                                    const shareText = `📱 My Phone Valuation on PhoneSwap!\n\nScore: ${this.score}/100\nValue: ${this.formatCurrencyRange(this.finalValue)}\n\nPhone: ${this.brand} ${this.model} ${this.storage}\nBattery: ${this.displayBattery}%\n\nCheck out PhoneSwap for your phone valuation!`;

                                    // Use Web Share API if available
                                    if (navigator.share && navigator.canShare) {
                                        const shareData = {
                                            files: [file],
                                            text: shareText
                                        };

                                        if (navigator.canShare(shareData)) {
                                            await navigator.share(shareData);
                                            showToast('Shared via WhatsApp!', 'success');
                                        } else {
                                            // Fallback to WhatsApp URL scheme
                                            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
                                            window.open(whatsappUrl, '_blank');
                                            showToast('Opening WhatsApp...', 'info');
                                        }
                                    } else {
                                        // Fallback for browsers without Web Share API
                                        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
                                        window.open(whatsappUrl, '_blank');
                                        showToast('Opening WhatsApp...', 'info');
                                    }
                                } catch (error) {
                                    console.error('WhatsApp share error:', error);
                                    showToast('Failed to share on WhatsApp', 'error');
                                }
                            });
                            break;

                        case 'twitter':
                            const tweetText = `My ${this.brand} ${this.model} is valued at ${this.formatCurrencyRange(this.finalValue)} with a score of ${this.score}/100 on @PhoneSwap! 📱\n\n#PhoneValuation #PhoneSwap`;
                            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
                            window.open(twitterUrl, '_blank', 'width=600,height=400');
                            showToast('Opening Twitter...', 'info');
                            break;

                        case 'facebook':
                            const fbText = `My phone valuation on PhoneSwap: ${this.formatCurrencyRange(this.finalValue)} - Score: ${this.score}/100`;
                            const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(fbText)}`;
                            window.open(fbUrl, '_blank', 'width=600,height=400');
                            showToast('Opening Facebook...', 'info');
                            break;

                        case 'copy':
                            canvas.toBlob(async (blob) => {
                                try {
                                    await navigator.clipboard.write([
                                        new ClipboardItem({ 'image/png': blob })
                                    ]);
                                    showToast('Screenshot copied to clipboard!', 'success');
                                    closeModal();
                                } catch (error) {
                                    console.error('Copy to clipboard error:', error);
                                    // Fallback: download image
                                    downloadCanvas(canvas, 'phoneswap-valuation.png');
                                    showToast('Image downloaded instead!', 'info');
                                }
                            });
                            break;
                    }
                } catch (error) {
                    console.error('Platform share error:', error);
                    showToast('Failed to share. Please try again.', 'error');
                }
            };

            // Add event listeners for platform buttons
            const platformButtons = shareModal.querySelectorAll('[data-platform]');
            platformButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const platform = button.getAttribute('data-platform');
                    shareToPlatform(platform);
                });
            });

            // Add event listeners for download buttons
            const downloadImageBtn = shareModal.querySelector('#downloadImage');
            const downloadPDFBtn = shareModal.querySelector('#downloadPDF');

            if (downloadImageBtn) {
                downloadImageBtn.addEventListener('click', downloadAsImage);
            }

            if (downloadPDFBtn) {
                downloadPDFBtn.addEventListener('click', downloadAsPDF);
            }

            // Cleanup event listener when modal closes
            const cleanup = () => {
                document.removeEventListener('keydown', handleEscapeKey);
            };

            // Override closeModal to include cleanup
            const originalCloseModal = closeModal;
            closeModal = () => {
                cleanup();
                originalCloseModal();
            };
        },
    }));

    // Dream Phone Component
    Alpine.data("dreamPhone", () => ({
        dreamBrand: "",
        dreamSeries: "",
        dreamModel: "",
        dreamStorage: "",
        dreamCondition: "",
        modelBasePrices: {},
        dreamBaseValue: null,

        priceConfig: {
            storageMultipliers: {
                "32GB": 0.88,
                "64GB": 0.94,
                "128GB": 1.0,
                "256GB": 1.06,
                "512GB": 1.12,
                "1TB": 1.18,
            },
            conditionDiscounts: {
                "Brand New": 1.0,
                "Open Box": 0.95,
                "UK Used": 0.85,
                "Second Hand": 0.75,
            },
        },

        async init() {
            try {
                // Load base prices with AGGRESSIVE cache busting
                const cacheBuster = `v=2.0&t=${Date.now()}&r=${Math.random()}`;
                const res = await fetch(`/static/baseprices.json?${cacheBuster}`, {
                    headers: {
                        "Cache-Control": "no-cache, no-store, must-revalidate",
                        Pragma: "no-cache",
                        Expires: "0",
                        "X-Requested-With": "XMLHttpRequest",
                    },
                    cache: "no-store",
                    credentials: "omit",
                });

                if (!res.ok)
                    throw new Error(`HTTP error: ${res.status} ${await res.text()}`);

                this.modelBasePrices = await res.json();
                console.log(
                    "Dream phone prices loaded:",
                    Object.keys(this.modelBasePrices).length,
                    "models"
                );

                // Debug: Check if prices are updated
                console.log("Sample prices check:");
                console.log("iPhone 15:", this.modelBasePrices["iPhone 15"]);
                console.log("Galaxy S24:", this.modelBasePrices["Galaxy S24"]);
                // Add more models you updated
            } catch (err) {
                console.error("Failed to load base prices for dream phone:", err);
                this.modelBasePrices = {};

                // Try to use phoneSwap's prices if available
                try {
                    const phoneSwapComponent = Alpine.$data(
                        document.querySelector('[x-data="phoneSwap()"]')
                    );
                    if (phoneSwapComponent && phoneSwapComponent.modelBasePrices) {
                        this.modelBasePrices = phoneSwapComponent.modelBasePrices;
                        console.log("Using phoneSwap's prices as fallback");
                    }
                } catch (fallbackErr) {
                    console.error("Could not use fallback prices:", fallbackErr);
                }
            }

            // Set up watchers for reactive updates
            this.setupDreamWatchers();
        },

        setupDreamWatchers() {
            this.$watch("dreamBrand", () => {
                this.dreamSeries = "";
                this.dreamModel = "";
                this.dreamStorage = "";
                this.dreamBaseValue = null;
            });

            this.$watch("dreamSeries", () => {
                this.dreamModel = "";
                this.dreamStorage = "";
                this.dreamBaseValue = null;
            });

            this.$watch("dreamModel", () => {
                this.dreamStorage = "";
                this.updateDreamBaseValue();
            });

            this.$watch("dreamStorage", () => {
                this.updateDreamPrice();
            });

            this.$watch("dreamCondition", () => {
                this.updateDreamPrice();
            });
        },

        updateDreamBaseValue() {
            if (
                !this.dreamModel ||
                !this.modelBasePrices ||
                Object.keys(this.modelBasePrices).length === 0
            ) {
                this.dreamBaseValue = null;
                return;
            }

            // Try multiple naming patterns to find the base price
            const possibleKeys = [
                this.dreamModel,
                `${this.dreamBrand} ${this.dreamModel}`.trim(),
                this.dreamModel.replace("Galaxy ", ""),
                this.dreamModel.replace("Samsung ", ""),
                this.dreamModel.replace("iPhone ", ""),
                this.dreamModel.replace("Redmi ", ""),
                this.dreamModel.replace("Poco ", ""),
                this.dreamModel.replace("Infinix ", ""),
                this.dreamModel.replace("Tecno ", ""),
                this.dreamModel.replace("Oppo ", ""),
                this.dreamModel.replace("Itel ", ""),
                this.dreamModel.replace("Huawei ", ""),
                this.dreamModel.replace("Xiaomi ", ""),
            ];

            for (const key of possibleKeys) {
                if (this.modelBasePrices[key] !== undefined) {
                    this.dreamBaseValue = this.modelBasePrices[key];
                    console.log("Found base price for", key, ":", this.dreamBaseValue);
                    return;
                }
            }

            // If not found, try a partial match
            for (const modelKey of Object.keys(this.modelBasePrices)) {
                if (
                    modelKey.includes(this.dreamModel) ||
                    this.dreamModel.includes(modelKey)
                ) {
                    this.dreamBaseValue = this.modelBasePrices[modelKey];
                    console.log(
                        "Partial match found:",
                        modelKey,
                        ":",
                        this.dreamBaseValue
                    );
                    return;
                }
            }

            console.log("No price found for model:", this.dreamModel);
            this.dreamBaseValue = null;
        },

        updateDreamPrice() {
            // This method will be called when storage or condition changes
            // Force UI update by accessing the getter
            this.dreamPrice;
        },

        get dreamPrice() {
            if (
                this.dreamBaseValue === null ||
                !this.dreamStorage ||
                !this.dreamCondition
            ) {
                return 0;
            }

            const storageMultiplier =
                this.priceConfig.storageMultipliers[this.dreamStorage] || 1.0;
            const conditionDiscount =
                this.priceConfig.conditionDiscounts[this.dreamCondition] || 1.0;

            const price = Math.round(
                this.dreamBaseValue * storageMultiplier * conditionDiscount
            );
            console.log("Dream price calculation:", {
                base: this.dreamBaseValue,
                storage: this.dreamStorage,
                storageMultiplier: storageMultiplier,
                condition: this.dreamCondition,
                conditionDiscount: conditionDiscount,
                finalPrice: price,
            });

            return price;
        },

        get amountToAdd() {
            const currentValue = Alpine.store("phoneData").finalValue || 0;
            const dreamValue = this.dreamPrice || 0;

            if (dreamValue === 0 || isNaN(dreamValue)) {
                return 0;
            }

            const diff = dreamValue - currentValue;
            const amount = Math.max(0, Math.round(diff));

            console.log("Amount to add calculation:", {
                currentValue: currentValue,
                dreamValue: dreamValue,
                difference: diff,
                amountToAdd: amount,
            });

            return amount;
        },

        get amountToReceive() {
            const currentValue = Alpine.store("phoneData").finalValue || 0;
            const dreamValue = this.dreamPrice || 0;

            if (dreamValue === 0 || isNaN(dreamValue)) {
                return 0;
            }

            const diff = currentValue - dreamValue;
            const amount = Math.max(0, Math.round(diff));

            console.log("Amount to receive calculation:", {
                currentValue: currentValue,
                dreamValue: dreamValue,
                difference: diff,
                amountToReceive: amount,
            });

            return amount;
        },

        get brands() {
            return getPhoneDatabase();
        },

        get seriesLabels() {
            return getSeriesLabels();
        },

        availableSeries() {
            if (!this.dreamBrand) return [];
            const brandData = getPhoneDatabase()[this.dreamBrand];
            if (!brandData || Array.isArray(brandData)) return [];
            const values = Object.values(brandData);
            const hasNestedSeries = values.every(
                (v) => typeof v === "object" && !Array.isArray(v)
            );
            return hasNestedSeries ? Object.keys(brandData) : [];
        },

        availableModels() {
            if (!this.dreamBrand) return [];
            const brandData = getPhoneDatabase()[this.dreamBrand];
            if (!brandData) return [];

            if (this.dreamSeries && brandData[this.dreamSeries]) {
                return Object.keys(brandData[this.dreamSeries]);
            }
            return Object.keys(brandData);
        },

        availableStorages() {
            if (!this.dreamBrand || !this.dreamModel) return [];
            const db = getPhoneDatabase();
            const brandData = db[this.dreamBrand];
            if (!brandData) return ["64GB", "128GB", "256GB"];

            if (this.dreamSeries && brandData[this.dreamSeries]?.[this.dreamModel]) {
                return brandData[this.dreamSeries][this.dreamModel];
            }
            if (!this.dreamSeries) {
                for (const series of Object.values(brandData)) {
                    if (series[this.dreamModel]) return series[this.dreamModel];
                }
            }
            if (brandData[this.dreamModel]) return brandData[this.dreamModel];
            return ["64GB", "128GB", "256GB"];
        },

        formatCurrency(amount) {
            return "₦" + Number(amount || 0).toLocaleString();
        },

        // Add a manual reload function for debugging
        async reloadPrices() {
            try {
                const cacheBuster = `reload=${Date.now()}&r=${Math.random()}`;
                const res = await fetch(`/static/baseprices.json?${cacheBuster}`, {
                    headers: {
                        "Cache-Control": "no-cache, no-store, must-revalidate",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                    cache: "no-store",
                });

                if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

                this.modelBasePrices = await res.json();
                console.log(
                    "Prices reloaded successfully. Models:",
                    Object.keys(this.modelBasePrices).length
                );

                // Reupdate base value if we have a model selected
                if (this.dreamModel) {
                    this.updateDreamBaseValue();
                }

                return true;
            } catch (err) {
                console.error("Failed to reload prices:", err);
                return false;
            }
        },
    }));
});

// Event listeners for WhatsApp
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".whatsapp-btn");
    if (!btn) return;
    if (!IS_AUTH) return;
    e.preventDefault();
    const sellerName = btn.dataset.sellerName;
    const whatsappNumber = btn.dataset.whatsappNumber;
    if (sellerName && whatsappNumber) {
        window.openWhatsAppPopup(sellerName, whatsappNumber);
    }
});

document.addEventListener("click", function (e) {
    const popup = document.getElementById("whatsappPopup");
    if (!popup || popup.classList.contains("hidden")) return;
    const content = popup.querySelector("div");
    if (
        content &&
        !content.contains(e.target) &&
        !e.target.closest(".whatsapp-btn")
    ) {
        window.togglePopup();
    }
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") window.togglePopup();
});
