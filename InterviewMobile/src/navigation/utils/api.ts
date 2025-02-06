// fakeApi.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Consent, Patient } from "./dto";

// Keys under which data will be stored
type StorageKey = "@patient" | "@consent" | "@user" | "@patientConsent";

// Simulated delay function
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchData(path: StorageKey, id: number) {
  // Simulate network delay (e.g., 500ms)
  await delay(500);

  const key = getStorageKey(path, id);
  try {
    const dataString = await AsyncStorage.getItem(key);
    const data = dataString ? JSON.parse(dataString) : null;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function saveData(data: any, path: StorageKey) {
  // Simulate network delay
  await delay(500);

  const key = getStorageKey(path, data.id);
  try {
    const dataString = JSON.stringify(data);
    await AsyncStorage.setItem(key, dataString);
    return data;
  } catch (error) {
    console.error("Error saving data:", error);
    throw error;
  }
}

export async function saveMultiple(data: any[], path: StorageKey) {
  await delay(500);

  const paths = data.map((item) => {
    const key = getStorageKey(path, item.id);
    return [key, JSON.stringify(item)] as [string, string];
  });

  try {
    await AsyncStorage.multiSet(paths);
    return data;
  } catch (error) {
    console.error("Error saving data:", error);
    throw error;
  }
}

export async function updateData(update: any, path: StorageKey) {
  // Simulate network delay
  await delay(500);

  const key = getStorageKey(path, update.id);
  try {
    const existingDataString = await AsyncStorage.getItem(key);
    const existingData = existingDataString
      ? JSON.parse(existingDataString)
      : {};
    const newData = { ...existingData, ...update };
    await AsyncStorage.setItem(key, JSON.stringify(newData));
    return newData;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
}

export async function getAllPatients() {
  await delay(500);

  const keys = Array.from({ length: 20 }, (_, i) =>
    getStorageKey("@patient", i + 1),
  );
  try {
    const values = await AsyncStorage.multiGet(keys);
    const patients = values
      .flatMap(([, patient]) => (patient ? JSON.parse(patient) : null))
      .filter(Boolean) as Patient[];
    return patients;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getAllConsents() {
  await delay(500);

  const keys = Array.from({ length: 3 }, (_, i) =>
    getStorageKey("@consent", i + 1),
  );
  try {
    const values = await AsyncStorage.multiGet(keys);
    const consents = values
      .flatMap(([, consent]) => (consent ? JSON.parse(consent) : null))
      .filter(Boolean) as Consent[];
    return consents;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function getStorageKey(path: StorageKey, id: number) {
  return `${path}/:${id}`;
}
