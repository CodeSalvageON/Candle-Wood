// Command Prompt Script

const cmd_form = document.getElementById("cmd-form");
const cmd = document.getElementById("cmd");
const output_display = document.getElementById("output-display");
const output = document.getElementById("output");
const oak_knoll = document.getElementById("oak-knoll");
const radio_btn = document.getElementById("radio-btn");

const input_form = document.getElementById("input-form");
const type = document.getElementById("type");
const equation = document.getElementById("equation");

const image_form = document.getElementById("image-form");
const imageLoader = document.getElementById("imageLoader");
const imageCanvas = document.getElementById("image-canvas");
const ctx = imageCanvas.getContext('2d');

imageLoader.addEventListener('change', handleImage, false);
let wikipediaLoader = [];

function handleImage (e) {
  let reader = new FileReader();
  reader.onload = function (event) {
    let img = new Image();
    img.onload = function () {
      imageCanvas.width = img.width;
      imageCanvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    }
    
    img.src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);
}

image_form.onsubmit = function () {
  event.preventDefault();
  
  let dataUri = imageCanvas.toDataURL();
  output_display.innerHTML += "<p>Please wait a few seconds.</p>";

  Tesseract.recognize(
    dataUri,'eng',
  { logger: m => console.log(m) }
).then(({ data: { text } }) => {
  equation.value = text;
});
}

function encode(r){
  return r.replace(/[\x26\x0A\<>'"]/g,function(r){return"&#"+r.charCodeAt(0)+";"})
}

let my_user = localStorage.getItem("candle_wood_user");

const limitedEvaluate = math.evaluate;

const ngApp = document.querySelector(".ng-app-embedded");
document.querySelector(".ng-app-embedded").style.display = "none";

function cleanOutput (output_ex) {
  const no_space_x = output_ex.replace(" * x", "x");

  if (output.includes(" * x")) {
    return no_space_x;
  }

  else {
    return output_ex;
  }
}

oak_knoll.onclick = function () {
  window.open("https://oak-knoll-www.codesalvageon.repl.co/", "", "width=301,height=601");
}

cmd_form.onsubmit = function () {
  event.preventDefault();
  let cmd_a = HtmlSanitizer.SanitizeHtml(cmd.value.toLowerCase());

  output_display.innerHTML += "<p>A> " + encode(cmd.value) + "</p>";

  if (cmd_a.includes("help")) {
    output_display.innerHTML += "<p>js - execute javascript commands</p>";
    output_display.innerHTML += "<p>net - check the Candle Wood server</p>";
    output_display.innerHTML += "<p>local - local network settings</p>";
    output_display.innerHTML += "<p>download - download your calculator state</p>";
    output_display.innerHTML += "<p>upload - upload and load your calculator state</p>";
    output_display.innerHTML += "<p>cls - clear the screen</p>";
    output_display.innerHTML += "<p>scrape - webscrape a URL</p>";
    output_display.innerHTML += "<p>math - parse a math expression</p>";
    output_display.innerHTML += "<p>proxy - opens a new tab with a proxied url</p>";
    output_display.innerHTML += "<p>formula - download a formula's Wikipedia page</p>";
    output_display.innerHTML += "<p>load - load a download formula's Wikipedia page onto the calculator screen</p>";
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

  else if (cmd_a.includes("cls")) {
    if (cmd_a.includes("cls ") || cmd_a.length > 3) {
      output_display.innerHTML += "<p>No parameters found for command cls</p>";
    }

    else {
      output_display.innerHTML = "";
    }
  }

  else if (cmd_a.includes("scrape")) {
    const scrape_url = cmd_a.slice(6).replace(" ", "");

    if (scrape_url === "" || scrape_url === null || scrape_url === undefined) {
      output_display.innerHTML += "<p>Did you mean to scrape a url?</p>";
      cmd.value = "";
      return false;
    }

    fetch ("/scrape", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json" 
      },
      body : JSON.stringify({
        url : scrape_url 
      })
    })
    .then(response => response.text())
    .then(data => {
      output_display.innerHTML += "<p>" + data + "</p>";
      output_display.innerHTML += "<p> Scraped " + scrape_url + "</p>";
    })
    .catch(error => {
      output_display.innerHTML += "<p>" + error + "</p>";
    });
  }

  else if (cmd_a.includes("math")) {
    try {
      const expression = cmd_a.slice("4");

      output_display.innerHTML += "<p>" + math.simplify(expression) + "</p>"; 
    }

    catch (error) {
      output_display.innerHTML += "<p>" + error + "</p>";
      cmd.value = "";
    }
  }

  else if (cmd_a.includes("proxy")) {
    const proxy_url = cmd_a.slice("5");

    if (proxy_url === "" || proxy_url === null || proxy_url === undefined) {
      output_display.innerHTML += "<p>No URL specified. Try proxy https://google.com</p>";
    }

    else {
      output_display.innerHTML += "<p>ignore 'Deceptive site warning'</p>";
      window.open("https://borgcube.codesalvageon.repl.co/u/" + proxy_url.replace(" ", ""));
    }
  }

  else if (cmd_a.includes("formula")) {
    const formula_wikipedia = cmd_a.slice("7");
    const formula_page = formula_wikipedia.replace(" ", "");

    if (formula_page.includes("wiki")) {
      output_display.innerHTML += "<p>Downloading formula Wikipedia page...</p>";
      
      fetch ("/unsafescrape", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          url : formula_page
        })
      })
      .then(response => response.text())
      .then(data => {
        if (data.includes("does not have an article with this exact name.")) {
          output_display.innerHTML += "<p>Unable to download this Wikipedia page, because it does not exist.</p>";
        }

        else {
          wikipediaLoader.push(formula_page + ">/?}|\+=-;" + data);
          output_display.innerHTML += "<p>Downloaded Wikipedia page. However, it is advised that you download your calculator state.</p>";
        }
      })
      .catch(error => {
        output_display.innerHTML += "<p>" + error + "</p>";
      });
    }

    else {
      output_display.innerHTML += "<p>URL must be that of a Wikipedia page</p>";
    }
  }

  else if (cmd_a === "load") {
    output_display.innerHTML += "<p>Loading saved formulas...</p>";

    for (i = 0; i < wikipediaLoader.length; i++) {
      output_display.innerHTML += "<p>Save number: " + i + " (" + encode(wikipediaLoader[i].split(">/?}|\+=-;")[0]) + ")</p>";
    }

    output_display.innerHTML += "<p>Type load_page and the number of the save in order to load it. Example: load_page 0</p>";
  }

  else if (cmd_a.includes("load_page")) {
    const load_number = cmd_a.slice("9");

    if (load_number === "" || load_number === null || load_number === undefined) {
      output_display.innerHTML += "<p>Load was not found. Try load_page 0</p>";
    }

    else {
      let load_content = wikipediaLoader[parseInt(load_number)].split(">/?}|\+=-;")[1];

      if (load_content === "" || load_content === null || load_content === undefined) {
        output_display.innerHTML += "<p>Load was not found. Try using the load command and seeing all your current loads, or upload a calculator state that has one.</p>";
      }

      else {
        let loadTemplate = document.getElementsByClassName("load");

        output_display.innerHTML += "<section class='load'></section>";
        loadTemplate[loadTemplate.length - 1].innerHTML = load_content;
      }
    }
  }

  else {
    output_display.innerHTML += "<p>" + encode(cmd.value) + "?</p>";
  }

  cmd.value = "";
  output.scrollTo(0, output.scrollHeight);
}

let is_playing_radio = false;
const play_btn = document.querySelector(".rde-player-btn-play-pause");

radio_btn.onclick = function () {
  document.querySelector(".rde-player-btn-play-pause").click();
}

input_form.onsubmit = function () {
  event.preventDefault();

  output_display.innerHTML += "<p>" + encode(equation.value) + "</p>";

  if (type.value === "algebra") {
    try {
      let math_wrath = nerdamer.solve(equation.value, 'x').toString().replace(" * x", "x");

      if (math_wrath.includes("^")) {
        output_display.innerHTML += "<p>When two powers with the same base are multiplied together, the powers are added together and the base stays the same.</p>";
      }

      else {
        // Do nothing
      }
      
      output_display.innerHTML += "<p>" + math_wrath + "</p>";
    }

    catch (error) {
      output_display.innerHTML += "<p>" + error + "</p>";
    }

    output_display.innerHTML += "<p>Variables must be called 'x'.</p>";
  }

    else if (type.value === "simplify") {
      try {
        let math_wrath = math.simplify(equation.value).toString().replace(" * x", "x");

        if (math_wrath.includes("^")) {
          output_display.innerHTML += "<p>When two powers with the same base are multiplied together, the powers are added together and the base stays the same.</p>";
        }

        else {
          // Do nothing
        }
      
        output_display.innerHTML += "<p>" + math_wrath + "</p>";
      }

      catch (error) {
        output_display.innerHTML += "<p>" + error + "</p>";
      }
  }

  else if (type.value === "word") {
    const fixed_url = equation.value.replace(" ", "%20");

    fetch ("/unsafescrape", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        url : "https://www.google.com/search?q=" + fixed_url
      })
    })
    .then(response => response.text())
    .then(data => {
      const data_array = data.split("<a href=");
      const all_array = [];
      let turn = 0;

      for (i = 0; i < data_array.length; i++) {
        if (data_array[i].includes("https://")) {
          const link_array = data_array[i].split('"');

          if (turn === 0) {
            // PASS 
            turn = turn + 1;
          }

          else {
            all_array.push(link_array[1]);
          }
        }
      }

      let fifty_array = all_array.reverse();
 
      for (i = 0; i < fifty_array.length; i++) {
        output_display.innerHTML = output_display.innerHTML + "<p><a href='https://google.com" + fifty_array[i] + "' target='_blank'>" + fifty_array[i].replace("/url?q=", "") + "</a></p><hr/>";
      }

      if (data.includes("https://brainly") || data.includes("https://jishka") || data.includes("https://quora") || data.includes("https://wyzant")) {
        output_display.innerHTML += "<p>Likely answers found!</p>";
      }

      else {
        output_display.innerHTML += "<p>Answers may vary.</p>";
      }
      output.scrollTo(0, output.scrollHeight);
    })
    .catch(error => {
      output_display.innerHTML += "<p>" + error + "</p>";
      output.scrollTo(0, output.scrollHeight);
    });
  }

  else if (type.value === "graph") {
    try {
      let plot_expr = math.compile(equation.value);

      let xVals = math.range(-10, 10, 0.5).toArray();
      let yVals = xVals.map(function (x) {
        return plot_expr.evaluate({x: x})
      });

      let trace1 = {
        x : xVals,
        y : yVals,
        type : 'scatter'
      }
    
      let data = [trace1];
      let allPlots = document.getElementsByClassName("plot");
      output_display.innerHTML += "<p class='plot'></p>";
    
      Plotly.newPlot(allPlots[allPlots.length - 1], data);
   }
      
   catch (error) {
     output_display.innerHTML += "<p>" + error + "</p>";
   }
  }

  equation.value = "";
  output.scrollTo(0, output.scrollHeight);
}