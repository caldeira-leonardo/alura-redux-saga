export default async function criarTarefa({
  fork,
  dispatch,
  busca,
  action,
  textoCarregando,
  textoSucesso,
  textoErro,
}) {
  const tarefa = fork(async (api) => {
    await api.delay(1000);
    return await busca();
  });

  const resposta = await tarefa.result;

  if (resposta.status === "ok") {
    dispatch(action(resposta.value));
  }

  if (resposta.status === "rejected") {
  }

  return resposta;
}
