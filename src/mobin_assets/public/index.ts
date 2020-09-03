import mobin from 'ic:canisters/mobin';
import MobinApp from './Mobin';

(async () => {
  window.alert(await mobin.greet(window.prompt("Enter your name:")));
})();
