interface Song{
    songId : string
    title : string
    artistId : string
    albumId : string
    genre   : string
    releaseDate : string
    duration : number
    file : string
    image : string
    play : Play[]
    artist : Artist
    album : Album
    songAudio : HTMLAudioElement

}