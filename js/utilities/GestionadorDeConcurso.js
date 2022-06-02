import { nivelUno } from '../../storage/PrimerNivel.js'
import { nivelDos } from '../../storage/SegundoNivel.js'
import { nivelTres } from '../../storage/TercerNivel.js'
import { nivelCuatro } from '../../storage/CuartoNivel.js'
import { nivelCinco } from '../../storage/QuintoNivel.js'

import Mostrar from './Mostrar.js'
import Concurso from './Concurso.js'
import Registro from './Registro.js'
import Concursante from './Concursante.js'
import Pregunta from './Pregunta.js'

const preguntas = [
  new Pregunta(nivelUno),
  new Pregunta(nivelDos),
  new Pregunta(nivelTres),
  new Pregunta(nivelCuatro),
  new Pregunta(nivelCinco),
];

const singleGameInstance = new Concurso(preguntas, new Concursante('defaultUser'));
const singleDisplayInstance = new Mostrar();

class GestionadorDeConcurso {
  constructor() {}

  startNewGame() {
    singleDisplayInstance.nickNameScreen(singleGameInstance, this.startGameButtonCallback, this.historyButtonCallback);
  }

  startGameButtonCallback() {
    singleDisplayInstance.questionScreen(singleGameInstance);
  }
  historyButtonCallback() {
    const registro = new Registro();
    singleDisplayInstance.historyScreen(registro);
  }

  questionScreenManager() {
    singleDisplayInstance.questionScreen(singleGameInstance);
  }
};

export default GestionadorDeConcurso;
