
using System;
using System.Windows.Forms;
using System.Drawing;

namespace imperium.tech
{
    public partial class MainForm : Form
    {
        private WebViewManager webViewManager;
        private SplashScreenManager splashScreenManager;

        public MainForm()
        {
            InitializeComponent();
            
            // Set form properties
            this.Text = "Secure System";
            this.Size = new System.Drawing.Size(1280, 720);
            this.StartPosition = FormStartPosition.CenterScreen;
            
            // Initialize managers
            webViewManager = new WebViewManager(this);
            splashScreenManager = new SplashScreenManager(this, InitializeWebView);
            
            // Show splash screen first
            splashScreenManager.ShowSplashScreen();
        }

        // The InitializeComponent method is already defined in the partial class
        // in MainForm.Designer.cs, so we remove it from here

        private void InitializeWebView()
        {
            webViewManager.Initialize();
        }
    }
}
