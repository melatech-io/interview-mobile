import { Text } from "@react-navigation/elements";
import { StaticScreenProps } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, Modal, Pressable, StyleSheet, View } from "react-native";
import { fetchData, getAllConsents } from "../utils/api";
import { Consent, Patient, PatientConsent } from "../utils/dto";

type Props = StaticScreenProps<{
  patientId: number;
}>;

export function Profile({ route }: Props) {
  const [showConsentForm, setShowConsentForm] = useState(false);

  const [patient, setPatient] = useState<Patient | null>(null);
  const [loadingPatient, setLoadingPatient] = useState(true);

  const [consents, setConsents] = useState<Consent[]>([]);
  const [loadingConsents, setLoadingConsents] = useState(true);

  const [agreedPatientConsents, setAgreedPatientConsents] = useState<
    PatientConsent[]
  >([]);
  const [loadingAgreedPatientConsents, setLoadingAgreedPatientConsents] =
    useState(true);

  async function loadConsents() {
    let consents: Consent[] = [];
    try {
      consents = await getAllConsents();
      setConsents(consents);
    } catch (error) {
      console.error("Error loading consents:", error);
    } finally {
      setLoadingConsents(false);
      return consents;
    }
  }

  async function loadAgreedPatientConsents(defaultValue: PatientConsent[]) {
    try {
      const agreedPatientConsent = await fetchData(
        "@patientConsent",
        route.params.patientId,
      );
      setAgreedPatientConsents(agreedPatientConsent ?? defaultValue);
      setShowConsentForm(!agreedPatientConsent?.length);
    } catch (error) {
      console.error("Error loading agreed patient consent:", error);
    } finally {
      setLoadingAgreedPatientConsents(false);
    }
  }

  async function loadData() {
    try {
      const consents = await loadConsents();
      const defaults: PatientConsent[] = consents.map((c) => ({
        consentId: c.id,
        patientId: route.params.patientId,
        agreed: false,
      }));
      await loadAgreedPatientConsents(defaults);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }

  async function loadPatient() {
    try {
      const patient = await fetchData("@patient", route.params.patientId);
      setPatient(patient);
    } catch (error) {
      console.error("Error loading patient:", error);
    } finally {
      setLoadingPatient(false);
    }
  }

  useEffect(() => {
    loadPatient();
    loadData();
  }, []);

  if (loadingPatient) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!patient) {
    return (
      <View style={styles.container}>
        <Text>Patient not found</Text>
      </View>
    );
  }

  function Consent({ agreedConsent }: { agreedConsent: PatientConsent }) {
    const [consent, setConsent] = useState<Consent | null>(null);
    const [loadingConsent, setLoadingConsent] = useState(true);

    async function loadConsent(consentId: number) {
      try {
        const consent = await fetchData("@consent", consentId);
        setConsent(consent);
      } catch (error) {
        console.error("Error loading consent:", error);
      } finally {
        setLoadingConsent(false);
      }
    }

    useEffect(() => {
      loadConsent(agreedConsent.consentId);
    }, [agreedConsent.consentId]);

    return (
      <View>
        {loadingConsent ? (
          <Text>Loading consent...</Text>
        ) : (
          <>
            <Text>{consent?.name}</Text>
            <Text>{consent?.description}</Text>
            <Text>{agreedConsent.agreed ? "Agreed" : "Not agreed"}</Text>
          </>
        )}
      </View>
    );
  }

  function ConsentForm({ patient }: { patient: Patient }) {
    function saveAgreedPatientConsents(
      patientConsents: PatientConsent[],
      agreed: boolean,
      consentId: number,
    ) {
      // TODO: Implement function to save agreed patient consents
      return patientConsents;
    }

    return (
      <View style={styles.formContainer}>
        {agreedPatientConsents.map((pc) => {
          const consent = consents.find((c) => c.id === pc.consentId);
          return (
            <View key={pc.consentId}>
              <Text>{consent?.name}</Text>
              <Text>{consent?.description}</Text>
              <Pressable
                style={() => [
                  styles.checkbox,
                  { backgroundColor: pc.agreed ? "green" : "transparent" },
                ]}
                onPress={() =>
                  setAgreedPatientConsents((prev) =>
                    saveAgreedPatientConsents(prev, !pc.agreed, pc.consentId),
                  )
                }
              />
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>{patient.name}'s Profile</Text>
      {loadingAgreedPatientConsents ? (
        <Text>Loading...</Text>
      ) : (
        agreedPatientConsents.map((agreedPatientConsent) => (
          <Consent
            key={agreedPatientConsent.consentId}
            agreedConsent={agreedPatientConsent}
          />
        ))
      )}
      <Modal visible={showConsentForm} animationType="fade" transparent>
        <View
          style={[
            styles.container,
            { backgroundColor: "#b0c4de", opacity: 0.9 },
          ]}
        >
          <Text>{patient.name} has not agreed to any consents</Text>
          <ConsentForm patient={patient} />
          <Button
            title="press me"
            disabled={!agreedPatientConsents.length}
            onPress={() =>
              /* save consents using the api for persistence */ setShowConsentForm(
                false,
              )
            }
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 16,
  },
  formContainer: {
    gap: 10,
    paddingHorizontal: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
  },
});
