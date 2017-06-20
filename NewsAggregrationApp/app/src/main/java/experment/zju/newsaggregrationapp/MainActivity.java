package experment.zju.newsaggregrationapp;

import android.app.Notification;
import android.app.NotificationManager;
import android.graphics.BitmapFactory;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private String url = "http://210.32.185.83:3000";
    private String notices[][] = new String [10][5];

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
        mWebView.loadUrl(url);

        notices[0][0] = "美驱逐舰与菲律宾货轮相撞致多伤 7名美船员失踪";
        notices[0][1] = "“菲兹杰拉德”号驱逐舰船体受损严重。原标题：美驱逐舰与菲律宾货轮相撞致多伤7名美船员失踪";

        notices[1][0] = "罗德曼给金正恩的礼物：特朗普的畅销书";
        notices[1][1] = "原标题：罗德曼给金正恩的礼物：特朗普的畅销书美国退役篮球明星丹尼斯·罗德曼15日向朝鲜官员赠送了他带给朝鲜最高领导人金正恩的礼物";



        //Toast.makeText(this.getApplicationContext(),"Haha",Toast.LENGTH_SHORT).show();

        Notice_launcher(notices[0][0],notices[0][1]);


//        mWebView.loadUrl("https://www.baidu.com/");
    }

    protected void Notice_launcher(String notice_title, String notice_content){

        Notification notifation= new Notification.Builder(this)
                .setContentTitle(notice_title)
                .setContentText(notice_content)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setLargeIcon(BitmapFactory.decodeResource(this.getResources(), R.mipmap.ic_launcher))
                .build();
        NotificationManager manger= (NotificationManager) this.getSystemService(NOTIFICATION_SERVICE);
        manger.notify(0, notifation);
    }

}
