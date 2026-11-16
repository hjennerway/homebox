<script setup lang="ts">
  import { useI18n } from "vue-i18n";
  import { Label } from "@/components/ui/label";
  import { Switch } from "@/components/ui/switch";
  import { themes } from "~~/lib/data/themes";

  const { t } = useI18n();
  const preferences = useViewPreferences();
  const customTheme = computed(() =>
    themes.find(theme => theme.value === preferences.value.theme && !["homebox", "dark"].includes(theme.value))
  );

  useHead({ title: `HomeBox | ${t("collection.tabs.home_page")}` });
</script>

<template>
  <section class="space-y-4 rounded-md border bg-card p-4 text-card-foreground" aria-labelledby="home-page-heading">
    <h2 id="home-page-heading" class="text-lg font-semibold">
      {{ t("collection.tabs.home_page") }}
    </h2>

    <div class="flex items-center justify-between gap-4">
      <Label for="home-recently-added">{{ t("home.recently_added") }}</Label>
      <Switch id="home-recently-added" v-model="preferences.showHomeRecentlyAdded" />
    </div>

    <div class="flex items-center justify-between gap-4">
      <Label for="home-tags">{{ t("home.tags") }}</Label>
      <Switch id="home-tags" v-model="preferences.showHomeTags" />
    </div>

    <div class="flex items-center justify-between gap-4">
      <Label for="appearance">{{ t("collection.appearance") }}</Label>
      <select
        id="appearance"
        v-model="preferences.theme"
        class="rounded-md border border-input bg-background px-3 py-2 text-sm"
      >
        <option value="system">{{ t("collection.appearance_system") }}</option>
        <option value="homebox">{{ t("collection.appearance_light") }}</option>
        <option value="dark">{{ t("collection.appearance_dark") }}</option>
        <option v-if="customTheme" :value="customTheme.value">{{ customTheme.label }}</option>
      </select>
    </div>
  </section>
</template>
