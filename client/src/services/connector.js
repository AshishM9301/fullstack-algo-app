import openSocket from "socket.io-client";

const baseUrl = "http://localhost:5002/api" || "http://64.227.140.192/api";

export const connect = async (url, method, body, token) => {
  const response = await fetch(`${baseUrl}/${url}`, {
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: body,
  });

  return response.json();
};

export const socket = openSocket(
  "http://localhost:5001" || "http://64.227.140.192:5000"
);
