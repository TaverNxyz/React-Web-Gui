
using System;
using System.Drawing;
using System.Reflection;
using System.Windows.Forms;

namespace imperium.tech
{
    public class SplashScreenManager
    {
        private PictureBox splashBox;
        private Form parentForm;
        private Timer splashTimer;
        private Action onSplashComplete;

        public SplashScreenManager(Form parent, Action onSplashComplete)
        {
            this.parentForm = parent;
            this.onSplashComplete = onSplashComplete;
        }

        public void ShowSplashScreen()
        {
            try {
                // Load splash image from embedded resources
                using (var stream = Assembly.GetExecutingAssembly().GetManifestResourceStream("imperium.tech.Resources.splash.png"))
                {
                    if (stream != null)
                    {
                        var splashImage = Image.FromStream(stream);
                        splashBox = new PictureBox();
                        splashBox.Dock = DockStyle.Fill;
                        splashBox.SizeMode = PictureBoxSizeMode.Zoom;
                        splashBox.Image = splashImage;
                        parentForm.Controls.Add(splashBox);
                        splashBox.BringToFront();
                    }
                }
                
                // Initialize timer
                splashTimer = new Timer();
                splashTimer.Interval = 2500; // 2.5 seconds
                splashTimer.Tick += (s, e) => {
                    splashTimer.Stop();
                    splashBox.Visible = false;
                    parentForm.Controls.Remove(splashBox);
                    splashBox.Dispose();
                    
                    // Call onSplashComplete callback
                    onSplashComplete?.Invoke();
                };
                splashTimer.Start();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading splash: {ex.Message}");
                // If splash fails, call onSplashComplete immediately
                onSplashComplete?.Invoke();
            }
        }
    }
}
