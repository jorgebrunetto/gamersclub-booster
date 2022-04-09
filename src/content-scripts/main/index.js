import { adicionarBarraLevel } from './barraLevel';
import { coletarDailyRewards } from './autoDailyRewards';

let generalOptions = [];
chrome.storage.sync.get( null, function ( result ) {
  generalOptions = result;
  initGcBooster();
} );

const initGcBooster = async () => {
  if ( generalOptions.mostrarLevelProgress ) {
    adicionarBarraLevel();
  }

  if ( generalOptions.autoDailyRewards ) {
    const { lastCollectedDailyRewardsTs } = generalOptions;
    const dateFormat = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const currentDate = new Date().toLocaleDateString( dateFormat );
    const currentHours = new Date().getHours();
    const lastCollectDate = new Date( lastCollectedDailyRewardsTs ).toLocaleDateString( dateFormat );

    if ( currentDate !== lastCollectDate && currentHours >= 5 ) {
      coletarDailyRewards();
    }
  }
};
