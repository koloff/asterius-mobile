
package com.asterius;
import android.os.Bundle; // required for onCreate parameter

import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen; // here
import android.widget.ImageView; // uncomment if opening fullscreen

public class MainActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this, true, R.style.SplashScreenTheme);  // here
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Asterius";
    }
}
