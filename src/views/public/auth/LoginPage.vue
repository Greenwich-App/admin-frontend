<template>
	<div class="h-screen flex flex-col-reverse lg:flex-row justify-start items-start">
		<div class="background h-[100px] lg:h-screen w-full lg:w-3/5"></div>
		<div class="w-full lg:w-2/5 flex items-start lg:items-center justify-center bg-white h-[calc(100vh_-_100px)]">
			<div class="flex flex-col justify-center w-full p-5 md:px-28 lg:p-10 xl:px-28 2xl:px-40">
				<div class="flex flex-col justify-center">
					<img src="@/assets/images/logo.svg" class="h-[100px]" alt="Greenwich Gardens" />
					<h1 class="text-center text-xl font-bold mt-[20px] text-green-dark">Greenwich Gardens</h1>
					<p class="text-center text-base text-green-dark font-medium">Welcome Back</p>
				</div>

				<div class="mt-10">
					<form @submit.prevent="handleLogin">
						<div class="mb-[20px]">
							<label for="" class="text-sm mb-2 capitalize text-black font-medium">Email Address</label>
							<input
								type="email"
								v-model="email"
								class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm"
								placeholder="Email Address"
								required
							/>
						</div>

						<div class="mb-[20px]">
							<label for="" class="text-sm mb-2 capitalize text-black font-medium">Password</label>
							<input
								type="password"
								v-model="password"
								class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm"
								placeholder="Password"
								required
								autocomplete="current-password"
							/>
						</div>

						<p class="error-massage text-xs text-red-500 my-4 text-center" v-if="errorMessage">
							{{ errorMessage }}
						</p>

						<div class="mb-2">
							<button
								class="w-full h-[40px] px-3 bg-[#004225] text-white text-md font-medium"
								type="submit"
								:disabled="loading"
							>
								{{ loading ? "Please wait..." : "Sign in" }}
							</button>
						</div>

						<div class="flex justify-center items-center">
							<div>
								<router-link to="/forgot-password" class="text-green-dark text-sm"
									>Forgot Password</router-link
								>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { isValidEmail } from "@/helpers";
import { storeToRefs } from "pinia";
import { loginService, verify2FAService } from "@/services";
import { useUserStore } from "@/stores/UserStore";
import { useRouter } from "vue-router";
import { getCurrentAdminService } from "../../../services";

const { token, user, isSuperAdmin } = storeToRefs(useUserStore());
const router = useRouter();

const isContinue = ref(false);
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const loading = ref(false);

const handleLogin = async () => {
	errorMessage.value = "";

	if (!isValidEmail(email.value)) {
		errorMessage.value = "Please enter a valid email address.";
		return;
	}

	loading.value = true;
	try {
		const payload = {
			email: email.value,
			password: password.value,
		};
		const response = await loginService(payload);
		if (response.status == "success") {
			token.value = response.data.access_token;
			user.value = response.data.user;
			window.location.href = "/";
			fetchCurrentAdminProfile();
		}
	} catch (err: any) {
		errorMessage.value = err?.message || "An unexpected error occurred. Please try again.";
	} finally {
		loading.value = false;
	}
};

const fetchCurrentAdminProfile = async () => {
	try {
		const response = await getCurrentAdminService();
		if (response.status == "success") {
			user.value = response.data;
			if(user.value.role == 'admin') {
				isSuperAdmin.value = false;
			} else {
				isSuperAdmin.value = true;
			}
			console.log(response);
		}
	} catch (e) {
		console.log(e);
	}
};
</script>

<style>
.background {
	background: url("../../../assets/images/background-banner-3.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: bottom;
	background-color: rgba(0, 0, 0, 0.5);
	background-blend-mode: overlay;
}
</style>