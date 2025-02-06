import { Assets as NavigationAssets } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { Navigation } from "./navigation";
import { Consent, Patient } from "./navigation/utils/dto";
import { saveMultiple } from "./navigation/utils/api";

Asset.loadAsync([
  ...NavigationAssets,
  require("./assets/newspaper.png"),
  require("./assets/bell.png"),
]);

SplashScreen.preventAutoHideAsync();

const consents: Consent[] = [
  {
    id: 1,
    name: "Test Consent Alpha",
    description:
      "This consent is used for testing data collection procedures and user permission flows in our development environment.",
  },
  {
    id: 2,
    name: "Test Consent Beta",
    description:
      "This consent simulates the agreement for processing sample user data during the QA phase of the application.",
  },
  {
    id: 3,
    name: "Test Consent Gamma",
    description:
      "This consent is implemented for testing purposes, ensuring that experimental features requiring user approval work as intended.",
  },
];

const listData: Patient[] = [
  { id: 1, name: "Lucas", lastName: "Bennet" },
  { id: 2, name: "Sophia", lastName: "Carter" },
  { id: 3, name: "Ethan", lastName: "Mitchell" },
  { id: 4, name: "Olivia", lastName: "Parker" },
  { id: 5, name: "Mason", lastName: "Reed" },
  { id: 6, name: "Isabella", lastName: "Hayes" },
  { id: 7, name: "Liam", lastName: "Brooks" },
  { id: 8, name: "Ava", lastName: "Sullivan" },
  { id: 9, name: "Noah", lastName: "Collins" },
  { id: 10, name: "Emma", lastName: "Foster" },
  { id: 11, name: "Elijah", lastName: "Cooper" },
  { id: 12, name: "Charles", lastName: "Morgan" },
  { id: 13, name: "Benjamin", lastName: "Ross" },
  { id: 14, name: "Amelia", lastName: "Adams" },
  { id: 15, name: "Henry", lastName: "Turner" },
  { id: 16, name: "Harper", lastName: "Wright" },
  { id: 17, name: "Daniel", lastName: "Phillips" },
  { id: 18, name: "Scarlett", lastName: "James" },
  { id: 19, name: "Jacob", lastName: "Rivera" },
  { id: 20, name: "Lily", lastName: "Henderson" },
];

export function App() {
  return (
    <Navigation
      linking={{
        enabled: "auto",
        prefixes: [
          // Change the scheme to match your app's scheme defined in app.json
          "interviewmobile://",
        ],
      }}
      onReady={() => {
        saveMultiple(listData, "@patient");
        saveMultiple(consents, "@consent");
        SplashScreen.hideAsync();
      }}
    />
  );
}
