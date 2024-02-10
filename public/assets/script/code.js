(function () {
  const app = document.querySelector(".app");
  const socket = io();

  let uname;

  // Checks if the user name is stored in localStorage
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    uname = storedUsername;
    // Checks if the user is already online before issuing a new user
    socket.emit("checkuser", uname, (exists) => {
      if (!exists) {
        socket.emit("newuser", uname);
      }
    });
    app.querySelector(".join-screen").classList.remove("active");
    app.querySelector(".chat-screen").classList.add("active");
  }

  app.querySelector(".join-screen #join-user").addEventListener("click", function () {
    let username = app.querySelector(".join-screen #username").value;
    const nameNull = document.querySelector(".name-null");

    if (username.length === 0) {
      nameNull.style.display = "block";
      return;
    }

    uname = username.charAt(0).toUpperCase() + username.slice(1);

    // Checks if the user is already online before issuing a new user
    socket.emit("checkuser", uname, (exists) => {
      if (!exists) {
        socket.emit("newuser", uname);
        localStorage.setItem("username", uname);
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");
      } else {
        // If username already exists
        nameNull.style.display = "block";
      }
    });
  });

  app.querySelector(".chat-screen #message-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

  app.querySelector(".chat-screen #send-message").addEventListener("click", function () {
    sendMessage();
  });

  app.querySelector(".chat-screen #exit-chat").addEventListener("click", function () {
    exitChat();
  });

  function sendMessage() {
    let message = app.querySelector(".chat-screen #message-input").value;
    if (message.length === 0) {
      return;
    }

    renderMessage("my", {
      username: uname,
      text: message
    });
    socket.emit("chat", {
      username: uname,
      text: message
    });
    app.querySelector(".chat-screen #message-input").value = "";
  }

  function exitChat() {
    socket.emit("exituser", uname);
    localStorage.removeItem("username");
    window.location.href = window.location.href;
  }

  socket.on("update", function (update) {
    if (update.includes("joined") || update.includes("left")) {
      updateOnlineCount();
    }

    renderMessage("update", update);
  });

  socket.on("onlineUsers", function (users) {
    renderOnlineUsers(users);
  });

  function updateOnlineCount() {
    socket.emit("getOnlineUsers");
  }

  function renderOnlineUsers(users) {
    const onlineUsersContainer = document.querySelector(".users-on");
    const onlineUsersCount = users.length;

    onlineUsersContainer.innerHTML = `<p>${onlineUsersCount} person${onlineUsersCount !== 1 ? 's' : ''} online in chat</p>`;
  }

  socket.on("chat", function (message) {
    renderMessage("other", message);
  });

  function renderMessage(type, message) {
    let messageContainer = app.querySelector(".chat-screen .messages");

    if (type === "my" || type === "other") {
      let el = document.createElement("div");
      el.setAttribute("class", `message ${type}-message`);
      const formattedTime = new Date().toLocaleTimeString();
      el.innerHTML = `
        <div>
          <div class="name">${message.username} <span class="time">${formattedTime}</span></div>
          <div class="text">${message.text}</div>
        </div>
      `;
      messageContainer.appendChild(el);
    } else if (type === "update") {
      let el = document.createElement("div");
      el.setAttribute("class", "update");
      el.innerText = message;
      messageContainer.appendChild(el);
    }

    messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
  }
})();