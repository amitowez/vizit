<template>
  <div class="clavier">
    <div class="clavier__case">
      <div class="clavier__nameplate">
        <span class="clavier__fleuron" aria-hidden="true"></span>
        {{ isEros ? $t("piano.titleEros") : $t("piano.title") }}
        <span class="clavier__fleuron" aria-hidden="true"></span>
      </div>
      <div class="clavier__felt"></div>
      <div class="clavier__keys">
        <div
          v-for="key in keys"
          :key="key.midi"
          class="clavier__key"
          :class="[
            key.sharp ? 'clavier__key--sharp' : 'clavier__key--natural',
            { 'clavier__key--oct2': key.oct2, pressed: pressed.has(key.midi) },
          ]"
          @pointerdown.prevent="strike(key.midi)"
          @pointerenter="onGlide(key.midi, $event)"
        >
          <span
            v-if="!key.sharp && key.hint"
            class="clavier__label"
            aria-hidden="true"
            >{{ key.hint }}</span
          >
        </div>
      </div>
    </div>
    <p class="clavier__hint">
      {{ isEros ? $t("piano.hintEros") : $t("piano.hint") }}
    </p>
  </div>
</template>

<script setup>
import { reactive, computed, watch, onMounted, onUnmounted } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();
const isEros = computed(() => theme.global.name.value === "eros");

/* ── Раскладка: две октавы C4–B5 ─────────────────────────── */

const NOTE_ORDER = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

// Физическая клавиатура: нижний ряд — белые, верхний — диезы
const HINT_KEYS = "awsedftgyhujkolp;'".split("");

const keys = [];
[4, 5].forEach((octave, octaveIndex) => {
  NOTE_ORDER.forEach((note, i) => {
    const midi = 12 * (octave + 1) + i;
    keys.push({
      midi,
      sharp: note.includes("#"),
      oct2: octaveIndex === 1,
      hint: (HINT_KEYS[midi - 60] || "").toUpperCase(),
    });
  });
});

const keyByChar = Object.fromEntries(
  keys.filter((k) => k.hint).map((k) => [k.hint.toLowerCase(), k.midi])
);

/* ── Звук: щипковая струна (Карплус–Стронг) ──────────────── */

let audioCtx = null;
const noteBuffers = new Map();

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function buildPluck(ctx, freq) {
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * 2.6);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const out = buffer.getChannelData(0);
  const period = Math.max(2, Math.round(sampleRate / freq));
  const ring = new Float32Array(period);
  for (let i = 0; i < period; i++) ring[i] = Math.random() * 2 - 1;
  const damp = 0.9998;
  for (let i = 0; i < length; i++) {
    const j = i % period;
    out[i] = ring[j];
    ring[j] = (ring[j] + ring[(j + 1) % period]) * 0.5 * damp;
  }
  return buffer;
}

/* ── Эрос-режим: свои сэмплы вместо синтеза ──────────────── */
// В public/sounds/eros/ лежат 1.mp3 … 10.mp3 — они раскладываются
// по клавишам по порядку от C4 и дальше повторяются по кругу.
// Клавиша, чей файл не загрузился, играет обычный синтез.

const EROS_SOUND_COUNT = 10;
const EROS_FIRST_MIDI = 60; // C4 — от неё идёт нумерация

const erosBuffers = new Map(); // номер файла → AudioBuffer
let erosLoadPromise = null;

const erosIndexFor = (midi) =>
  ((midi - EROS_FIRST_MIDI) % EROS_SOUND_COUNT) + 1;

function loadErosSamples(ctx) {
  if (!erosLoadPromise) {
    erosLoadPromise = Promise.all(
      Array.from({ length: EROS_SOUND_COUNT }, (_, i) =>
        fetch(`/sounds/eros/${i + 1}.mp3`)
          .then((res) => (res.ok ? res.arrayBuffer() : Promise.reject()))
          .then((data) => ctx.decodeAudioData(data))
          .then((buf) => erosBuffers.set(i + 1, buf))
          .catch(() => null)
      )
    );
  }
  return erosLoadPromise;
}

// Подгружаем сэмплы заранее, при входе в будуар (Alt+Enter — жест
// пользователя, так что AudioContext можно создавать сразу)
watch(isEros, (on) => {
  if (on) loadErosSamples(getCtx());
});

function playNote(midi) {
  const ctx = getCtx();
  if (isEros.value && erosBuffers.has(erosIndexFor(midi))) {
    const source = ctx.createBufferSource();
    source.buffer = erosBuffers.get(erosIndexFor(midi));
    const gain = ctx.createGain();
    gain.gain.value = 0.9;
    source.connect(gain);
    gain.connect(ctx.destination);
    source.start();
    return;
  }
  const freq = 440 * Math.pow(2, (midi - 69) / 12);
  if (!noteBuffers.has(midi)) noteBuffers.set(midi, buildPluck(ctx, freq));
  const source = ctx.createBufferSource();
  source.buffer = noteBuffers.get(midi);
  const gain = ctx.createGain();
  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0.85, now);
  gain.gain.exponentialRampToValueAtTime(0.002, now + 2.4);
  source.connect(gain);
  gain.connect(ctx.destination);
  source.start(now);
  source.stop(now + 2.5);
}

/* ── Взаимодействие ──────────────────────────────────────── */

const pressed = reactive(new Set());

function strike(midi) {
  playNote(midi);
  pressed.add(midi);
  setTimeout(() => pressed.delete(midi), 220);
}

// Глиссандо мышью: проведение по клавишам с зажатой кнопкой
function onGlide(midi, e) {
  if (e.buttons & 1) strike(midi);
}

function onKeydown(e) {
  if (e.repeat || e.altKey || e.ctrlKey || e.metaKey) return;
  const midi = keyByChar[e.key.toLowerCase()];
  if (midi) strike(midi);
}

onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => window.removeEventListener("keydown", onKeydown));
</script>

<style lang="scss">
.clavier {
  width: min(860px, 96vw);

  &__case {
    background: linear-gradient(180deg, #58371c 0%, #3c2412 55%, #2a180b 100%);
    border: 1px solid rgba(var(--v-theme-gold), 0.7);
    border-radius: 8px 8px 12px 12px;
    box-shadow: inset 0 0 0 3px rgba(0, 0, 0, 0.35),
      inset 0 0 0 4px rgba(var(--v-theme-gold), 0.25),
      0 18px 40px rgba(0, 0, 0, 0.45);
    padding: 14px 18px 22px;
  }

  &__nameplate {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    font-family: "Forum", "Georgia", serif;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    text-indent: 0.35em;
    color: rgb(var(--v-theme-gold));
    font-size: 15px;
    margin-bottom: 12px;
  }

  &__fleuron::before {
    content: "❦";
    font-size: 12px;
    letter-spacing: 0;
  }

  &__felt {
    height: 4px;
    background: linear-gradient(90deg, #7a1f2b, #a3324a, #7a1f2b);
    border-radius: 2px;
    margin-bottom: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
  }

  &__keys {
    display: flex;
    height: 190px;
    touch-action: none;
    user-select: none;
    --bw: calc(100% / 14);
  }

  &__key {
    border-radius: 0 0 4px 4px;
    cursor: pointer;
    transition: transform 0.06s ease, filter 0.06s ease;

    // Историческая инверсия: натуральные клавиши — тёмное дерево
    &--natural {
      position: relative;
      flex: 1 1 0;
      z-index: 1;
      background: linear-gradient(180deg, #241207 0%, #38200e 70%, #1d0f06 100%);
      border: 1px solid #120a04;
      border-top: none;
      box-shadow: inset 0 -8px 12px rgba(0, 0, 0, 0.55),
        inset 0 2px 3px rgba(255, 235, 190, 0.12);

      &.pressed {
        transform: translateY(2px);
        filter: brightness(1.35);
        box-shadow: inset 0 -3px 8px rgba(0, 0, 0, 0.7);
      }
    }

    // …а диезы — светлая кость
    &--sharp {
      flex: 0 0 calc(var(--bw) * 0.62);
      margin-left: calc(var(--bw) * -0.31);
      margin-right: calc(var(--bw) * -0.31);
      height: 58%;
      z-index: 2;
      background: linear-gradient(180deg, #f7ecd4 0%, #e2cfa4 85%, #c9b384 100%);
      border: 1px solid #8d7549;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5),
        inset 0 -4px 6px rgba(141, 117, 73, 0.4);

      &.pressed {
        transform: translateY(2px);
        filter: brightness(0.92);
      }
    }
  }

  &__label {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 11px;
    font-family: "Forum", "Georgia", serif;
    color: rgba(var(--v-theme-gold), 0.75);
    pointer-events: none;
  }

  &__hint {
    text-align: center;
    margin-top: 14px;
    font-style: italic;
    font-size: 14px;
    opacity: 0.9;
    // Всегда светлый: подпись лежит прямо на затемнённом фото
    color: #f0e6cc;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 640px) {
    &__keys {
      --bw: calc(100% / 7);
      height: 170px;
    }

    &__key--oct2 {
      display: none !important;
    }

    &__label {
      display: none;
    }

    &__case {
      padding: 10px 12px 16px;
    }
  }
}
</style>
