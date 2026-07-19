// 启动 localtunnel 并立即打印 URL
const localtunnel = require('localtunnel');

(async () => {
  const tunnel = await localtunnel({ port: 5173, subdomain: 'furou' + Math.floor(Math.random() * 9000 + 1000) });
  console.log('\n========================================');
  console.log('  PUBLIC URL:');
  console.log('  ' + tunnel.url);
  console.log('========================================\n');
  tunnel.on('close', () => {
    console.log('tunnel closed');
  });
  tunnel.on('error', (err) => {
    console.error('tunnel error:', err);
  });
  // 保持运行
  setInterval(() => {}, 1000);
})();
