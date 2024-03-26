const { takeEvery } = require("redux-saga/effects");
const { buscarItens } = require("store/reducers/itens");

function* observarItems() {
  yield console.log("Observando Itens"); // remove logs
}

export function* itemsSaga() {
  yield takeEvery(buscarItens, observarItems);
}
