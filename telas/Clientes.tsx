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

import { listarClientes, cadastrarCliente } from "../servicos/api";

type Cliente = {
  id: string;
  nome: string;
  telefone: string;
  email: string;
};

type Props = {
  navegar: (pagina: string) => void;
};

export default function Clientes({ navegar }: Props) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarClientes() {
    try {
      setErro("");
      const dados = await listarClientes();
      setClientes(dados);
    } catch {
      setErro("Não foi possível conectar à API.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  async function salvarCliente() {
    if (!nome.trim() || !telefone.trim() || !email.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    try {
      await cadastrarCliente({
        nome: nome.trim(),
        telefone: telefone.trim(),
        email: email.trim(),
      });

      setNome("");
      setTelefone("");
      setEmail("");

      Alert.alert("Sucesso", "Cliente cadastrado!");

      await carregarClientes();
    } catch {
      Alert.alert("Erro", "Não foi possível cadastrar o cliente.");
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
          Clientes
        </Text>

        <Text className="mb-6 text-slate-400">
          Cadastre e consulte os clientes da oficina.
        </Text>

        <Text className="mb-2 font-semibold text-white">
          Nome
        </Text>

        <TextInput
          className="mb-4 rounded-xl border border-slate-700 bg-slate-900 p-4 text-white"
          placeholder="Nome do cliente"
          placeholderTextColor="#94a3b8"
          value={nome}
          onChangeText={setNome}
        />

        <Text className="mb-2 font-semibold text-white">
          Telefone
        </Text>

        <TextInput
          className="mb-4 rounded-xl border border-slate-700 bg-slate-900 p-4 text-white"
          placeholder="Telefone"
          placeholderTextColor="#94a3b8"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
        />

        <Text className="mb-2 font-semibold text-white">
          E-mail
        </Text>

        <TextInput
          className="mb-5 rounded-xl border border-slate-700 bg-slate-900 p-4 text-white"
          placeholder="E-mail"
          placeholderTextColor="#94a3b8"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Pressable
          className="mb-8 items-center rounded-xl bg-blue-600 p-4"
          onPress={salvarCliente}
        >
          <Text className="font-bold text-white">
            Cadastrar cliente
          </Text>
        </Pressable>

        <Text className="mb-4 text-2xl font-bold text-white">
          Clientes cadastrados
        </Text>

        {carregando ? (
          <ActivityIndicator size="large" color="#60a5fa" />
        ) : erro ? (
          <Text className="mb-4 text-red-400">{erro}</Text>
        ) : clientes.length === 0 ? (
          <Text className="text-slate-400">
            Nenhum cliente cadastrado.
          </Text>
        ) : (
          clientes.map((cliente) => (
            <View
              key={cliente.id}
              className="mb-3 rounded-xl border border-slate-800 bg-slate-900 p-4"
            >
              <Text className="text-lg font-bold text-white">
                {cliente.nome}
              </Text>

              <Text className="mt-2 text-slate-300">
                Telefone: {cliente.telefone}
              </Text>

              <Text className="mt-1 text-slate-300">
                E-mail: {cliente.email}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}