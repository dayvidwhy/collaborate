// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// Bring in Phoenix channels client library:

// And connect to the path in "lib/collaborate_web/endpoint.ex". We pass the
// token for authentication. Read below how it should be used.

// When you connect, you'll often need to authenticate the client.
// For example, imagine you have an authentication plug, `MyAuth`,
// which authenticates the session and assigns a `:current_user`.
// If the current user exists you can assign the user's token in
// the connection for use in the layout.
//
// In your "lib/collaborate_web/router.ex":
//
//     pipeline :browser do
//       ...
//       plug MyAuth
//       plug :put_user_token
//     end
//
//     defp put_user_token(conn, _) do
//       if current_user = conn.assigns[:current_user] do
//         token = Phoenix.Token.sign(conn, "user socket", current_user.id)
//         assign(conn, :user_token, token)
//       else
//         conn
//       end
//     end
//
// Now you need to pass this token to JavaScript. You can do so
// inside a script tag in "lib/collaborate_web/templates/layout/app.html.heex":
//
//     <script>window.userToken = "<%= assigns[:user_token] %>";</script>
//
// You will need to verify the user token in the "connect/3" function
// in "lib/collaborate_web/channels/user_socket.ex":
//
//     def connect(%{"token" => token}, socket, _connect_info) do
//       # max_age: 1209600 is equivalent to two weeks in seconds
//       case Phoenix.Token.verify(socket, "user socket", token, max_age: 1_209_600) do
//         {:ok, user_id} ->
//           {:ok, assign(socket, :user, user_id)}
//
//         {:error, reason} ->
//           :error
//       end
//     end
//
// Finally, connect to the socket:

import { Socket } from "phoenix";

const socket = (function () {
    const textArea: HTMLTextAreaElement | null = document.querySelector("#text-input");

    if (!textArea) {
        return;
    }

    // @ts-ignore
    const localSocket = new Socket("/socket", { params: { token: window.userToken } });
    const clientId = crypto.randomUUID();

    localSocket.connect();

    const channel = localSocket.channel("documents:lobby", {});

    channel.join()
        .receive("ok", resp => {
            console.log("Joined successfully", resp);
        })
        .receive("error", resp => {
            console.log("Unable to join", resp);
        });

    textArea.addEventListener("keydown", ({ key }: KeyboardEvent) => {
        console.log("Pushing key", key);
        if (key.length === 1 || key === "Enter" || key === "Backspace") {
            channel.push("new_msg", {
                body: key,
                client_id: clientId
            });
        }
    });

    channel.on("new_msg", payload => {
        if (payload.client_id === clientId) {
            return;
        }
        if (payload.body === "Enter") {
            textArea.value += "\n";
            return;
        }
        if (payload.body === "Backspace") {
            textArea.value = textArea.value.slice(0, -1);
            return;
        }
        textArea.value += payload.body;
    });

    return localSocket;
})();

export default socket;
