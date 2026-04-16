let currentState = welcoming;
let booking = {};

export function handleInput(sInput) {
  const input = sInput.trim();
  return currentState(input);
}

export function clearInput() {
  currentState = welcoming;
  booking = {};
}

function welcoming() {
  let aReturn = [];
  currentState = serviceChoice;
  aReturn.push("Welcome to Emma's Hair Salon.");
  aReturn.push("What service would you like today?");
  aReturn.push("Options: Buzz cut or Regular cut.");
  return aReturn;
}

function serviceChoice(sInput) {
  let aReturn = [];
  const lowerInput = sInput.toLowerCase();

  if (lowerInput === "buzz cut") {
    booking.service = "Buzz cut";
    currentState = bladeChoice;
    aReturn.push("Great choice.");
    aReturn.push("What blade would you like?");
    aReturn.push("Options: 1 blade or 2 blade.");
    return aReturn;
  }

  if (lowerInput === "regular cut") {
    booking.service = "Regular cut";
    booking.blade = "Not needed";
    currentState = upsellChoice;
    aReturn.push("Perfect. You selected a Regular cut.");
    aReturn.push("Would you like shampoo to take home with you?");
    aReturn.push("Reply YES or NO.");
    return aReturn;
  }

  aReturn.push("Please choose Buzz cut or Regular cut.");
  return aReturn;
}

function bladeChoice(sInput) {
  let aReturn = [];
  const lowerInput = sInput.toLowerCase();

  if (lowerInput === "1 blade") {
    booking.blade = "1 blade";
    currentState = upsellChoice;
    aReturn.push("Nice. You selected a Buzz cut with 1 blade.");
    aReturn.push("Would you like shampoo to take home with you?");
    aReturn.push("Reply YES or NO.");
    return aReturn;
  }

  if (lowerInput === "2 blade") {
    booking.blade = "2 blade";
    currentState = upsellChoice;
    aReturn.push("Nice. You selected a Buzz cut with 2 blade.");
    aReturn.push("Would you like shampoo to take home with you?");
    aReturn.push("Reply YES or NO.");
    return aReturn;
  }

  aReturn.push("Please choose 1 blade or 2 blade.");
  return aReturn;
}

function upsellChoice(sInput) {
  let aReturn = [];
  const lowerInput = sInput.toLowerCase();

  if (lowerInput === "yes") {
    booking.shampoo = "Yes";
  } else if (lowerInput === "no") {
    booking.shampoo = "No";
  } else {
    aReturn.push("Please reply YES or NO.");
    return aReturn;
  }

  currentState = welcoming;

  aReturn.push("Thanks. Your appointment request has been saved.");
  aReturn.push(`Service: ${booking.service}`);
  if (booking.service === "Buzz cut") {
    aReturn.push(`Blade: ${booking.blade}`);
  }
  aReturn.push(`Take-home shampoo: ${booking.shampoo}`);
  aReturn.push("Type anything to start another booking.");

  booking = {};
  return aReturn;
}