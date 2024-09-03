<template>
  <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="row  justify-content-center w-100">
      <div class="col-md-6">
        <div class="card bg-black bg-gradient">
          <div class="card-header text-light">
            <h3 class="text-center">Register</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="form-group mb-2 text-light">
                <label for="email">Email Address</label>
                <input type="email" id="email" class="form-control" v-model="email" required/>
              </div>
              <div class="form-group mb-2 text-light">
                <label for="username">Username</label>
                <input type="text" id="username" class="form-control" v-model="username" required/>
                <div v-if="usernameError" class="text-danger">{{ usernameError }}</div>
              </div>
              <div class="form-group mb-2 text-light">
                <label for="age">Age</label>
                <input type="number" id="age" class="form-control" v-model="age" required/>
                <div v-if="ageError" class="text-danger">{{ ageError }}</div>
              </div>
              <div class="form-group mb-2 text-light">
                <label for="password">Password</label>
                <input type="password" id="password" class="form-control" v-model="password" required/>
                <div v-if="passwordError" class="text-danger">{{ passwordError }}</div>
              </div>
              <div class="form-group mb-2 text-light">
                <label for="confirmPassword">Re-enter Password</label>
                <input type="password" id="confirmPassword" class="form-control" v-model="confirmPassword" required/>
              </div>
              <div class="form-group form-check mb-3 text-light">
                <input type="checkbox" id="terms" class="form-check-input" v-model="termsAgreed" required/>
                <label class="form-check-label" for="terms">I agree to the terms and conditions</label>
              </div>
              <button type="submit" class="btn btn-success w-100">Register</button>
            </form>
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
      email: '',
      username: '',
      age: '',
      password: '',
      confirmPassword: '',
      passwordError: '',
      termsAgreed: false,
      usernameError: '',
      ageError: ''
    };
  },
  methods: {
    validateUsername() {
      const usernameRegex = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;
      if (!usernameRegex.test(this.username)) {
        this.usernameError = 'Username must be at least 6 characters long and contain at least one number and one capital character';
        return false;
      } else {
        this.usernameError = '';
        return true;
      }
    },
    validateAge() {
      if (this.age < 10 || this.age > 90) {
        this.ageError = 'Age must be between 10 and 90';
        return false;
      } else {
        this.ageError = '';
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
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      if (!this.termsAgreed) {
        alert('You must agree to the terms and conditions');
        return;
      }
      if (!this.validateUsername() || !this.validateAge()) {
        return;
      }
      if (!this.validatePassword()) {
        return;
      }

      alert(`Welcome ${this.username} !`);
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
</style>