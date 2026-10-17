const API_URL = "http://10.66.178.52:3000";

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

export async function consultarCliente(id: string) {
  const resposta = await fetch(`${API_URL}/clientes/${id}`);

  if (!resposta.ok) {
    throw new Error("Não foi possível consultar o cliente.");
  }

  return await resposta.json();
}

export async function atualizarCliente(
  id: string,
  cliente: {
    nome: string;
    telefone: string;
    email: string;
  }
) {
  const resposta = await fetch(`${API_URL}/clientes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível atualizar o cliente.");
  }

  return await resposta.json();
}

export async function excluirCliente(id: string) {
  const resposta = await fetch(`${API_URL}/clientes/${id}`, {
    method: "DELETE",
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível excluir o cliente.");
  }
}

//----------Veiculos----------\\
export async function listarVeiculos() {
  const resposta = await fetch(`${API_URL}/veiculos`);

  if (!resposta.ok) {
    throw new Error("Não foi possível buscar os veículos.");
  }

  return await resposta.json();
}

export async function consultarVeiculo(id: string) {
  const resposta = await fetch(`${API_URL}/veiculos/${id}`);

  if (!resposta.ok) {
    throw new Error("Não foi possível consultar o veículo.");
  }

  return await resposta.json();
}

export async function cadastrarVeiculo(veiculo: {
  clienteId: string;
  marca: string;
  modelo: string;
  ano: string;
  placa: string;
}) {
  const resposta = await fetch(`${API_URL}/veiculos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(veiculo),
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível cadastrar o veículo.");
  }

  return await resposta.json();
}

export async function atualizarVeiculo(
  id: string,
  veiculo: {
    clienteId: string;
    marca: string;
    modelo: string;
    ano: string;
    placa: string;
  }
) {
  const resposta = await fetch(`${API_URL}/veiculos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(veiculo),
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível atualizar o veículo.");
  }

  return await resposta.json();
}

export async function excluirVeiculo(id: string) {
  const resposta = await fetch(`${API_URL}/veiculos/${id}`, {
    method: "DELETE",
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível excluir o veículo.");
  }
}

// --- ORDENS DE SERVIÇO ---

export async function listarOrdensServico() {
  const resposta = await fetch(`${API_URL}/ordens-servico`);

  if (!resposta.ok) {
    throw new Error("Não foi possível buscar as ordens de serviço.");
  }

  return await resposta.json();
}

export async function consultarOrdemServico(id: string) {
  const resposta = await fetch(`${API_URL}/ordens-servico/${id}`);

  if (!resposta.ok) {
    throw new Error("Não foi possível consultar a ordem de serviço.");
  }

  return await resposta.json();
}

export async function cadastrarOrdemServico(ordem: {
  veiculoId: string;
  descricao: string;
}) {
  const resposta = await fetch(`${API_URL}/ordens-servico`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ordem),
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível cadastrar a ordem de serviço.");
  }

  return await resposta.json();
}

export async function atualizarOrdemServico(
  id: string,
  ordem: {
    veiculoId: string;
    descricao: string;
    status: string;
  }
) {
  const resposta = await fetch(`${API_URL}/ordens-servico/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ordem),
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível atualizar a ordem de serviço.");
  }

  return await resposta.json();
}

export async function excluirOrdemServico(id: string) {
  const resposta = await fetch(`${API_URL}/ordens-servico/${id}`, {
    method: "DELETE",
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível excluir a ordem de serviço.");
  }
}
