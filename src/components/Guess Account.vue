<template>
  <div class="d-flex flex-column justify-content-between min-vh-100 content-padding">
    <div class="col-md-8 mx-auto">
      <div class="text-white mb-3 mt-3 d-flex justify-content-center align-items-center">
        <h2 class="text-center me-3">Some big name</h2>
        <button class="btn btn-outline-success ms-2">
          <router-link to="/register" class="register_link">Register Now</router-link>
        </button>
      </div>
      <div class="body">
        <div class="row justify-content-center mb-4">
          <div class="col-md-9">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search music name" v-model="searchQuery"/>
              <button class="btn btn-outline-success" @click="searchMusic">
                <strong>Search</strong>
              </button>
            </div>
          </div>
        </div>
        <div class="text-center mb-4">
          <button class="btn btn-secondary me-3" @click="filterMusic('All')">All</button>
          <button class="btn btn-secondary me-3" @click="filterMusic('Ed Sheeran')">Ed Sheeran</button>
          <button class="btn btn-secondary me-3" @click="filterMusic('Lisa')">Lisa</button>
          <button class="btn btn-secondary me-3" @click="filterMusic('Rose')">Rose</button>
          <button class="btn btn-secondary me-3" @click="filterMusic('Jennie')">Jennie</button>
          <button class="btn btn-secondary me-3" @click="filterMusic('Jisoo')">Jisoo</button>
          <button class="btn btn-secondary me-3" @click="filterMusic('Kpop')">Kpop</button>
        </div>
        <div v-if="filteredMusic.length === 0" class="text-center text-white">
          No results found.
        </div>
        <div v-else class="row">
          <div v-for="(song, index) in filteredMusic" :key="song.id" class="col-lg-3 col-md-4 col-sm-6 mb-3" @click="playSong(song)">
            <div class="card bg-dark text-white h-100">
              <div class="card-body">
                <h5 class="card-title">{{ song.name }}</h5>
                <p class="card-text">Artist: {{ song.artist }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="currentSong" class="fixed-bottom bg-dark text-white p-3">
      <div class="d-flex justify-content-center align-items-center">
        <button class="btn btn-outline-success me-3" @click="prevSong">&laquo; Previous</button>
        <div>
          <strong>Now Playing:</strong> {{ currentSong.name }} by {{ currentSong.artist }}
        </div>
        <button class="btn btn-outline-success ms-3" @click="nextSong">Next &raquo;</button>
      </div>
      <div class="d-flex justify-content-center align-items-center mt-2">
        <audio ref="audioPlayer" :src="currentSong.path" controls autoplay></audio>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      filterCategory: 'All',
      music: [
        { id: 1, name: 'Photograph', artist: 'Ed Sheeran', path: '/music/Ed Sheeran _Photograph.mp3', genre: 'Ed Sheeran', likes: 0 },
        { id: 2, name: 'BloodStream', artist: 'Ed Sheeran', path: '/music/Bloodstream.mp3', genre: 'Ed Sheeran', likes: 0 },
        { id: 3, name: 'Flower', artist: 'Jisoo', path: '/music/FLOWER.mp3', genre: 'Jisoo', likes: 0 },
        { id: 4, name: 'Gone', artist: 'Rose', path: '/music/Gone.mp3', genre: 'Rose', likes: 0 },
        { id: 5, name: 'Lalisa', artist: 'Lisa', path: '/music/LALISA.mp3', genre: 'Lisa', likes: 0 },
        { id: 6, name: 'MONEY', artist: 'Lisa', path: '/music/MONEY.mp3', genre: 'Lisa', likes: 0 },
        { id: 7, name: 'On The Ground', artist: 'Rose', path: '/music/On The Ground.mp3', genre: 'Rose', likes: 0 },
        { id: 8, name: 'Perfect', artist: 'Ed Sheeran', path: '/music/Perfect.mp3', genre: 'Ed Sheeran', likes: 0 },
        { id: 9, name: 'Pink Venom', artist: 'BlackPink', path: '/music/Pink Venom.mp3', genre: 'Kpop', likes: 0 },
        { id: 10, name: 'DDUDU DDUDU', artist: 'BlackPink', path: '/music/DDUDU DDUDU.mp3', genre: 'Kpop', likes: 0 },
        { id: 11, name: 'Playing with Fire', artist: 'BlackPink', path: '/music/PLAYING WITH FIRE.mp3', genre: 'Kpop', likes: 0 },
        { id: 12, name: 'Shut Down', artist: 'BlackPink', path: '/music/Shut Down.mp3', genre: 'Kpop', likes: 0 },
        { id: 13, name: 'BOOMBAYAH', artist: 'BlackPink', path: '/music/BOOMBAYAH.mp3', genre: 'Kpop', likes: 0 },
        { id: 14, name: 'Thinking Out Loud', artist: 'Ed Sheeran', path: '/music/Thinking Out Loud.mp3', genre: 'Ed Sheeran', likes: 0 },
        { id: 15, name: 'Tenerife Sea', artist: 'Ed Sheeran', path: '/music/Tenerife Sea.mp3', genre: 'Ed Sheeran', likes: 0 },
        { id: 16, name: 'Solo', artist: 'Jennie', path: '/music/Tenerife Sea.mp3', genre: 'Jennie', likes: 0 },
      ],
      currentSongIndex: null,
      currentSongPlaying: null
    };
  },
  computed: {
    filteredMusic() {
      let musicList = this.music;
      if (this.filterCategory !== 'All') {
        musicList = musicList.filter(song => song.genre === this.filterCategory);
      }
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        musicList = musicList.filter(song =>
            song.name.toLowerCase().includes(query)
        );
      }
      return musicList;
    },
    currentSong() {
      return this.currentSongPlaying;
    }
  },
  methods: {
    searchMusic() {
    },
    filterMusic(category) {
      this.filterCategory = category;
    },
    playSong(song) {
      this.currentSongPlaying = song;
      this.$nextTick(() => {
        this.$refs.audioPlayer.load(); // Load the new song
      });
    },
    nextSong() {
      if (this.currentSongPlaying) {
        let currentIndex = this.music.findIndex(song => song.id === this.currentSongPlaying.id);
        if (currentIndex < this.music.length - 1) {
          this.currentSongPlaying = this.music[currentIndex + 1];
        } else {
          this.currentSongPlaying = this.music[0]; // Loop back to the first song
        }
        this.$nextTick(() => {
          this.$refs.audioPlayer.load(); // Load the new song
        });
      }
    },
    prevSong() {
      if (this.currentSongPlaying) {
        let currentIndex = this.music.findIndex(song => song.id === this.currentSongPlaying.id);
        if (currentIndex > 0) {
          this.currentSongPlaying = this.music[currentIndex - 1];
        } else {
          this.currentSongPlaying = this.music[this.music.length - 1]; // Loop back to the last song
        }
        this.$nextTick(() => {
          this.$refs.audioPlayer.load(); // Load the new song
        });
      }
    },
    incrementLikes(song) {
      song.likes += 1;
    }
  }
};
</script>

<style scoped>
.min-vh-100 {
  min-height: 100vh;
}
.card {
  cursor: pointer;
}
.fixed-bottom {
  background-color: rgba(0, 0, 0, 0.85);
}
.content-padding {
  padding-bottom: 130px;
}
.register_link {
  text-decoration: none;
  color: inherit;
}

</style>
