
window.openWhatsAppPopup = function (sellerName, sellerNumber) {
    const nameEl = document.getElementById("popupSellerName");
    const numberEl = document.getElementById("popupSellerNumber");
    const linkEl = document.getElementById("popupSellerLink");
    const popup = document.getElementById("whatsappPopup");

    if (nameEl) nameEl.innerText = sellerName || "";
    if (numberEl) numberEl.innerText = sellerNumber ? "📞 " + sellerNumber : "";
    if (linkEl) linkEl.href = sellerNumber ? "https://wa.me/" + sellerNumber.replace("+", "") : "#";
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
                "Galaxy S24 Ultra": ["256GB", "512GB", "1TB"]
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
            M: {
                "Galaxy M10": ["16GB", "32GB"],
                "Galaxy M20": ["32GB", "64GB"],
                "Galaxy M30": ["64GB", "128GB"],
                "Galaxy M40": ["64GB", "128GB"],
                "Galaxy M11": ["32GB", "64GB"],
                "Galaxy M21": ["64GB", "128GB"],
                "Galaxy M31": ["64GB", "128GB"],
                "Galaxy M51": ["64GB", "128GB"],
                "Galaxy M12": ["32GB", "64GB", "128GB"],
                "Galaxy M32": ["64GB", "128GB"],
                "Galaxy M42": ["128GB"],
                "Galaxy M62": ["128GB", "256GB"],
                "Galaxy M13": ["64GB", "128GB"],
                "Galaxy M23": ["128GB"],
                "Galaxy M33": ["128GB"],
                "Galaxy M53": ["128GB", "256GB"],
                "Galaxy M14": ["64GB", "128GB"],
                "Galaxy M34": ["128GB", "256GB"],
                "Galaxy M54": ["128GB", "256GB"],
                "Galaxy M15": ["64GB", "128GB"],
                "Galaxy M35": ["128GB", "256GB"],
                "Galaxy M55": ["128GB", "256GB"],
            }
        },
        Pixel: {
            "Pixel": ["32GB"],
            "Pixel XL": ["32GB", "128GB"],
            "Pixel 2": ["64GB", "128GB"],
            "Pixel 2 XL": ["64GB", "128GB"],
            "Pixel 3": ["64GB", "128GB"],
            "Pixel 3 XL": ["64GB", "128GB"],
            "Pixel 3a": ["64GB"],
            "Pixel 3a XL": ["64GB"],
            "Pixel 4": ["64GB", "128GB"],
            "Pixel 4 XL": ["64GB", "128GB"],
            "Pixel 4a": ["128GB"],
            "Pixel 4a 5G": ["128GB"],
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
            Zero: {
                "Infinix Zero 8": ["128GB"],
                "Infinix Zero X": ["128GB", "256GB"],
                "Infinix Zero Ultra": ["256GB"],
                "Infinix Zero 30": ["256GB"],
                "Infinix Zero 40": ["256GB"],
                "Infinix Zero Flip": ["256GB"],
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
            }
        },
        Oppo: {
            Reno: {
                "Oppo Reno 4": ["128GB"],
                "Oppo Reno 4 Pro": ["128GB", "256GB"],
                "Oppo Reno 5": ["128GB"],
                "Oppo Reno 5 Pro": ["128GB", "256GB"],
                "Oppo Reno 6": ["128GB"],
                "Oppo Reno 6 Pro": ["128GB", "256GB"],
                "Oppo Reno 7": ["128GB"],
                "Oppo Reno 7 Pro": ["128GB", "256GB"],
                "Oppo Reno 8": ["128GB", "256GB"],
                "Oppo Reno 8 Pro": ["256GB"],
                "Oppo Reno 9": ["128GB", "256GB"],
                "Oppo Reno 9 Pro": ["256GB"],
                "Oppo Reno 10": ["256GB"],
                "Oppo Reno 10 Pro": ["256GB"],
                "Oppo Reno 11": ["256GB"],
                "Oppo Reno 11 Pro": ["256GB"],
                "Oppo Reno 12": ["256GB"],
                "Oppo Reno 12 Pro": ["256GB"]
            },

            FindX: {
                "Oppo Find X2": ["128GB", "256GB"],
                "Oppo Find X2 Pro": ["256GB", "512GB"],
                "Oppo Find X3": ["128GB", "256GB"],
                "Oppo Find X3 Pro": ["256GB", "512GB"],
                "Oppo Find X5": ["256GB"],
                "Oppo Find X5 Pro": ["256GB", "512GB"],
                "Oppo Find X6": ["256GB"],
                "Oppo Find X6 Pro": ["256GB", "512GB"],
                "Oppo Find X7": ["256GB"],
                "Oppo Find X7 Ultra": ["256GB", "512GB"]
            },

            F: {
                "Oppo F15": ["128GB"],
                "Oppo F17": ["128GB"],
                "Oppo F17 Pro": ["128GB"],
                "Oppo F19": ["128GB"],
                "Oppo F19 Pro": ["128GB", "256GB"],
                "Oppo F19 Pro+": ["128GB", "256GB"],
                "Oppo F21 Pro": ["128GB", "256GB"],
                "Oppo F23": ["128GB", "256GB"]
            },

            A: {
                "Oppo A53": ["64GB", "128GB"],
                "Oppo A54": ["64GB", "128GB"],
                "Oppo A55": ["64GB", "128GB"],
                "Oppo A57": ["64GB", "128GB"],
                "Oppo A58": ["128GB", "256GB"],
                "Oppo A59": ["128GB"],
                "Oppo A72": ["128GB"],
                "Oppo A74": ["128GB"],
                "Oppo A76": ["128GB"],
                "Oppo A77": ["128GB"],
                "Oppo A92": ["128GB"],
                "Oppo A94": ["128GB"],
                "Oppo A96": ["128GB", "256GB"],
                "Oppo A98": ["256GB"]
            },

            K: {
                "Oppo K3": ["64GB", "128GB"],
                "Oppo K5": ["128GB"],
                "Oppo K7": ["128GB"],
                "Oppo K7x": ["128GB", "256GB"],
                "Oppo K9": ["128GB", "256GB"],
                "Oppo K9 Pro": ["256GB"],
                "Oppo K10": ["128GB", "256GB"],
                "Oppo K10 5G": ["256GB"],
                "Oppo K11": ["256GB"],
                "Oppo K11x": ["128GB", "256GB"]
            }
        },
        Tecno: {
            Spark: {
                "Tecno Spark 8": ["64GB"],
                "Tecno Spark 9": ["64GB", "128GB"],
                "Tecno Spark 10": ["64GB", "128GB"],
                "Tecno Spark 11": ["128GB"],
                "Tecno Spark 12": ["128GB"],
                "Tecno Spark SE": ["128GB"]
            },

            Camon: {
                "Tecno Camon 18": ["128GB"],
                "Tecno Camon 19": ["128GB"],
                "Tecno Camon 19 Pro": ["128GB", "256GB"],
                "Tecno Camon 20": ["128GB"],
                "Tecno Camon 20 Pro": ["128GB", "256GB"],
                "Tecno Camon 20 Premier": ["256GB"]
            },

            Pova: {
                "Tecno Pova 3": ["64GB", "128GB"],
                "Tecno Pova 4": ["128GB", "256GB"],
                "Tecno Pova Neo": ["64GB", "128GB"],
                "Tecno Pova 5": ["128GB", "256GB"]
            }
        },
        itel: {
            A: {
                "itel A58": ["32GB", "64GB"],
                "itel A60": ["32GB", "64GB"],
                "itel A70": ["64GB", "128GB"]
            },

            S: {
                "itel S16": ["32GB"],
                "itel S17": ["32GB", "64GB"],
                "itel S18": ["64GB"],
                "itel S23": ["128GB", "256GB"]
            },

            P: {
                "itel P37": ["32GB", "64GB"],
                "itel P38": ["32GB", "64GB"],
                "itel P40": ["64GB", "128GB"]
            },

            Vision: {
                "itel Vision 1": ["32GB"],
                "itel Vision 2": ["32GB", "64GB"],
                "itel Vision 3": ["32GB", "64GB"]
            }
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
                "Huawei P60 Pro": ["256GB", "512GB"]
            },

            Mate: {
                "Huawei Mate 30": ["128GB", "256GB"],
                "Huawei Mate 30 Pro": ["128GB", "256GB", "512GB"],
                "Huawei Mate 40": ["128GB", "256GB"],
                "Huawei Mate 40 Pro": ["256GB", "512GB"],
                "Huawei Mate 50": ["128GB", "256GB"],
                "Huawei Mate 50 Pro": ["256GB", "512GB"],
                "Huawei Mate 60": ["256GB", "512GB"],
                "Huawei Mate 60 Pro": ["256GB", "512GB", "1TB"]
            },

            Nova: {
                "Huawei Nova 7": ["128GB", "256GB"],
                "Huawei Nova 8": ["128GB", "256GB"],
                "Huawei Nova 9": ["128GB", "256GB"],
                "Huawei Nova 10": ["128GB", "256GB"],
                "Huawei Nova 11": ["128GB", "256GB"]
            },

            Y: {
                "Huawei Y6p": ["32GB", "64GB"],
                "Huawei Y7a": ["64GB", "128GB"],
                "Huawei Y8p": ["128GB"],
                "Huawei Y9a": ["128GB"]
            }
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
                "Xiaomi Mi 14": ["256GB", "512GB", "1TB"]
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
                "Redmi A3": ["64GB", "128GB"]
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
                "Poco M5s": ["64GB", "128GB"]
            }
        }
    };
}

function getSeriesLabels() {
    return {
        Samsung: {
            S: "S Series",
            Z: "Z Series",
            A: "A Series",
            M: "M Series"
        },
        Infinix: {
            Hot: "Hot Series",
            Note: "Note Series",
            Zero: "Zero Series",
            GT: "GT Series",
            Smart: "Smart Series"
        },
        Oppo: {
            FindX: "Find X Series",
            Reno: "Reno Series",
            A: "A Series",
            F: "F Series",
            K: "K Series"
        },
        Tecno: {
            Spark: "Spark Series",
            Camon: "Camon Series",
            Pova: "Pova Series"
        },
        Itel: {
            S: "S Series",
            P: "P Series",
            A: "A Series",
            Vision: "Vision Series"
        },
        Huawei: {
            P: "P Series",
            Mate: "Mate Series",
            Nova: "Nova Series"
        },
        Xiaomi: {
            Redmi: "Note Series",
            Poco: "Poco Series",
            Mi: "Mi Series"
        },
        Redmi: {
            Note: "Redmi Note Series",
            K: "Redmi K Series",
            A: "Redmi A Series"
        }
    };
}

// Initialize Alpine components
document.addEventListener("alpine:init", () => {
    // Global store
    Alpine.store("phoneData", {
        finalValue: 0
    });

    // Phone Swap Component
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
        finalValue: 0,
        score: 0,
        baseValue: null,
        deduction: 0,
        modelBasePrices: {},

        // Issues list
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
            { key: "bodyScratches", label: "Scratches on body", tag: "ai", state: false }
        ],

        // Getter to check if phone is Android
        get isAndroid() {
            return this.brand && this.brand !== "iPhone";
        },

        // Getter for battery percentage (fixed for Android)
        get displayBattery() {
            return this.isAndroid ? 75 : this.battery;
        },

        async init() {
            // Load base prices
            try {
                const res = await fetch("/static/baseprices.json?t=" + Date.now());
                this.modelBasePrices = await res.json();
            } catch (err) {
                console.error("Failed to load base prices:", err);
                this.modelBasePrices = {};
            }

            // Load state from localStorage if available
            this.loadState();

            // Set up watchers
            this.setupWatchers();
        },

        loadState() {
            const savedState = localStorage.getItem("phoneSwapState");
            if (!savedState) return;

            try {
                const state = JSON.parse(savedState);
                this.step = state.step || 0;
                this.brand = state.brand || "";
                this.series = state.series || "";
                this.model = state.model || "";
                this.storage = state.storage || "";
                this.battery = state.battery || 85;

                // Load issues state
                if (state.issues) {
                    this.issuesList.forEach(issue => {
                        if (state.issues[issue.key] !== undefined) {
                            issue.state = state.issues[issue.key];
                        }
                    });
                }

                // If we were on results step, recalculate
                if (this.step === 3) {
                    this.finish();
                }
            } catch (e) {
                console.error("Error loading state:", e);
                this.resetAllState();
            }
        },

        resetAllState() {
            this.step = 0;
            this.brand = "";
            this.series = "";
            this.model = "";
            this.storage = "";
            this.battery = 85;
            this.resetResultsState();
            this.resetIssues();
            localStorage.removeItem("phoneSwapState");
        },

        resetResultsState() {
            this.finalValue = 0;
            this.score = 0;
            this.baseValue = null;
            this.deduction = 0;
            this.health = { battery: 0, screen: 0, speaker: 0, camera: 0 };
            this.tips = [];
            if (this.chart) {
                this.chart.destroy();
                this.chart = null;
            }
            Alpine.store("phoneData").finalValue = 0;
        },

        resetIssues() {
            this.issuesList = this.issuesList.map(issue => ({
                ...issue,
                state: false
            }));
        },

        setupWatchers() {
            // Watch for brand changes
            this.$watch("brand", (newBrand, oldBrand) => {
                if (newBrand !== oldBrand) {
                    this.series = "";
                    this.model = "";
                    this.storage = "";
                    this.resetResultsState();
                    this.resetIssues();
                    this.tips = [];
                    this.battery = newBrand !== "iPhone" ? 75 : 85;
                }
                this.saveState();
            });

            // Watch for series changes
            this.$watch("series", (newSeries, oldSeries) => {
                if (newSeries !== oldSeries) {
                    this.model = "";
                    this.storage = "";
                    this.resetIssues();
                    this.tips = [];
                }
            });

            // Watch for model changes
            this.$watch("model", (newModel, oldModel) => {
                if (newModel !== oldModel) {
                    this.storage = "";
                    this.resetIssues();
                    this.tips = [];
                }
            });

            // Watch for battery changes
            this.$watch("battery", () => {
                if (this.model && !this.isAndroid) {
                    this.generateTips();
                }
            });

            // Watch issues changes
            this.$watch("issuesList", () => {
                if (this.model) {
                    this.generateTips();
                }
            }, { deep: true });

            // Watch other properties
            ['step', 'storage'].forEach(prop => {
                this.$watch(prop, () => this.saveState());
            });
        },

        saveState() {
            const state = {
                step: this.step,
                brand: this.brand,
                series: this.series,
                model: this.model,
                storage: this.storage,
                battery: this.battery,
                issues: this.issuesList.reduce((acc, issue) => {
                    acc[issue.key] = issue.state;
                    return acc;
                }, {})
            };
            localStorage.setItem("phoneSwapState", JSON.stringify(state));
        },

        // Database methods
        get models() {
            return getPhoneDatabase();
        },

        get seriesLabels() {
            return getSeriesLabels();
        },

        availableSeries() {
            if (!this.brand) return [];
            const brandData = getPhoneDatabase()[this.brand];
            if (!brandData || Array.isArray(brandData)) return [];
            const values = Object.values(brandData);
            const hasNestedSeries = values.every(v => typeof v === "object" && !Array.isArray(v));
            return hasNestedSeries ? Object.keys(brandData) : [];
        },

        availableModels() {
            if (!this.brand) return [];
            const brandData = getPhoneDatabase()[this.brand];
            if (!brandData) return [];

            if (this.series && brandData[this.series]) {
                return Object.keys(brandData[this.series]);
            }
            return Object.keys(brandData);
        },

        availableStorages() {
            if (!this.brand || !this.model) return [];
            const db = getPhoneDatabase();
            const brandData = db[this.brand];
            if (!brandData) return ["64GB", "128GB", "256GB"];

            if (this.series && brandData[this.series]?.[this.model]) {
                return brandData[this.series][this.model];
            }
            if (!this.series) {
                for (const series of Object.values(brandData)) {
                    if (series[this.model]) return series[this.model];
                }
            }
            if (brandData[this.model]) return brandData[this.model];
            return ["64GB", "128GB", "256GB"];
        },

        filteredIssues() {
            if (!this.brand) return [];
            const isIphone = this.brand === "iPhone";
            return this.issuesList.filter(i => {
                if (isIphone) return i.tag === "i" || i.tag === "ai";
                return i.tag === "a" || i.tag === "ai";
            });
        },

        updateBaseValue() {
            if (!this.model || !this.modelBasePrices || Object.keys(this.modelBasePrices).length === 0) {
                this.baseValue = null;
                return;
            }

            if (this.modelBasePrices[this.model] !== undefined) {
                this.baseValue = this.modelBasePrices[this.model];
                return;
            }

            this.baseValue = null;
        },

        get finalPrice() {
            if (this.baseValue === null) return 0;

            let price = this.baseValue;

            const storageMultipliers = {
                "32GB": 1.0, "64GB": 1.2, "128GB": 1.4,
                "256GB": 1.7, "512GB": 2.0, "1TB": 2.4
            };

            price *= storageMultipliers[this.storage] || 1.0;
            price *= this.displayBattery / 100;

            const activeIssues = this.issuesList.filter(i => i.state).length;
            const issueDeduction = activeIssues * 0.05;
            price *= (1 - Math.min(issueDeduction, 0.5));

            return Math.round(price);
        },

        async finish() {
            this.updateBaseValue();

            // Generate tips immediately when button is clicked
            this.generateTips();

            // Try to get data from Django backend
            try {
                await this.sendToDjango();
            } catch (err) {
                console.error("API error, using client-side calculation:", err);
                // Fallback to client-side calculation
                this.finalValue = this.finalPrice;
                this.deduction = this.baseValue ? this.baseValue - this.finalValue : 0;
                this.score = Math.max(0, Math.min(100, Math.round((this.finalValue / (this.baseValue || 1)) * 100)));
                this.generateHealthMetrics();
                Alpine.store("phoneData").finalValue = this.finalValue;
                this.step = 3;
                this.saveState();
                this.$nextTick(() => this.createChart());
            }
        },

        async sendToDjango() {
            const activeIssues = this.issuesList.filter(i => i.state).map(i => i.key);

            const formData = new FormData();
            formData.append("brand", this.brand);
            formData.append("model", this.model);
            formData.append("storage", this.storage);
            formData.append("battery", this.battery);
            activeIssues.forEach(issue => formData.append("issues[]", issue));

            const response = await fetch("/api/calculate/", {
                method: "POST",
                body: formData,
                headers: { "X-CSRFToken": CSRF_TOKEN }
            });

            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

            const data = await response.json();

            // Update results
            this.finalValue = data.final_value || 0;
            this.score = data.score || 0;
            this.health = data.health || { battery: 0, screen: 0, speaker: 0, camera: 0 };
            this.baseValue = data.base_value || 0;
            this.deduction = data.deduction || 0;
            Alpine.store("phoneData").finalValue = this.finalValue;

            // Use server tips if available, otherwise keep client-side tips
            if (data.tips && data.tips.length > 0) {
                this.tips = data.tips;
            }

            this.step = 3;
            this.saveState();
            this.$nextTick(() => this.createChart());
        },

        generateHealthMetrics() {
            this.health = {
                battery: Math.max(0, Math.min(100, this.battery - (this.issuesList.find(i => i.key === "changedBattery")?.state ? 20 : 0))),
                screen: this.issuesList.find(i => i.key === "screenCracked" || i.key === "changedScreen")?.state ? 50 : 100,
                speaker: this.issuesList.find(i => i.key === "speakerBad")?.state ? 60 : 100,
                camera: this.issuesList.find(i => i.key === "cameraDamaged" || i.key === "changedCamera")?.state ? 70 : 100
            };
        },

        generateTips() {
            const newTips = [];

            // Battery-related tip
            if (this.displayBattery < 80) {
                newTips.push({
                    label: `Battery health low (${this.displayBattery}%)`,
                    price: -15000,
                    issue: "battery"
                });
            }

            // Issue-specific tips
            const issueTips = {
                "noFaceId": { label: "Face ID not working", price: -20000 },
                "noTrueTone": { label: "True Tone not working", price: -8000 },
                "touchIdBad": { label: "Fingerprint sensor not working", price: -15000 },
                "changedScreen": { label: "Non-original screen", price: -25000 },
                "changedBattery": { label: "Non-genuine battery", price: -12000 },
                "changedCamera": { label: "Non-original camera", price: -18000 },
                "changedIc": { label: "Changed IC component", price: -30000 },
                "passcodeLocked": { label: "Password locked", price: -10000 },
                "icloudLocked": { label: "iCloud locked", price: -50000 },
                "esimLocked": { label: "eSIM locked", price: -8000 },
                "simLocked": { label: "SIM locked", price: -5000 },
                "icDamaged": { label: "Damaged IC component", price: -35000 },
                "speakerBad": { label: "Speaker problems", price: -7000 },
                "cameraDamaged": { label: "Damaged camera", price: -15000 },
                "screenCracked": { label: "Cracked screen", price: -30000 },
                "backCracked": { label: "Cracked back", price: -20000 },
                "bodyScratches": { label: "Body scratches/dents", price: -5000 }
            };

            // Add tips for active issues
            this.issuesList.forEach(issue => {
                if (issue.state && issueTips[issue.key]) {
                    newTips.push({
                        label: issueTips[issue.key].label,
                        price: issueTips[issue.key].price,
                        issue: issue.key
                    });
                }
            });

            // If no issues, show positive message
            if (newTips.length === 0 && this.displayBattery >= 80) {
                newTips.push({
                    label: "Your phone is in good condition",
                    price: 0,
                    issue: "excellent"
                });
            }

            // Sort and update tips
            newTips.sort((a, b) => a.price - b.price);
            this.tips = newTips;
        },

        createChart() {
            const canvas = document.getElementById("valuationChart");
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (this.chart) this.chart.destroy();

            this.chart = new Chart(ctx, {
                type: "doughnut",
                data: {
                    labels: ["Valuation", "Deduction"],
                    datasets: [{
                        data: [this.finalValue, this.deduction],
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

        shareResults() {
            html2canvas(document.getElementById("resultsSection")).then(canvas => {
                canvas.toBlob(blob => {
                    const data = [new ClipboardItem({ "image/png": blob })];
                    navigator.clipboard.write(data).then(() => {
                        alert("Screenshot copied to clipboard!");
                    });
                });
            });
        },

        formatCurrency(amount) {
            const value = Number(amount || 0);
            if (value < 0) {
                return "-₦" + Math.abs(value).toLocaleString();
            }
            return "₦" + value.toLocaleString();
        }
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
                '32GB': 1.0, '64GB': 1.2, '128GB': 1.4,
                '256GB': 1.7, '512GB': 2.0, '1TB': 2.4
            },
            conditionDiscounts: {
                'Brand New': 1.0, 'Open Box': 0.95,
                'UK Used': 0.85, 'Second Hand': 0.75
            }
        },

        async init() {
            try {
                const res = await fetch('/static/baseprices.json?t=' + Date.now());
                this.modelBasePrices = await res.json();
            } catch (err) {
                console.error("Failed to load base prices:", err);
                this.modelBasePrices = {};
            }

            // Set up watchers for reactive updates
            this.$watch('dreamBrand', () => {
                this.dreamSeries = "";
                this.dreamModel = "";
                this.dreamStorage = "";
                this.dreamBaseValue = null;
            });

            this.$watch('dreamSeries', () => {
                this.dreamModel = "";
                this.dreamStorage = "";
                this.dreamBaseValue = null;
            });

            this.$watch('dreamModel', () => {
                this.dreamStorage = "";
                this.updateDreamBaseValue();
            });

            this.$watch('dreamStorage', () => {
                // Recalculate when storage changes
            });

            this.$watch('dreamCondition', () => {
                // Recalculate when condition changes
            });
        },

        updateDreamBaseValue() {
            if (!this.dreamModel || !this.modelBasePrices || Object.keys(this.modelBasePrices).length === 0) {
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
                this.dreamModel.replace("Poco ", "")
            ];

            for (const key of possibleKeys) {
                if (this.modelBasePrices[key] !== undefined) {
                    this.dreamBaseValue = this.modelBasePrices[key];
                    return;
                }
            }

            // If not found, try a partial match
            for (const modelKey of Object.keys(this.modelBasePrices)) {
                if (modelKey.includes(this.dreamModel) || this.dreamModel.includes(modelKey)) {
                    this.dreamBaseValue = this.modelBasePrices[modelKey];
                    return;
                }
            }

            this.dreamBaseValue = null;
        },

        get dreamPrice() {
            if (this.dreamBaseValue === null || !this.dreamStorage || !this.dreamCondition) {
                return 0;
            }

            const storageMultiplier = this.priceConfig.storageMultipliers[this.dreamStorage] || 1.0;
            const conditionDiscount = this.priceConfig.conditionDiscounts[this.dreamCondition] || 1.0;

            return Math.round(this.dreamBaseValue * storageMultiplier * conditionDiscount);
        },

        get amountToAdd() {
            const currentValue = Alpine.store("phoneData").finalValue || 0;
            const dreamValue = this.dreamPrice || 0;

            if (dreamValue === 0 || isNaN(dreamValue)) {
                return 0;
            }
            const diff = dreamValue - currentValue;
            return Math.max(0, Math.round(diff));
        },
        get amountToReceive() {
            const currentValue = Alpine.store("phoneData").finalValue || 0;
            const dreamValue = this.dreamPrice || 0;

            if (dreamValue === 0 || isNaN(dreamValue)) {
                return 0;
            }


            const diff = currentValue - dreamValue;

            return Math.max(0, Math.round(diff));
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
            const hasNestedSeries = values.every(v => typeof v === "object" && !Array.isArray(v));
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
        }
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
    if (content && !content.contains(e.target) && !e.target.closest(".whatsapp-btn")) {
        window.togglePopup();
    }
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") window.togglePopup();
});
