// Initialize game state variables
let energyPoints = 50;
let environmentalPoints = 70;
let globalSatisfaction = 60;
let daysLeft = 10;
let currentScenario = 0;

const scenarios = [
    {
        description: "Oil and gas production have come to a halt. The people need energy, but at what cost?",
        choices: [
            { 
                text: "Ramp up production of all nuclear energy plants.", 
                effects: { energy: 10, environmental: -5, satisfaction: 5},
                effectDescription: "+10 energy, -5 Environment, +5 satisfaction"    
            },
            { 
                text: "Continue using solar and hydroelectric power.", 
                effects: { energy: -10, environmental: 10, satisfaction: 10},
                effectDescription: "-10 energy, +10 Environment, +10 satisfaction"
            },
        ]
    },
    {
        description: "The food supply is running low. With limited resources you must choose which you value more... ensuring the safety of a select few, or helping the greater good.",
        choices: [
            { 
                text: "Distribute resources to the top scientists so they can continue their work of saving the planet", 
                effects: { energy: 10, environmental: 5, satisfaction: -15},
                effectDescription: "+5 energy, +5 Environment, -15 satisfaction"    
            },
            { 
                text: "Spread the resources across the globe. They will not last as long but you may save more people.", 
                effects: { energy: -10, environmental: -5, satisfaction: 15},
                effectDescription: "-10 energy, -5 Environment, +15 satisfaction"
            },
        ]
    },
    {
        description: "As the planet warms, sea levels are rising. How will you deal with this devastating problem?",
        choices: [
            { 
                text: "Abandon the coastline. Move everyone inland and group resources together.", 
                effects: { energy: 10, environmental: -10, satisfaction: -5},
                effectDescription: "+10 energy, -10 Environment, -5 satisfaction"    
            },
            { 
                text: "Build a coastal wall to keep the water out.", 
                effects: { energy: -15, environmental: 10, satisfaction: 10},
                effectDescription: "-15 energy, +10 Environment, +10 satisfaction"
            },
        ]
    },
    {
        description: "Landfills are becoming overcrowded. How will you handle new waste coming out?",
        choices: [
            { 
                text: "Invest in advanced recycling technology.", 
                effects: { energy: -20, environmental: 15, satisfaction: 10},
                effectDescription: "-20 energy, +10 Environment, +10 satisfaction"    
            },
            { 
                text: "Export waste to a less-regulated country.", 
                effects: { energy: 15, environmental: -20, satisfaction: -10},
                effectDescription: "+15 energy, -20 Environment, -10 satisfaction"
            },
        ]
    },
    {
        description: "The crises have taken their toll on the environment. How will you use our resources to solve this issue?",
        choices: [
            { 
                text: "Delegate areas of the world to leave untouched for regrowth.", 
                effects: { energy: -15, environmental: 20, satisfaction: 10},
                effectDescription: "-15 energy, +20 Environment, +10 satisfaction"    
            },
            { 
                text: "Implement better conservation tactics to maximize resource while benefiting the environment.", 
                effects: { energy: 10, environmental: -10, satisfaction: -5},
                effectDescription: "+10 energy, -10 Environment, -5 satisfaction"
            },
        ]
    },
    {
        description: "The work force has been in decline, and a surge of new workers is needed.",
        choices: [
            { 
                text: "Invest heavily in robotics to increase productivity.", 
                effects: { energy: 20, environmental: -15, satisfaction: -15},
                effectDescription: "+20 energy, -15 Environment, -15 satisfaction"    
            },
            { 
                text: "Focus on job creation through human labor.", 
                effects: { energy: -15, environmental: 10, satisfaction: 20},
                effectDescription: "-15 energy, +10 Environment, +20 satisfaction"
            },
        ]
    },
    {
        description: "A new pandemic has hit the people. A vaccine is under development, but how to procede is murky.",
        choices: [
            { 
                text: "Mass-produce vaccines quickly at an environmental cost.", 
                effects: { energy: 15, environmental: -20, satisfaction: +10},
                effectDescription: "+15 energy, -20 Environment, +10 satisfaction"    
            },
            { 
                text: "Prioritize sustainable production at a slower rate.", 
                effects: { energy: -10, environmental: +15, satisfaction: -10},
                effectDescription: "-10 energy, +15 Environment, -10 satisfaction"
            },
        ]
    },
    {
        description: "As resources dwindle, people are looking for new places to live. Many want to join the safety colony you have established.",
        choices: [
            { 
                text: "Provide resources to support displaced populations.", 
                effects: { energy: -15, environmental: -10, satisfaction: +20},
                effectDescription: "-15 energy, -10 Environment, +20 satisfaction"    
            },
            { 
                text: "Close borders to preserve resources.", 
                effects: { energy: 10, environmental: 10, satisfaction: -15},
                effectDescription: "+10 energy, +10 Environment, -15 satisfaction"
            },
        ]
    },
    {
        description: "Your scientists have discovered a new habital planet, but it will doom the one you are on. What do you do?",
        choices: [
            { 
                text: "Invest in space colonization for future survival.", 
                effects: { energy: -30, environmental: -30, satisfaction: 30},
                effectDescription: "-30 energy, -30 Environment, +30 satisfaction"    
            },
            { 
                text: "Focus all remaining resources on saving Earth.", 
                effects: { energy: -40, environmental: 40, satisfaction: 10},
                effectDescription: "-40 energy, +40 Environment, +10 satisfaction"
            },
        ]
    },
];

// Function to update the displayed points
function updateStats() {
    document.getElementById('energy-points').textContent = `Energy Points: ${energyPoints}`;
    document.getElementById('environmental-points').textContent = `Environmental Points: ${environmentalPoints}`;
    document.getElementById('global-satisfaction').textContent = `Global Satisfaction: ${globalSatisfaction}`;
    document.getElementById('days-left').textContent = `Days Left: ${daysLeft}`;
}

function displayScenario() {
    if (currentScenario >= scenarios.length || energyPoints <= 0 || environmentalPoints <= 0 || daysLeft <= 0) {
        endGame();
        return;
    }

    const scenario = scenarios[currentScenario];
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
        <p>${scenario.description}</p>
        <div id="choices-container">
            <div class="choice">
                <button id="choice-1">${scenario.choices[0].text}</button>
                <p class="effect-description">${scenario.choices[0].effectDescription}</p>
            </div>
            <div class="choice">
                <button id="choice-2">${scenario.choices[1].text}</button>
                <p class="effect-description">${scenario.choices[1].effectDescription}</p>
            </div>
        </div>
    `;

    // Add event listeners for the choices
    document.getElementById('choice-1').addEventListener('click', () => handleChoice(0));
    document.getElementById('choice-2').addEventListener('click', () => handleChoice(1));
}



// Function to handle a choice
function handleChoice(choiceIndex) {
    const choice = scenarios[currentScenario].choices[choiceIndex];
    energyPoints += choice.effects.energy;
    environmentalPoints += choice.effects.environmental;
    globalSatisfaction += choice.effects.satisfaction;
    daysLeft--;

    currentScenario++;
    updateStats();
    displayScenario();
}

function endGame() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
        <h1>Game Over</h1>
        <p>${energyPoints > 0 && environmentalPoints > 0 ? 'You saved the world!' : 'The world has fallen into crisis.'}</p>
        <button id="recap-button">Continue to Recap</button>
    `;

    // Add event listener for the recap button
    document.getElementById('recap-button').addEventListener('click', displayRecap);
}

function displayRecap() {
    // Clear the body content
    document.body.innerHTML = `
        <h1>Thank you for playing!</h1>
        <p>
            Thank you for playing! Throughout this game, you were faced with complex ethical dilemmas that required careful consideration of competing priorities. 
            Making ethical decisions is rarely straightforward and often demands a delicate balance between principles and outcomes. 
            From a utilitarian perspective, your choices aimed to maximize overall well-being, even when sacrifices had to be made. 
            Meanwhile, deontology reminded us of the importance of adhering to moral duties and rules, even when the consequences were uncertain. 
            Environmental ethics emphasized the need to protect our planet for future generations, while technological ethics challenged you to weigh the benefits of innovation against its potential risks. 
            This experience highlights the difficulty and nuance of ethical decision-making in a rapidly changing world, where every action has far-reaching implications.
        </p>
    `;
}

// Function to start the game
function startGame() {
    document.body.innerHTML = `
        <h1>World Control Room</h1>
        <div id="stats-container">
            <p id="energy-points">Energy Points: ${energyPoints}</p>
            <p id="environmental-points">Environmental Points: ${environmentalPoints}</p>
            <p id="global-satisfaction">Global Satisfaction: ${globalSatisfaction}</p>
            <p id="days-left">Days Left: ${daysLeft}</p>
        </div>
        <div id="game-container"></div>
    `;

    updateStats();
    displayScenario();
}

// Attach event listener to the start button
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', startGame);
