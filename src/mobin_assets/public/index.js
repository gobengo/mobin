import mobin from 'ic:canisters/mobin';

mobin.greet(window.prompt("Enter your name:")).then(greeting => {
  window.alert(greeting);
});
