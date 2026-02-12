// Base de données des mots par session
const sessions = {
    1: [
        { word: "Gauge", synonyms: ["measure", "estimate"] },
        { word: "Processed food", synonyms: ["ready-made food", "ready made food", "readymade food"] },
        { word: "Demand", synonyms: ["request"] },
        { word: "Stale", synonyms: ["rancid", "old"] },
        { word: "Labeled", synonyms: ["tagged"] },
        { word: "Grocery", synonyms: ["food store", "foodstore"] },
        { word: "Edible", synonyms: ["consumable"] },
        { word: "Bulging", synonyms: ["swollen"] },
        { word: "Preserve", synonyms: ["save"] },
        { word: "Incentivizing", synonyms: ["motivating"] },
        { word: "Pasteurized", synonyms: ["sterilized"] },
        { word: "Manufacturer", synonyms: ["producer"] },
        { word: "Retailer", synonyms: ["shopkeeper", "merchant"] },
        { word: "Rusting", synonyms: ["oxidizing"] }
    ],
    2: [
        { word: "Scale", synonyms: ["expand", "improve efficiency", "profitability"] },
        { word: "Abundant", synonyms: ["plentiful", "ample"] },
        { word: "Nutrient", synonyms: ["nourishing", "nutritious"] },
        { word: "Commercial", synonyms: ["trading"] },
        { word: "Regulate", synonyms: ["supervise", "govern"] },
        { word: "Scaffold", synonyms: ["structure"] },
        { word: "Cofound", synonyms: ["collaborate", "start project", "start company"] },
        { word: "Funky", synonyms: ["bad smell", "smelly"] },
        { word: "Audacious", synonyms: ["fearless"] },
        { word: "Texture", synonyms: ["temporary structure", "support material"] },
        { word: "Mindset", synonyms: ["attitude"] },
        { word: "Prototype", synonyms: ["early version", "preliminary version"] },
        { word: "Exploratory", synonyms: ["investigative", "experimental"] },
        { word: "Supply", synonyms: ["source"] },
        { word: "Extinct", synonyms: ["does not exist", "disappeared"] }
    ],
    3: [
        { word: "Leftover", synonyms: ["remaining"] },
        { word: "Swarm", synonyms: ["multitude", "mass"] },
        { word: "Catering", synonyms: ["food service", "foodservice"] },
        { word: "Decompose", synonyms: ["spoil", "decay", "breakdown"] },
        { word: "Emitter", synonyms: ["radiant source", "producer"] },
        { word: "Stinky", synonyms: ["smelly"] },
        { word: "Potent", synonyms: ["powerful", "vigorous"] },
        { word: "Surplus", synonyms: ["excess", "excess of quantity"] },
        { word: "Intuitive", synonyms: ["gut feeling", "instinctive"] },
        { word: "Smokestacks", synonyms: ["chimneys", "exhaust pipes"] }
    ],
    4: [
        { word: "Barrel", synonyms: ["cylindrical container", "container"] },
        { word: "Multifaceted", synonyms: ["diverse", "complex"] },
        { word: "Furnace", synonyms: ["heating device", "heater"] },
        { word: "Crisscross", synonyms: ["zigzag", "back and forth"] },
        { word: "Ponder", synonyms: ["consider", "reflect"] },
        { word: "Hurdle", synonyms: ["barrier"] },
        { word: "Span", synonyms: ["extend", "cover"] },
        { word: "Promising", synonyms: ["hopeful"] },
        { word: "Incentive", synonyms: ["motivation"] }
    ],
    5: [
        { word: "Stock market", synonyms: ["share market", "sharemarket"] },
        { word: "Domestic", synonyms: ["national", "internal"] },
        { word: "Monetary", synonyms: ["relating to money", "money"] },
        { word: "Distort", synonyms: ["deform"] },
        { word: "Correlate", synonyms: ["relate"] },
        { word: "Sustainable", synonyms: ["durable"] },
        { word: "Resource", synonyms: ["material", "supply"] },
        { word: "Substantially", synonyms: ["considerably"] },
        { word: "Drastically", synonyms: ["dramatically"] },
        { word: "Emission", synonyms: ["release", "release of gases"] },
        { word: "Priority", synonyms: ["preference"] }
    ],

    6: [
        { word: "Idolize", synonyms: ["admire"] },
        { word: "Resign", synonyms: ["leave a job", "leave job", "leave an office", "leave office"] },
        { word: "Hardcore ultimatum", synonyms: ["rigid demand", "strict threat"] },
        { word: "Gain momentum", synonyms: ["move faster", "accelerate"] },
        { word: "Firm", synonyms: ["corporation", "organization", "company"] },
        { word: "Consign", synonyms: ["deliver", "delegate"] },
        { word: "Implement", synonyms: ["execute", "put into practice"] },
        { word: "Hamper", synonyms: ["prevent", "hinder"] },
        { word: "Labor shortages", synonyms: ["insufficient qualified candidates", "lack of workers", "worker shortage"] }
    ],
    7: [
    { word: "Freelancer", synonyms: ["self employed"] },
    { word: "Entrepreneur", synonyms: ["businessman", "industrialist"] },
    { word: "Specialized", synonyms: ["expert"] },
    { word: "Drawback", synonyms: ["weakness", "disadvantage"] },
    { word: "Administrative", synonyms: ["executive"] },
    { word: "In demand", synonyms: ["popular", "wanted"] },
    { word: "Perk", synonyms: ["advantage", "privilege"] },
    { word: "Deduct", synonyms: ["decrease", "subtract"] },
    { word: "Liable", synonyms: ["legally responsible", "morally responsible"] },
    { word: "Sparse", synonyms: ["insufficient", "limited"] }
]

};

// Variables globales
var firstTime = true;
var listCases = [false, false, false, false, false, false];
var selectedWords = [];
var correctWords = new Set();

// Fonction pour sélectionner/désélectionner une session
function Buff(attribute) {
    var caseElement = document.getElementById("Case" + attribute);
    if (listCases[attribute - 1] == false) {
        caseElement.style.border = "5px solid rgb(21, 96, 189)";
        caseElement.style.borderStyle = "groove";
        listCases[attribute - 1] = true;
    } else {
        caseElement.style.border = "2px solid white";
        listCases[attribute - 1] = false;
    }
}

// Fonction pour démarrer le jeu
function Start() {
    // Vérifier qu'au moins une session est sélectionnée
    const selectedSessions = listCases.slice(0, 7).map((val, idx) => val ? idx + 1 : null).filter(val => val !== null);
    
    if (selectedSessions.length === 0) {
        alert("Please select at least one session!");
        return;
    }
    
    // Collecter tous les mots des sessions sélectionnées
    let allWords = [];
    selectedSessions.forEach(sessionNum => {
        allWords = allWords.concat(sessions[sessionNum]);
    });
    
    // Sélectionner 9 mots aléatoires
    selectedWords = [];
    const shuffled = allWords.sort(() => 0.5 - Math.random());
    selectedWords = shuffled.slice(0, Math.min(9, shuffled.length));
    
    // Afficher les mots dans les blocs
    for (let i = 1; i <= 9; i++) {
        const wordElement = document.getElementById("bloc" + i);
        if (selectedWords[i - 1]) {
            wordElement.textContent = selectedWords[i - 1].word;
            wordElement.style.backgroundColor = "#f8f9fa";
            wordElement.dataset.index = i - 1;
        } else {
            wordElement.textContent = "";
        }
    }
    
    // Réinitialiser les mots corrects
    correctWords.clear();
    
    // Cacher la sélection et afficher les questions
    document.querySelector(".Choisir_des_sessions").style.display = "none";
    document.querySelector(".Questions").style.display = "block";
    
    // Focus sur la textbox
    document.getElementById("questionBox").focus();
}

// Fonction pour tester les réponses
function test() {
    const userInput = document.getElementById("questionBox").value.trim().toLowerCase();
    
    // Ne vérifier que si l'utilisateur a tapé au moins 3 caractères
    if (userInput.length < 3) return;
    
    // Parcourir tous les mots affichés
    for (let i = 1; i <= 9; i++) {
        const wordElement = document.getElementById("bloc" + i);
        const index = parseInt(wordElement.dataset.index);
        
        if (isNaN(index) || !selectedWords[index]) continue;
        
        // Si le mot est déjà correct, on passe
        if (correctWords.has(index)) continue;
        
        // Vérifier si l'input correspond exactement à un des synonymes
        const synonyms = selectedWords[index].synonyms;
        const isCorrect = synonyms.some(synonym => 
            userInput === synonym.toLowerCase()
        );
        
        if (isCorrect) {
            wordElement.style.backgroundColor = "rgb(144, 238, 144)";
            wordElement.style.borderColor = "green";
            correctWords.add(index);
            
            // Effacer la textbox après une bonne réponse
            document.getElementById("questionBox").value = "";
            
            // Vérifier si tous les mots sont trouvés
            if (correctWords.size === selectedWords.length) {
                setTimeout(() => {
                    alert("🎉 Congratulations! You found all the words!");
                    Abandonner();
                }, 500);
            }
        }
    }
}

// Fonction pour abandonner et revenir à la sélection
function Abandonner() {
    // Afficher toutes les réponses avant de quitter
    for (let i = 1; i <= 9; i++) {
        const wordElement = document.getElementById("bloc" + i);
        const index = parseInt(wordElement.dataset.index);
        
        if (!isNaN(index) && selectedWords[index]) {
            // Afficher le mot avec ses synonymes de manière plus jolie
            const word = selectedWords[index].word;
            const synonyms = selectedWords[index].synonyms.join(", ");
            
            // Colorer en rouge les mots non trouvés, garder vert les trouvés
            if (!correctWords.has(index)) {
                wordElement.style.backgroundColor = "rgb(255, 200, 200)";
                wordElement.style.borderColor = "rgb(200, 50, 50)";
                wordElement.style.borderWidth = "3px";
            } else {
                wordElement.style.borderWidth = "3px";
            }
            
            // Mise en forme élégante
            wordElement.innerHTML = `
                <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">${word}</div>
                <div style="font-size: 14px; color: #555; font-style: italic; line-height: 1.4;">${synonyms}</div>
            `;
            wordElement.style.padding = "15px";
            wordElement.style.minHeight = "100px";
            wordElement.style.display = "flex";
            wordElement.style.flexDirection = "column";
            wordElement.style.justifyContent = "center";
        }
    }
    
    // Cacher la textbox et le bouton surrender
    document.getElementById("questionBox").style.display = "none";
    document.getElementById("abandonner").style.display = "none";
    
    // Créer un conteneur pour l'en-tête avec le titre et le bouton
    let headerContainer = document.getElementById("headerContainer");
    if (!headerContainer) {
        headerContainer = document.createElement("div");
        headerContainer.id = "headerContainer";
        headerContainer.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding: 20px;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        `;
        
        // Créer le message de révision (à gauche)
        const reviewMessage = document.createElement("div");
        reviewMessage.id = "reviewMessage";
        reviewMessage.innerHTML = `
            <h2 style="color: #333; margin: 0 0 10px 0; font-size: 32px;">📚 Review Your Answers</h2>
            <p style="color: #666; font-size: 16px; margin: 0;">
                <span style="color: green; font-weight: bold;">Green</span> = Correct | 
                <span style="color: red; font-weight: bold;">Red</span> = Missed
            </p>
        `;
        reviewMessage.style.cssText = `
            text-align: left;
            flex: 1;
        `;
        
        // Créer le bouton de retour (à droite)
        const returnButton = document.createElement("button");
        returnButton.id = "returnButton";
        returnButton.textContent = "↩ Return to Menu";
        returnButton.onclick = ReturnToMenu;
        returnButton.style.cssText = `
            width: 200px;
            height: 50px;
            border: none;
            border-radius: 12px;
            padding: 5px;
            font-size: 18px;
            font-weight: bold;
            background: linear-gradient(135deg, rgb(59, 159, 241), rgb(152, 75, 169));
            color: white;
            cursor: pointer;
            box-shadow: 0 5px 20px rgba(59, 159, 241, 0.4);
            transition: all 0.3s ease;
            flex-shrink: 0;
            margin-left: 20px;
        `;
        returnButton.onmouseover = function() {
            this.style.transform = "translateY(-3px)";
            this.style.boxShadow = "0 8px 25px rgba(59, 159, 241, 0.6)";
        };
        returnButton.onmouseout = function() {
            this.style.transform = "translateY(0)";
            this.style.boxShadow = "0 5px 20px rgba(59, 159, 241, 0.4)";
        };
        
        headerContainer.appendChild(reviewMessage);
        headerContainer.appendChild(returnButton);
        
        // Insérer au début de la section Questions, pas dans .Guess
        document.querySelector(".Questions").insertBefore(headerContainer, document.querySelector(".Questions").firstChild);
    }
}

// Fonction pour retourner au menu principal
function ReturnToMenu() {
    // Réinitialiser tout
    correctWords.clear();
    selectedWords = [];
    document.getElementById("questionBox").value = "";
    document.getElementById("questionBox").disabled = false;
    document.getElementById("questionBox").style.display = "block";
    document.getElementById("abandonner").style.display = "block";
    
    // Réinitialiser l'affichage de tous les blocs de mots
    for (let i = 1; i <= 9; i++) {
        const wordElement = document.getElementById("bloc" + i);
        wordElement.textContent = "Word";
        wordElement.style.backgroundColor = "#f8f9fa";
        wordElement.style.borderColor = "black";
        wordElement.style.borderWidth = "2px";
        wordElement.style.padding = "20px";
        wordElement.style.minHeight = "auto";
        wordElement.style.display = "block";
        wordElement.style.flexDirection = "";
        wordElement.style.justifyContent = "";
        wordElement.innerHTML = "Word";
        delete wordElement.dataset.index;
    }
    
    // Supprimer le message de révision
    const headerContainer = document.getElementById("headerContainer");
    if (headerContainer) {
        headerContainer.remove();
    }
    
    // Réafficher la sélection et cacher les questions
    document.querySelector(".Choisir_des_sessions").style.display = "block";
    document.querySelector(".Questions").style.display = "none";
}

// Cacher la section Questions au chargement
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".Questions").style.display = "none";
});