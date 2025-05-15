import { writable } from 'svelte/store';
import defaultAppConfig from "$lib/app_config.json";

const localStorageKey = 'app:config';

// Load from localStorage, or use default
const storedConfig = localStorage.getItem(localStorageKey);
const defaultConfig = defaultAppConfig;

const initial = storedConfig ? JSON.parse(storedConfig) : defaultConfig;

// Create a writable store
export const newappConfig = writable(initial);

// Subscribe to changes and update localStorage
newappConfig.subscribe(value => {
  localStorage.setItem(localStorageKey, JSON.stringify(value));
});