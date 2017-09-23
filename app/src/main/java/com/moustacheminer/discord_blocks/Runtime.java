package com.moustacheminer.discord_blocks;

import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.webkit.ConsoleMessage;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class Runtime extends AppCompatActivity {
    private static final String TAG = "DiscordBlocksRuntime";
    public class WebAppInterface {
        Context mContext;
        Intent intent = getIntent();

        /** Instantiate the interface and set the context */
        WebAppInterface(Context c) {
            mContext = c;
        }

        /** Show a toast from the web page */
        @JavascriptInterface
        public void showToast(String toast) {
            Toast.makeText(mContext, toast, Toast.LENGTH_LONG).show();
        }

        @JavascriptInterface
        public String getJS() {
            return intent.getStringExtra("js");
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_runtime);
    }

    @Override
    protected void onStart() {
        super.onStart();
        WebView runtime = (WebView) findViewById(R.id.webview);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            runtime.setWebContentsDebuggingEnabled(true);
        }
        runtime.setWebChromeClient(new WebChromeClient() {
            public boolean onConsoleMessage(ConsoleMessage cm) {
                Log.d("TAG", cm.message() + " -- From line "
                        + cm.lineNumber() + " of "
                        + cm.sourceId() );
                Toast.makeText(getApplicationContext(), cm.message(), Toast.LENGTH_SHORT).show();
                return true;
            }
        });
        WebSettings webSettings = runtime.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setAllowFileAccessFromFileURLs(true);
        webSettings.setAllowUniversalAccessFromFileURLs(true);
        runtime.addJavascriptInterface(new WebAppInterface(this), "blockly");
        runtime.loadUrl("file:///android_asset/runtime.html");
    }
}
