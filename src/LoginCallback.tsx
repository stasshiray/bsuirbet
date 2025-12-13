import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { handleOidcCallback } from "./AuthContext";
import LoadingSpinner from "./LoadingSpinner";

const LoginCallback: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const oidcCallbackPromise = useRef<Promise<void> | null>(null);

  useEffect(() => {
    const processCallback = async () => {
      try {
        if (oidcCallbackPromise.current) return;
        oidcCallbackPromise.current = handleOidcCallback();
        await oidcCallbackPromise.current;
        navigate("/");
      } catch (err) {
        oidcCallbackPromise.current = null;
        setError(err instanceof Error ? err.message : "Login callback error");
        console.error("Login callback error:", err);
      }
    };

    processCallback();
  }, [navigate]);

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
        <div>Redirecting to login page...</div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <LoadingSpinner message="Completing login..." size="large" />
    </div>
  );
};

export default LoginCallback;
