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
      myRef.current.innerHTML = "";
      if (client) {
        myRef.current.appendChild(client?.getDisplay().getElement() as Node);
        const mouse = new Guacamole.Mouse(client.getDisplay().getElement());

        // send mouse movement to guacamole api
        mouse.onmousemove = (mouseState) => {
          client.getDisplay().showCursor(true);
          if (navigator.userAgent.indexOf("Firefox") === -1) {
            mouseState.x = mouseState.x + 125;
            mouseState.y = mouseState.y + 65;
          }
          client.sendMouseState(mouseState);
        };

        // send mouse down event to guacamole api
        mouse.onmousedown = (mouseState) => {
          client.sendMouseState(mouseState);
        };

        // send mouse up event to guacamole api
        mouse.onmouseup = (mouseState) => {
          client.sendMouseState(mouseState);
        };

        // hide the vm cursor outside of the display element
        mouse.onmouseout = () => {
          client.getDisplay().showCursor(false);
        };

        // get keyboard input
        const keyboard = new Guacamole.Keyboard(document);
        keyboard.onkeydown = (keysym) => client.sendKeyEvent(1, keysym);
        keyboard.onkeyup = (keysym) => client.sendKeyEvent(0, keysym);
        client.connect("token=" + token);
      }
    }
  }, [client, token]);

  return <div ref={myRef} className="mt-5" />;
};

export default GuacamoleClient;
