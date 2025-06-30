<template>
  <v-menu offset-y>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-select
        v-model="$i18n.locale"
        :items="languages"
        :label="$t('language')"
        variant="outlined"
        density="compact"
      ></v-select>
      <v-list-item>
        <v-switch
          v-model="isDark"
          :label="
            $t('themeToggle', {
              theme: isDark ? $t('light') : $t('dark'),
            })
          "
          color="primary"
          @update:modelValue="toggleTheme"
        ></v-switch>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script></script>
