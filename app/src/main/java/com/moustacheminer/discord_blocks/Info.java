package com.moustacheminer.discord_blocks;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.webkit.WebView;

/**
 * Created by leondro on 9/24/17.
 */

public class Info extends AppCompatActivity {
    private static final String TAG = "DiscordBlocksInfo";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_runtime);
    }

    @Override
    protected void onStart() {
        super.onStart();
        final WebView runtime = (WebView) findViewById(R.id.webview);
        runtime.setWebContentsDebuggingEnabled(true);
        runtime.loadUrl("file:///android_asset/info.html");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        WebView runtime = (WebView) findViewById(R.id.webview);
        runtime.destroy();
    }
}
