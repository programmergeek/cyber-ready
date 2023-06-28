import Guacamole, { Client } from "guacamole-common-js";
import React, { useEffect, useRef, useState } from "react";
import encrypt from "./encrypt";

interface GuacamoleStageProps {}

const GuacamoleClient: React.FC<GuacamoleStageProps> = () => {
  const myRef = useRef<HTMLDivElement | null>(null);

  const [token] = useState(
    encrypt({
      connection: {
        type: "rdp",
        settings: {
          hostname: "192.168.56.5",
          username: "vagrant",
          password: "vagrant",
          "enable-drive": true,
          "create-drive-path": true,
          security: "any",
          "ignore-cert": true,
          "enable-wallpaper": false,
        },
      },
    })
  );

  const [tunnel] = useState(
    new Guacamole.WebSocketTunnel("ws://127.0.0.1:8080/")
  );
  const [client, updateClient] = useState<Client>();

  useEffect(() => {
    updateClient(new Guacamole.Client(tunnel));
  }, []);

  useEffect(() => {
    if (myRef.current) {
      if (client) {
        myRef.current.appendChild(client?.getDisplay().getElement() as Node);
        client.connect("token=" + token);
      }
    }
  }, [client, token]);

  return <div ref={myRef} className="mt-5" />;
};

export default GuacamoleClient;
