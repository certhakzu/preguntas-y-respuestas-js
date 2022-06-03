
/**
 * Clase para definir un Concursante
 */
class Concursante {
    #nickname
    #won
    #answers
  
    constructor(nickname) {
      this.#nickname = nickname
      this.#won = false
      this.#answers = []
    }
  
    setNickname(nickname) {
      this.#nickname = nickname
    }
  
    getNickname() {
      return this.#nickname
    }
  
    getGameResult() {
      return this.#won
    }

    setPlayerVictory() {
      this.#won = true
    }
  
    /**
     * Manda la respuesta seleccionada
     * @param {String} answer La respuesta seleccionada
     */
    addAnswerChosen(answer) {
      this.#answers.push(answer)
    }
  
    /**
     * Devuelve la respuesta
     * @param {String} level El nivel de la Pregunta a la que pertenese la Respuesta
     * @returns La Respuesta
     */
    getCurrentAnswerByLevel(level) {
      return this.#answers[level]
    }
  }
  
  export default Concursante  