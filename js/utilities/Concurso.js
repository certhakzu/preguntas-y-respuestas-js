/**
 * Clase para definir un Concurso
 */
class Concurso {
  #currentLevel;
  #questions;
  #player;
  #score;
  constructor(preguntas, concursante) {
    this.#currentLevel = 0;
    this.#questions = preguntas;
    this.#player = concursante;
    this.#score = 0;
  }

  /**
   * Método para validar la respuesta
   * @param {String} userInput La respuesta selecciona por el Concursante
   * @returns Boolean dependiendo de si es correcta o no
   */
  validateAnswer(userInput) {
    this.#player.addAnswerChosen(userInput);
    const userAnswer = this.#player.getCurrentAnswerByLevel(this.#currentLevel);
    const validAnswer = this.#questions[this.#currentLevel].getCorrectAnswer();
    return userAnswer === validAnswer;
  }

  retireWithCurrentPoints() {
    const currentGameInstance = this;
    return currentGameInstance;
  }

  /**
   * Método para continuar con el juego, incrementa el score y pasa de nivel
   */
  continueGame() {
    this.#increaseScore();
    this.#nextLevel();
  }

  /**
   * Método que establece el puntaje máximo, se usa solo cuando se gana el nivel 5
   */
  fixWinnerValues() {
    this.#currentLevel = 5;
    this.#score = 500;
  }

  /**
   * Método que establece los niveles
   */
  fixLoserLevelDisplay() {
    this.#currentLevel += 1;
  }

  /**
   * Método para cambiar al siguiente nivel (hasta el penultimo)
   */
  #nextLevel() {
    if (this.#currentLevel < 4) {
      this.#currentLevel += 1;
    }
  }

  /**
   * Método que incrementa el score en 100 puntos
   */
  #increaseScore() {
    const INCREMENTO = 100;
    this.#score += INCREMENTO;
  }

  /**
   * Metodo que establese el score de Concursante cuando pierde
   */
  setLoserScore() {
    this.#score = 0;
  }

  getCurrentLevel() {
    return this.#currentLevel;
  }

  showScore() {
    return this.#score;
  }

  getCurrentQuestion() {
    return this.#questions[this.#currentLevel];
  }

  getQuestions() {
    return this.#questions;
  }

  getPlayer() {
    return this.#player;
  }
}

export default Concurso;
