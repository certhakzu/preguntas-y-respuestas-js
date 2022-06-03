import Registro from "./Registro.js";

/**
 * Clase para gestionar toda la parte visual del juego, es aqui donde se crea el HTML
 */
class Mostrar {
  constructor() {}

  /**
   * 
   * @returns Todo el elemento contenedor de la pregunta con sus respuestas, como tal.
   */
  #generateInnerRoot() {
    const innerRoot = document.createElement("div");
    innerRoot.id = "inner-root";
    return innerRoot;
  }

  #generateCardTitle() {
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    return cardTitle;
  }

  #generateCardText() {
    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    return cardText;
  }

  /**
   * Genera el Boton para continuar
   * @returns Boton Coninuar
   */
  #generateContinueButton() {
    const continueButton = document.createElement("button");
    continueButton.classList.add("btn", "btn-success");
    return continueButton;
  }

  /**
   * Genra un boton con una opcion de respuesta
   * @param {String} buttonText Genera boton que representa una de las opciones de respuesta
   * @returns el boton coomo una opcion de respuesta
   */
  #generateAnswerButton(buttonText) {
    const answerButton = document.createElement("button");
    answerButton.classList.add("list-group-item", "list-group-item-action");
    answerButton.innerText = buttonText;
    answerButton.value = buttonText;
    return answerButton;
  }

  #selectRootReference() {
    const root = document.querySelector("#root");
    return root;
  }

  #generateTableHead(thText) {
    const th = document.createElement("th");
    th.innerText = thText;
    return th;
  }

  welcomeScreen(startButtonCallback) {
    this.erase();
    const root = this.#selectRootReference();
    const innerRoot = this.#generateInnerRoot();

    const cardTitle = this.#generateCardTitle();
    cardTitle.innerText = "BIENVENIDO";

    const cardText = this.#generateCardText();

    const startGameButton = this.#generateContinueButton();
    startGameButton.innerText = "EMPEZAR";
    startGameButton.addEventListener("click", startButtonCallback);
    innerRoot.append(cardTitle);
    innerRoot.append(cardText);
    innerRoot.append(startGameButton);
    root.append(innerRoot);
  }

  /**
   * Muestra el historial de los jugadoresss
   * @param {Registro} registro Registro con todos los score
   */
  historyScreen(registro) {
    this.erase();
    const registros = registro.getHistory();
    console.log(registros);
    let file = "";
    const root = this.#selectRootReference();
    const innerRoot = this.#generateInnerRoot();
    const h5 = this.#generateCardTitle();
    h5.innerText = "HISTORIAL DE PARTIDAS";
    const table = document.createElement("table");
    table.classList.add("table");
    const tHead = document.createElement("thead");
    const tr = document.createElement("tr");
    const th1 = this.#generateTableHead("#");
    const th2 = this.#generateTableHead("Puntos");
    const th3 = this.#generateTableHead("Nombre de Usuario");
    const th4 = this.#generateTableHead("Ronda");
    const th5 = this.#generateTableHead("¿Ganó?");
    const tBody = document.createElement("tbody");
    tBody.id = "tbody";

    const orderedArray = registros.sort((a, b) => b.score - a.score);
    for (let i = 0; i < orderedArray.length; i++) {
      file += `<tr><td>${i + 1}</td>
                      <td>${registros[i].score}</td>
                      <td>${registros[i].nickname.toUpperCase()}</td>
                       <td>${registros[i].maxLevel}</td>
                       <td>${registros[i].didWin ? "Si" : "No"}</td></tr>`;
    }

    const homeButton = document.createElement("button");
    homeButton.classList.add("btn", "btn-info");
    homeButton.innerText = "INICIO ";
    homeButton.addEventListener("click", () => location.reload());

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    tHead.appendChild(tr);
    table.appendChild(tHead);
    table.appendChild(tBody);
    tBody.innerHTML = file;
    innerRoot.appendChild(h5);
    innerRoot.appendChild(table);
    innerRoot.appendChild(homeButton);
    root.appendChild(innerRoot);
  }

  /**
   * Establece y muestra todo el "ambiente" del concurso, donde se "moveran" las preguntas
   * @param {Concurso} concurso El concurso en curso
   */
  questionScreen(concurso) {
    this.erase();
    const registro = new Registro();
    const root = this.#selectRootReference();
    const innerRoot = this.#generateInnerRoot();
    const currentQuestion = concurso.getCurrentQuestion();
    const questionText = currentQuestion.getQuestionTitle();
    const answersArray = currentQuestion.getAnswersArray();

    const cardTitle = this.#generateCardTitle();
    cardTitle.innerText = `NIVEL ${concurso.getCurrentLevel() + 1}`;

    const cardText = this.#generateCardText();
    cardText.classList.add("fw-bold");
    cardText.innerText = questionText;

    const divAnswerButton = document.createElement("div");
    divAnswerButton.classList.add("list-group");

    for (let answer of answersArray) {
      const answerButton = this.#generateAnswerButton(answer);
      answerButton.addEventListener("click", function () {
        const isCorrect = concurso.validateAnswer(this.value);
        const currentLevel = concurso.getCurrentLevel();
        if (isCorrect && currentLevel === 4) {
          concurso.getPlayer().setPlayerVictory();
          concurso.fixWinnerValues();
          Registro.saveToLocalStorage(concurso);
          innerDisplay.winnerScreen();
        } else if (isCorrect) {
          concurso.continueGame();
          const didContinue = confirm("Deseas Continuar?");
          if (didContinue) {
            innerDisplay.questionScreen(concurso);
          } else {
            registro.saveToLocalStorage(concurso);
            location.reload();
          }
        } else {
          concurso.setLoserScore();
          concurso.fixLoserLevelDisplay();
          registro.saveToLocalStorage(concurso);
          innerDisplay.loserScreen(() => location.reload());
        }
      });

      divAnswerButton.append(answerButton);
    }
    innerRoot.append(cardTitle);
    innerRoot.append(cardText);
    innerRoot.append(divAnswerButton);
    root.append(innerRoot);
  }

  /**
   * Muestra los elementos cuando se gana
   */
  winnerScreen() {
    this.erase();
    const root = this.#selectRootReference();
    const innerRoot = this.#generateInnerRoot();

    const cardTitle = document.createElement("h6");
    cardTitle.classList.add("card-title");
    cardTitle.classList.add("alert", "alert-success");
    cardTitle.innerText = `FELICIDADES, GANASTE!!!`;

    const cardText = this.#generateCardText();
    cardText.classList.add("fw-bold");
    cardText.innerText = "Haz respondido todas las preguntas bien!";

    const homeButton = document.createElement("button");
    homeButton.classList.add("btn", "btn-info");
    homeButton.innerText = "INICIO ";
    homeButton.addEventListener("click", () => location.reload());

    innerRoot.append(cardTitle);
    innerRoot.append(cardText);
    innerRoot.append(homeButton);
    root.append(innerRoot);
  }

  /**
   * Muestra los elementos cuando se pierde
   */
  loserScreen(callback) {
    this.erase();
    const root = this.#selectRootReference();
    const innerRoot = this.#generateInnerRoot();

    const cardTitle = this.#generateCardTitle();
    cardTitle.classList.add("alert", "alert-danger");
    cardTitle.innerText = "RESPUESTA INCORRECTA";

    const cardText = this.#generateCardText();
    cardText.classList.add("fw-bold");
    cardText.innerText = "PERDISTE! INTENTALO NUEVAMENTE!!!.";

    const finishButton = document.createElement("button");
    finishButton.classList.add("btn", "btn-danger");
    finishButton.innerText = "FINALIZAR";
    finishButton.addEventListener("click", callback);

    innerRoot.append(cardTitle);
    innerRoot.append(cardText);
    innerRoot.append(finishButton);
    root.append(innerRoot);
  }

  nickNameScreen(concurso, startButtonCallback, historyButtonCallback) {
    this.erase();
    const root = this.#selectRootReference();
    const innerRoot = this.#generateInnerRoot();

    const cardText = this.#generateCardText();
    cardText.classList.add("fw-bold");
    cardText.innerText = "Escribe tu Nombre de Usuario:";

    const divInput = document.createElement("div");
    divInput.classList.add("form-floating", "mb-3", "d-inline-flex");

    const nicknameInput = document.createElement("input");
    nicknameInput.classList.add("form-control");
    nicknameInput.setAttribute("type", "Text");
    nicknameInput.setAttribute("placeholder", "Nombre de usuario");
    nicknameInput.id = "nickname";
    nicknameInput.classList.add("form-control");
    nicknameInput.required = true;

    const nicknameLabel = document.createElement("label");

    const divButton = document.createElement("div");
    divButton.classList.add("d-flex", "justify-content-between");

    const gameHistoryButton = document.createElement("button");
    gameHistoryButton.classList.add("btn", "btn-info");
    gameHistoryButton.innerText = "HISTORIAL DEL JUEGO";
    gameHistoryButton.addEventListener("click", historyButtonCallback);

    const continueButton = this.#generateContinueButton();
    continueButton.innerText = "CONTINUAR";
    continueButton.addEventListener("click", function () {
      if (nicknameInput.value) {
        concurso.getPlayer().setNickname(nicknameInput.value);
        innerDisplay.welcomeScreen(startButtonCallback);
      } else {
        divInput.setAttribute("style", "border: solid red");
      }
    });

    nicknameInput.addEventListener("click", function () {
      divInput.removeAttribute("style");
    });

    divButton.append(gameHistoryButton);
    divButton.append(continueButton);

    divInput.append(nicknameInput);
    divInput.append(nicknameLabel);
    innerRoot.append(cardText);
    innerRoot.append(divInput);
    const br = document.createElement("span");
    br.innerHTML = "<br/>";
    innerRoot.append(br);
    // innerRoot.append(continueButton)
    innerRoot.append(divButton);
    root.append(innerRoot);
  }

  /**
   * Limpia el elemento base donde sucde el juego
   */
  erase() {
    const innerRoot = document.querySelector("#inner-root");
    if (innerRoot) {
      innerRoot.remove();
    }
  }
}
export default Mostrar;

const innerDisplay = new Mostrar();
