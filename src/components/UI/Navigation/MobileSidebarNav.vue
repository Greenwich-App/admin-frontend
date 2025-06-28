<template>
	<div class="relative w-full">
		<div class="fixed h-[100vh] bg-dark-black text-white shadow-md z-50" :class="isSidebar ? 'md:w-[105px]' : 'md:w-[260px]'">
			<div class="py-10 mb-2" :class="isSidebar ? 'px-4' : 'px-10'">
                <img
					alt="nut and bots logo"
					src="@/assets/images/logo-mobile.png"
					class="w-32 h-16 object-contain" v-if="isSidebar"
				/>
				<img
					alt="nut and bots logo"
					src="@/assets/images/nuts-logo-light.png"
					class="w-32 h-16 object-contain" v-else
				/>
			</div>

			<div class="flex flex-col px-[30px]">
				<div class="">
                <p class="text-red-500">{{ isSidebar }}</p>
					<div class="mb-2.5">
						<router-link to="/">
							<div
								class="flex items-center p-[13px] rounded-[24px] cursor-pointer font-bold"
								:class="{ 'bg-dark-yellow text-dark-black': '/' === $route.path }"
							>
								<span :class="{ 'link-active': '/' === $route.path }">
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<rect
											x="4"
											y="4"
											width="7"
											height="7"
											rx="2.5"
											stroke="#fff"
											stroke-width="1.5"
										/>
										<rect
											x="4"
											y="14"
											width="7"
											height="7"
											rx="2.5"
											stroke="#fff"
											stroke-width="1.5"
										/>
										<path
											d="M17.5 4H16.5C15.1193 4 14 5.11929 14 6.5V8.5C14 9.88071 15.1193 11 16.5 11H18.5C19.8807 11 21 9.88071 21 8.5V7.5"
											stroke="#fff"
											stroke-width="1.5"
											stroke-linecap="round"
										/>
										<rect
											x="14"
											y="14"
											width="7"
											height="7"
											rx="2.5"
											stroke="#fff"
											stroke-width="1.5"
										/>
									</svg>
								</span>
								<p class="text-base ml-3">Dashboard</p>
							</div>
						</router-link>
					</div>

					<div class="mb-2.5">
						<router-link to="/messages" class="mb-2.5">
							<div
								class="flex items-center p-[13px] rounded-[24px] cursor-pointer font-bold"
								:class="{ 'bg-dark-yellow text-dark-black': '/messages' === $route.path }"
							>
								<span :class="{ 'link-active': '/messages' === $route.path }">
									<svg
										width="22"
										height="21"
										viewBox="0 0 22 21"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M1 11.4597V18.9194C1 19.7579 1.96993 20.2241 2.6247 19.7002L5.45217 17.4383C5.8068 17.1546 6.24742 17 6.70156 17H16C18.7614 17 21 14.7614 21 12V6C21 3.23858 18.7614 1 16 1H6C3.23858 1 1 3.23858 1 6V7.61492"
											stroke="white"
											stroke-width="1.5"
											stroke-linecap="round"
										/>
										<circle cx="6.05005" cy="9.0498" r="1.25" fill="white" />
										<circle cx="11.05" cy="9.0498" r="1.25" fill="white" />
										<circle cx="16.05" cy="9.0498" r="1.25" fill="white" />
									</svg>
								</span>
								<p class="text-base ml-3 flex items-center">
									Messages
									<span
										class="ml-3 bg-dark-yellow text-dark-black w-[20px] h-[20px] flex items-center justify-center rounded-full"
										:class="{ 'active-badge': '/messages' === $route.path }"
										>3</span
									>
								</p>
							</div>
						</router-link>
					</div>

					<div class="mb-2.5">
						<router-link to="/finances">
							<div
								class="flex items-center p-[13px] rounded-[24px] cursor-pointer font-bold"
								:class="{
									'bg-dark-yellow text-dark-black':
										$route.path === '/finances' ||
										$route.path === '/invoice' ||
										$route.path === '/add-invoice',
								}"
							>
								<span
									:class="{
										'link-active':
											$route.path === '/finances' ||
											$route.path === '/invoice' ||
											$route.path === '/add-invoice',
									}"
								>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M13.3444 19.2941C12.996 19.5181 12.8951 19.9821 13.1191 20.3306C13.3431 20.679 13.8071 20.7799 14.1556 20.5559L13.3444 19.2941ZM9.84443 20.5559C10.1929 20.7799 10.6569 20.679 10.8809 20.3306C11.1049 19.9821 11.004 19.5181 10.6556 19.2941L9.84443 20.5559ZM7.94164 19.2307L7.48353 18.6369L7.94164 19.2307ZM9.0932 19.1813L9.49877 18.5505L9.0932 19.1813ZM16.0584 19.2307L15.6003 19.8246L16.0584 19.2307ZM14.9068 19.1813L14.5012 18.5505L14.9068 19.1813ZM6.6108 20.2574L6.1527 19.6635L6.6108 20.2574ZM17.3892 20.2574L16.9311 20.8512L17.3892 20.2574ZM18.25 3.5V19.4656H19.75V3.5H18.25ZM5.75 19.4656V3.5H4.25V19.4656H5.75ZM17.8473 19.6635L16.5165 18.6369L15.6003 19.8246L16.9311 20.8512L17.8473 19.6635ZM7.48353 18.6369L6.1527 19.6635L7.06891 20.8512L8.39974 19.8246L7.48353 18.6369ZM14.5012 18.5505L13.3444 19.2941L14.1556 20.5559L15.3124 19.8122L14.5012 18.5505ZM10.6556 19.2941L9.49877 18.5505L8.68763 19.8122L9.84443 20.5559L10.6556 19.2941ZM8.39974 19.8246C8.48344 19.76 8.59871 19.7551 8.68763 19.8122L9.49877 18.5505C8.87631 18.1503 8.06944 18.1849 7.48353 18.6369L8.39974 19.8246ZM16.5165 18.6369C15.9306 18.1849 15.1237 18.1503 14.5012 18.5505L15.3124 19.8122C15.4013 19.7551 15.5166 19.76 15.6003 19.8246L16.5165 18.6369ZM4.25 19.4656C4.25 20.9186 5.91841 21.7387 7.06891 20.8512L6.1527 19.6635C5.98834 19.7903 5.75 19.6732 5.75 19.4656H4.25ZM18.25 19.4656C18.25 19.6732 18.0117 19.7903 17.8473 19.6635L16.9311 20.8512C18.0816 21.7387 19.75 20.9186 19.75 19.4656H18.25Z"
											fill="white"
										/>
										<path
											d="M9 9.5H12"
											stroke="white"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M3 3.5H12M21 3.5H16.5"
											stroke="white"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M9 13.5H12"
											stroke="white"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M15 9.5H15.5"
											stroke="white"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M15 13.5H15.5"
											stroke="white"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</span>
								<p class="text-base ml-3">Finances</p>
							</div>
						</router-link>
					</div>

					<div class="mb-2.5">
						<router-link to="/clients">
							<div
								class="flex items-center p-[13px] rounded-[24px] cursor-pointer font-bold"
								:class="{
									'bg-dark-yellow text-dark-black':
										$route.path === '/clients' ||
										$route.path === '/client' ||
										$route.path === '/add-client' ||
										$route.name === 'ViewClient' ||
										$route.name === 'ViewClientTransactions',
								}"
							>
								<span
									:class="{
										'link-active':
											$route.path === '/clients' ||
											$route.path === '/client' ||
											$route.path === '/add-client' ||
											$route.name === 'ViewClient' ||
											$route.name === 'ViewClientTransactions',
									}"
								>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M8.80855 8.40426C8.80855 10.2844 10.3327 11.8085 12.2128 11.8085C14.0929 11.8085 15.6171 10.2844 15.6171 8.40426C15.6171 6.52414 14.0929 5 12.2128 5"
											stroke="white"
											stroke-width="1.5"
											stroke-linecap="round"
										/>
										<path
											d="M6.25537 16.8594C6.25537 16.1272 6.71567 15.474 7.40524 15.2277V15.2277C10.5141 14.1174 13.9115 14.1174 17.0204 15.2277V15.2277C17.71 15.474 18.1703 16.1272 18.1703 16.8594V17.979C18.1703 18.9896 17.2752 19.7659 16.2748 19.6229L15.9412 19.5753C13.4682 19.222 10.9575 19.222 8.48442 19.5753L8.15087 19.6229C7.15044 19.7659 6.25537 18.9896 6.25537 17.979V16.8594Z"
											stroke="white"
											stroke-width="1.5"
										/>
										<path
											d="M17.3191 11.9026C18.7964 11.9026 19.9939 10.7051 19.9939 9.22787C19.9939 7.75064 18.7964 6.5531 17.3191 6.5531"
											stroke="white"
											stroke-width="1.5"
											stroke-linecap="round"
										/>
										<path
											d="M20.2486 18.0051L20.5106 18.0425C21.2967 18.1548 22 17.5448 22 16.7508V15.8711C22 15.2958 21.6383 14.7826 21.0965 14.5891C20.5561 14.3961 20.0045 14.2458 19.4468 14.1382"
											stroke="white"
											stroke-width="1.5"
											stroke-linecap="round"
										/>
										<path
											d="M6.68088 11.9026C5.20364 11.9026 4.0061 10.7051 4.0061 9.22787C4.0061 7.75064 5.20364 6.5531 6.68088 6.5531"
											stroke="white"
											stroke-width="1.5"
											stroke-linecap="round"
										/>
										<path
											d="M3.75143 18.0051L3.48935 18.0425C2.7033 18.1548 2.00003 17.5448 2.00003 16.7508V15.8711C2.00003 15.2958 2.3617 14.7826 2.9035 14.5891C3.44395 14.3961 3.99549 14.2458 4.55322 14.1382"
											stroke="white"
											stroke-width="1.5"
											stroke-linecap="round"
										/>
									</svg>
								</span>
								<p class="text-base ml-3">Clients</p>
							</div>
						</router-link>
					</div>

					<div class="mb-2.5">
						<router-link to="/staffs">
							<div
								class="flex items-center p-[13px] rounded-[24px] cursor-pointer font-bold"
								:class="{
									'bg-dark-yellow text-dark-black':
										$route.path === '/staffs' || $route.path === '/staff',
								}"
							>
								<span :class="{ 'link-active': $route.path === '/staffs' || $route.path === '/staff' }">
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M8 7C8 9.20914 9.79086 11 12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3"
											stroke="white"
											stroke-width="1.5"
											stroke-linecap="round"
										/>
										<path
											d="M5 16.9347C5 16.0743 5.54085 15.3068 6.35109 15.0175V15.0175C10.004 13.7128 13.996 13.7128 17.6489 15.0175V15.0175C18.4591 15.3068 19 16.0743 19 16.9347V18.2502C19 19.4376 17.9483 20.3498 16.7728 20.1818L15.8184 20.0455C13.2856 19.6837 10.7144 19.6837 8.18162 20.0455L7.22721 20.1818C6.0517 20.3498 5 19.4376 5 18.2502V16.9347Z"
											stroke="white"
											stroke-width="1.5"
										/>
									</svg>
								</span>
								<p class="text-base ml-3">Staffs</p>
							</div>
						</router-link>
					</div>

					<div class="mb-2.5">
						<router-link to="/services">
							<div
								class="flex items-center p-[13px] rounded-[24px] cursor-pointer font-bold"
								:class="{
									'bg-dark-yellow text-dark-black':
										$route.path === '/services' || $route.path === '/service',
								}"
							>
								<span
									:class="{
										'link-active-services':
											$route.path === '/services' || $route.path === '/service',
									}"
								>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M12 7.17871C12.4142 7.17871 12.75 6.84292 12.75 6.42871C12.75 6.0145 12.4142 5.67871 12 5.67871V7.17871ZM13.1494 14.2267L12.9339 13.5083L13.1494 14.2267ZM10.8506 14.2267L11.0661 13.5083L10.8506 14.2267ZM20.5747 11.9991L20.3592 11.2808L20.5747 11.9991ZM21.25 8.42871V10.0835H22.75V8.42871H21.25ZM2.75 10.0835V8.42871H1.25V10.0835H2.75ZM20.3592 11.2808L12.9339 13.5083L13.3649 14.9451L20.7902 12.7175L20.3592 11.2808ZM11.0661 13.5083L3.64082 11.2808L3.2098 12.7175L10.6351 14.9451L11.0661 13.5083ZM4 7.17871H12V5.67871H4V7.17871ZM17 7.17871H20V5.67871H17V7.17871ZM14.582 7.17871H17V5.67871H14.582V7.17871ZM12.9339 13.5083C12.3247 13.6911 11.6753 13.6911 11.0661 13.5083L10.6351 14.9451C11.5254 15.2122 12.4746 15.2122 13.3649 14.9451L12.9339 13.5083ZM1.25 10.0835C1.25 11.2979 2.04659 12.3685 3.2098 12.7175L3.64082 11.2808C3.11209 11.1221 2.75 10.6355 2.75 10.0835H1.25ZM21.25 10.0835C21.25 10.6355 20.8879 11.1221 20.3592 11.2808L20.7902 12.7175C21.9534 12.3685 22.75 11.2979 22.75 10.0835H21.25ZM22.75 8.42871C22.75 6.90993 21.5188 5.67871 20 5.67871V7.17871C20.6904 7.17871 21.25 7.73836 21.25 8.42871H22.75ZM2.75 8.42871C2.75 7.73836 3.30964 7.17871 4 7.17871V5.67871C2.48122 5.67871 1.25 6.90993 1.25 8.42871H2.75Z"
											fill="white"
										/>
										<path
											d="M12 11.5717L12 9.85742"
											stroke="white"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M3.58337 15.5C3.58337 15.0858 3.24759 14.75 2.83337 14.75C2.41916 14.75 2.08337 15.0858 2.08337 15.5H3.58337ZM20.4167 11.5713V16.9998H21.9167V11.5713H20.4167ZM17.1667 20.2498H6.83338V21.7498H17.1667V20.2498ZM3.58337 16.9998V15.5H2.08337V16.9998H3.58337ZM6.83338 20.2498C5.03845 20.2498 3.58337 18.7947 3.58337 16.9998H2.08337C2.08337 19.6232 4.21002 21.7498 6.83338 21.7498V20.2498ZM20.4167 16.9998C20.4167 18.7947 18.9616 20.2498 17.1667 20.2498V21.7498C19.7901 21.7498 21.9167 19.6232 21.9167 16.9998H20.4167Z"
											fill="white"
										/>
										<path
											d="M15.3333 6.42855V5C15.3333 3.89543 14.4379 3 13.3333 3H10.6666C9.56206 3 8.66663 3.89543 8.66663 5L8.66663 6.42855"
											stroke="white"
											stroke-width="1.5"
										/>
									</svg>
								</span>
								<p class="text-base ml-3 flex items-center">
									Services
									<!-- <span class="ml-3 bg-dark-yellow text-dark-black w-[20px] h-[20px] flex items-center justify-center rounded-full" :class="{ 'active-badge': '/services' === $route.path }">8</span> -->
								</p>
							</div>
						</router-link>
					</div>

					<div class="mb-2.5">
						<router-link to="/workshop">
							<div
								class="flex items-center p-[13px] rounded-[24px] cursor-pointer font-bold"
								:class="{
									'bg-dark-yellow text-dark-black':
										$route.path === '/workshop' || $route.path === '/add-workshop',
								}"
							>
								<span
									:class="{
										'link-active-workshop':
											$route.path === '/workshop' || $route.path === '/add-workshop',
									}"
								>
									<svg
										width="22"
										height="22"
										viewBox="0 0 22 22"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M12.1445 18.3341C12.1445 17.7012 11.6315 17.1882 10.9987 17.1882C10.3659 17.1882 9.85286 17.7012 9.85286 18.3341C9.85286 18.9669 10.3659 19.4799 10.9987 19.4799C11.6315 19.4799 12.1445 18.9669 12.1445 18.3341ZM10.9987 15.8132C12.3909 15.8132 13.5195 16.9418 13.5195 18.3341C13.5195 19.7263 12.3909 20.8549 10.9987 20.8549C9.60648 20.8549 8.47786 19.7263 8.47786 18.3341C8.47786 16.9418 9.60648 15.8132 10.9987 15.8132Z"
											fill="white"
										/>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M19.4779 18.3341C19.4779 17.7012 18.9649 17.1882 18.3321 17.1882C17.6992 17.1882 17.1862 17.7012 17.1862 18.3341C17.1862 18.9669 17.6992 19.4799 18.3321 19.4799C18.9649 19.4799 19.4779 18.9669 19.4779 18.3341ZM18.3321 15.8132C19.7243 15.8132 20.8529 16.9418 20.8529 18.3341C20.8529 19.7263 19.7243 20.8549 18.3321 20.8549C16.9399 20.8549 15.8112 19.7263 15.8112 18.3341C15.8112 16.9418 16.9399 15.8132 18.3321 15.8132Z"
											fill="white"
										/>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M4.81128 18.3341C4.81128 17.7012 4.29827 17.1882 3.66545 17.1882C3.03262 17.1882 2.51961 17.7012 2.51961 18.3341C2.51961 18.9669 3.03262 19.4799 3.66545 19.4799C4.29827 19.4799 4.81128 18.9669 4.81128 18.3341ZM3.66545 15.8132C5.05766 15.8132 6.18628 16.9418 6.18628 18.3341C6.18628 19.7263 5.05766 20.8549 3.66545 20.8549C2.27323 20.8549 1.14461 19.7263 1.14461 18.3341C1.14461 16.9418 2.27323 15.8132 3.66545 15.8132Z"
											fill="white"
										/>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M12.1445 3.66732C12.1445 3.03449 11.6315 2.52148 10.9987 2.52148C10.3659 2.52148 9.85286 3.03449 9.85286 3.66732C9.85286 4.30014 10.3659 4.81315 10.9987 4.81315C11.6315 4.81315 12.1445 4.30014 12.1445 3.66732ZM10.9987 1.14648C12.3909 1.14648 13.5195 2.2751 13.5195 3.66732C13.5195 5.05954 12.3909 6.18815 10.9987 6.18815C9.60648 6.18815 8.47786 5.05954 8.47786 3.66732C8.47786 2.2751 9.60648 1.14648 10.9987 1.14648Z"
											fill="white"
										/>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M10.9988 4.81323C11.3785 4.81323 11.6863 5.12104 11.6863 5.50073L11.6863 16.5007C11.6863 16.8804 11.3785 17.1882 10.9988 17.1882C10.6191 17.1882 10.3113 16.8804 10.3113 16.5007L10.3113 5.50073C10.3113 5.12104 10.6191 4.81323 10.9988 4.81323Z"
											fill="white"
										/>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M18.1307 10.2853C18.7634 10.9181 19.0195 11.8113 19.0195 12.834L19.0195 16.5007C19.0195 16.8803 18.7117 17.1882 18.332 17.1882C17.9523 17.1882 17.6445 16.8803 17.6445 16.5007L17.6445 12.834C17.6445 12.0233 17.4423 11.5415 17.1584 11.2576C16.8745 10.9737 16.3927 10.7715 15.582 10.7715L6.41537 10.7715C5.60467 10.7715 5.12293 10.9737 4.839 11.2576C4.55507 11.5415 4.35287 12.0233 4.35287 12.834L4.35286 16.5007C4.35286 16.8803 4.04506 17.1882 3.66536 17.1882C3.28567 17.1882 2.97786 16.8803 2.97786 16.5007L2.97787 12.834C2.97787 11.8113 3.23399 10.9181 3.86673 10.2853C4.49947 9.65261 5.39272 9.39648 6.41537 9.39648L15.582 9.39648C16.6047 9.39648 17.4979 9.65261 18.1307 10.2853Z"
											fill="white"
										/>
									</svg>
								</span>
								<p class="text-base ml-3">Workshop</p>
							</div>
						</router-link>
					</div>

					<div class="mb-2.5">
						<router-link to="/settings">
							<div
								class="flex items-center p-[13px] rounded-[24px] cursor-pointer font-bold"
								:class="{ 'bg-dark-yellow text-dark-black': '/settings' === $route.path }"
							>
								<span :class="{ 'link-active-settings': '/settings' === $route.path }">
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<circle
											cx="3"
											cy="3"
											r="3"
											transform="matrix(-1 0 0 1 15 9)"
											stroke="white"
											stroke-width="1.5"
										/>
										<path
											d="M17.7521 5.32987C18.0675 5.35581 18.3834 5.33129 18.6879 5.2595C19.016 5.18215 19.3774 5.24076 19.5967 5.49671C20.3979 6.4317 21.0294 7.51632 21.4437 8.70289C21.5689 9.0617 21.3868 9.44185 21.0935 9.68352C20.4257 10.2338 19.9999 11.0672 19.9999 12C19.9999 12.9328 20.4257 13.7662 21.0935 14.3165C21.3868 14.5581 21.5689 14.9383 21.4437 15.2971C21.0295 16.4835 20.398 17.5681 19.597 18.503C19.3776 18.759 19.0162 18.8176 18.6881 18.7402C17.9703 18.5709 17.1891 18.6643 16.5 19.0621C15.7501 19.4951 15.2579 20.2029 15.077 20.9848C15.001 21.3136 14.788 21.6122 14.4608 21.695C13.6735 21.8942 12.8491 22 11.9999 22C11.1508 22 10.3264 21.8942 9.53921 21.695C9.21202 21.6122 8.99904 21.3137 8.92299 20.9848C8.86969 20.7544 8.78935 20.5304 8.68334 20.318M15.3561 3.75789C15.2305 3.52319 15.1368 3.27319 15.0771 3.01511C15.001 2.68633 14.7881 2.38787 14.4609 2.30508C13.6736 2.10585 12.8492 2 11.9999 2C11.1508 2 10.3264 2.10584 9.53914 2.30504C9.21198 2.38783 8.999 2.6863 8.92293 3.01508C8.74203 3.79691 8.24979 4.5046 7.49999 4.9375C6.81097 5.33531 6.02974 5.42873 5.31201 5.25948C4.98394 5.18212 4.62253 5.24072 4.40321 5.49667C3.60204 6.43167 2.97049 7.5163 2.55625 8.70287C2.43099 9.06169 2.61307 9.44184 2.90639 9.68351C3.5742 10.2337 3.99998 11.0671 3.99998 12C3.99998 12.9329 3.5742 13.7663 2.90638 14.3165C2.61307 14.5582 2.43099 14.9383 2.55625 15.2971C2.97044 16.4836 3.6019 17.5681 4.40294 18.503C4.62228 18.759 4.98373 18.8176 5.31183 18.7402C5.65125 18.6601 6.00488 18.6388 6.35625 18.6807"
											stroke="white"
											stroke-width="1.5"
											stroke-linecap="round"
										/>
									</svg>
								</span>
								<p class="text-base ml-3">Settings</p>
							</div>
						</router-link>
					</div>
				</div>
			</div>
			<div
				class="w-[48px] h-[48px] rounded-full bg-dark-yellow flex items-center justify-center absolute bottom-[30px] left-[30px]"
			>
				<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M12.2656 11.8778C12.4859 11.2517 12.9206 10.7238 13.4928 10.3875C14.065 10.0512 14.7377 9.92825 15.3919 10.0405C16.046 10.1527 16.6394 10.4928 17.0668 11.0005C17.4942 11.5083 17.7282 12.1509 17.7272 12.8146C17.7272 14.6882 14.9168 15.625 14.9168 15.625M14.9512 19.375H14.9637M26.25 15C26.25 21.2132 21.2132 26.25 15 26.25C8.7868 26.25 3.75 21.2132 3.75 15C3.75 8.7868 8.7868 3.75 15 3.75C21.2132 3.75 26.25 8.7868 26.25 15Z"
						stroke="#33250C"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
		</div>
		<div
			class="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center fixed z-[100] top-[20px]" :class="isSidebar ? 'left-[90px]' : 'left-[245px]'"
		@click="toggleSidebar()">
			<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M9.39581 2.69038C9.197 2.49709 8.87466 2.49709 8.67585 2.69038L4.60312 6.64997C4.50765 6.74279 4.45401 6.86869 4.45401 6.99996C4.45401 7.13122 4.50765 7.25712 4.60312 7.34994L8.67585 11.3095C8.87466 11.5028 9.197 11.5028 9.39581 11.3095C9.59462 11.1162 9.59462 10.8029 9.39581 10.6096L5.68307 6.99996L9.39581 3.39034C9.59462 3.19705 9.59462 2.88367 9.39581 2.69038Z"
					fill="#101010"
				/>
			</svg>
		</div>
	</div>
</template>

<script>
import { ref } from "vue";
export default {
	name: "SidebarNav",
	props: {
		// width: {
		// 	type: String,
		// 	required: false,
		// 	// default: "w-5/12 md:w-[260px]",
		// },
        toggleSidebar: Function,
        isSidebar: Boolean
	},
	setup() {
        // const toggleSidebar = () => {
        //     isSidebar.value = true;
        //     alert("Sidebar toggled");
        // }

        // return {
        //     toggleSidebar
        // }
    },
};
</script>

<style scoped></style>