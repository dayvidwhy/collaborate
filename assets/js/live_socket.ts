// Establish Phoenix Socket and LiveView configuration.
import { Socket } from "phoenix";
import { LiveSocket } from "phoenix_live_view";

const csrfTokenElement = document.querySelector("meta[name='csrf-token']");
if (csrfTokenElement) {
    const csrfToken = csrfTokenElement.getAttribute("content");
    
    const liveSocket = new LiveSocket("/live", Socket, {
        params: { _csrf_token: csrfToken }
    });
    
    // connect if there are any LiveViews on the page
    liveSocket.connect();
    
    // expose liveSocket on window for web console debug logs and latency simulation:
    // >> liveSocket.enableDebug()
    // >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
    // >> liveSocket.disableLatencySim()

    // @ts-ignore
    window.liveSocket = liveSocket;
}