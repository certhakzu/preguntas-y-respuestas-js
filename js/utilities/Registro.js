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

  readPreviousHistory() {
    const localStoredArray = localStorage.getItem("savedData");
    if (localStoredArray) {
      const parsedArray = JSON.parse(localStoredArray);
      return parsedArray;
    }
    return [];
  }

  saveToLocalStorage(concurso) {
    const filterData = this.extractImportantData(concurso);
    const currentSave = this.readPreviousHistory();
    const newSave = [...currentSave, filterData];
    const historyArray = JSON.stringify(newSave);
    localStorage.setItem("savedData", historyArray);
  }

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
