"use strict";

const APIManager = {
  // Canvas API
  canvas: {
    initialize(canvasId) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return null;
      return {
        context: canvas.getContext('2d'),
        canvas: canvas
      };
    },
    drawChart(data, canvasId) {
      const ctx = this.initialize(canvasId)?.context;
      if (!ctx) return;
      // Chart drawing implementation
    }
  },

  // Clipboard API
  clipboard: {
    async copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (error) {
        console.error('Clipboard error:', error);
        return false;
      }
    },
    async readFromClipboard() {
      try {
        return await navigator.clipboard.readText();
      } catch (error) {
        console.error('Clipboard read error:', error);
        return null;
      }
    }
  },

  // File API
  file: {
    async readFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.onerror = e => reject(e);
        reader.readAsText(file);
      });
    },
    async uploadFiles(files, endpoint) {
      const formData = new FormData();
      Array.from(files).forEach(file => formData.append('files', file));

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData
        });
        return response.ok;
      } catch (error) {
        console.error('Upload error:', error);
        return false;
      }
    }
  },

  // Fullscreen API
  fullscreen: {
    enter(element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    },
    exit() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  },

  // Geolocation API
  geolocation: {
    async getCurrentPosition() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    },
    watchPosition(callback, errorCallback) {
      return navigator.geolocation.watchPosition(callback, errorCallback);
    }
  },

  // Media Capabilities API
  mediaCapabilities: {
    async checkVideoSupport(config) {
      if (!navigator.mediaCapabilities) return false;
      try {
        const support = await navigator.mediaCapabilities.decodingInfo(config);
        return support.supported;
      } catch (error) {
        console.error('Media capabilities error:', error);
        return false;
      }
    }
  },

  // MediaStream Recording API
  mediaRecording: {
    async startRecording(stream) {
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = e => chunks.push(e.data);
      mediaRecorder.start();

      return { mediaRecorder, chunks };
    }
  },

  // Web Crypto API
  crypto: {
    async generateKey() {
      return await crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
      );
    },
    async encrypt(text, key) {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const iv = crypto.getRandomValues(new Uint8Array(12));

      const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        data
      );

      return { encrypted, iv };
    }
  },

  // WebSocket API
  websocket: {
    connect(url) {
      const ws = new WebSocket(url);
      ws.onopen = () => console.log('WebSocket connected');
      ws.onerror = error => console.error('WebSocket error:', error);
      return ws;
    }
  },

  // Web Storage API
  storage: {
    async requestPersistence() {
      if (navigator.storage && navigator.storage.persist) {
        const isPersisted = await navigator.storage.persist();
        return isPersisted;
      }
      return false;
    },
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    get(key) {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch {
        return null;
      }
    }
  }
};

export default APIManager;
