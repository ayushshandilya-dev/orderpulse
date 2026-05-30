# OrderPulse Sandbox Base Image
#
# This is the hardened runtime environment that wraps contestant code.
# Build process:
#   1. Copies the submission archive mounted at /submission
#   2. Extracts it into /app
#   3. Runs the language-appropriate build step (controlled by ORDERPULSE_LANGUAGE env)
#   4. Drops to a non-root user and executes via the entrypoint wrapper
#
# The image supports: go, rust, cpp, python, binary
# All contestant processes are run as uid=1000 (runner)

FROM ubuntu:24.04

# ---- System packages ----
RUN apt-get update && apt-get install -y --no-install-recommends \
    # Go toolchain
    golang-go \
    # Rust toolchain
    rustc cargo \
    # C++ toolchain
    g++ cmake make \
    # Python runtime
    python3 python3-pip python3-venv \
    # Utilities
    tar gzip zip unzip curl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# ---- Non-root runner user ----
# In Ubuntu 24.04, the user 'ubuntu' (1000:1000) exists by default. We remove it first.
RUN (userdel -r ubuntu || true) && \
    groupadd -g 1000 runner && \
    useradd -u 1000 -g runner -m -s /bin/bash runner

# ---- Working directories ----
RUN mkdir -p /app /submission /orderpulse && chown runner:runner /app /orderpulse

# ---- Entrypoint script ----
# This script is run as root, extracts the archive, then drops to runner.
COPY entrypoint.sh /orderpulse/entrypoint.sh
RUN chmod +x /orderpulse/entrypoint.sh

# Expose the standard sandbox port
EXPOSE 7878

WORKDIR /app

ENTRYPOINT ["/orderpulse/entrypoint.sh"]
