import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.open.athena',
  appName: 'athena',
  webDir: 'www',
  bundledWebRuntime: false,
  cordova: {
    preferences: {
      ScrollEnabled: 'true',
      BackupWebStorage: 'none',
      SplashMaintainAspectRatio: 'true',
      FadeSplashScreenDuration: '300',
      SplashShowOnlyFirstTime: 'false',
      SplashScreen: 'screen',
      SplashScreenDelay: '3000',
      StatusBarOverlaysWebView: 'true',
      'deployment-target': '11.0',
      'target-device': 'handset',
      Orientation: 'portrait',
      AndroidXEnabled: 'true'
    }
  }
};

export default config;
