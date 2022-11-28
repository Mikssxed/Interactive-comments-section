import data from "./data.json" assert { type: "json" };
const plus = Array.from(document.querySelectorAll(".plus"));
const minus = Array.from(document.querySelectorAll(".minus"));
const score = document.querySelectorAll(".score");
let startScore = [];
const getScore = () => {
    startScore = [];
    score.forEach((item) => {
        startScore.push(item.innerHTML);
    });
};
const loadComments = () => {
    for (let i = 0; i < data.comments.length; i++) {
        document.querySelector(`#comment${i + 1} .user`).innerHTML = `<img src="${data.comments[i].user.image.png}"><div class="name">${data.comments[i].user.username}</div><div class="date">${data.comments[i].createdAt}</div>`;
        document.querySelector(`#comment${i + 1} .content`).innerHTML = `<p>${data.comments[i].content}</p>`;
        document.querySelector(`#comment${i + 1} .score`).innerHTML = `${data.comments[i].score}`;
        document.querySelector(`#reply${i + 1} .user`).innerHTML = `<img src="${data.comments[1].replies[i].user.image.png}"><div class="name">${data.comments[1].replies[i].user.username}</div><div class="date">${data.comments[1].replies[i].createdAt}</div>`;
        document.querySelector(`#reply${1} .content`).innerHTML = `<p><span class="mention">@maxblagun </span>${data.comments[1].replies[0].content}</p>`;
        document.querySelector(`#reply${2} .content`).innerHTML = `<p><span class="mention">@ramsesmiron </span>${data.comments[1].replies[1].content}</p>`;
        document.querySelector(`#reply${i + 1} .score`).innerHTML = `${data.comments[1].replies[i].score}`;
        document.querySelector(`#reply${2} .user`).innerHTML = `<img src="${data.comments[1].replies[i].user.image.png}"><div class="name">${data.comments[1].replies[i].user.username}</div><div class="you">you</div><div class="date">${data.comments[1].replies[i].createdAt}</div>`;
    }
};
plus.forEach((item) => {
    item.addEventListener("click", function add() {
        if (score[plus.indexOf(item)].innerHTML <= startScore[plus.indexOf(item)]) {
            let updatedScore = Number(score[plus.indexOf(item)].innerHTML);
            updatedScore += 1;
            score[plus.indexOf(item)].innerHTML = String(updatedScore);
        }
    });
});
minus.forEach((item) => {
    item.addEventListener("click", function subtract() {
        if (score[minus.indexOf(item)].innerHTML >= startScore[minus.indexOf(item)]) {
            let updatedScore = Number(score[minus.indexOf(item)].innerHTML);
            updatedScore -= 1;
            score[minus.indexOf(item)].innerHTML = String(updatedScore);
        }
    });
});
const body = document.querySelector("body");
const deleteSection = document.createElement("section");
deleteSection.classList.add("deleteSection");
deleteSection.innerHTML = `<h1>Delete comment</h1><p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p><div class="buttons"><button id="no">NO, CANCEL</button><button id="yes">YES, DELETE</button</div>`;
body.appendChild(deleteSection);
loadComments();
getScore();
const cancel = () => {
    const noButton = document.querySelector("#no");
    ancestorReply.forEach((ancestor) => ancestor.classList.remove("toDelete"));
    noButton.closest("section").style.display = "none";
};
const agree = () => {
    const yesButton = document.querySelector("#yes");
    document.querySelector(".toDelete").remove();
    yesButton.closest("section").style.display = "none";
};
const deleteButton = document.querySelectorAll(".delete");
deleteButton.forEach((button) => {
    button.addEventListener("click", function deleteReply() {
        button.closest(".reply").classList.add("toDelete");
        const noButton = document.querySelector("#no");
        const yesButton = document.querySelector("#yes");
        yesButton.addEventListener("click", agree);
        noButton.addEventListener("click", cancel);
        deleteSection.style.display = `block`;
    });
});
const ancestorReply = document.querySelectorAll(".reply");
const textArea = document.getElementById("textMain");
const createComment = () => {
    const comment = document.createElement("div");
    document.getElementById("newComments").appendChild(comment);
    comment.classList.add("block");
    comment.innerHTML = `<section class="comment"><div class="scorePanel"><button class="plus plusNew newPlusBug"><img src="./images/icon-plus.svg" /></button>
  <div class="score scoreNew">0</div>
  <button class="minus minusNew newMinusBug">
    <img src="./images/icon-minus.svg" />
  </button></div><section class="main">
  <div class="header">
    <div class="user">
      <img src="./images/avatars/image-juliusomo.png">
      <div class="name">${data.comments[1].replies[1].user.username}</div>
      <div class="you">you</div>
      <div class="date">now</div>
    </div>
    <button class="delete delComment">
      <img src="./images/icon-delete.svg" />Delete
    </button>
    <button class="edit editNew newEditBug">
      <img src="./images/icon-edit.svg" />Edit
    </button>
  </div>
  <div class="content"><p>${textArea.value}</p></div>
</section></section><section class="replies"></section>`;
};
let clickCount = 0;
const scoreNew = () => {
    const plus = Array.from(document.querySelectorAll(".plusNew"));
    const minus = Array.from(document.querySelectorAll(".minusNew"));
    const score = document.querySelectorAll(".scoreNew");
    plus.forEach((item) => {
        if (item.classList.contains("newPlusBug")) {
            item.addEventListener("click", function add() {
                if (Number(score[plus.indexOf(item)].innerHTML) < 1) {
                    let updatedScore = Number(score[plus.indexOf(item)].innerHTML);
                    updatedScore += 1;
                    score[plus.indexOf(item)].innerHTML = String(updatedScore);
                }
            });
        }
    });
    minus.forEach((item) => {
        if (item.classList.contains("newMinusBug")) {
            item.addEventListener("click", function subtract() {
                if (Number(score[minus.indexOf(item)].innerHTML) > -1) {
                    let updatedScore = Number(score[minus.indexOf(item)].innerHTML);
                    updatedScore -= 1;
                    score[minus.indexOf(item)].innerHTML = String(updatedScore);
                }
            });
        }
    });
    document.querySelector(".newPlusBug").classList.remove("newPlusBug");
    document.querySelector(".newMinusBug").classList.remove("newMinusBug");
};
const deleteNewComments = () => {
    const deleteButton = document.querySelectorAll("#newComments .delComment");
    deleteButton.forEach((button) => {
        button.addEventListener("click", function deleteComment() {
            button.closest(".block").classList.add("toDelete");
            const noButton = document.querySelector("#no");
            const yesButton = document.querySelector("#yes");
            yesButton.addEventListener("click", agree);
            noButton.addEventListener("click", cancel);
            deleteSection.style.display = `block`;
        });
    });
};
const deleteNewReplies = () => {
    const deleteButton = document.querySelectorAll(".delComment");
    deleteButton.forEach((button) => {
        button.addEventListener("click", function deleteComment() {
            button.closest(".reply").classList.add("toDelete");
            const noButton = document.querySelector("#no");
            const yesButton = document.querySelector("#yes");
            yesButton.addEventListener("click", agree);
            noButton.addEventListener("click", cancel);
            deleteSection.style.display = `block`;
        });
    });
};
const checkIfText = () => {
    if (textArea.value != "") {
        createComment();
        scoreNew();
        deleteNewComments();
        loadEditData();
    }
    textArea.value = "";
};
const send = document.querySelector(".send");
send.addEventListener("click", checkIfText);
const editing = (edit) => {
    edit.forEach((button) => {
        if (button.classList.contains("newEditBug") ||
            button.classList.contains("firstToEdit")) {
            button.addEventListener("click", (editing) => {
                const parentElement = button.closest(".main");
                const textToEdit = parentElement.children[1].firstChild.textContent;
                parentElement.children[1].innerHTML = `<textarea class="editing">${textToEdit}</textarea>`;
                const createButton = document.createElement("button");
                createButton.classList.add("editSubmit");
                const newButton = parentElement.appendChild(createButton);
                newButton.innerText = "UPDATE";
                button.setAttribute("disabled", "true");
                newButton.addEventListener("click", (update) => {
                    const textEdited = parentElement.children[1]
                        .firstChild;
                    const textArea = textEdited.value.split(" ");
                    if (textEdited.value.split("")[0] == "@") {
                        const replyTo = textArea.splice(0, 1);
                        parentElement.children[1].innerHTML = `<p><span class="mention">${replyTo} </span>${textArea.join(" ")}</p>`;
                    }
                    else {
                        parentElement.children[1].innerHTML = `<p>${textArea.join(" ")}</p>`;
                    }
                    newButton.remove();
                    button.removeAttribute("disabled");
                });
            });
        }
        button.classList.remove("newEditBug");
    });
};
const edit = document.querySelectorAll(".edit");
editing(edit);
const loadEditData = () => {
    const edit = document.querySelectorAll(".editNew");
    editing(edit);
};
const replyButton = document.querySelectorAll(".comment .replyButton");
const loadReply = () => {
    const textReply = document.querySelector(".reply .textReply");
    const reply = document.querySelector(".editing .replyNew");
    const textArea = textReply.value.split(" ");
    const replyTo = textArea.splice(0, 1);
    reply.innerHTML = `<div class="scorePanel">
  <button class="plus plusNew newPlusBug"><img src="./images/icon-plus.svg" /></button>
  <div class="score scoreNew">0</div>
  <button class="minus minusNew newMinusBug">
    <img src="./images/icon-minus.svg" />
  </button>
</div>
<section class="main">
  <div class="header">
    <div class="user"><img src="./images/avatars/image-juliusomo.png">
    <div class="name">${data.comments[1].replies[1].user.username}</div>
    <div class="you">you</div>
    <div class="date">now</div></div>
    <button class="delete delComment">
      <img src="./images/icon-delete.svg" />Delete
    </button>
    <button class="edit editNew newEditBug">
      <img src="./images/icon-edit.svg" />Edit
    </button>
  </div>
  <div class="content"><span class="mention">${replyTo} </span>${textArea.join(" ")}</div>
</section>`;
    const toRemove = document.querySelector(".editing");
    toRemove.classList.remove("editing");
    scoreNew();
    reply.classList.remove("replyNew");
    deleteNewReplies();
    loadEditData();
};
replyButton.forEach((button) => {
    button.addEventListener("click", (reply) => {
        button.closest(".block").classList.add("editing");
        const replySection = button.closest(".block").children[1];
        const newElement = document.createElement("div");
        newElement.classList.add("reply");
        newElement.classList.add("replyNew");
        newElement.innerHTML = `
    <img class="avatarComment" src="./images/avatars/image-juliusomo.png" />
    <textarea class="textReply">@${button.closest(".header").children[0].children[1].innerHTML}</textarea>
    <button class="replySubmit">REPLY</button>`;
        replySection.appendChild(newElement);
        const replySubmit = document.querySelector(".replySubmit");
        replySubmit.addEventListener("click", loadReply);
    });
});
const replyToReplyButton = document.querySelector(".replyToReplyButton");
replyToReplyButton.addEventListener("click", (replyToFunc) => {
    replyToReplyButton.closest(".replies").classList.add("editing");
    const replySection = replyToReplyButton.closest(".replies").children[1];
    const newElement = document.createElement("div");
    newElement.classList.add("reply");
    newElement.classList.add("replyNew");
    newElement.innerHTML = `
    <img class="avatarComment" src="./images/avatars/image-juliusomo.png" />
    <textarea class="textReply">@${replyToReplyButton.closest(".header").children[0].children[1].innerHTML}</textarea>
    <button class="replySubmit">REPLY</button>`;
    replySection.appendChild(newElement);
    const replySubmit = document.querySelector(".replySubmit");
    replySubmit.addEventListener("click", loadReply);
});
