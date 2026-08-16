const maillots = [];

// Générer 20 maillots automatiquement
for (let i = 1; i <= 20; i++) {
    maillots.push({
        nom: "Maillot " + i,
        image: "images/maillot" + i + ".jpg"
    });
}

const container = document.getElementById("listeMaillots");

// Affichage
maillots.forEach(maillot => {
    const div = document.createElement("div");
    div.classList.add("maillot");

    div.innerHTML = `
        <h3>${maillot.nom}</h3>
        <img src="${maillot.image}" alt="${maillot.nom}">
    `;

    container.appendChild(div);
});

// Bouton aléatoire
document.getElementById("randomBtn").addEventListener("click", () => {
    const random = maillots[Math.floor(Math.random() * maillots.length)];

    document.getElementById("resultat").textContent =
        "👉 Tu mets : " + random.nom;
});