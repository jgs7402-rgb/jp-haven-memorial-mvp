// test-fetch.mjs
const url = 'https://mgqnadogbqjmemzneprt.supabase.co';

async function main() {
  try {
    const res = await fetch(url);
    console.log('status =', res.status);
  } catch (e) {
    console.error('fetch error =', e);
  }
}

main();
