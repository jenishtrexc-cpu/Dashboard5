/* =========================
   NOVA BUSINESS DASHBOARD
========================= */


/* -------------------------
   MOBILE SIDEBAR
------------------------- */

const sidebar = document.getElementById("sidebar");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenu.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});


/* -------------------------
   PAGE NAVIGATION
------------------------- */

const navItems = document.querySelectorAll("[data-page]");

const pageTitles = {
    overview: [
        "Business Overview",
        "Here's what's happening with your business."
    ],

    finance: [
        "Financial Analytics",
        "Track revenue, expenses and profitability."
    ],

    assets: [
        "Business Assets",
        "Monitor the value of your business assets."
    ],

    valuation: [
        "Business Valuation",
        "Estimate your company's current market value."
    ],

    ai: [
        "Nova AI Advisor",
        "AI-powered business intelligence."
    ]
};

navItems.forEach(item => {

    item.addEventListener("click", () => {

        const page = item.dataset.page;

        if (!page) return;

        document
            .querySelectorAll(".nav-item")
            .forEach(nav => nav.classList.remove("active"));

        item.classList.add("active");

        if (pageTitles[page]) {

            document.getElementById("pageTitle").textContent =
                pageTitles[page][0];

            document.getElementById("pageSubtitle").textContent =
                pageTitles[page][1];

        }

        sidebar.classList.remove("open");

        if (page === "valuation") {
            document.getElementById("valuationModal").classList.add("show");
        }

        if (page === "ai") {
            document.getElementById("aiModal").classList.add("show");
        }

    });

});


/* -------------------------
   REFRESH BUTTON
------------------------- */

document.getElementById("refreshBtn").addEventListener("click", function () {

    this.textContent = "↻ Updating...";

    setTimeout(() => {

        this.textContent = "✓ Updated";

        setTimeout(() => {
            this.textContent = "↻ Refresh";
        }, 1200);

    }, 900);

});


/* -------------------------
   REPORT BUTTON
------------------------- */

document.getElementById("reportBtn").addEventListener("click", () => {

    alert(
        "Business report generated!\n\n" +
        "Revenue: $248,680\n" +
        "Profit: $72,430\n" +
        "Expenses: $176,250\n" +
        "Estimated Value: $2.84M"
    );

});


/* -------------------------
   CHART FILTER
------------------------- */

const chartSelect = document.getElementById("chartSelect");

chartSelect.addEventListener("change", function () {

    const revenueLine = document.querySelector(".revenue-line");
    const profitLine = document.querySelector(".profit-line");

    const revenueFill = document.querySelector(".revenue-fill");
    const profitFill = document.querySelector(".profit-fill");

    if (this.value === "revenue") {

        revenueLine.style.opacity = "1";
        revenueFill.style.opacity = "1";

        profitLine.style.opacity = ".12";
        profitFill.style.opacity = "0";

    }

    else if (this.value === "profit") {

        revenueLine.style.opacity = ".12";
        revenueFill.style.opacity = "0";

        profitLine.style.opacity = "1";
        profitFill.style.opacity = "1";

    }

    else {

        revenueLine.style.opacity = "1";
        revenueFill.style.opacity = "1";

        profitLine.style.opacity = "1";
        profitFill.style.opacity = "1";

    }

});


/* -------------------------
   VALUATION CALCULATOR
------------------------- */

const valuationModal =
    document.getElementById("valuationModal");

const closeValuation =
    document.getElementById("closeValuation");

closeValuation.addEventListener("click", () => {
    valuationModal.classList.remove("show");
});


document.getElementById("calculateValue")
    .addEventListener("click", () => {

        const revenue =
            Number(document.getElementById("annualRevenue").value);

        const profit =
            Number(document.getElementById("annualProfit").value);

        const multiple =
            Number(document.getElementById("multiple").value);

        /*
           Simple illustrative valuation model:
           average of revenue and profit multiples
        */

        const value =
            ((revenue * 0.35) + (profit * 0.65)) * multiple;

        document.getElementById("valuationResult").textContent =
            "$" + Math.round(value).toLocaleString();

    });


/* -------------------------
   AI SYSTEM
------------------------- */

const aiModal =
    document.getElementById("aiModal");

const closeAI =
    document.getElementById("closeAI");

const chat =
    document.getElementById("chat");

const aiInput =
    document.getElementById("aiInput");

const sendAI =
    document.getElementById("sendAI");


closeAI.addEventListener("click", () => {
    aiModal.classList.remove("show");
});


/* AI KNOWLEDGE */

function generateAIResponse(question) {

    const q = question.toLowerCase();

    if (
        q.includes("profit") ||
        q.includes("loss")
    ) {

        return `
        Your current net profit is <b>$72,430</b> from
        <b>$248,680</b> in revenue.

        Your approximate net margin is <b>29.1%</b>.
        This means the company currently keeps about
        $29 from every $100 of revenue after expenses.
        `;

    }

    if (
        q.includes("revenue") ||
        q.includes("sales")
    ) {

        return `
        Revenue is currently <b>$248,680</b>, up
        <b>18.4%</b> compared with the previous month.

        The current trend indicates positive sales momentum.
        Consider identifying which product category is
        producing the highest revenue and investing more
        efficiently in that category.
        `;

    }

    if (
        q.includes("value") ||
        q.includes("valuation") ||
        q.includes("worth")
    ) {

        return `
        The dashboard's estimated company valuation is
        approximately <b>$2.84M</b>.

        Your major value contributors include real estate,
        technology, inventory and brand value.
        `;

    }

    if (
        q.includes("growth") ||
        q.includes("increase")
    ) {

        return `
        Three possible growth areas are:

        <br><br>
        <b>1.</b> Increase repeat customer purchases.<br>
        <b>2.</b> Reduce unnecessary operating expenses.<br>
        <b>3.</b> Invest more in your highest-margin products.

        These are general business suggestions rather than
        financial advice.
        `;

    }

    if (
        q.includes("health") ||
        q.includes("doing")
    ) {

        return `
        The dashboard currently shows a financial health
        score of <b>86/100</b>.

        Revenue growth is positive, profit margin is
        approximately 29.1%, and cash-flow performance
        is currently strong.
        `;

    }

    return `
        I can analyze your <b>revenue</b>,
        <b>profit</b>, <b>expenses</b>,
        <b>valuation</b>, or suggest
        <b>growth strategies</b>.

        Try asking:
        "How is my profit?"
    `;

}


/* ADD CHAT MESSAGE */

function addMessage(text, type) {

    const message =
        document.createElement("div");

    message.className =
        "message " + type;

    if (type === "ai") {

        message.innerHTML =
            `<div class="mini-ai">✦</div>
             <div>${text}</div>`;

    } else {

        message.innerHTML = text;

    }

    chat.appendChild(message);

    chat.scrollTop = chat.scrollHeight;

}


/* SEND MESSAGE */

function sendMessage() {

    const question =
        aiInput.value.trim();

    if (!question) return;

    addMessage(question, "user");

    aiInput.value = "";

    setTimeout(() => {

        const response =
            generateAIResponse(question);

        addMessage(response, "ai");

    }, 600);

}


sendAI.addEventListener("click", sendMessage);

aiInput.addEventListener("keydown", e => {

    if (e.key === "Enter") {
        sendMessage();
    }

});


/* -------------------------
   AI QUICK QUESTIONS
------------------------- */

document.querySelectorAll(
    ".ai-actions button, .suggestions button"
).forEach(button => {

    button.addEventListener("click", () => {

        const question =
            button.dataset.question ||
            button.textContent;

        aiInput.value = question;

        if (!aiModal.classList.contains("show")) {
            aiModal.classList.add("show");
        }

        sendMessage();

    });

});


/* -------------------------
   GLOBAL SEARCH
------------------------- */

const search =
    document.getElementById("globalSearch");

search.addEventListener("input", function () {

    const value =
        this.value.toLowerCase();

    document.querySelectorAll(".asset").forEach(asset => {

        const text =
            asset.textContent.toLowerCase();

        asset.style.display =
            text.includes(value)
                ? "flex"
                : "none";

    });

});


/* -------------------------
   CLICK OUTSIDE MODAL
------------------------- */

document.querySelectorAll(".modal").forEach(modal => {

    modal.addEventListener("click", e => {

        if (e.target === modal) {
            modal.classList.remove("show");
        }

    });

});
