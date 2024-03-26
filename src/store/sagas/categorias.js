import { call, delay, put, takeLatest } from "redux-saga/effects";
import {
  adicionarTodasAsCategorias,
  carregarCategorias,
} from "store/reducers/categorias";
import { createStandaloneToast } from "@chakra-ui/toast";
import categoriasService from "services/categorias";

const { toast } = createStandaloneToast();

function* observarCategorias() {
  toast({
    title: "Carregando",
    description: "Carregando categorias",
    status: "loading",
    duration: 2000,
    isClosable: true,
  });
  try {
    yield delay(1000);
    const categotias = yield call(categoriasService.buscar);

    yield put(adicionarTodasAsCategorias(categotias));
  } catch (e) {
    console.error("error updating", e);

    toast({
      title: "Erro",
      description: "Erro na busca de categorias",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  } finally {
  }
}

export function* categoriasSaga() {
  const tarefa = yield takeLatest(carregarCategorias, observarCategorias);

  yield takeLatest(adicionarTodasAsCategorias, () => {
    toast({
      title: "Sucesso!",
      description: "Categorias carregadas com sucesso!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    tarefa.cancel();
  });
}
