import { useEffect, useState } from "react";
import { Patient } from "../dto";
import { getAllPatients } from "../api";

export function useGetAllPatients() {
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

  return { patients, setPatients };
}
