<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const { t } = useI18n();
const preferences = useViewPreferences();
const { theme, setTheme } = useTheme();

useHead({ title: `HomeBox | ${t("collection.tabs.home_page")}` });
</script>

<template>
  <section
    class="space-y-4 rounded-md border bg-card p-4 text-card-foreground"
    aria-labelledby="home-page-heading"
  >
    <h2 id="home-page-heading" class="text-lg font-semibold">
      {{ t("collection.tabs.home_page") }}
    </h2>

    <div class="flex items-center justify-between gap-4">
      <Label for="home-recently-added">{{ t("home.recently_added") }}</Label>
      <Switch
        id="home-recently-added"
        v-model="preferences.showHomeRecentlyAdded"
      />
    </div>

    <div class="flex items-center justify-between gap-4">
      <Label for="home-tags">{{ t("home.tags") }}</Label>
      <Switch id="home-tags" v-model="preferences.showHomeTags" />
    </div>

    <div class="flex items-center justify-between gap-4">
      <Label for="dark-mode">{{ t("collection.dark_mode") }}</Label>
      <Switch
        id="dark-mode"
        :model-value="theme === 'dark'"
        @update:model-value="
          (enabled) => setTheme(enabled ? 'dark' : 'homebox')
        "
      />
    </div>
  </section>
</template>
