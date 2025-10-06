<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Left: Normal Login -->
    <div class="flex-1 flex items-center justify-center bg-white shadow-lg">
      <div class="w-full max-w-md p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Staff Login</h2>

        <form @submit.prevent="login">
          <div class="mb-4">
            <label class="block text-gray-700 font-medium mb-2">Email</label>
            <input v-model="email" type="email" placeholder="Enter your email"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          <div class="mb-6">
            <label class="block text-gray-700 font-medium mb-2">Password</label>
            <input v-model="password" type="password" placeholder="Enter your password"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </form>

        <p v-if="message" class="mt-4 text-center text-gray-700">{{ message }}</p>
      </div>
    </div>

    <!-- Right: Biometric Login -->
    <div class="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 text-white">
      <div class="text-center p-8">
        <h2 class="text-2xl font-bold mb-4">Quick Biometric Login</h2>
        <p class="mb-6">Use your fingerprint or face recognition</p>

        <!-- UserID Input -->
        <input v-model="userId" type="text" placeholder="Enter Staff ID"
          class="w-full px-3 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300 text-black" />

        <!-- Biometric Button -->
        <button @click="verifyBiometric"
          class="relative flex block mx-auto items-center justify-center w-56 h-12 bg-white text-black font-semibold rounded-lg shadow hover:bg-gray-100 transition disabled:opacity-50"
          :disabled="loading || !userId">

          <!-- Spinner + Animated Icon -->
          <span v-if="loading" class="flex items-center justify-center">
            <svg class="animate-spin h-5 w-5 mr-2 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            Scanning...
          </span>

          <!-- Button Text -->
          <span v-else>🔒 Login with Biometric</span>
        </button>

        <!-- Result Message -->
        <p v-if="biometricMessage"
           class="mt-6 text-lg font-semibold px-4 py-2 rounded-lg"
           :class="{
             'bg-green-100 text-green-800': success,
             'bg-red-100 text-red-800': !success
           }">
          {{ biometricMessage }}
        </p>
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
const biometricMessage = ref("")
const userId = ref("")
const loading = ref(false)
const success = ref(false)

// Dummy Login
const login = () => {
  if (email.value && password.value) {
    message.value = `✅ Logged in as ${email.value}`
  } else {
    message.value = "❌ Please enter email and password"
  }
}

// Dummy backend URL
const API_URL = "http://localhost:5000/api/biometric/verify"

// Fake Hospital Staff Profiles
const userProfiles = {
  "101": { name: "Dr. Ali", role: "Doctor", token: "fingerprint101", type: "Fingerprint" },
  "102": { name: "Nurse Sara", role: "Nurse", token: "face102", type: "Face Recognition" },
}

// Biometric Demo
const verifyBiometric = async () => {
  if (!userId.value) return
  loading.value = true
  biometricMessage.value = ""
  success.value = false

  try {
    await new Promise(resolve => setTimeout(resolve, 2000)) // simulate delay

    const profile = userProfiles[userId.value.trim()]

    if (!profile) {
      biometricMessage.value = "❌ Invalid Staff ID"
      success.value = false
      return
    }

    const response = await axios.post(API_URL, {
      userId: userId.value.trim(),
      biometricToken: profile.token
    })

    success.value = true
    biometricMessage.value =
      `✅ ${profile.type} verified! Welcome ${profile.name} (${profile.role}).`

  } catch (err) {
    success.value = false
    biometricMessage.value = "❌ Biometric Authentication Failed!"
  } finally {
    loading.value = false
  }
}
</script>
