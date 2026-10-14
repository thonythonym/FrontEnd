import { View, Text, Pressable, ScrollView } from "react-native";

type Props = {
  navegar: (pagina: string) => void;
};

export default function Inicio({ navegar }: Props) {
  return (
    <View className="flex-1 bg-slate-950">
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text className="mt-10 text-sm font-semibold uppercase text-blue-400">
          Oficina Mecânica
        </Text>

        <Text className="mb-2 mt-3 text-3xl font-bold text-white">
          Painel de controle
        </Text>

        <Text className="mb-8 text-slate-400">
          Gerencie os clientes, veículos e ordens de serviço.
        </Text>

        <Pressable
          className="mb-4 rounded-2xl border border-slate-800 bg-slate-900 p-5"
          onPress={() => navegar("Clientes")}
        >
          <Text className="text-xl font-bold text-white">
            Clientes
          </Text>

          <Text className="mt-2 text-slate-400">
            Cadastre e consulte os clientes da oficina.
          </Text>

          <Text className="mt-4 font-semibold text-blue-400">
            Acessar seção →
          </Text>
        </Pressable>

        <Pressable
          className="mb-4 rounded-2xl border border-slate-800 bg-slate-900 p-5"
          onPress={() => navegar("Veiculos")}
        >
          <Text className="text-xl font-bold text-white">
            Veículos
          </Text>

          <Text className="mt-2 text-slate-400">
            Consulte e gerencie os veículos cadastrados.
          </Text>

          <Text className="mt-4 font-semibold text-blue-400">
            Acessar seção →
          </Text>
        </Pressable>

        <Pressable
          className="mb-4 rounded-2xl border border-slate-800 bg-slate-900 p-5"
          onPress={() => navegar("OrdensServico")}
        >
          <Text className="text-xl font-bold text-white">
            Ordens de Serviço
          </Text>

          <Text className="mt-2 text-slate-400">
            Acompanhe os serviços da oficina.
          </Text>

          <Text className="mt-4 font-semibold text-blue-400">
            Acessar seção →
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}