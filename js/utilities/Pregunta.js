/**
 * Clase para gestionar las Preguntas
 */
class Pregunta {
    #question
    /**
     * @param {String} questionsByLevel Nivel de la pregunta (categoria)
     */
    constructor(questionsByLevel) {
      this.#question = this.getRandomQuestion(questionsByLevel)
    }
  
    getQuestion() {
      return this.#question
    }
  
    getQuestionTitle() {
      return this.#question.question
    }
  
    getCorrectAnswer() {
      return this.#question.correctAnswer
    }
  
    getAnswersArray() {
      return this.#question.answers
    }
  
    getRandomQuestion(questionArray) {
      const random = this.#generateRandomNumber(questionArray.length)
      return questionArray[random]
    }
  
    #generateRandomNumber(n) {
      return Math.floor(Math.random() * n)
    }
  }
  
  export default Pregunta