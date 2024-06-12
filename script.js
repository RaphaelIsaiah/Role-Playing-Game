//  Declaration of Variables.

let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
let weapon = inventory[currentWeapon];

//  Use of the Document Object Models to access the HTML elements.
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const weaponText = document.querySelector("#weaponText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

/**
 * Declaring variables using an array of objects.
 * These different objects will be used to change the display on the screen based on the user's interaction.
 */
const weapons = [
  {
    name: "stick",
    power: 5,
  },
  {
    name: " dagger",
    power: 30,
  },
  {
    name: " claw hammer",
    power: 50,
  },
  {
    name: " sword",
    power: 100,
  },
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60,
  },
  {
    name: "dragon",
    level: 20,
    health: 300,
  },
];
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says "Store".',
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store.",
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.",
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster.",
  },
  {
    name: "kill monster",
    "button text": [
      "Go to town square",
      "Go to town square",
      "Go to town square",
    ],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;",
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;",
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
  },
];

// Initialize buttons
// This allows us to define what each button should do. What function will be ran when clicked.
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// This function is used to update the location (display) when a button is clicked.
// Note that button text is an array which is why bracket notation is added to specify the particular element in its array.
function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

// The use of bracket notation here is used to define which object in the location array is specified.
function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  /**
   * Note, currentWeapon is the index of the weapons array
   * let newWeapon = weapons[currentWeapon].name;
   * where the value of currentWeapon here is 1 as it had undergone an increment
   * And array indexing starts at zero, the index of the last element in an array is one less than the length of the array.
   * So using currentWeapon < weapons.length for the if statement condition would cause an error.
   * Instead currentWeapon < weapons.length - 1 is used to get the correct value of the last element in the weapons array.
   */
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      // This is used to add the new weapon to the inventory array that was created at the top.
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
      weaponText.innerText = newWeapon;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    // Note the use of block scope in the declaration of currentWeapon.
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  // 0 is the index of slime in the monsters array.
  fighting = 0;
  goFight();
}

function fightBeast() {
  // 1 is the index of beast in the monsters array.
  fighting = 1;
  goFight();
}

function fightDragon() {
  // 2 is the index of dragon in the monsters array.
  fighting = 2;
  goFight();
}

//Since fighting each type of monster will use similar logic, we will use this function to manage the logic.
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsters[fighting].health;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText +=
    " You attack it with your " + weapons[currentWeapon].name + ".";

  health -= getMonsterAttackValue(monsters[fighting].level);

  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " \nYou miss.";
  }

  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;

  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    // The strict equality === operator checks if the values are equal and if they are the same data type.
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  // The logical AND operator checks if two statements are true.
  /**
   * Here is an example of an if statement with two conditions:
   * if (firstName ==="Quincy" && lastName === "Larson"){
   * }
   */
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    // If there is only one weapon in the inventory array, i.e inventory.length === 1 that weapon won't break as inventory will always be false in that condition (inventory.length !== 1)
    // This pop() will remove the last item in the array and return it so it appears in your string.
    text.innerText += " \nYour " + inventory.pop() + " breaks.";
    currentWeapon--;
    weapon = weapons[currentWeapon].name;
    weaponText.innerText = weapon;
  }
}

function getMonsterAttackValue(level) {
  // The attack of the monster will be based on the monster'slevel and the player's xp.
  // This sets the monster's attack to five times their level minus a random number between 0 and the player's xp.
  const hit = level * 5 - Math.floor(Math.random() * xp);
  console.log(hit);
  // This ternary operator returns hit if hit is > 0 or returns 0 if it is not.
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  // This will return a boolean i.e either true or false.
  // || is the logical OR operator.
  // The code below means: the player should hit if either Math.random() > .2 or if the player's health is less than 20.
  /**
   * The logical OR operator will use the first value if it is truthy
   * that is, anything apart from NaN, null, undefined, 0, -0, 0n, "", and false.
   * Otherwise, it will use the second value.
   * For example,
   * num < 10 || num > 20
   */
  return Math.random() > 0.2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  // Math.floor is used here to round the result down to the nearest integer.
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  weaponText.innerText = inventory[0];
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    // This Math function will create a random number between 0 and 10
    // Note how the push method is used to push the random numbers to the end of the numbers array.
    // That is, while the length of the array is less than 10 the random numbers will be generated and pushed into the array.
    numbers.push(Math.floor(Math.random() * 11));
  }
  // \n is the new line escape character. Which will make the next part of the text appear on a new line (much like the <br/> in HTML)
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";

  // This for loop is used to list out the random numbers that were added to the numbers array until i = 10.
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
