import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageProvider {

  constructor(public storage: Storage, public nativeStorage: NativeStorage) {
    
  }

  public persist(key: any, value: any, isNative: boolean = false) {
    if (isNative == true) {
      return this.nativeStorage.setItem(key, value);
    } else {
      return this.storage.set(key, value);
    }
  }

  public remove(key: any, isNative: boolean = false) {
    if (isNative == true) {
      return this.nativeStorage.remove(key);
    } else {
      return this.storage.remove(key);
    }
  }

  public get(key: any, isNative: boolean = false) {
    if (isNative == true) {
      return this.nativeStorage.getItem(key);
    } else {
      return this.storage.get(key);
    }
  }

}
