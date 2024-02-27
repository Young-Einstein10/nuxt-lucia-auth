<script lang="ts" setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(6).max(50),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  error.value = "";
  const result = await useFetch("/api/login", {
    method: "POST",
    body: JSON.stringify(values),
  });

  if (result.error.value) {
    error.value = result.error.value.data?.message ?? null;
    return toast({
      title: "Error",
      description: result.error.value.data?.message,
      variant: "destructive",
    });
  }

  await navigateTo("/");
});

const error = ref<string | null>(null);
</script>

<template>
  <section class="h-screen flex flex-col justify-center items-center">
    <h1 class="mb-10 text-3xl font-semibold">Sign in</h1>

    <form class="w-full max-w-[400px] space-y-6" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Dave" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input
              type="password"
              placeholder="********"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" class="w-full"> Submit </Button>
      <p class="text-destructive mt-6">{{ error }}</p>
    </form>

    <p class="mt-10 text-sm">
      Don't have an account?
      <NuxtLink to="/signup" class="hover:underline"
        >Create an account</NuxtLink
      >
    </p>
  </section>
</template>
