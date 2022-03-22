// Command Prompt Script

const cmd_form = document.getElementById("cmd-form");
const cmd = document.getElementById("cmd");
const output_display = document.getElementById("output-display");

cmd_form.onsubmit = function () {
  event.preventDefault();
  let cmd_a = cmd.value.toLowerCase();

  output_display.innerHTML += "<p>A> " + cmd.value + "</p>";

  switch (cmd_a) {
    case "help":
      output_display.innerHTML += "<p>js - execute javascript commands</p>";
      output_display.innerHTML += "<p>rover - tamper with Rover's memory storage</p>";
  }
  cmd.value = "";
}