import { auth, db } from './firebase.js';
import {
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ✅ When page loads
window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const days = parseInt(urlParams.get("days")) || 7;

  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      alert("Please login first");
      window.location.href = "index.html";
      return;
    }

    const userId = user.uid;
    const now = new Date();
    const historyContainer = document.getElementById("historyContainer");
    historyContainer.innerHTML = "";

    for (let i = 0; i < days; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

      const historyRef = collection(db, "prayers", userId, "history");
      const q = query(historyRef, where("date", "==", dateString));
      const snapshot = await getDocs(q);

      let data = {
        Fajr: false,
        Dhuhr: false,
        Asr: false,
        Maghrib: false,
        Isha: false
      };

      if (!snapshot.empty) {
        data = snapshot.docs[0].data();
      }

      // ✅ Build UI for each date
      const historyBox = `
        <div class="date-box">
          <h3>${dayName}, ${dateString}</h3>
          <ul>
            <li>Fajr: ${data.Fajr ? '✅' : '❌'}</li>
            <li>Dhuhr: ${data.Dhuhr ? '✅' : '❌'}</li>
            <li>Asr: ${data.Asr ? '✅' : '❌'}</li>
            <li>Maghrib: ${data.Maghrib ? '✅' : '❌'}</li>
            <li>Isha: ${data.Isha ? '✅' : '❌'}</li>
          </ul>
        </div>
      `;

      historyContainer.innerHTML += historyBox;
    }
  });
};
