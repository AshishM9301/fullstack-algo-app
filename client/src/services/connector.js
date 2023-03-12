import openSocket from "socket.io-client";

// const baseUrl = "http://localhost:5002/api";
const baseUrl = "http://159.89.160.226:5002/api";

export const connect = async (url, method, body, token) => {
  const response = await fetch(`${baseUrl}${url}`, {
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

const socketUrl = 'http://159.89.160.226:5000'
// const socketUrl = 'http://localhost:5000'


export const socket = openSocket(socketUrl);
