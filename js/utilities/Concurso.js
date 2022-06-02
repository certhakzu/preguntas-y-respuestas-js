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

  continueGame() {
    this.#increaseScore();
    this.#nextLevel();
  }

  fixWinnerValues() {
    this.#currentLevel = 5;
    this.#score = 500;
  }

  fixLoserLevelDisplay() {
    this.#currentLevel += 1;
  }

  #nextLevel() {
    if (this.#currentLevel < 4) {
      this.#currentLevel += 1;
    }
  }

  #increaseScore() {
    const INCREMENTO = 100;
    this.#score += INCREMENTO;
  }

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
