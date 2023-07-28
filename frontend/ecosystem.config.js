// module.exports = {
//   apps: [
//     {
//       name: 'NextAppName',
//     //  exec_mode: 'cluster',
//       instances: 1, // Or a number of instances
//       script: 'node_modules/next/dist/bin/next',
//       args: 'start',
//     autorestart: true,
//       watch: false,
//       max_memory_restart: "1G",
//     }
//   ]
// }

module.exports = {
  apps: [
    {
      name: "NextAppName",
      script: "npm",
      args: "start",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
  ],
};