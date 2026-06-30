module.exports = {
  apps: [
    {
      name: "pool-smith-prod",
      script: "npm",
      args: "start",
      cwd: "/var/www/pool-smith-prod",
      env: {
        NODE_ENV: "production",
        PORT: 3008,
      },
      autorestart: true,
      max_restarts: 10,
      max_memory_restart: "512M",
    },
  ],
};
