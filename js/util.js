const Helper =  {
    playSound: () => {
        const sound = new Audio();
        sound.src = "../assets/sound/beep.mp3";
        sound.play();
        sound.onended = () => delete(sound);
    },
    errorSound: () => {
        const sound = new Audio();
        sound.src = "../assets/sound/error.mp3";
        sound.play();
        sound.onended = () => delete(sound);
    }
}
