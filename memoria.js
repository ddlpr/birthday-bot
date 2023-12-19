'use strict';

// START OPENAI API
const { OpenAI } = require('langchain/llms/openai');
const { BufferMemory } = require('langchain/memory');
const { ConversationChain } = require('langchain/chains');
const readline = require('readline');
const pizzip = require('pizzip');
const fs = require('fs').promises;

require('dotenv').config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY
});

const memory = new BufferMemory();
const chain = new ConversationChain({ llm, memory });

async function crearEscenario () {
  try {
    // const data = await fs.readFile('./prompt.txt', 'utf-8');
    const data = await fs.readFile('./birthdays.json', 'utf-8');
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return '';
  }
}

async function msj1 (escenario) {
  const res1 = await chain.call({ input: escenario });
  // Display first response from AI
  // console.log({ res1 });
  return res1;
}

async function iniciarConversacion () {
  const escenario = await crearEscenario();
  return await msj1(escenario);
}

async function consultar(prompt) {
  const res1 = await chain.call({ input: prompt });
  return res1;
}

async function recibirMsj (input) {
  console.log(input)
  if (input.toLowerCase() === 'salir') {
    console.log("Terminar");
    process.exit(0);
  } else {
    await consultar(input);
    recibirMsj();
  }
}

// iniciarConversacion();
// recibirMsj();

module.exports = {
  crearEscenario,
  msj1,
  consultar,
  recibirMsj
};

// END OPENAI API
