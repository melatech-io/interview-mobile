import { Text } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { getAllPatients } from "../utils/api";

type Patient = {
  id: number;
  name: string;
  lastName: string;
};

type RenderItemProps = {
  patient: Patient;
  onPress: () => void;
};

export function Home() {
  const navigation = useNavigation();
  const [patients, setPatients] = useState<Patient[]>([]);

  async function loadPatients() {
    try {
      const patients = await getAllPatients();
      setPatients(patients);
    } catch (error) {
      console.error("Error loading patients:", error);
    }
  }

  useEffect(() => {
    loadPatients();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, backgroundColor: "#b0c4de", padding: 16 }}>
        Patients
      </Text>
      <FlatList
        ItemSeparatorComponent={() => (
          <View
            style={{ width: "auto", height: 2, backgroundColor: "black" }}
          />
        )}
        renderItem={({ item }) => (
          <RenderItem
            patient={item}
            onPress={() =>
              navigation.navigate("Profile", { patientId: item.id })
            }
          />
        )}
        data={patients}
        extraData={patients}
      />
    </View>
  );
}

function RenderItem({ patient, onPress }: RenderItemProps) {
  return (
    <Pressable onPress={onPress} style={styles.item}>
      <Text>
        {patient.name} {patient.lastName}
      </Text>
      <Text>{"\u2192"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "aliceblue",
    justifyContent: "space-between",
  },
});
