import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  createFile,
  listFiles,
  readFile,
  updateFile,
} from "../../utils/googleApi";

export const GoogleDriveManager = () => {
  const { isSignedIn, signIn, signOut } = useContext(AuthContext);
  const [files, setFiles] = useState<gapi.client.drive.File[]>([]);
  const [fileContents, setFileContents] = useState<{ [key: string]: string }>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isSignedIn) {
      fetchFiles();
    } else {
      setFiles([]);
    }
  }, [isSignedIn]);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const apiFiles = await listFiles();
      if (apiFiles.length > 0) {
        const file = apiFiles[0];
        const fileContent = await readFile(file.id!);
        setFiles([file]);
        setFileContents({ [file.id!]: fileContent });
      }
    } catch (error) {
      console.error("Error fetching or reading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFile = async () => {
    try {
      const response = await createFile(`Money.txt`, "Hello, my money!");
      console.log("File Created:", response);
      fetchFiles();
    } catch (error) {
      console.error("Error Creating File:", error);
    }
  };

  const handleUpdateFile = async (fileId: string) => {
    const newContent = prompt("Enter new content for the file:");
    if (newContent === null) return;

    try {
      await updateFile(fileId, newContent);
      alert("File updated successfully!");
      fetchFiles();
    } catch (error) {
      alert(`Error updating file. ${error}`);
    }
  };

  return (
    <>
      {isSignedIn ? (
        <section>
          <div>
            {files.length === 0 && (
              <button type="button" onClick={handleCreateFile}>
                Create File
              </button>
            )}
            <button type="button" onClick={signOut}>
              Sign Out
            </button>
          </div>
          <div>
            {loading ? (
              <div>Loading files...</div>
            ) : files.length > 0 ? (
              <div>
                {files.map((file) => {
                  const fileId = file.id!;
                  const fileName = file.name || "Unnamed File";
                  const fileType = file.mimeType || "Unknown Type";
                  const fileContent = fileContents[fileId] || "";

                  return (
                    <>
                      {fileName} ({fileType}) {fileContent}
                      <div>
                        <button
                          type="button"
                          onClick={() => handleUpdateFile(fileId)}
                        >
                          Update
                        </button>
                      </div>
                    </>
                  );
                })}
              </div>
            ) : (
              <div>No files found.</div>
            )}
          </div>
        </section>
      ) : (
        <button type="button" onClick={signIn}>
          Sign In with Google
        </button>
      )}
    </>
  );
};
