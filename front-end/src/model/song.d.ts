interface Song{
    songId : string
    title : string
    userId : string
    albumId : string
    genre   : string
    releaseDate : string
    duration : number
    file : string
    image : string
    play : Play[]
    user : User
    album : Album
    songAudio : HTMLAudioElement

}