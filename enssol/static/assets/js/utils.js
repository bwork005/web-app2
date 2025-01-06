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
