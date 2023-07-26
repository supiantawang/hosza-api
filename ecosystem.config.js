module.exports = {
    apps : [{
      name: 'HPUNISZA-API',
      script: './app.js',
  
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: 'one two',
      autorestart: true,
      watch: false,
      max_memory_restart: '3G',
      env: {
        NODE_ENV: 'development',
        OPENSSL_CONF: '/dev/null',
        ENABLE_TELEGRAM_HANDLER: true
      },
      env_production: {
        NODE_ENV: 'production',
        OPENSSL_CONF: '/dev/null',
        ENABLE_TELEGRAM_HANDLER: true
      },
      env_staging: {
        NODE_ENV: 'staging',
        OPENSSL_CONF: '/dev/null',
        ENABLE_TELEGRAM_HANDLER: true
      },
      instances : 'max',
      exec_mode: 'cluster',
      exec_interpreter: 'node',
      node_args: [
        // '--icu-data-dir=./node_modules/full-icu'
      ],
      instance_var: 'INSTANCE_ID'
    }]
};