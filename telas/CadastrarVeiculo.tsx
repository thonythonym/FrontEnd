import { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import {
  listarClientes,
  cadastrarVeiculo,
} from "../servicos/api";

type Cliente = {
  id: string;
  nome: string;
};

type Props = {
  navegar: (pagina: string) => void;
};

export default function CadastrarVeiculo({ navegar }: Props) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteId, setClienteId] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [placa, setPlaca] = useState("");

  const [carregandoClientes, setCarregandoClientes] = useState(true);
  const [salvando, setSalvando] = useState(false);

  async function carregarClientes() {
    try {
      const dados = await listarClientes();
      setClientes(dados);
    } catch {
      Alert.alert(
        "Erro",
        "Não foi possível carregar os clientes."
      );
    } finally {
      setCarregandoClientes(false);
    }
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  async function salvarVeiculo() {
    if (!clienteId || !marca.trim() || !modelo.trim() ||
        !ano.trim() || !placa.trim()) {
      Alert.alert(
        "Atenção",
        "Preencha todos os campos e selecione um cliente."
      );
      return;
    }

    try {
      setSalvando(true);

      await cadastrarVeiculo({
        clienteId,
        marca: marca.trim(),
        modelo: modelo.trim(),
        ano: ano.trim(),
        placa: placa.trim().toUpperCase(),
      });

      Alert.alert("Sucesso", "Veículo cadastrado!");

      setMarca("");
      setModelo("");
      setAno("");
      setPlaca("");
      setClienteId("");

    } catch {
      Alert.alert(
        "Erro",
        "Não foi possível cadastrar o veículo. Verifique o cliente associado e a conexão com a API."
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <View className="flex-1 bg-slate-950">
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Pressable
          className="mb-6 self-start rounded-lg bg-slate-800 px-4 py-2"
          onPress={() => navegar("Inicio")}
        >
          <Text className="font-semibold text-white">
            ← Voltar ao início
          </Text>
        </Pressable>

        <Text className="mb-2 text-3xl font-bold text-white">
          Cadastrar veículo
        </Text>

        <Text className="mb-6 text-slate-400">
          Informe os dados do veículo e selecione seu proprietário.
        </Text>

        <Text className="mb-2 font-semibold text-white">
          Cliente associado
        </Text>

        {carregandoClientes ? (
          <ActivityIndicator
            size="large"
            color="#60a5fa"
          />
        ) : clientes.length === 0 ? (
          <Text className="mb-4 text-amber-400">
            Cadastre um cliente antes de cadastrar um veículo.
          </Text>
        ) : (
          <View className="mb-5">
            {clientes.map((cliente) => (
              <Pressable
                key={cliente.id}
                className={`mb-2 rounded-xl border p-4 ${
                  clienteId === cliente.id
                    ? "border-blue-500 bg-blue-950"
                    : "border-slate-700 bg-slate-900"
                }`}
                onPress={() => setClienteId(cliente.id)}
              >
                <Text className="font-semibold text-white">
                  {cliente.nome}
                </Text>

                <Text className="mt-1 text-slate-400">
                  {clienteId === cliente.id
                    ? "Cliente selecionado"
                    : "Toque para selecionar"}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        <Text className="mb-2 font-semibold text-white">
          Marca
        </Text>

        <TextInput
          className="mb-4 rounded-xl border border-slate-700 bg-slate-900 p-4 text-white"
          placeholder="Ex.: Toyota"
          placeholderTextColor="#94a3b8"
          value={marca}
          onChangeText={setMarca}
        />

        <Text className="mb-2 font-semibold text-white">
          Modelo
        </Text>

        <TextInput
          className="mb-4 rounded-xl border border-slate-700 bg-slate-900 p-4 text-white"
          placeholder="Ex.: Corolla"
          placeholderTextColor="#94a3b8"
          value={modelo}
          onChangeText={setModelo}
        />

        <Text className="mb-2 font-semibold text-white">
          Ano
        </Text>

        <TextInput
          className="mb-4 rounded-xl border border-slate-700 bg-slate-900 p-4 text-white"
          placeholder="Ex.: 2022"
          placeholderTextColor="#94a3b8"
          keyboardType="numeric"
          value={ano}
          onChangeText={setAno}
        />

        <Text className="mb-2 font-semibold text-white">
          Placa
        </Text>

        <TextInput
          className="mb-6 rounded-xl border border-slate-700 bg-slate-900 p-4 text-white"
          placeholder="Ex.: ABC1D23"
          placeholderTextColor="#94a3b8"
          autoCapitalize="characters"
          value={placa}
          onChangeText={setPlaca}
        />

        <Pressable
          className={`items-center rounded-xl p-4 ${
            salvando || carregandoClientes || clientes.length === 0
              ? "bg-slate-700"
              : "bg-blue-600"
          }`}
          disabled={
            salvando ||
            carregandoClientes ||
            clientes.length === 0
          }
          onPress={salvarVeiculo}
        >
          <Text className="font-bold text-white">
            {salvando ? "Cadastrando..." : "Cadastrar veículo"}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}