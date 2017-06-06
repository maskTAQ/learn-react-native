## react-native 使用百度地图
1. 安装依赖 $ yarn add react-native-baidu-map
2. 配置/android/settings.gradle  
    ```javascript
    include ':app'  
    include ':react-native-baidu-map'  
    project(':react-native-baidu-map').projectDir = new File(settingsDir, '../node_modules/react-native-baidu-map/android')
    ```
3. 配置/android/app/build.gradle
```javascript
dependencies {
    compile project(':react-native-baidu-map')
    }
```
3. 配置/android/app/src/main/java/com/{projectName}/MainApplication.java
```javascript
import org.lovebing.reactnative.baidumap.BaiduMapPackage;
@Override
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new BaiduMapPackage(getApplicationContext())
  );
}
```
4. 配置/android/app/src/main/AndroidManifest.xml

```javascript
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.baidumap"
    android:versionCode="1"
    android:versionName="1.0">

    <!-- 这个权限用于进行网络定位-->
   <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"></uses-permission>
   <!-- 这个权限用于访问GPS定位-->
   <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"></uses-permission>
   <!-- 用于访问wifi网络信息，wifi信息会用于进行网络定位-->
   <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"></uses-permission>

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
    <uses-permission android:name="com.android.launcher.permission.READ_SETTINGS" />
    <uses-permission android:name="android.permission.WAKE_LOCK"/>
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.WRITE_SETTINGS" />

    <uses-sdk
        android:minSdkVersion="16"
        android:targetSdkVersion="22" />

    <application
      android:name=".MainApplication"
      android:allowBackup="true"
      android:label="@string/app_name"
      android:icon="@mipmap/ic_launcher"
      android:theme="@style/AppTheme">

      <meta-data
          android:name="com.baidu.lbsapi.API_KEY"
          android:value="你申请的key"/>  
      <activity
        android:name=".MainActivity"
        android:label="@string/app_name"
        android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
        android:windowSoftInputMode="adjustResize">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
      </activity>
      <activity android:name="com.facebook.react.devsupport.DevSettingsActivity" />
    </application>

</manifest>
```

## key申请步骤
1. 获取sha1值
```javascript
$ cd C:\Users\{yourname}\.android & keytool -list -v -keystore debug.keystore
密钥库口令默认为android
输出的信息可以查看到sha1值
```
2. 获取包名
    /android/app/src/main/AndroidManifest.xml 下的manifest标签package属性值，一般为com.${projectname}。
