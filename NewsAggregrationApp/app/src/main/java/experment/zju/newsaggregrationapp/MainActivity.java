package experment.zju.newsaggregrationapp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView mWebView = (WebView) findViewById(R.id.mwebview);
//        mWebView.getSettings().setDomStorageEnabled(true);
//        mWebView.getSettings().setAppCacheMaxSize( 10 * 1024 * 1024 ); // 10MB
//        mWebView.getSettings().setAppCachePath(getApplicationContext().getCacheDir().getAbsolutePath() );
//        mWebView.getSettings().setAllowFileAccess( true );
//        mWebView.getSettings().setAppCacheEnabled( true );

//        mWebView.getSettings().setCacheMode( WebSettings.LOAD_DEFAULT );
        mWebView.getSettings().setJavaScriptEnabled( true );

        mWebView.setWebViewClient(new WebViewClient());
        mWebView.loadUrl("http://222.205.108.217:3000");



//        mWebView.loadUrl("https://www.baidu.com/");
    }
}
