<template>
  <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="row justify-content-center w-100">
      <div class="col-md-6">
        <div class="card bg-black bg-gradient">
          <div class="card-header text-light">
            <h3 class="text-center">Login</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="form-group mb-3 text-light">
                <label for="username">Username</label>
                <input type="text" id="username" class="form-control" v-model="username" required/>
                <div v-if="usernameError" class="text-danger">{{ usernameError }}</div>
              </div>
              <div class="form-group mb-3 text-light">
                <label for="password">Password</label>
                <input type="password" id="password" class="form-control" v-model="password" required/>
                <div v-if="passwordError" class="text-danger">{{ passwordError }}</div>
              </div>
              <button type="submit" class="btn btn-success w-100">Login</button>
            </form>
            <div class="mt-3 text-center text-light">
              <span>Don't have an account? <router-link to="/register" class="link">Register</router-link></span>
            </div>
            <div class="mt-3 text-center text-light">
              <span>Want to try out the website? Try <router-link to="/GuessAccount" class="link">Guess account</router-link></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      usernameError: '',
      passwordError: ''
    };
  },
  methods: {
    validateUsername() {
      const usernameRegex = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;
      if (!usernameRegex.test(this.username)) {
        this.usernameError = 'Username must be at least 6 characters long and contain at least one number and one capital character';
        console.error('Username validation failed');
        return false;
      } else {
        this.usernameError = '';
        return true;
      }
    },
    validatePassword() {
      const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z]).{5,10}$/;
      if (!passwordRegex.test(this.password)) {
        this.passwordError = 'Password must be between 5 and 10 characters long and contain at least one special and capital character';
        return false;
      } else {
        this.passwordError = '';
        return true;
      }
    },
    handleSubmit() {
      if (!this.validateUsername() || !this.validatePassword()) {
        return;
      }
      alert(`Wellcome ${this.username}`);
      this.$router.push('/home');
    }
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
}
.text-danger {
  color: red;
}
.link {
  text-decoration: none;
}
</style>