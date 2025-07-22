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