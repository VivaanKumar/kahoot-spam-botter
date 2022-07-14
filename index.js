//CREATED BY VIVAAN KUMAR

const Kahoot = require("./scripts");
var prompt = require("prompt");
let client = [];

prompt.start();

prompt.get(["pin", "name", "bots"], async (err, result) => {
  let pin = result.pin;
  let name = result.name;
  let bot_amount = result.bots;

  if (pin == "" || !pin || pin == null || pin == " ") {
    console.log("Add a proper pin!");
  } else if (name.length == 0 || name == " " || name == "") {
    console.log("Name is too short!");
  } else if (Number(bot_amount) > 200) {
    console.log("Bot count too big - less than 250 only");
  } else if (bot_amount == "" || bot_amount == "0") {
    console.log("Bot amount is not a number or is 0");
  } else {
    console.log(`Configuring and joining ${Number(bot_amount)} bots`);
    for (let i = 0; i < Number(bot_amount); i++) {

      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`${name} (${i}) is joining`);
      client.push(new Kahoot());
      //
      client[i].join(pin, `${name}-${i}`).catch((error) => {
        console.log(`There was an error for bot: ${name} (${i}) ->`, error);
      });

      client[i].on("Joined", () => {
        console.log(`${name} (${i}) has joined the Kahoot!`);
      });
      client[i].on("QuizStart", () => {
        console.log(`The quiz has started for ${name} (${i})!`);
      });
      client[i].on("QuestionStart", (question) => {
        const randomChoice = Math.floor(
          Math.random() * question.numberOfChoices
        );
        console.log(
          `A new question has started for ${name} (${i}), answering answer ${
            randomChoice + 1
          }.`
        );
        question.answer(randomChoice);
      });
      client[i].on("QuizEnd", () => {
        console.log(`The quiz has ended for ${name} (${i}).`);
      });

      client[i].on("Disconnect", (reason) => {
        console.log(`${name} (${i}) has disconnected for: `, reason);
      });
    }
  }
});
