<script lang="ts" setup>
definePageMeta({
  middleware: ["protected"],
});

const user = useAuthenticatedUser();

async function logout() {
  await useFetch("/api/logout", {
    method: "POST",
  });
  navigateTo("/login");
}
</script>

<template>
  <h1>Secret Dashboard</h1>
  <section class="h-screen flex flex-col gap-10 justify-center items-center">
    <h1 class="text-4xl font-semibold">Hi, {{ user?.username }}!</h1>
    <p class="text-3xl">Your user ID is {{ user?.id }}.</p>
    <form @submit.prevent="logout">
      <Button>Sign out</Button>
    </form>
  </section>
</template>
