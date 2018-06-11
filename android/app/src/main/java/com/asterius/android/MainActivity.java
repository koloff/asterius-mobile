
package com.asterius.android;
import android.os.Bundle; // required for onCreate parameter

import com.facebook.react.ReactActivity;

import android.widget.ImageView; // uncomment if opening fullscreen

public class MainActivity extends ReactActivity {
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Asterius";
    }
}
