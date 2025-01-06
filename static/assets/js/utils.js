"use strict";

import APIManager from './api/api-manager.js';

// Form validation utilities
const validateLoginForm = form => validateForm();
const validateProfileForm = form => updateProfile();
const validateCreateUserForm = form => createUser();

// Navigation utilities
const goBackToProfile = () => {
  const username = getCookie('username');
  window.location.href = username ?
    `profile.html?username=${encodeURIComponent(username)}` :
    'dashboard.html';
};

const goToCrudPage = page => {
  window.location.href = page;
};

// Error handling utilities
const clearFormError = formId => {
  const errorDiv = document.getElementById(`${formId}-error`);
  if (errorDiv) {
    errorDiv.style.display = 'none';
  }
};

// Navigation functions
const navigateToProfile = () => {
  if (!checkSession()) return;
  const username = getCookie('username');
  const url = new URL('profile.html', window.location.origin);
  url.searchParams.set('username', username);
  window.location.href = url.toString();
};

const goBack = () => {
  window.location.href = 'dashboard.html';
};

const navigateToProject = url => {
  if (!checkSession()) return;
  window.location.href = url;
};

const confirmLogout = () => confirm('Are you sure you want to logout?');

// Enhanced session management using Web Storage API
const sessionManager = {
  async setSession(username, duration = 3600) {
    APIManager.storage.set('session', {
      username,
      expiry: Date.now() + (duration * 1000)
    });
  },

  checkSession() {
    const session = APIManager.storage.get('session');
    return session && Date.now() < session.expiry;
  },

  clearSession() {
    APIManager.storage.set('session', null);
  }
};

// Enhanced Error Handling with Console API
const handleError = (error, context) => {
  console.group('Error Details');
  console.error(`Context: ${context}`);
  console.error('Error:', error);
  console.trace('Stack trace:');
  console.groupEnd();

  alert(`Error in ${context}: ${error.message}`);
};

// Update binary utilities to match Rust's data-encoding crate
const binaryUtils = {
    async calculateChecksum(data) {
        const response = await fetch('/api/checksum', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data })
        });
        return await response.json();
    },

    // Update to use simdutf8 validation from backend
    async validateUtf8(data) {
        const response = await fetch('/api/validate-utf8', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data })
        });
        return await response.json();
    },

    base64ToUint8Array(base64) {
        const raw = atob(base64);
        const array = new Uint8Array(raw.length);
        for (let i = 0; i < raw.length; i++) {
            array[i] = raw.charCodeAt(i);
        }
        return array;
    }
};

// Update record utilities to use pickledb backend
const recordUtils = {
    async verifyRecord(record) {
        const response = await fetch('/api/verify-record', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(record)
        });
        return await response.json();
    },

    decodeRecord(record) {
        const decoder = new TextDecoder('utf-8');
        const data = binaryUtils.base64ToUint8Array(record.data);
        return decoder.decode(data);
    }
};

// Export new utilities
Object.assign(APIManager, {
    binaryUtils,
    recordUtils
});

export {
  validateLoginForm,
  validateProfileForm,
  validateCreateUserForm,
  goBackToProfile,
  goToCrudPage,
  clearFormError,
  navigateToProfile,
  goBack,
  navigateToProject,
  confirmLogout,
  sessionManager,
  handleError
};
