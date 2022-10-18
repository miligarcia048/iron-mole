class Audio {
    constructor(src) {
      this.src = src;
      this.sound = document.createElement("audio");
    }
    
    createElement() {
      this.sound.src = src;
      this.sound.setAttribute("preload", "auto");
      this.sound.setAttribute("controls", "none");
      this.sound.style.display = "none";
      document.body.appendChild(this.sound);
    }
  
    play() {
      this.sound.play();
    }
  
    stop() {
      this.sound.pause();
    }
  }