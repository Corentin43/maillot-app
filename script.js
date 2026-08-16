
const maillots = document.querySelectorAll(".maillot");

// historique anti répétition (7 derniers choix)
let historique = JSON.parse(localStorage.getItem("historiqueMaillots")) || [];

/* =========================
   DETAIL FULLSCREEN
========================= */
function afficherDetail(maillot) {

    const nom = maillot.querySelector(".nom").textContent;
    const taille = maillot.querySelector(".taille")?.textContent || "";
    const prix = maillot.querySelector(".prix")?.textContent || "";
    const flocage = maillot.querySelector(".flocage")?.textContent || "";
    const image = maillot.querySelector("img").src;

    document.getElementById("detailPage").style.display = "flex";

    document.getElementById("detailImage").src = image;
    document.getElementById("detailNom").textContent = nom;
    document.getElementById("detailTaille").textContent = taille;
    document.getElementById("detailPrix").textContent = prix;
    document.getElementById("detailFlocage").textContent = flocage;
}

/* =========================
   FERMER DETAIL
========================= */
document.getElementById("backBtn").addEventListener("click", () => {
    document.getElementById("detailPage").style.display = "none";
});

/* =========================
   PACK FIFA SUSPENSE PRO
   🌍 DRAPEAU → 🏟️ CLUB → 👕 MAILLOT
========================= */
function showPack(maillot, callback) {

    const overlay = document.getElementById("packOverlay");
    const img = document.getElementById("packImage");
    const countryBox = document.getElementById("packCountry");
    const clubBox = document.getElementById("packClub");

    const country = maillot.dataset.country;
    const club = maillot.dataset.club;
    const image = maillot.querySelector("img").src;
    const nom = maillot.querySelector(".nom").textContent;

    overlay.style.display = "flex";

    // reset état
    img.style.opacity = 0;
    overlay.classList.remove("reveal");

    /* =========================
       ÉTAPE 1 : DRAPEAU
    ========================= */
    countryBox.innerHTML = `
        <img src="images/drapeaux/${country}.png">
    `;
    clubBox.innerHTML = "";

    /* =========================
       ÉTAPE 2 : CLUB
    ========================= */
    setTimeout(() => {

        countryBox.innerHTML = "";

        clubBox.innerHTML = `
            <img src="images/clubs/${club}.png">
        `;

    }, 1800);

    /* =========================
       ÉTAPE 3 : MAILLOT FINAL
    ========================= */
    setTimeout(() => {

        clubBox.innerHTML = nom;

        img.src = image;

        overlay.classList.add("reveal");

        setTimeout(() => {
            img.style.opacity = 1;
        }, 300);

    }, 3600);

    /* =========================
       FIN ANIMATION
    ========================= */
    setTimeout(() => {

        overlay.style.display = "none";
        callback(maillot);

    }, 5000);
}

/* =========================
   CHOIX SANS REPETITION (7)
========================= */
function choisirMaillot() {

    let dispo = [];

    maillots.forEach((m, index) => {
        if (!historique.includes(index)) {
            dispo.push(index);
        }
    });

    if (dispo.length === 0) {
        historique = [];
        dispo = [...Array(maillots.length).keys()];
    }

    const randomIndex = dispo[Math.floor(Math.random() * dispo.length)];

    historique.push(randomIndex);

    if (historique.length > 7) {
        historique.shift();
    }

    localStorage.setItem("historiqueMaillots", JSON.stringify(historique));

    return maillots[randomIndex];
}

/* =========================
   CLICK MAILLOT = DIRECT DETAIL
========================= */
maillots.forEach(maillot => {
    maillot.addEventListener("click", () => {
        afficherDetail(maillot);
    });
});

/* =========================
   BOUTON RANDOM = PACK FIFA PRO
========================= */
document.getElementById("randomBtn").addEventListener("click", () => {

    const maillot = choisirMaillot();

    showPack(maillot, (result) => {
        afficherDetail(result);
    });

});
