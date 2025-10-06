<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
    <h1 class="text-2xl font-bold mb-6 text-gray-800 ">
      Hospital Biometric Login
    </h1>

    <!-- Username Input -->
    <input
      v-model="username"
      placeholder="Enter username/email"
      class="px-4 py-2 mb-4 border rounded w-72"
    />

    <!-- Buttons -->
    <div class="flex gap-4">
      <button
        @click="registerBiometric"
        class="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
      >
        Register Biometric
      </button>
      <button
        @click="loginBiometric"
        class="px-6 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
      >
        Login Biometric
      </button>
    </div>

    <!-- Message -->
    <p v-if="message" class="mt-6 text-lg text-gray-700 dark:text-gray-300">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { startRegistration, startAuthentication } from "@simplewebauthn/browser";

const username = ref("");
const message = ref("");

//  Register (Biometric Enroll)
const registerBiometric = async () => {
  if (!username.value) {
    message.value = " Please enter a username!";
    return;
  }

  try {
    // 1) Get options from backend
    const { data: options } = await axios.post(
      "http://localhost:8000/webauthn/register/options",
      { username: username.value }
        
    );
       console.log(data);
       

    // 2) Ask browser for biometric (fingerprint/face)
    const attResp = await startRegistration(options);

    // 3) Send response to backend
    const verify = await axios.post(
      "http://localhost:8000/webauthn/register/verify",
      { username: username.value, attestation: attResp }
    );

    message.value = verify.data?.success
      ? " Biometric Registered!"
      : " Register failed!";
  } catch (err) {
    console.error(err);
    message.value = " Register error: " + err.message;
  }
};

//  Login (Biometric Auth)
const loginBiometric = async () => {
  if (!username.value) {
    message.value = " Please enter a username!";
    return;
  }

  try {
    // 1) Get login options (challenge) from backend
    const { data: options } = await axios.post(
      "http://localhost:8000/webauthn/login/options",
      { username: username.value }
    );

    // 2) Ask browser to authenticate with fingerprint/face
    const assertion = await startAuthentication(options);

    // 3) Send assertion to backend for verification
    const verify = await axios.post(
      "http://localhost:8000/webauthn/login/verify",
      { username: username.value, assertion }
    );

    message.value = verify.data?.success
      ? " Login Successful!"
      : " Login Failed!";
  } catch (err) {
    console.error(err);
    message.value = " Login error: " + err.message;
  }
};
</script>
