// Function to generate a random date between July 1, 2023, and September 30, 2023
const fs = require("fs");
const PLAYERS = []
  function getRandomDate() {
    const startDate = new Date("2023-07-01T00:00:00.000Z").getTime();
    const endDate = new Date("2023-09-30T23:59:59.999Z").getTime();
    const randomTime = startDate + Math.random() * (endDate - startDate);
    return new Date(randomTime).toISOString();
  }
  
  // Function to generate a random time between 900 and 2400 with an average of 1400
  function getRandomTime() {
    const minTime = 900;
    const maxTime = 2400;
    const averageTime = 1400;
    const deviation = (maxTime - minTime) / 2;
    const randomOffset = (Math.random() - 0.5) * deviation;
    const randomTime = averageTime + randomOffset;
    return Math.min(Math.max(minTime, randomTime), maxTime);
  }
  
  // Array of cool player names
  const coolPlayerNames = [
    "Coolio",
    "Maverick",
    "Phoenix",
    "Raptor",
    "Neon",
    "Stardust",
    "Blaze",
    "Shadow",
    "Velocity",
    "Aurora",
    "Cyber",
    "Starship",
    "Nova",
    "Inferno",
    "Frost",
    "Sonic",
    "Zero",
    "Galaxy",
    "Titan",
    "Nebula",
    "Quasar",
    "Cosmic",
    "Orion",
    "Supernova",
    "Asteroid",
    "Meteor",
    "Cosmonaut",
    "Voyager",
    "Eclipse",
    "Starfighter",
    "Pulse",
    "Celestial",
    "Zenith",
    "Lunar",
    "Rocket",
    "Gravity",
    "Infinity",
    "Cosmos",
    "Plasma",
    "Firestorm",
    "Solar Flare",
    "Galactic",
    "Black Hole",
    "Satellite",
    "Vortex",
    "Radiant",
    "Nighthawk",
    "Thunderbolt",
    "Astro",
    "Nucleus",
  ];
  
  for (let i = 2; i <= 350; i++) {
    const newPlayer = {
      id: i,
      name: coolPlayerNames[Math.floor(Math.random() * coolPlayerNames.length)],
      time: getRandomTime(),
      date: getRandomDate(),
    };
    PLAYERS.push(newPlayer);
  }
  

  fs.writeFileSync("players.js", `export const PLAYERS = ${JSON.stringify(PLAYERS, null, 2)};\n`);

  