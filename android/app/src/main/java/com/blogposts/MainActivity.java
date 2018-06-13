package com.blogposts;

import android.graphics.drawable.Drawable;
import android.support.v4.content.ContextCompat;
import android.widget.LinearLayout;

import com.imagepicker.permissions.OnImagePickerPermissionsCallback;
import com.facebook.react.modules.core.PermissionListener;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity implements OnImagePickerPermissionsCallback {
  private PermissionListener listener;

  @Override
  public void setPermissionListener(PermissionListener listener)
  {
    this.listener = listener;
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults)
  {
    if (listener != null)
    {
      listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
  }

    @Override
    public LinearLayout createSplashLayout() {
        LinearLayout splash = new LinearLayout(this);
        Drawable launch_screen_bitmap = ContextCompat.getDrawable(getApplicationContext(),R.drawable.launch_screen_bitmap);
        splash.setBackground(launch_screen_bitmap);

        return splash;
    }
}