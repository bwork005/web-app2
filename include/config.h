/**
 * Copyright 2024 Enveng Group - Adrian Gallo.
 * SPDX-License-Identifier: 	AGPL-3.0-or-later
 */
#ifndef CONFIG_H
#define CONFIG_H

#include <stddef.h>
#include <limits.h>  /* For PATH_MAX - POSIX compliant */

#define MAX_ENV_LINE 1024
#define MAX_ENV_VALUE 256

/* Default paths - all relative to binary location */
#define DEFAULT_CONFIG_PATH "../etc/env/.env"
#define DEFAULT_LOG_PATH "../var/log/app.log"
#define DEFAULT_DB_PATH "../var/lib/records.rec"
#define DEFAULT_AUTH_PATH "../etc/auth/passwd"
#define DEFAULT_SSL_CERT "../etc/ssl/cert.pem"
#define DEFAULT_SSL_KEY "../etc/ssl/privkey.pem"
#define DEFAULT_AUDIT_PATH "../var/log/audit.log"

/* Required directories */
#define REQUIRED_DIRS_COUNT 6
static const char *REQUIRED_DIRS[] = {
    "../etc/env",
    "../etc/ssl",
    "../etc/auth",
    "../var/log",
    "../var/lib",
    NULL
};

/* Path validation status codes */
#define PATH_OK 0
#define PATH_NOT_FOUND -1
#define PATH_NO_ACCESS -2
#define PATH_INVALID -3

struct Config {
    char log_path[PATH_MAX];
    char db_path[PATH_MAX];
    char audit_path[PATH_MAX];
    int server_port;
    char server_host[256];
    char ssl_cert_file[256];
    char ssl_key_file[256];
    char db_file[256];
    char log_file[256];
    char log_level[16];
    int max_connections;
    char locale[32];
    char allowed_origins[256];
    char allowed_methods[256];
    char allowed_headers[256];
    char app_name[64];
    char app_domain[256];
    int quic_max_streams;
    int quic_timeout_ms;
    int quic_mtu_size;
    char base_path[PATH_MAX];    /* Base path for relative paths */
    int paths_validated;         /* Flag indicating path validation status */
};

/* Add this line for the global config variable */
extern struct Config *g_config;

int loadConfig(const char *env_file, struct Config *config);
void printConfig(const struct Config *config);

#endif /* CONFIG_H */
