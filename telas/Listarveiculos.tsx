import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";

import {
  listarVeiculos,
  listarClientes,
} from "../servicos/api";

type Veiculo = {
  id: string;
  clienteId: string;
  marca: string;
  modelo: string;
  ano: string;
  placa: string;
};

type Cliente = {
  id: string;
  nome: string;
};

type Props = {
  navegar: (pagina: string) => void;
};

export default function ListarVeiculos({ navegar }: Props) {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarVeiculos() {
    try {
      setErro("");

      // Busca os veículos e os clientes na API.
      const [dadosVeiculos, dadosClientes] = await Promise.all([
        listarVeiculos(),
        listarClientes(),
      ]);

      setVeiculos(dadosVeiculos);
      setClientes(dadosClientes);
    } catch {
      setErro("Não foi possível carregar os veículos e clientes.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarVeiculos();
  }, []);

  return (
    <View className="flex-1 bg-slate-950">
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        {/* Botão para voltar ao início */}
        <Pressable
          className="mb-6 self-start rounded-lg bg-slate-800 px-4 py-2"
          onPress={() => navegar("Inicio")}
        >
          <Text className="font-semibold text-white">
            ← Voltar ao início
          </Text>
        </Pressable>

        {/* Botão para cadastrar veículo */}
        <Pressable
          className="mb-6 items-center rounded-xl bg-blue-600 p-4"
          onPress={() => navegar("CadastrarVeiculo")}
        >
          <Text className="font-bold text-white">
            + Cadastrar veículo
          </Text>
        </Pressable>

        <Text className="mb-2 text-3xl font-bold text-white">
          Veículos
        </Text>

        <Text className="mb-6 text-slate-400">
          Veículos cadastrados na oficina.
        </Text>

        {/* Indicador de carregamento */}
        {carregando ? (
          <ActivityIndicator size="large" color="#60a5fa" />
        ) : erro ? (
          /* Mensagem de erro */
          <Text className="text-red-400">{erro}</Text>
        ) : veiculos.length === 0 ? (
          /* Mensagem quando não há veículos */
          <Text className="text-slate-400">
            Nenhum veículo cadastrado.
          </Text>
        ) : (
          /* Lista de veículos */
          veiculos.map((veiculo) => (
            <View
              key={veiculo.id}
              className="mb-3 rounded-xl border border-slate-800 bg-slate-900 p-4"
            >
              <Text className="text-lg font-bold text-white">
                {veiculo.marca} {veiculo.modelo}
              </Text>

              <Text className="mt-2 text-slate-300">
                Placa: {veiculo.placa}
              </Text>

              <Text className="mt-1 text-slate-300">
                Ano: {veiculo.ano}
              </Text>

              <Text className="mt-1 text-slate-400">
                Cliente:{" "}
                {clientes.find(
                  (cliente) => cliente.id === veiculo.clienteId
                )?.nome ?? "Cliente não encontrado"}
              </Text>

              <Text className="mt-1 text-slate-400">
                ID do cliente: {veiculo.clienteId}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}