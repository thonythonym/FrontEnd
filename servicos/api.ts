const API_URL = "http://10.177.0.52:3000";

export async function listarClientes() {
  const resposta = await fetch(`${API_URL}/clientes`);

  if (!resposta.ok) {
    throw new Error("Não foi possível buscar os clientes.");
  }

  return await resposta.json();
}

export async function cadastrarCliente(cliente: {
  nome: string;
  telefone: string;
  email: string;
}) {
  const resposta = await fetch(`${API_URL}/clientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível cadastrar o cliente.");
  }

  return await resposta.json();
}