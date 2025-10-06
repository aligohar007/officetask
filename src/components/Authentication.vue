<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Left: Normal Login -->
    <div class="flex-1 flex items-center justify-center bg-white shadow-lg">
      <div class="w-full max-w-md p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>

        <form @submit.prevent="login">
          <!-- Email -->
          <div class="mb-4">
            <label class="block text-gray-700 font-medium mb-2">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <!-- Password -->
          <div class="mb-6">
            <label class="block text-gray-700 font-medium mb-2">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="Enter your password"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <!-- Error/Message -->
        <p v-if="message" class="mt-4 text-center text-gray-700">{{ message }}</p>
      </div>
    </div>

    <!-- Right: Biometric Login -->
    <div class="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 text-white">
      <div class="text-center p-8">
        <h2 class="text-2xl font-bold mb-4">Quick Login</h2>
        <p class="mb-6">Use your fingerprint or face recognition</p>

        <button
          @click="verifyBiometric"
          class="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
        >
          🔒 Login with Biometric
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import axios from "axios"

const email = ref("")
const password = ref("")
const message = ref("")

// Normal Login Function (dummy)
const login = async () => {
  if (email.value && password.value) {
    message.value = `Logged in with email: ${email.value}`
  } else {
    message.value = "Please enter email and password"
  }
}

// Biometric Verification Function
const verifyBiometric = async () => {
  try {
    const response = await axios.post("http://localhost:5000/api/biometric/verify", {
      userId: "12345",
      biometricToken: "sample123" // dummy token
    })
    message.value = response.data.message
  } catch (error) {
    message.value = " Error: " + error.message
  }
}
</script>
