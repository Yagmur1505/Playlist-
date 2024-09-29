/* elementlere ulasip obje olarak kullanma, yakalama*/
const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')
const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')
const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton= document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')
const currentProgress = document.getElementById('current-progress')

// şarkıları sıralama 
let index 
 
// döngü 
let loop=true

//liste 
const songsList=[
    {
        name:"Nizanım",
        link:"media/Nizanim.mp3",
        artist:"Tara Mamedova",
        image:"media/tara-mamedova.jpeg",
    },
    {
        name:"Lo Sıvano",
        link:"media/lo-sivano.mp3",
        artist:"Pervin Chakar",
        image:"media/pervin-chakar.jpeg",
    },
    {
        name:"Ax Eman",
        link:"media/ax-eman.mp3",
        artist:"Rewsan Celiker",
        image:"media/rewsan-celiker.jpeg",
    },
    {
        name:"Yara Bere",
        link:"media/yara-bere-icindeyim.mp3",
        artist:"Hira-i Zerdust",
        image:"media/hirai.jpeg",
    },
    {
        name:"Gelo Ew Ki Bu",
        link:"media/gelo-ew-ki-bu.mp3",
        artist:"Aram Tigran",
        image:"media/aram-tigran.jpeg",
    },
    {
        name:"Durme Querido Hijico",
        link:"media/durme-querido-hijico.mp3",
        artist:"Francoise Atlan",
        image:"media/françoise-atlan.jpeg",
    }
]

// içerik atama
const setSong=(arrayIndex) => {
    console.log(arrayIndex)
    let {name,link,artist,image} = songsList[arrayIndex]
    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image

 //sureyi ayarlama
 audio.onloadedmetadata = () => {
    maxDuration.innerText = timeFormatter(audio.duration)
    }
 playListContainer.classList.add('hide')
 playAudio()

}
// zamanı istenilen formatta düzenleme 
const  timeFormatter  = (timeInput) => {
    let minute = Math.floor(timeInput / 60)
    minute = minute < 10 ? "0" + minute : minute
    let second = Math.floor(timeInput % 60) 
    second = second < 10 ? "0" + second : second
    return ` ${minute}:${second}`

    
}



// şarkıyı çal
const playAudio= () => {
    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')
}

 // şarkıyı durdur
 const pauseAudio= () => {
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}

//sonraki şarkıya git
const nextSong= () => {
    if (loop) {
        if (index == (songsList.length - 1)) {
            index = 0
        } else {
            index += 1 // index = index + 1
        }
    }else{
        // rastgele sıra oluştur 
        let randIndex = Math.floor(Math.random()*songsList.length)
        index = randIndex
    }
    setSong(index)
    playAudio()
}
//önceki şarkıye git
const previousSong= () => {
    if (index>0) {
       pauseAudio()
       index -= 1 // index = index -1 
    }else {
        index = songsList.length - 1
    }
    setSong(index)
    playAudio()
}

//

 //play butonuna tıklanıldığında
 playButton.addEventListener('click', playAudio)
 //pause butonuna tıklanıldığında 
 pauseButton.addEventListener('click', pauseAudio)
 //sonraki şarkıya geç butonuna tıklanıldığında
 nextButton.addEventListener('click', nextSong)
 // önceki şarkıya geç butonuna tıklanıldığında
 prevButton.addEventListener('click', previousSong)
 // karıştırma butonuna tıklanıldığında
 shuffleButton.addEventListener('click',() => {
    if (shuffleButton.classList.contains('active')){
        shuffleButton.classList.remove('active')
        loop=true
    }else{
        shuffleButton.classList.add('active')
        loop=false
    }
 })
 // ekran yüklendiğinde
 window.onload = () =>{
    index = 0
    setSong(index)
    pauseAudio()
 }
 //tekrar et butonuna tıklanıldığında 
 repeatButton.addEventListener('click', () => {
    if (repeatButton.classList.contains('active')){
        repeatButton.classList.remove('active')
        loop=false
    }else{
        repeatButton.classList.add('active')
        loop=true
    }
 })

 // progres bara tıklanıldığında (gri çizgi)
 progressBar.addEventListener('click',(event) => {
    //başlangıç / sol
    let coordStart = progressBar.getBoundingClientRect().left
    console.log("coordStart: " + coordStart)
    // bitiş
    let coordEnd = event.clientX
    console.log("coordEnd: " + coordEnd )
    console.log("progressBar.offsetWidth: " + progressBar.offsetWidth)

    let progress = (coordEnd - coordStart) / progressBar.offsetWidth  
    console.log("progress:" + progress)
    currentProgress.style.width = progress * 100 + "%"

  // progress bara göre zamanı güncelle 
 audio.currentTime = progress * audio.duration

 // oynat kısmı çalışsın
 audio.play()
 pauseButton.classList.remove('hide')
 playButton.classList.add('hide')
    
 } )
  
//playlist butonuna tıklanıldığında açılsın
playListButton.addEventListener('click', () => {
    playListContainer.classList.remove('hide')
})
// playlisti kapatma butonuna tıklanıldığında
closeButton.addEventListener('click', () => {
    playListContainer.classList.add('hide')
})

 // ekran yüklenince 
 setInterval( () => {
    currentTimeRef.innerHTML= timeFormatter(audio.currentTime)
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%"
 }, 1000);
 
 // zaman güncellendiğinde 
 audio.addEventListener('timeupdate', () => {
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
 });
 //şarkı bittiğinde sonraki şarkıya geç
 audio.addEventListener('ended', nextSong)
 // veya audio.onload= () => {nextSong()}

 //playlisti oluştur
 const initializePlaylist = () =>{
  for (const i in songsList) {
    playListSongs.innerHTML += `<li class= "playlist-song"
      onclick = "setSong(${i}) ">
      <div class="playlist-image-container"> 
      <img src="${songsList[i].image}" />
      </div>
      <div class="playlist-song-details">
      <span id="playlist-song-name"> ${songsList[i].name} </span>
      <span id="playlist-song-artist-album"> ${songsList[i].artist} </span>
    </li>`
  }
 }


 //ekran yüklendiğinde
 window.onload = () => {
    index = 0
    setSong(index)
    pauseAudio()
    initializePlaylist()
 }
