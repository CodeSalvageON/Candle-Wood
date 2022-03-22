// Command Prompt Script

const cmd_form = document.getElementById("cmd-form");
const cmd = document.getElementById("cmd");
const output_display = document.getElementById("output-display");
const output = document.getElementById("output");

cmd_form.onsubmit = function () {
  event.preventDefault();
  let cmd_a = cmd.value.toLowerCase();

  output_display.innerHTML += "<p>A> " + cmd.value + "</p>";

  if (cmd_a.includes("help")) {
    output_display.innerHTML += "<p>js - execute javascript commands</p>";
    output_display.innerHTML += "<p>rover - tamper with Rover's memory storage</p>";
    output_display.innerHTML += "<p>net - check the Candle Wood server</p>";
    output_display.innerHTML += "<p>local - local network settings</p>";
    output_display.innerHTML += "<p>download - download your calculator state</p>";
    output_display.innerHTML += "<p>upload - upload and load your calculator state</p>";
    output_display.innerHTML += "<p>outlet - get widgets from the Exurb Imperium</p>";
    output_display.innerHTML += "<p>cls - clear the screen</p>";
  }
      
  else if (cmd_a.includes("rover")) {
    if (cmd_a === "rover ") {
    }
  }

  else if (cmd_a.includes("net")) {
    if (cmd_a === "net check") {
      fetch ("/")
      .then(response => response.text())
      .then(data => {
        if (data.includes("404")) {
          output_display.innerHTML += "<p>Server not found (404)</p>";
        }

        else {
          output_display.innerHTML += "<p>Server online</p>";
        }
      })
      .catch(error => {
        output_display.innerHTML += "<p>" + error + "</p>";
      });
    }

    else if (cmd_a.includes("net send")) {
      if (cmd_a === "net send") {
        output_display.innerHTML += "<p>Try sending something, like net send example</p>";
      }

      else {
        const net_send_msg = cmd_a.split("net send");  

        if (net_send_msg.length > 2) {
          output_display.innerHTML += "<p>Cannot have two net send commands in one command</p>";
        }

        else {
          const context_msg = net_send_msg[1];
          
        }
      }
    }

    else if (cmd_a.includes("net get")) {
      if (cmd_a === "net get") {
        
      }

      else {
        output_display.innerHTML += "<p>No parameters found for command net get.</p>";
      }
    }

    else {
      output_display.innerHTML += "<p>--net</p>";
      output_display.innerHTML += "<p>Try</p>";
      output_display.innerHTML += "<p>net check (checks if the Candle Wood server is online or not) </p>";
      output_display.innerHTML += "<p>net send (sends a message to the Candle Wood server, i.e. net send example)</p>";
      output_display.innerHTML += "<p>net get (gets the current server message)</p>";
      output_display.innerHTML += "<p>net set (sets the user handle for the net send command)</p>";
    }
  }

  else if (cmd_a.includes("local")) {
    if (cmd_a === "local check") {
       const isOnline = navigator.onLine;

       if (isOnline) {
        output_display.innerHTML += "<p>You are online</p>";
      }

      else {
        output_display.innerHTML += "<p>You are offline</p>";
      }
    }

    else if (cmd_a === "local time") {
      const localTime = new Date();

      output_display.innerHTML += localTime;
    }

    else if (cmd_a === "local client") {
      const navApp = navigator.appVersion;

      output_display.innerHTML += navApp;
    }

    else {
      output_display.innerHTML += "<p>--local</p>";
      output_display.innerHTML += "<p>Try</p>";
      output_display.innerHTML += "<p>local check (checks if you have internet connection)</p>";
      output_display.innerHTML += "<p>local time (checks the current date time)</p>";
      output_display.innerHTML += "<p>local client (checks the current browser client)</p>";
    }
  }

  else if (cmd_a.includes("download")) {
    
  }

  else if (cmd_a.includes("upload")) {}

  else if (cmd_a.includes("outlet")) {
    
  }

  else if (cmd_a.includes("cls")) {
    if (cmd_a.includes("cls ") || cmd_a.length > 3) {
      output_display.innerHTML += "<p>No parameters found for command cls</p>";
    }

    else {
      output_display.innerHTML = "";
    }
  }

  else {
    output_display.innerHTML += "<p>" + cmd.value + "?</p>";
  }

  cmd.value = "";
  output.scrollTo(0, output.scrollHeight);
}