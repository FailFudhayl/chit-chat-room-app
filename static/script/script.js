const socketio = io();

const messages = document.getElementById("messages");

const createMessage = (name, msg) => {
  const content = `
    <div class="flex flex-row justify-between items-center px-2 pt-4 overflow-hidden text-sm">
      <span class="w-4/6  break-words md:w-9/12">
        <strong>${name}</strong>: ${msg}
      </span>
      <span class="text-xs text-gray-500 w-1/6">
        ${new Date().toLocaleString()}
      </span>
    </div>
  `;
  messages.innerHTML += content;
  scrollToBottom();
};

socketio.on("message", (data) => {
  createMessage(data.name, data.message);
});

const sendMessage = (e) => {
  e.preventDefault();
  const message = document.getElementById("message");
  if (message.value === "" || message.value === " ") return;
  socketio.emit("message", { data: message.value });
  message.value = "";
  setTimeout(scrollToBottom, 100); // Delay to ensure message is rendered before scrolling
};

const scrollToBottom = () => {
  messages.scrollTo({ top: messages.scrollHeight, behavior: "smooth" });
};

window.addEventListener("load", scrollToBottom);