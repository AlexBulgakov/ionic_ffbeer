ionic cordova build android --release
cd platforms/android/build/outputs/apk/
rm release.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keypass ffbrpass -keystore denisoby.keystore android-release-unsigned.apk ffbr-app
~/Library/Android/sdk/build-tools/27.0.1/zipalign -v 4 android-release-unsigned.apk release.apk
cd -
