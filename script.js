
const message = "Ab birthday hai Aapka, toh kuch special toh banta hai na! Dekho zara kya banaya hai aapke liye. 💗💗";

let index = 0;

function typeMessage() {
    if (index < message.length) {
        document.getElementById("message").textContent +=
            message.charAt(index);

        index++;
        setTimeout(typeMessage, 65);
    }
}

typeMessage();

// Create 100 magical stars
const starsContainer = document.querySelector(".stars");

for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");

    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";

    starsContainer.appendChild(star);
}

// First surprise interaction

function enterUniverse() {
    const music = document.getElementById("backgroundMusic");

    music.volume = 0.5;
    music.play().catch(error => {
        console.log("Music could not start:", error);
    });



    // Hide the welcome screen
    document.querySelector(".welcome").style.display = "none";

    // Show the universe animation
    const universe = document.getElementById("universe");
    universe.classList.remove("hidden");

    // Wait for portal animation
    setTimeout(() => {

        const text = document.getElementById("universeText");

        text.textContent = "Aapse milna shayad coincidence tha...";

        // Change to the second message
        setTimeout(() => {
            text.style.animation = "none";
            void text.offsetWidth;
            text.style.animation = "fadeIn 2s ease";
            text.textContent = "par aapke bina ab meri life nhi h.♡";

            // Reveal continue button
            setTimeout(() => {
                document.getElementById("continueBtn")
                    .classList.remove("hidden");
            }, 2200);

        }, 3000);

    }, 1500);
}


function showChapterOne() {

    // Hide the universe portal
    document.getElementById("universe")
        .classList.add("hidden");

    // Show secret password screen
    document.getElementById("passwordScreen")
        .classList.remove("hidden");

    document.body.style.overflow = "auto";
}


// Temporary password for testing
const correctPassword = "22/11/2004";

function checkPassword() {

    const input = document.getElementById("secretPassword");

    const enteredPassword = input.value
        .trim()
        .toLowerCase();

    const message = document.getElementById("passwordMessage");

    if (enteredPassword === correctPassword) {

        message.textContent = "Yayyy! Welcome to your universe! 💗";

        setTimeout(() => {

            document.getElementById("passwordScreen")
                .classList.add("hidden");

            document.getElementById("chapterOne")
                .classList.remove("hidden");

        }, 1200);

    } else {

        message.textContent =
            "Hehehe, galat password! Dobara try karo 🤭";

        input.value = "";

        input.animate(
            [
                { transform: "translateX(0)" },
                { transform: "translateX(-8px)" },
                { transform: "translateX(8px)" },
                { transform: "translateX(0)" }
            ],
            { duration: 300 }
        );
    }
}




function toggleBackgroundMusic() {
    const music = document.getElementById("backgroundMusic");

    if (music.paused) {
        music.play().catch(error => console.log(error));
    } else {
        music.pause();
    }
}

function updateFloatingMusicButton() {
    const music = document.getElementById("backgroundMusic");
    const btn = document.getElementById("musicToggle");

    if (!music || !btn) return;

    btn.textContent = music.paused ? "🔇" : "🔊";
}

birthdayMusic?.addEventListener("play", updateFloatingMusicButton);
birthdayMusic?.addEventListener("pause", updateFloatingMusicButton);





/* ===== TWO SONGS: CHAPTER 02 SWITCH ===== */

const saiboMusic = document.getElementById("backgroundMusic");
const chapterSong = document.getElementById("chapterTwoMusic");

let fadeTimer = null;

function fadeOut(audio, callback) {
    if (fadeTimer) clearInterval(fadeTimer);

    if (audio.paused) {
        callback();
        return;
    }

    const startingVolume = audio.volume;
    const steps = 15;
    let step = 0;

    fadeTimer = setInterval(() => {
        step++;

        audio.volume = Math.max(
            0,
            startingVolume * (1 - step / steps)
        );

        if (step >= steps) {
            clearInterval(fadeTimer);
            fadeTimer = null;
            audio.pause();
            callback();
        }
    }, 50);
}

function fadeIn(audio, targetVolume = 0.5) {
    audio.volume = 0;

    audio.play().then(() => {
        let step = 0;
        const steps = 15;

        const timer = setInterval(() => {
            step++;
            audio.volume = Math.min(
                targetVolume,
                targetVolume * step / steps
            );

            if (step >= steps) clearInterval(timer);
        }, 50);
    }).catch(error => console.log(error));
}


/* ===== MUSIC SWITCHING FIX ===== */

function openMusicChapter() {
    const saibo = document.getElementById("backgroundMusic");
    const oMaahi = document.getElementById("chapterTwoMusic");

    document.getElementById("chapterOne").classList.add("hidden");
    document.getElementById("chapterTwo").classList.remove("hidden");

    const musicButton = document.getElementById("musicToggle");
    if (musicButton) musicButton.style.display = "none";

    // Stop Saibo completely
    saibo.pause();

    // Start O Maahi
    oMaahi.pause();
    oMaahi.currentTime = 0;
    oMaahi.volume = 0.55;

    oMaahi.play().catch(error => {
        console.error("O Maahi error:", error);
    });

    if (typeof updateChapterTwoPlayer === "function") {
        updateChapterTwoPlayer();
    }

    window.scrollTo(0, 0);
}

function updateChapterTwoPlayer() {
    const button = document.getElementById("vinylMusicButton");
    const waves = document.getElementById("musicVisualizer");

    if (!button || !waves) return;

    const playing = !chapterSong.paused;

    button.textContent = playing
        ? "⏸ Pause Our Song"
        : "▶ Play Our Song";

    waves.classList.toggle("playing", playing);
}

function toggleVinylMusic() {
    if (chapterSong.paused) {
        chapterSong.play().catch(error => console.log(error));
    } else {
        chapterSong.pause();
    }
}

function formatSongTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${String(secs).padStart(2, "0")}`;
}

function updateChapterProgress() {
    const duration = chapterSong.duration || 0;
    const current = chapterSong.currentTime || 0;

    document.getElementById("chapterTwoProgress").style.width =
        duration ? `${(current / duration) * 100}%` : "0%";

    document.getElementById("chapterTwoCurrent").textContent =
        formatSongTime(current);

    document.getElementById("chapterTwoDuration").textContent =
        formatSongTime(duration);
}

chapterSong.addEventListener("play", updateChapterTwoPlayer);
chapterSong.addEventListener("pause", updateChapterTwoPlayer);
chapterSong.addEventListener("timeupdate", updateChapterProgress);
chapterSong.addEventListener("loadedmetadata", updateChapterProgress);


chapterSong.addEventListener("ended", () => {
    const chapterTwo = document.getElementById("chapterTwo");

    if (chapterTwo && !chapterTwo.classList.contains("hidden")) {
        chapterSong.currentTime = 0;
        chapterSong.play().catch(() => { });
    }
});


function returnToSaibo() {
    const saibo = document.getElementById("backgroundMusic");
    const oMaahi = document.getElementById("chapterTwoMusic");

    // Stop O Maahi
    oMaahi.pause();
    oMaahi.currentTime = 0;

    // Resume Saibo
    saibo.volume = 0.5;
    saibo.play().catch(error => {
        console.error("Saibo error:", error);
    });
}


/* ===== CHAPTER 03: MEMORIES ===== */

const memories = [
    {
        photo: "assets/photos/photo1.jpg",
        title: "My Favourite Boy ♡",
        caption: "Yahan apna personal message likhna ❤️"
    },
    {
        photo: "assets/photos/photo2.jpg",
        title: "Where It All Began ♡",
        caption: "Yahan first photo ki memory likhna 💗"
    },
    {
        photo: "assets/photos/photo3.jpg",
        title: "That Smile 🥹",
        caption: "Yahan uski smile ke baare mein likhna"
    },
    {
        photo: "assets/photos/photo4.jpg",
        title: "Us Being Us ♡",
        caption: "Yahan selfie ki memory likhna"
    },
    {
        photo: "assets/photos/photo5.jpg",
        title: "Certified Pagal 🤭",
        caption: "Yahan koi funny inside joke likhna"
    },
    {
        photo: "assets/photos/photo6.jpg",
        title: "My Happy Place ♡",
        caption: "Yahan favourite memory likhna"
    },
    {
        photo: "assets/photos/photo7.jpg",
        title: "Birthday Boy 💗",
        caption: "Yahan birthday boy ke liye compliment likhna"
    },
    {
        photo: "assets/photos/photo8.jpg",
        title: "My Favourite Memory ♡",
        caption: "Yahan sabse special memory likhna ❤️"
    }
];

let currentMemory = 0;

function openMemory(index) {
    currentMemory = index;

    const memory = memories[index];

    document.getElementById("popupPhoto").src = memory.photo;
    document.getElementById("popupTitle").textContent = memory.title;
    document.getElementById("popupCaption").textContent = memory.caption;

    document.getElementById("memoryPopup").classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function closeMemory() {
    document.getElementById("memoryPopup").classList.add("hidden");
    document.body.style.overflow = "";
}

function changeMemory(direction) {
    const next = (currentMemory + direction + memories.length) % memories.length;
    openMemory(next);
}

document.getElementById("memoryPopup").addEventListener("click", function (e) {
    if (e.target === this) closeMemory();
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMemory();
});

function openMemoryMuseum() {
    const oMaahi = document.getElementById("chapterTwoMusic");

    // Stop Chapter 02 music immediately
    oMaahi.pause();

    document.getElementById("chapterTwo").classList.add("hidden");
    document.getElementById("memoryMuseum").classList.remove("hidden");

    const musicButton = document.getElementById("musicToggle");
    if (musicButton) musicButton.style.display = "block";

    returnToSaibo();

    window.scrollTo(0, 0);
}



/* ===== FLOATING HEARTS ===== */

function createRomanticHearts(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section || section.querySelector(".romantic-hearts")) return;

    const container = document.createElement("div");
    container.className = "romantic-hearts";
    container.setAttribute("aria-hidden", "true");

    for (let i = 0; i < 18; i++) {
        const heart = document.createElement("span");
        heart.textContent = Math.random() > 0.5 ? "♡" : "✦";

        heart.style.left = Math.random() * 100 + "%";
        heart.style.animationDelay = Math.random() * -12 + "s";
        heart.style.animationDuration = (8 + Math.random() * 7) + "s";
        heart.style.fontSize = (12 + Math.random() * 18) + "px";

        container.appendChild(heart);
    }

    section.prepend(container);
}

createRomanticHearts("chapterTwo");
createRomanticHearts("memoryMuseum");


/* =========================================
   CHAPTER 04 — LOVE LETTER
========================================= */

// Personal birthday letter
const birthdayLetter = [
    `Sabse pehle aapko janamdin ki dher saari badhai! ❤️
  Mere saath aapka 4th birthday hai, aur hamesha ki tarah
  is baar bhi bahut excitement hai.`,

    `Aapke liye kya hi likhun...
  Aapne toh mujhe hi likha hai.
  In 4 saalon mein aapne mera jeevan itna achha bana diya.
  Really, you are the best yrr! ♡`,

    `Jab pehli baar woh teen shabd bole the na,
  tab laga tha ki abhi toh bahut time hai...
  Khoob enjoy karenge, masti karenge,
  aur hamesha saath rahenge.`,

    `Par ab life humein aise phase mein le ja rahi hai
  jahan kuch time ke liye bye toh bolna hi hoga.
  Lekin yaad rakhna, bye ka matlab bye-bye
  bilkul nahi hona chahiye!`,

    `Ek-ek pal ki update dena aur lena.
  Dekh lo kitni emotional hoon...
  Abhi toh sirf message likh rahi hoon
  aur ismein bhi ro rahi hoon. 🥹`,

    `Long distance ko long distance lagne hi
  nahi dena hai. Ye aapke liye aur mere liye
  ek challenge hai, samjhe? ❤️`,

    `Khair, kahan ye emotional baatein karne lagi main!
  Apn aapki baat karte hain...`,

    `Aap toh itne achhe ho ki kya hi bataun.
  Hamesha mera saath diya, har phase mein saath rahe.
  Kabhi mere liye kisi cheez ko mana nahi kiya.
  Hamesha mere liye khade rahe.`,

    `Apn kitni jagah gaye, aur har jagah
  aapne mujhe sambhala.
  Main har baar kuch na kuch gadbad kar deti hoon,
  uske baad bhi! 🤭`,

    `Ye chaar saal ka safar sach mein
  bahut hi pyaara tha ji. ♡`,

    `Aur haan! Aisa bilkul mat sochna ki
  ye hamara saath mein last birthday hai.
  Aapko toh pata hi hai main kaisi hoon...
  Duniya ke kisi bhi kone mein ho aap,
  aapka peecha nahi chhodungi! 💗`,

    `Library mein saath padhna...
  Saath ghoomne jaana...
  Scooty rides, masti, quality time...
  Aur canteen mein meri patties kha jaana!
  Bsss, par achha lagta hai. 😂❤️`,

    `Yahi toh apne beech ki chhoti-chhoti memories hain.
  Lab mein aapke saath baithna,
  aapke ghar jaane par dukhi hona...`,

    `Subah-subah jaldi aakar aapka wait karna...
  Woh Aghora ki sadak se nazrein na hatana,
  jab tak aap dikh na jao.`,

    `College aane ka maksad hi aap ho yrr!
  Warna padhne kaun aata hai? 🤭`,

    `Aur woh bookshelf ke peeche
  kitni mehnat se book dhoondhna...
  Pata hai na? Samajh hi gaye honge,
  smart ho aap toh! 😂💗`,

    `Bas ji, ab apne chaar saal ki
  memories taaza kar li hain.
  Aage ki kahani baad mein... ♡`
];

let letterOpened = false;
let letterTimers = [];

function openLetterChapter() {
    document.getElementById("memoryMuseum")
        .classList.add("hidden");

    document.getElementById("chapterFour")
        .classList.remove("hidden");

    // Saibo continues without restarting
    window.scrollTo(0, 0);
}


function openLoveLetter() {
    const envelope = document.getElementById("loveEnvelope");
    const intro = document.getElementById("letterIntro");
    const reveal = document.getElementById("letterReveal");

    if (!envelope || !intro || !reveal) {
        console.error("Letter elements missing!");
        return;
    }

    envelope.classList.add("opened");

    setTimeout(() => {
        intro.classList.add("hidden");
        reveal.classList.remove("hidden");

        // Reveal existing HTML letter — don't erase it
        document.querySelectorAll("#letterContent p").forEach((p, index) => {
            p.classList.add("letter-paragraph");

            setTimeout(() => {
                p.classList.add("visible");
            }, 200 + index * 200);
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1000);
}



/* ========== CHAPTER 05 — BIRTHDAY SURPRISE ========== */

let birthdayCompleted = false;
let birthdayMicStream = null;
let birthdayAudioContext = null;
let birthdayMicFrame = null;
let birthdayBlowFrames = 0;

function stopBirthdayMic() {
    if (birthdayMicFrame !== null) {
        cancelAnimationFrame(birthdayMicFrame);
        birthdayMicFrame = null;
    }

    if (birthdayMicStream) {
        birthdayMicStream.getTracks().forEach(track => track.stop());
        birthdayMicStream = null;
    }

    if (birthdayAudioContext) {
        birthdayAudioContext.close().catch(() => { });
        birthdayAudioContext = null;
    }
}
function openBirthdayChapter() {
    const letter = document.getElementById("chapterFour");
    const birthday = document.getElementById("chapterFive");

    if (!birthday) {
        console.error("Chapter 05 HTML not found!");
        return;
    }

    // Hide letter chapter
    if (letter) {
        letter.classList.add("hidden");
        letter.style.display = "none";
    }

    // Show birthday chapter
    birthday.classList.remove("hidden");
    birthday.style.display = "block";

    // Reset candles
    document.querySelectorAll("#chapterFive .cake-candle")
        .forEach(candle => candle.classList.remove("blown"));

    // Hide wish until candles are blown
    document.getElementById("birthdayWishReveal")
        ?.classList.add("hidden");

    document.getElementById("birthdayFinalButton")
        ?.classList.add("hidden");

    // Reset state
    birthdayCompleted = false;

    window.scrollTo(0, 0);
}




function listen() {
    if (!birthdayMicStream || birthdayCompleted) return;

    analyser.getByteTimeDomainData(samples);

    let sum = 0;

    for (let i = 0; i < samples.length; i++) {
        const value = (samples[i] - 128) / 128;
        sum += value * value;
    }

    const volume = Math.sqrt(sum / samples.length);

    if (volume > 0.075) {
        birthdayBlowFrames++;
    } else {
        birthdayBlowFrames = Math.max(0, birthdayBlowFrames - 2);
    }

    if (birthdayBlowFrames >= 12) {
        blowAllCandles();
        return;
    }

    if (performance.now() - startTime > 15000) {
        stopBirthdayMic();
        button.disabled = false;
        button.textContent = "🎤 Try Again";
        status.textContent =
            "Blow detect nahi hua. Dobara try karo ♡";
        return;
    }

    birthdayMicFrame = requestAnimationFrame(listen);
}

listen();


function completeBirthdayWish() {
  if (birthdayCompleted) return;

  birthdayCompleted = true;

  const instruction = document.getElementById("candleInstruction");

  if (instruction) {
    instruction.textContent =
      "Your wish is on its way to the universe... ✨";
  }

  // Confetti
  if (typeof launchBirthdayConfetti === "function") {
    launchBirthdayConfetti();
  }

  // Reveal birthday message and Chapter 06 button
  setTimeout(() => {
    const wish = document.getElementById("birthdayWishReveal");
    const nextButton = document.getElementById("birthdayFinalButton");

    if (wish) {
      wish.classList.remove("hidden");
    }

    if (nextButton) {
      nextButton.classList.remove("hidden");
      nextButton.style.display = "inline-block";
      nextButton.style.visibility = "visible";
      nextButton.style.opacity = "1";
    }

    if (wish) {
      wish.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, 800);
}

function launchBirthdayConfetti() {
    const container = document.getElementById("birthdayConfetti");
    container.innerHTML = "";

    const colors = [
        "#ffb4d2",
        "#ffe1a5",
        "#f9d5e6",
        "#d8b3f0",
        "#ffffff"
    ];

    for (let i = 0; i < 110; i++) {
        const piece = document.createElement("span");
        piece.className = "confetti-piece";

        piece.style.left = Math.random() * 100 + "%";
        piece.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.animationDelay = Math.random() * 1.5 + "s";
        piece.style.animationDuration =
            (3 + Math.random() * 2) + "s";

        container.appendChild(piece);
    }

    setTimeout(() => {
        container.innerHTML = "";
    }, 6500);
}





/* ========== TAP TO BLOW CANDLES ========== */


/* CANDLE TAP FIX */

function blowCandle(candle) {

  // Prevent double tapping same candle
  if (candle.classList.contains("blown")) return;

  // Immediately extinguish the flame
  candle.classList.add("blown");

  const total = document.querySelectorAll(
    "#chapterFive .cake-candle"
  ).length;

  const blown = document.querySelectorAll(
    "#chapterFive .cake-candle.blown"
  ).length;

  const instruction = document.getElementById("candleInstruction");

  if (instruction) {
    instruction.textContent =
      blown < total
        ? `${blown} of ${total} candles blown... ♡`
        : "Your wish is on its way to the universe... ✨";
  }

  if (blown === total) {
    if (typeof completeBirthdayWish === "function") {
      completeBirthdayWish();
    }
  }
}


/* ========== CHAPTER 06 — OUR FOREVER ========== */

function openFinalChapter() {
  const chapterFive = document.getElementById("chapterFive");
  const chapterSix = document.getElementById("chapterSix");

  if (!chapterSix) {
    console.error("Chapter 06 not found in HTML!");
    return;
  }

  chapterFive.classList.add("hidden");
  chapterSix.classList.remove("hidden");

  createForeverStars();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function createForeverStars() {
  const container = document.getElementById("foreverStars");

  if (!container) return;

  container.innerHTML = "";

  for (let i = 0; i < 90; i++) {
    const star = document.createElement("span");

    star.className = "forever-star";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    star.style.animationDelay = Math.random() * 4 + "s";
    star.style.animationDuration =
      (2 + Math.random() * 3) + "s";

    container.appendChild(star);
  }
}

function replayOurUniverse() {
  const chapterSix = document.getElementById("chapterSix");

  chapterSix.classList.add("hidden");

  // Hide other chapters
  document.querySelectorAll(
    "#chapterOne, #chapterTwo, #memoryMuseum, #chapterFour, #chapterFive"
  ).forEach(chapter => {
    chapter.classList.add("hidden");
  });

  // Return to the welcome screen
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  // Reload to restore the original welcome animations
  window.location.reload();
}
