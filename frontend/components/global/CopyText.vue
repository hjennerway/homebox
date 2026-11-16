<template>
  <TooltipProvider :delay-duration="0">
    <Tooltip>
      <TooltipTrigger as-child>
        <Button size="icon" variant="outline" class="relative" @click="copyText">
          <div
            :data-copied="copied"
            class="group absolute inset-0 flex items-center justify-center transition-transform duration-300 data-[copied=true]:rotate-[360deg]"
          >
            <MdiContentCopy
              class="group-data-[copied=true]:hidden"
              :style="{
                height: `${iconSize}px`,
                width: `${iconSize}px`,
              }"
            />
            <MdiClipboard
              class="hidden group-data-[copied=true]:block"
              :style="{
                height: `${iconSize}px`,
                width: `${iconSize}px`,
              }"
            />
          </div>
        </Button>
      </TooltipTrigger>
      <TooltipContent v-if="tooltip">
        {{ tooltip }}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

  <AlertDialog v-model:open="copyError">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {{ $t("components.global.copy_text.failed_to_copy") }}
        </AlertDialogTitle>
        <AlertDialogDescription class="text-sm">
          {{ $t("components.global.copy_text.manual_copy") }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <textarea
        :value="text"
        :aria-label="$t('components.global.copy_text.manual_copy')"
        class="w-full rounded-md border bg-background p-2 text-sm"
        rows="2"
        readonly
        @focus="selectText"
      />
      <AlertDialogFooter>
        <AlertDialogAction>{{ $t("components.global.copy_text.continue") }}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
  import { useTimeoutFn } from "@vueuse/core";
  import MdiContentCopy from "~icons/mdi/content-copy";
  import MdiClipboard from "~icons/mdi/clipboard";
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
  import { Button } from "@/components/ui/button";
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

  const props = defineProps({
    text: {
      type: String as () => string,
      default: "",
    },
    iconSize: {
      type: Number as () => number,
      default: 20,
    },
    tooltip: {
      type: String as () => string,
      default: "",
    },
  });

  const copied = ref(false);
  const { start: resetCopied } = useTimeoutFn(() => (copied.value = false), 1000, { immediate: false });
  const copyError = ref(false);

  function selectText(event: FocusEvent) {
    (event.target as HTMLTextAreaElement).select();
  }

  function copyWithoutClipboardApi(text: string) {
    const field = document.createElement("textarea");
    field.value = text;
    field.readOnly = true;
    field.style.cssText = "position: fixed; top: 0; left: 0; opacity: 0;";
    document.body.appendChild(field);
    try {
      field.select();
      return document.execCommand("copy");
    } catch {
      return false;
    } finally {
      field.remove();
    }
  }

  async function copyText() {
    let success = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(props.text);
        success = true;
      }
    } catch {
      // If access is denied, try the browser's legacy copy command.
    }

    copied.value = success || copyWithoutClipboardApi(props.text);
    if (copied.value) resetCopied();
    else copyError.value = true;
  }
</script>
