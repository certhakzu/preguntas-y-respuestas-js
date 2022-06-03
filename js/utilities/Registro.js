/**
 * Clase de Registro
 */
class Registro {
  #historyArray;
  constructor() {
    this.#historyArray = [];
  }

  getHistory() {
    return this.readPreviousHistory();
  }

  pushToHistory(concurso) {
    const filterData = this.extractImportantData(concurso);
    this.#historyArray.push(filterData);
  }

  /**
   * Lee y carga los score anteriores
   * @returns Array con el historico de score anterior
   */
  readPreviousHistory() {
    const localStoredArray = localStorage.getItem("savedData");
    if (localStoredArray) {
      const parsedArray = JSON.parse(localStoredArray);
      return parsedArray;
    }
    return [];
  }

  /**
   * Guarda el score en el Local Storage del Navegador
   * @param {Concurso} concurso El concurso en ejecucion
   */
  saveToLocalStorage(concurso) {
    const filterData = this.extractImportantData(concurso);
    const currentSave = this.readPreviousHistory();
    const newSave = [...currentSave, filterData];
    const historyArray = JSON.stringify(newSave);
    localStorage.setItem("savedData", historyArray);
  }

  /**
   * Importa los score
   * @param {Concurso} concurso El Concurso en ejecución
   * @returns un objecto con los datos del score
   */
  extractImportantData(concurso) {
    const score = concurso.showScore();
    const maxLevel = concurso.getCurrentLevel();
    const didWin = concurso.getPlayer().getGameResult();
    const nickname = concurso.getPlayer().getNickname();
    const data = { score, maxLevel, didWin, nickname };
    return data;
  }
}
export default Registro;
