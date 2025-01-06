"use strict";

// Enable ES modules for this file
export {}; // Mark as module

import APIManager from './api/api-manager.js';
import { validateLoginForm, validateProfileForm, validateCreateUserForm } from './utils.js';

// Enhanced password generation using Web Crypto API
const generatePassword = async () => {
  const array = new Uint8Array(12);
  crypto.getRandomValues(array);
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(array, byte => chars[byte % chars.length]).join('');
};

const deleteUser = async (username) => {
  if (!confirm(`Delete user ${username}?`)) return;

  try {
    const response = await fetch(`/delete?username=${encodeURIComponent(username)}`);
    if (response.ok) {
      alert("User deleted successfully");
      await loadUsers();
    } else {
      throw new Error("Error deleting user");
    }
  } catch (error) {
    alert(error.message);
  }
};

const resetPassword = async (username) => {
  const newPassword = await generatePassword();
  try {
    const response = await fetch(`/resetpw?username=${encodeURIComponent(username)}&password=${encodeURIComponent(newPassword)}`);
    if (response.ok) {
      alert(`New password for ${username}: ${newPassword}`);
    } else {
      throw new Error("Error resetting password");
    }
  } catch (error) {
    alert(error.message);
  }
};

const loadUsers = async () => {
  try {
    const response = await fetch("/users");
    if (!response.ok) throw new Error("Failed to load users");

    const text = await response.text();
    const lines = text.split("\n");
    const table = document.getElementById("userTable");

    const html = lines
      .filter(line => line.trim() && !line.startsWith('#'))
      .map(line => {
        const parts = line.split(':');
        if (parts.length >= 7) {
          const [username, , , , fullName, homeDir, shell, isAdmin = "0"] = parts;
          return `
            <tr>
              <td>${username}</td>
              <td>${fullName}</td>
              <td>${homeDir}</td>
              <td>${shell}</td>
              <td>${isAdmin.trim() === "1" ? "Yes" : "No"}</td>
              <td>
                <button class='button-small' onclick='editUser("${username}", "${fullName}", "", "")'>
                  Edit
                </button>
                <button class='button-small' onclick='resetPassword("${username}")'>
                  Reset Password
                </button>
              </td>
            </tr>`;
        }
        return '';
      })
      .join('');

    table.innerHTML = `
      <tr>
        <th>Username</th>
        <th>Full Name</th>
        <th>Home Directory</th>
        <th>Shell</th>
        <th>Admin</th>
        <th>Actions</th>
      </tr>${html}`;
  } catch (error) {
    console.error("Error:", error);
    alert("Error loading users");
  }
};

const createUser = async () => {
  const formData = {
    username: document.getElementById("newUsername").value,
    fullname: document.getElementById("newFullname").value,
    email: document.getElementById("newEmail").value,
    project: document.getElementById("newProject").value,
    password: await generatePassword()
  };

  try {
    const queryString = Object.entries(formData)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    const response = await fetch(`/register?${queryString}`);

    if (response.ok) {
      alert(`User created successfully!\nUsername: ${formData.username}\nPassword: ${formData.password}`);
      await loadUsers();
      document.getElementById("createUserForm").reset();
    } else {
      throw new Error("Error creating user");
    }
  } catch (error) {
    alert(error.message);
  }
  return false;
};

const editUser = (username, fullname, email, project) => {
  document.getElementById("newUsername").value = username;
  document.getElementById("newUsername").readOnly = true;
  document.getElementById("newFullname").value = fullname;
  document.getElementById("newEmail").value = email;
  document.getElementById("newProject").value = project;
  document.getElementById("submitBtn").value = "Update User";
  document.getElementById("createUserForm").onsubmit = function (e) {
    e.preventDefault();
    return updateExistingUser();
  };
};

const updateExistingUser = async () => {
  const formData = {
    username: document.getElementById("newUsername").value,
    fullname: document.getElementById("newFullname").value,
    email: document.getElementById("newEmail").value,
    project: document.getElementById("newProject").value
  };

  try {
    const queryString = Object.entries(formData)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    const response = await fetch(`/update?${queryString}`);

    if (response.ok) {
      alert("User updated successfully!");
      document.getElementById("newUsername").readOnly = false;
      document.getElementById("createUserForm").reset();
      document.getElementById("submitBtn").value = "Create User";
      document.getElementById("createUserForm").onsubmit = createUser;
      await loadUsers();
    } else {
      throw new Error("Error updating user");
    }
  } catch (error) {
    alert(error.message);
  }
  return false;
};

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : '';
};

const checkSession = () => {
  const username = getCookie('username');
  if (!username) {
    alert("Session expired - please login again");
    window.location.href = 'index.html';
    return false;
  }
  return true;
};

const goBackToProfile = () => {
  const username = getCookie('username');
  if (!username) {
    window.location.href = 'dashboard.html';
  } else {
    window.location.href = 'profile.html?username=' + encodeURIComponent(username);
  }
};

window.onload = async () => {
  if (!checkSession()) return;
  await loadUsers();
};

const navigateToProfile = () => {
  if (!checkSession()) return;
  const username = getCookie('username');
  window.location.href = 'profile.html?username=' + encodeURIComponent(username);
};

const navigateToProject = (url) => {
  if (!checkSession()) return;
  window.location.href = url;
};

const handleServerError = (error, context) => {
  const errorDiv = document.getElementById('record-error');
  if (!errorDiv) return;

  let message = 'Operation failed';
  switch (error.status) {
    case 403:
      message = 'Permission denied';
      break;
    case 404:
      message = 'Record not found';
      break;
    case 500:
      message = 'Server error';
      break;
  }

  errorDiv.innerHTML = context + ': ' + message;
  errorDiv.style.display = 'block';
  setTimeout(() => {
    errorDiv.style.display = 'none';
  }, 5000);
};

const parseRecordData = (data, projectFilter) => {
  const records = data.split('\n')
    .reduce((acc, line) => {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('%')) return acc;

      const colonIndex = trimmedLine.indexOf(':');
      if (colonIndex === -1) return acc;

      const [field, value] = [
        trimmedLine.substring(0, colonIndex).trim(),
        trimmedLine.substring(colonIndex + 1).trim()
      ];

      if (field === 'Project_Name') {
        if (Object.keys(acc.currentRecord).length > 0) {
          acc.records.push(acc.currentRecord);
        }
        acc.currentRecord = {};
      }

      acc.currentRecord[field] = value;
      return acc;
    }, { records: [], currentRecord: {} });

  if (Object.keys(records.currentRecord).length > 0) {
    records.records.push(records.currentRecord);
  }

  return records.records.filter(record => record.Project_Name === projectFilter);
};

const goBack = () => {
  window.location.href = 'dashboard.html';
};

const loadAuditLogs = async () => {
  try {
    const response = await fetch("/audit_log");
    if (response.ok) {
      auditData = parseAuditLogs(await response.text());
      totalPages = Math.ceil(auditData.length / pageSize);
      displayPage(1);
    }
  } catch (error) {
    console.error("Error loading audit logs:", error);
  }
};

const parseAuditLogs = (data) => {
  return data.split('\n')
    .filter(line => line.trim())
    .map(line => {
      const parts = line.split('|');
      return {
        timestamp: parts[0] || '',
        username: parts[1] || '',
        action: parts[2] || ''
      };
    });
};

const displayPage = (page) => {
  const tbody = document.getElementById('auditTable').getElementsByTagName('tbody')[0];
  tbody.innerHTML = '';

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pageData = auditData.slice(start, end);

  pageData.forEach(entry => {
    const row = tbody.insertRow();
    row.insertCell().textContent = entry.timestamp;
    row.insertCell().textContent = entry.username;
    row.insertCell().textContent = entry.action;
  });

  currentPage = page;
  updatePaginationControls();
};

const updatePaginationControls = () => {
  document.getElementById('currentPage').textContent =
    'Page ' + currentPage + ' of ' + totalPages;

  document.getElementById('prevButton').disabled = (currentPage === 1);
  document.getElementById('nextButton').disabled = (currentPage === totalPages);
};

const filterTable = () => {
  const filters = {
    timestamp: document.getElementById('timestampFilter').value.toLowerCase(),
    username: document.getElementById('usernameFilter').value.toLowerCase(),
    action: document.getElementById('actionFilter').value.toLowerCase()
  };

  const filtered = auditData.filter(entry => {
    return entry.timestamp.toLowerCase().includes(filters.timestamp) &&
      entry.username.toLowerCase().includes(filters.username) &&
      entry.action.toLowerCase().includes(filters.action);
  });

  auditData = filtered;
  totalPages = Math.ceil(auditData.length / pageSize);
  displayPage(1);
};

const sortTableByColumn = (table, column) => {
  const rows = Array.from(table.rows).slice(2);
  const isDate = column === 5;

  rows.sort((a, b) => {
    const aVal = a.cells[column].textContent;
    const bVal = b.cells[column].textContent;

    if (isDate) {
      return new Date(aVal) - new Date(bVal);
    }
    return aVal.localeCompare(bVal);
  });

  rows.forEach(row => table.appendChild(row));
};

const validateForm = async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorDiv = document.getElementById("login-error");

  try {
    const response = await fetch(`/auth?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
    if (response.ok) {
      errorDiv.style.display = "none";
      document.cookie = `username=${encodeURIComponent(username)};path=/;max-age=3600`;  // Expires in 1 hour
      window.location.href = 'dashboard.html';
      return false;
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    errorDiv.style.display = "block";
    return false;
  }
};

const clearError = () => {
  document.getElementById("login-error").style.display = "none";
};

const handleRegister = async (event) => {
  event.preventDefault();
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;
  const errorDiv = document.getElementById("register-error");

  try {
    const response = await fetch(`/register?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
    if (response.ok) {
      errorDiv.style.display = "none";
      alert("Registration successful! Please login.");
      document.getElementById("registerForm").reset();
      return false;
    } else {
      throw new Error("Error registering user");
    }
  } catch (error) {
    errorDiv.style.display = "block";
    return false;
  }
};

// Table filtering functions
const filterByDueDate = (filterType) => {
  const table = document.getElementById('obligationsTable');
  const rows = table.getElementsByTagName('tr');
  const today = new Date();

  for (let i = 2; i < rows.length; i++) {
    const dueDateCell = rows[i].cells[5];
    const dueDate = new Date(dueDateCell.textContent);
    const daysUntilDue = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));

    rows[i].className = '';
    if (filterType === 'all') {
      rows[i].style.display = '';
    } else if (filterType === 'warning' && daysUntilDue <= 14 && daysUntilDue > 0) {
      rows[i].style.display = '';
      rows[i].className = 'warning';
    } else if (filterType === 'overdue' && daysUntilDue < 0) {
      rows[i].style.display = '';
      rows[i].className = 'overdue';
    } else {
      rows[i].style.display = 'none';
    }
  }
};

const filterDataTable = (tableId, inputId) => {
  const input = document.getElementById(inputId);
  const table = document.getElementById(tableId);
  const filters = table.getElementsByClassName('column-filter');
  const rows = table.getElementsByTagName('tr');

  for (let i = 2; i < rows.length; i++) {
    let display = '';
    for (let j = 0; j < filters.length; j++) {
      const cell = rows[i].cells[j];
      const filter = filters[j].value.toLowerCase();
      if (filter && cell.textContent.toLowerCase().indexOf(filter) === -1) {
        display = 'none';
        break;
      }
    }
    rows[i].style.display = display;
  }
};

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Form event listeners
  const forms = {
    loginForm: { id: 'loginForm', validator: validateLoginForm },
    profileForm: { id: 'profileForm', validator: validateProfileForm },
    createUserForm: { id: 'createUserForm', validator: validateCreateUserForm }
  };

  Object.entries(forms).forEach(([, form]) => {
    const element = document.getElementById(form.id);
    if (element) {
      element.addEventListener('submit', e => {
        e.preventDefault();
        form.validator(element);
      });
    }
  });

  // Initialize table if present
  const obligationsTable = document.getElementById('obligationsTable');
  if (obligationsTable) {
    filterByDueDate('all');
  }

  // Project navigation
  document.querySelectorAll('.project-button').forEach(button => {
    button.addEventListener('click', () => navigateToProject(button.dataset.project));
  });

  // Page navigation
  document.querySelectorAll('[data-page]').forEach(button => {
    button.addEventListener('click', () => {
      window.location.href = button.dataset.page;
    });
  });

  // Event listeners for table functionality
  document.querySelectorAll('.column-filter')
    .forEach(input => input.addEventListener('keyup', filterDataTable));

  document.querySelectorAll('[data-sort]')
    .forEach(header => header.addEventListener('click', () =>
      sortTable(parseInt(header.dataset.sort))));

  document.querySelectorAll('[data-filter]')
    .forEach(button => button.addEventListener('click', () =>
      filterByDueDate(button.dataset.filter)));
});

// Service Worker Registration
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('ServiceWorker registration successful');
      return registration;
    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
    }
  }
};

// Page Visibility API
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause non-essential operations
    console.log('Page is hidden, pausing operations');
  } else {
    // Resume operations
    console.log('Page is visible, resuming operations');
  }
});

// Storage API for User Preferences
const userPrefs = {
  async save(key, value) {
    if ('storage' in navigator) {
      try {
        const storage = await navigator.storage.persisted();
        if (!storage) {
          await navigator.storage.persist();
        }
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Storage error:', error);
      }
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },

  get(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
};

// Clipboard API Integration
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text:', err);
    return false;
  }
};

// Resize Observer for Table Responsiveness
const setupTableResizeObserver = () => {
  const table = document.getElementById('obligationsTable');
  if (!table) return;

  const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      const { width } = entry.contentRect;
      table.classList.toggle('compact', width < 768);
    }
  });

  resizeObserver.observe(table);
};

// Intersection Observer for Lazy Loading
const setupIntersectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.lazy-load').forEach(el => observer.observe(el));
};

// Enhanced DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', async () => {
  await initializeAPIs();
  await initializeMiddleware();
  // Register Service Worker
  await registerServiceWorker();

  // Setup Observers
  setupTableResizeObserver();
  setupIntersectionObserver();

  // ...existing event listener code...

  // Check Storage Permission
  if (navigator.storage && navigator.storage.persist) {
    const isPersisted = await navigator.storage.persist();
    console.log(`Persisted storage granted: ${isPersisted}`);
  }
});

// Add API initialization
const initializeAPIs = async () => {
  // Request storage persistence
  await APIManager.storage.requestPersistence();

  // Initialize WebSocket connection
  const ws = APIManager.websocket.connect('wss://your-server/ws');

  // Setup clipboard handling
  document.querySelectorAll('[data-clipboard]').forEach(element => {
    element.addEventListener('click', async () => {
      const text = element.dataset.clipboard;
      if (await APIManager.clipboard.copyToClipboard(text)) {
        alert('Copied to clipboard!');
      }
    });
  });

  // Setup file upload handling
  const fileInput = document.querySelector('input[type="file"]');
  if (fileInput) {
    fileInput.addEventListener('change', async () => {
      await APIManager.file.uploadFiles(fileInput.files, '/upload');
    });
  }

  // Setup fullscreen handling
  const fullscreenButton = document.querySelector('.fullscreen-button');
  if (fullscreenButton) {
    fullscreenButton.addEventListener('click', () => {
      APIManager.fullscreen.enter(document.documentElement);
    });
  }
};

// Initialize middleware monitoring
const initializeMiddleware = async () => {
  try {
    // Start system monitoring
    await APIManager.middleware.monitorSystem();

    // Initialize bridge
    await APIManager.middleware.runBridge();

    console.log('Middleware initialized successfully');
  } catch (error) {
    console.error('Failed to initialize middleware:', error);
  }
};

document.addEventListener('DOMContentLoaded', function() {
    fetchProjects();
});

// Combined fetchProjects implementation
async function fetchProjects() {
    try {
        const data = await APIManager.server.request('/api/projects');
        if (!data.error) {
            const verifiedRecords = await Promise.all(
                data.projects.map(async record => {
                    const isValid = await APIManager.recordUtils.verifyRecord(record);
                    if (!isValid) {
                        console.error('Invalid record checksum:', record.record_key);
                        return null;
                    }
                    return {
                        ...record,
                        decodedData: APIManager.recordUtils.decodeRecord(record)
                    };
                })
            );
            displayProjects(verifiedRecords.filter(r => r !== null));
        }
    } catch (error) {
        console.error('Failed to fetch projects:', error);
    }
}

function displayProjects(projects) {
    const container = document.getElementById('projects-list');
    container.innerHTML = ''; // Clear existing content

    projects.forEach(project => {
        const data = JSON.parse(project.decodedData);
        const element = document.createElement('div');
        element.className = 'project-item';
        element.innerHTML = `
            <h3>${data.project_name}</h3>
            <p>Status: ${data.status}</p>
            <p>Due Date: ${new Date(data.action_due_date).toLocaleDateString()}</p>
            <p>Record Key: ${project.record_key}</p>
            <p>Last Updated: ${new Date(project.timestamp * 1000).toLocaleString()}</p>
        `;
        container.appendChild(element);
    });
}

// Combined submitRecord implementation
async function submitRecord(formData) {
    try {
        const record = {
            record_key: formData.id || crypto.randomUUID(),
            data: formData,
            timestamp: Math.floor(Date.now() / 1000)
        };

        const response = await APIManager.server.request('/api/records', {
            method: 'POST',
            body: JSON.stringify(record)
        });

        if (!response.ok) {
            throw new Error('Failed to save record');
        }

        return { success: true };
    } catch (error) {
        console.error('Error saving record:', error);
        throw error;
    }
}
