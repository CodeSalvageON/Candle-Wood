// Command Prompt Script

const cmd_form = document.getElementById("cmd-form");
const cmd = document.getElementById("cmd");
const output_display = document.getElementById("output-display");
const output = document.getElementById("output");
const oak_knoll = document.getElementById("oak-knoll");

let my_user = localStorage.getItem("candle_wood_user");

oak_knoll.onclick = function () {
  window.open("https://oak-knoll-www.codesalvageon.repl.co/", "", "width=301,height=601");
}

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
    output_display.innerHTML += "<p>scrape - webscrape a URL</p>";
  }

  else if (cmd_a.includes("js")) {
    let js_command = cmd.value.slice(2);

    if (js_command[0] === " ") {
      js_command = js_command.slice(1);
    }

    try {
      eval(js_command)
    }
    catch (error) {
      output_display.innerHTML += "<p>" + error + "</p>";
    }
    
    output_display.innerHTML += '<p>JavaScript script "' + js_command + '" evaluated.</p>';
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

          fetch ("/net", {
            method : "POST",
            headers : {
              "Content-Type" : "application/json" 
            }, 
            body : JSON.stringify({
              user : my_user,
              msg : context_msg
            })
          })
          .then(response => response.text())
          .then(data => {
            console.log(data);

            fetch ("/net")
            .then(response => response.text())
            .then(data => {
              output_display.innerHTML += "<p>" + data + "</p>";
            })
            .catch(error => {
              output_display.innerHTML += "<p>" + error + "</p>";
            })
          })
          .catch(error => {
            output_display.innerHTML += "<p>" + error + "</p>";
          });
        }
      }
    }

    else if (cmd_a.includes("net get")) {
      if (cmd_a === "net get") {
        fetch ("/net")
        .then(response => response.text())
        .then(data => {
          output_display.innerHTML += "<p>" + data + "</p>";
        })
        .catch(error => {
          output_display.innerHTML += "<p>" + error + "</p>";
        });
      }

      else {
        output_display.innerHTML += "<p>No parameters found for command net get.</p>";
      }
    }

    else if (cmd_a.includes("net set")) {
      if (cmd_a === "net set") {
        output_display.innerHTML += "<p>Try setting a local user, i.e. net set example</p>";
      }

      else {
        const new_local_user = cmd.value.replace("net set", "");
        localStorage.setItem("candle_wood_user", new_local_user);
        my_user = new_local_user;

        output_display.innerHTML += "<p>Set network user to " + my_user + "</p>";
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

    else if (cmd_a === "local") {
      output_display.innerHTML += "<p>--local</p>";
      output_display.innerHTML += "<p>Try</p>";
      output_display.innerHTML += "<p>local check (checks if you have internet connection)</p>";
      output_display.innerHTML += "<p>local time (checks the current date time)</p>";
      output_display.innerHTML += "<p>local client (checks the current browser client)</p>";
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