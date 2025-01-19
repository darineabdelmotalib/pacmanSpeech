// speech.js
document.addEventListener("DOMContentLoaded", () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Your browser does not support the Web Speech API. Please use Chrome or Firefox.");
    } else {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
  
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = "en-US";
  
      recognition.onstart = () => {
        console.log("Voice recognition started. You can speak now.");
      };
  
      recognition.onresult = (event) => {
        const lastResultIndex = event.results.length - 1;
        const transcript = event.results[lastResultIndex][0].transcript.trim();
        console.log(`Recognized speech: ${transcript}`);
  
        // Dispatch a custom event with the transcript as the detail
        const speechEvent = new CustomEvent("speech-detected", {
          detail: { transcript },
        });
        document.dispatchEvent(speechEvent);
      };
  
      recognition.onerror = (event) => {
        console.error(`Speech recognition error detected: ${event.error}`);
      };
  
      recognition.onend = () => {
        console.log("Voice recognition ended.");
        recognition.start(); // Optionally restart recognition for continuous listening
      };
  
      recognition.start();
    }
  });
  