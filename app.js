// const auth = getAuth();
// const db = getFirestore();

// function logout() {
//   signOut(auth).then(() => {
//     window.location.href = "index.html";
//   });
// }

// function loadHistory(days) {
//   const historyContainer = document.getElementById("history");
//   historyContainer.innerHTML = ""; // Clear previous

//   const user = auth.currentUser;
//   if (!user) return alert("Not logged in");

//   const today = new Date();

//   for (let i = 0; i < days; i++) {
//     const date = new Date(today);
//     date.setDate(today.getDate() - i);
//     const yyyy = date.getFullYear();
//     const mm = String(date.getMonth() + 1).padStart(2, "0");
//     const dd = String(date.getDate()).padStart(2, "0");
//     const dateStr = `${yyyy}-${mm}-${dd}`;

//     const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

//     const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
//     const prayerStatus = {};

//     const dayDiv = document.createElement("div");
//     dayDiv.className = "day-box";
//     dayDiv.innerHTML = `<h3>${dateStr} (${dayName})</h3>`;

//     const prayerList = document.createElement("ul");

//     const docRef = doc(db, "prayers", `${user.uid}_${dateStr}`);
//     getDoc(docRef).then((docSnap) => {
//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         prayers.forEach((prayer) => {
//           const li = document.createElement("li");
//           const offered = data[prayer.toLowerCase()] ? "✅" : "❌";
//           li.textContent = `${prayer}: ${offered}`;
//           prayerList.appendChild(li);
//         });
//       } else {
//         prayers.forEach((prayer) => {
//           const li = document.createElement("li");
//           li.textContent = `${prayer}: ❌`;
//           prayerList.appendChild(li);
//         });
//       }
//       dayDiv.appendChild(prayerList);
//       historyContainer.appendChild(dayDiv);
//     });
//   }
// }


// const logout = () => {
//     signOut(auth).then(() => {
//         window.location.href = "index.html";
//     });
// };
// document.getElementById("logoutBtn").addEventListener("click", () => {
//     signOut(auth).then(() => {
//         window.location.href = "index.html";
//     });
// });

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore, collection, query, where, getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
    getAuth, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔥 Your Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyBCMkDB4Wblx5Lhqblv-zDcrwWz1kPfApg",
    authDomain: "web-dev-course-42f1f.firebaseapp.com",
    projectId: "web-dev-course-42f1f",
    storageBucket: "web-dev-course-42f1f.firebasestorage.app",
    messagingSenderId: "695312263707",
    appId: "1:695312263707:web:055cdd95a818c37c0066be"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// ✅ Logout
window.logout = function () {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    });
};

// ✅ Load History Button
document.getElementById("loadHistoryBtn").addEventListener("click", async () => {
    const days = parseInt(document.getElementById("daysSelect").value);
    const user = auth.currentUser;

    if (!user) {
        alert("User not logged in.");
        return;
    }

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days + 1);

    const q = query(
        collection(db, "prayers"),
        where("userId", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);
    const historyContainer = document.getElementById("historyContainer");
    historyContainer.innerHTML = "";

    const sortedData = [];

    querySnapshot.forEach(doc => {
        const data = doc.data();
        const recordDate = new Date(data.date);
        if (recordDate >= startDate && recordDate <= endDate) {
            sortedData.push(data);
        }
    });

    sortedData.sort((a, b) => new Date(a.date) - new Date(b.date));

    if (sortedData.length === 0) {
        historyContainer.innerHTML = "<p>No records found.</p>";
        return;
    }

    sortedData.forEach(data => {
        const record = document.createElement("div");
        record.className = "history-record";
        record.innerHTML = `
      <h3>${data.date} (${data.day})</h3>
      <ul>
        <li>Fajr: ${data.fajr ? "✅" : "❌"}</li>
        <li>Zuhr: ${data.zuhr ? "✅" : "❌"}</li>
        <li>Asr: ${data.asr ? "✅" : "❌"}</li>
        <li>Maghrib: ${data.maghrib ? "✅" : "❌"}</li>
        <li>Isha: ${data.isha ? "✅" : "❌"}</li>
      </ul>
    `;
        historyContainer.appendChild(record);
    });
});
