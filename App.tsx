import "./global.css";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import Inicio from "./telas/Inicio";
import Clientes from "./telas/Clientes";

export default function App() {
  const [tela, setTela] = useState("Inicio");

  const navegar = (pagina: string) => {
    setTela(pagina);
  };

  const titulos: { [key: string]: string } = {
    Clientes: "Clientes",
    Veiculos: "Veículos",
    OrdensServico: "Ordens de Serviço",
  };

  // Se a tela selecionada for Inicio, mostra o componente Inicio.tsx.
  if (tela === "Inicio") {
    return <Inicio navegar={navegar} />;
  }
  // Se a tela selecionada for Clientes, mostra o componente Inicio.tsx.
  if (tela === "Clientes") {
  return <Clientes navegar={navegar} />;
}

  // Para as demais opções, mostra uma tela provisória.
  return (
    <View className="flex-1 items-center justify-center bg-slate-950 p-6">
      <Text className="mb-3 text-3xl font-bold text-white">
        {titulos[tela] ?? "Tela não encontrada"}
      </Text>

      <Text className="mb-8 text-center text-slate-400">
        Esta seção será implementada na próxima etapa.
      </Text>

      <Pressable
        className="rounded-xl bg-blue-600 px-6 py-3"
        onPress={() => navegar("Inicio")}
      >
        <Text className="font-bold text-white">Voltar ao início</Text>
      </Pressable>
    </View>
  );
}