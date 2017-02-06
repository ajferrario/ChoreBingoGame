import AsyncStorage from 'react';

class Storage {
  static async getplayer(id) {
    try {
      const player = AsyncStorage.getItem(id.toString());
      return player;
    } catch (e) {
      console.log('was unable to get player');
      console.log(e.toString());
      return null;
    }
  }

  static async savePlayer(id, data) {
    try {
      await AsyncStorage.setItem(id, data);
    } catch (e) {
      console.log('was unable to save player');
      console.log(e);
    }
  }
}

export default Storage;
