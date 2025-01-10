import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { AuthProvider } from "../../context/AuthProvider";
import { GoogleDriveManager } from "../GoogleDriveManager/GoogleDriveManager";
import {
  CLIENT_ID,
  API_KEY,
  DISCOVERY_DOCS,
  SCOPES,
} from "../../utils/googleApi";
import "./App.css";

export const App: React.FC = () => {
  const [gapiInitialized, setGapiInitialized] = useState<boolean>(false);

  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(
          () => {
            console.log("GAPI client initialized.");
            setGapiInitialized(true);
          },
          (error) => {
            console.error("Error initializing GAPI client:", error);
          }
        );
    };

    gapi.load("client:auth2", initClient);
  }, []);

  if (!gapiInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1>Money Fixer</h1>

      <AuthProvider>
        <GoogleDriveManager />
      </AuthProvider>
    </main>
  );
};
