package com.moustacheminer.discord_blocks;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.webkit.ConsoleMessage;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;

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
    protected void onStop() {
        super.onStop();
        WebView runtime = (WebView) findViewById(R.id.webview);
        runtime.destroy();
    }
}
